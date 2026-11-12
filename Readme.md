# AI Agent Runbook — AlmaLinux (cPanel/WHM) VPS Hardening, Localhost Node.js/Next.js + Local MariaDB Deployment Guide

> [!IMPORTANT]
> **Instructions for the AI Agent Reading This File:**
> This server runs **AlmaLinux (RHEL 8/9)** with **cPanel & WHM** pre-installed.
> The user's website is architected to run as a **Node.js / Next.js server on `127.0.0.1:3000` (via PM2)** connected to a **local MySQL/MariaDB database on `127.0.0.1:3306`**.
>
> ### Critical AlmaLinux + cPanel/WHM Quirks You MUST Know:
> 1. **OS Differences (AlmaLinux vs. Debian)**:
>    - Package Manager: `dnf` (not `apt-get`)
>    - Sudo Group: `wheel` (`usermod -aG wheel mehta`, not `sudo`)
>    - SSH Service Name: `sshd` (`systemctl reload sshd`, not `ssh`)
>    - SELinux: If SELinux is `Enforcing`, you **MUST** run `setsebool -P httpd_can_network_connect 1` or Apache/Nginx will return `502 Bad Gateway` when proxying to `127.0.0.1:3000`!
> 2. **How cPanel/WHM Affects Ports, Packages & Databases**:
>    - **MariaDB (`127.0.0.1:3306`) is ALREADY installed by cPanel/WHM**, and `root` has passwordless MySQL CLI access via `/root/.my.cnf`! Never reinstall `mariadb-server` over cPanel's MariaDB—just run `mysql` as `root` directly!
>    - **DNF Package Excludes (`/etc/dnf/dnf.conf`)**: cPanel writes an `exclude=...` line inside `/etc/dnf/dnf.conf` (and `/etc/yum.conf`). Never delete cPanel's `mariadb*` or `httpd*` excludes if keeping cPanel.
>    - **`chkservd` (`tailwatchd`) Watchdog**: cPanel has a background daemon called `tailwatchd` (`chkservd`) that automatically restarts Apache (`httpd`) every 5 minutes if you stop it manually.
> 3. **Choose Mode A or Mode B in Phase 6**:
>    - **Mode A (Recommended on cPanel/WHM VPS)**: Keep WHM/Apache + AutoSSL handling Ports `80`/`443` & SSL certificates automatically, while proxying all traffic to your PM2 app on `http://127.0.0.1:3000` and using local MariaDB on `127.0.0.1:3306`.
>    - **Mode B (Standalone Nginx Mode)**: If the user does NOT want cPanel/WHM running at all (and doesn't want to reinstall the OS), disable `cpanel`, `tailwatchd`, `httpd`, `exim`, `dovecot`, `named`, `pure-ftpd` and run standalone Nginx + Certbot on Ports `80`/`443` -> `127.0.0.1:3000`.

---

## Phase 1: First Login as `root` — System Audit, Hostname & De-Bloat

```bash
# 1. Check AlmaLinux version, RAM, Disk, SELinux, and existing users
cat /etc/os-release
uname -r
free -h && df -h /
getenforce || true
awk -F: '$3 >= 1000 && $3 < 60000 {print $1, $3, $6, $7}' /etc/passwd

# 2. Set custom hostname (must be a valid FQDN for WHM/cPanel, e.g., server.yourdomain.com, or Honest-Server)
SERVER_HOSTNAME="Honest-Server" # <-- Replace with desired hostname
hostnamectl set-hostname "$SERVER_HOSTNAME"
if ! grep -q "$SERVER_HOSTNAME" /etc/hosts; then
  echo -e "127.0.1.1\t$SERVER_HOSTNAME" >> /etc/hosts
fi
mkdir -p /etc/cloud/cloud.cfg.d
printf "preserve_hostname: true\nmanage_etc_hosts: false\n" > /etc/cloud/cloud.cfg.d/99-preserve-hostname.cfg

# 3. Stop & disable unnecessary hardware/desktop/bluetooth/Wi-Fi daemons if present
for svc in bluetooth avahi-daemon ModemManager wpa_supplicant cups rpcbind; do
  systemctl disable --now "${svc}.service" 2>/dev/null || true
  systemctl mask "${svc}.service" 2>/dev/null || true
done

# 4. Update OS packages & install essential build tools
dnf update -y
dnf install -y epel-release 2>/dev/null || true
dnf install -y curl wget git unzip tar gcc gcc-c++ make python3 fail2ban dnf-automatic
dnf autoremove -y && dnf clean all
```

---

## Phase 2: Create Admin User (`mehta`) & Configure SSH Key

Still logged in as `root`:
```bash
# 1. Create user 'mehta' and add to 'wheel' (AlmaLinux sudo group)
id mehta >/dev/null 2>&1 || useradd -m -s /bin/bash mehta
usermod -aG wheel mehta

# 2. Allow 'mehta' to use sudo (set a strong password for mehta or NOPASSWD if desired)
# Passwords can be set via: echo 'mehta:StrongSudoPassword123!' | chpasswd

# 3. Lock down home directory permissions (755 on /home/mehta if Nginx/Apache needs to read inside, or 700 if app lives in /var/www)
chmod 700 /home/mehta

# 4. Add Windows PC Ed25519 public key (mehta@Zebronics)
install -d -m 700 -o mehta -g mehta /home/mehta/.ssh
cat << 'EOF' > /home/mehta/.ssh/authorized_keys
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKSMKyHxcgE91K+0RP91Ec88nAfYJ9cDtNpQ1t0n+CuR mehta@Zebronics
EOF
chown mehta:mehta /home/mehta/.ssh/authorized_keys
chmod 600 /home/mehta/.ssh/authorized_keys

# 5. Remove any root authorized_keys so root SSH login is impossible
rm -f /root/.ssh/authorized_keys
```

> [!IMPORTANT]
> Test passwordless SSH login as `mehta` (`ssh mehta@<VPS_IP>`) before running Phase 3!

---

## Phase 3: Lock Down SSH (`sshd`), Firewall & Fail2Ban on AlmaLinux

```bash
# 1. Harden SSH Daemon (/etc/ssh/sshd_config.d/00-hardening.conf)
# On AlmaLinux 8/9, drop-in files in /etc/ssh/sshd_config.d/00-*.conf override defaults cleanly:
sudo mkdir -p /etc/ssh/sshd_config.d
sudo tee /etc/ssh/sshd_config.d/00-hardening.conf > /dev/null << 'EOF'
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication no
PermitEmptyPasswords no
KbdInteractiveAuthentication no
ChallengeResponseAuthentication no
X11Forwarding no
MaxAuthTries 3
LoginGraceTime 30
AllowUsers mehta
EOF

# Also ensure main /etc/ssh/sshd_config has PermitRootLogin no & PasswordAuthentication no:
sudo sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
printf 'PasswordAuthentication no\n' | sudo tee /etc/ssh/sshd_config.d/50-cloud-init.conf
printf 'ssh_pwauth: false\n' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-ssh-password-auth.cfg

# Validate and reload sshd (Note: service is 'sshd' on AlmaLinux!)
sudo sshd -t && sudo systemctl reload sshd

# 2. Configure Fail2Ban for AlmaLinux sshd
sudo tee /etc/fail2ban/jail.d/sshd.local > /dev/null << 'EOF'
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
backend = systemd

[sshd]
enabled = true
port = ssh
EOF
sudo systemctl enable --now fail2ban
sudo systemctl restart fail2ban
sudo fail2ban-client status sshd

# 3. Firewall Check (firewalld / CSF)
# Ensure only necessary ports are open externally and port 3000 / 3306 are CLOSED externally:
if systemctl is-active --quiet firewalld; then
  sudo firewall-cmd --permanent --add-service=ssh
  sudo firewall-cmd --permanent --add-service=http
  sudo firewall-cmd --permanent --add-service=https
  sudo firewall-cmd --permanent --remove-port=3000/tcp 2>/dev/null || true
  sudo firewall-cmd --permanent --remove-port=3306/tcp 2>/dev/null || true
  sudo firewall-cmd --reload
  sudo firewall-cmd --list-all
fi

# 4. Allow Apache/Nginx to Reverse-Proxy to 127.0.0.1:3000 under SELinux
if command -v setsebool >/dev/null 2>&1; then
  sudo setsebool -P httpd_can_network_connect 1 2>/dev/null || true
fi
```

---

## Phase 4: Automatic Security Updates (`dnf-automatic`) & 4 GB Swap File

```bash
# 1. Configure dnf-automatic to install security updates daily without rebooting
sudo sed -i 's/^upgrade_type =.*/upgrade_type = security/' /etc/dnf/automatic.conf
sudo sed -i 's/^apply_updates =.*/apply_updates = yes/' /etc/dnf/automatic.conf
sudo systemctl enable --now dnf-automatic.timer

# 2. Create 4 GB Swap File (Prevents Out-of-Memory Crashes During `next build`)
if [ ! -f /swapfile ] && [ "$(swapon --show | wc -l)" -eq 0 ]; then
  sudo dd if=/dev/zero of=/swapfile bs=1M count=4096 status=progress
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi
echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf
sudo sysctl -p /etc/sysctl.d/99-swappiness.conf
```

---

## Phase 5: Install Node.js 22 LTS, PM2 & Configure Local MariaDB (`127.0.0.1:3306`)

### 5.1 Install Node.js 22 LTS & PM2 (System-Wide on AlmaLinux)
```bash
# Install Node.js 22 LTS from NodeSource RPM repository
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo dnf install -y nodejs
node -v && npm -v

# Install PM2 & configure auto-start on boot + log rotation
sudo npm install -g pm2
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u mehta --hp /home/mehta
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### 5.2 Lock MariaDB/MySQL to `127.0.0.1:3306` & Create Local Database
On a cPanel/WHM VPS, MariaDB/MySQL is already installed and `sudo mysql` works automatically using `/root/.my.cnf`!
```bash
# 1. Ensure MariaDB/MySQL is running and bound strictly to 127.0.0.1 (invisible to external internet)
if ! grep -q "^bind-address" /etc/my.cnf; then
  sudo sed -i '/^\[mysqld\]/a bind-address=127.0.0.1' /etc/my.cnf
else
  sudo sed -i 's/^bind-address.*/bind-address=127.0.0.1/' /etc/my.cnf
fi
sudo systemctl restart mariadb 2>/dev/null || sudo systemctl restart mysqld

# Verify port 3306 is listening ONLY on 127.0.0.1:3306
sudo ss -tulpn | grep 3306

# 2. Create your project database and local user 'mehta'@'127.0.0.1'
# (Note: Using standalone mysql via root bypasses cPanel's username prefix restriction!)
DB_NAME="honestyprinthouse_db"   # <-- Replace with your database name
DB_PASS="ShinigamiAizen"         # <-- Replace with your database password

sudo mysql -e "
DELETE FROM mysql.user WHERE User='';
DROP DATABASE IF EXISTS test;
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'mehta'@'localhost' IDENTIFIED BY '${DB_PASS}';
CREATE USER IF NOT EXISTS 'mehta'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
ALTER USER 'mehta'@'localhost' IDENTIFIED BY '${DB_PASS}';
ALTER USER 'mehta'@'127.0.0.1' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO 'mehta'@'localhost';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO 'mehta'@'127.0.0.1';
FLUSH PRIVILEGES;
"
```

---

## Phase 6: Deploy Website in `/var/www/`, Build & Start PM2 (`127.0.0.1:3000`)

Set these variables for the project:
```bash
PROJECT_DIR="Honesty-Print-House"          # Folder inside /var/www/
GITHUB_REPO="https://github.com/ORG/REPO.git"
APP_NAME="honesty-app"                     # PM2 process name
DOMAIN="yourdomain.com"                    # Primary domain
DB_NAME="honestyprinthouse_db"
DB_PASS="ShinigamiAizen"
```

### 6.1 Clone Project, Restore Database / Uploads & Lock `.env` (`chmod 600`)
```bash
sudo mkdir -p /var/www
sudo chown mehta:mehta /var/www
sudo chmod 755 /var/www
cd /var/www
git clone "$GITHUB_REPO" "$PROJECT_DIR"
mkdir -p "/var/www/${PROJECT_DIR}/uploads"

# If importing an existing SQL dump & uploads.zip from /tmp:
# mysql -u mehta -p"${DB_PASS}" "${DB_NAME}" < /tmp/db_backup.sql && rm -f /tmp/db_backup.sql
# unzip -q -o /tmp/uploads.zip -d "/var/www/${PROJECT_DIR}/" && rm -f /tmp/uploads.zip

# Create /var/www/ecosystem.config.cjs (Bound strictly to 127.0.0.1:3000)
cat << EOF > /var/www/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "${APP_NAME}",
      cwd: "/var/www/${PROJECT_DIR}",
      script: "/var/www/${PROJECT_DIR}/.next/standalone/server.js",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: 3000,
      },
    },
  ],
};
EOF

chmod 600 "/var/www/${PROJECT_DIR}/.env" /var/www/ecosystem.config.cjs
```

### 6.2 Build Next.js Standalone App & Start PM2
```bash
cd "/var/www/${PROJECT_DIR}"
npm install
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cp .env .next/standalone/.env
chmod 600 .next/standalone/.env

cd /var/www
pm2 start /var/www/ecosystem.config.cjs
pm2 save
```

---

## Phase 7: Reverse Proxy `https://${DOMAIN}` -> `http://127.0.0.1:3000` (Choose Mode A or Mode B)

### Mode A (Recommended when keeping cPanel/WHM active): Use cPanel Apache + AutoSSL Proxy
If the domain is added to a cPanel account (e.g., cPanel username `CPANEL_USER`), cPanel's Apache (`httpd`) and AutoSSL already manage Ports `80`/`443` and SSL renewal automatically. Drop this custom Apache include so cPanel proxies all requests to your PM2 app on `127.0.0.1:3000`:

```bash
CPANEL_USER="your_cpanel_username" # Check via: ls /var/cpanel/users/
DOMAIN="yourdomain.com"

sudo mkdir -p "/etc/apache2/conf.d/userdata/std/2_4/${CPANEL_USER}/${DOMAIN}"
sudo mkdir -p "/etc/apache2/conf.d/userdata/ssl/2_4/${CPANEL_USER}/${DOMAIN}"

sudo tee "/etc/apache2/conf.d/userdata/ssl/2_4/${CPANEL_USER}/${DOMAIN}/nodejs_proxy.conf" > /dev/null << EOF
ProxyPreserveHost On
ProxyRequests Off

# Serve uploaded product images directly with 365-day cache
Alias /uploads /var/www/${PROJECT_DIR}/uploads
<Directory "/var/www/${PROJECT_DIR}/uploads">
    Options -Indexes
    AllowOverride None
    Require all granted
    Header set Cache-Control "public, max-age=31536000, immutable"
</Directory>

# Reverse proxy all traffic to PM2 Node.js app on 127.0.0.1:3000
ProxyPass /uploads !
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
RequestHeader set X-Forwarded-Proto "https"
EOF

# Copy to HTTP (std) and rebuild/restart cPanel Apache cleanly:
sudo cp "/etc/apache2/conf.d/userdata/ssl/2_4/${CPANEL_USER}/${DOMAIN}/nodejs_proxy.conf" \
        "/etc/apache2/conf.d/userdata/std/2_4/${CPANEL_USER}/${DOMAIN}/nodejs_proxy.conf"

sudo /scripts/rebuildhttpdconf
sudo /scripts/restartsrv_httpd
```

---

### Mode B (Alternative — If You Want cPanel/Apache Turned Off & Pure Standalone Nginx + Certbot)
If you are **not** using cPanel/WHM at all and want cPanel/Apache completely stopped so **standalone Nginx + Certbot** owns Ports `80` and `443` (identical to the Debian setup):

```bash
# 1. Stop, disable, and mask cPanel's watchdog (tailwatchd) and web/mail/dns bloat daemons
for svc in tailwatchd cpanel cpsrvd cpdavd cphulkd httpd exim dovecot named pdns pure-ftpd proftpd; do
  sudo systemctl disable --now "${svc}.service" 2>/dev/null || true
  sudo systemctl mask "${svc}.service" 2>/dev/null || true
done

# 2. Remove 'nginx*' from /etc/dnf/dnf.conf exclude list if cPanel added it, and install Nginx + Certbot
sudo sed -i 's/nginx\*//g' /etc/dnf/dnf.conf /etc/yum.conf 2>/dev/null || true
sudo dnf install -y nginx certbot python3-certbot-nginx

# 3. Hide Nginx version number (server_tokens off;)
if ! grep -q "server_tokens off;" /etc/nginx/nginx.conf; then
  sudo sed -i '/http {/a \    server_tokens off;' /etc/nginx/nginx.conf
fi

# 4. Create Nginx Reverse Proxy Config (/etc/nginx/conf.d/${APP_NAME}.conf)
sudo tee "/etc/nginx/conf.d/${APP_NAME}.conf" > /dev/null << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};

    client_max_body_size 50M;
    proxy_connect_timeout 60s;
    proxy_send_timeout 300s;
    proxy_read_timeout 300s;

    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    location /uploads/ {
        alias /var/www/${PROJECT_DIR}/uploads/;
        access_log off;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo nginx -t && sudo systemctl enable --now nginx
sudo certbot --nginx --non-interactive --agree-tos -m mehtahrishi45@gmail.com --redirect -d "${DOMAIN}" -d "www.${DOMAIN}"
sudo systemctl enable --now certbot-renew.timer 2>/dev/null || true
```

---

## Phase 8: Automated Daily Backups, Permissions & Final Security Audit

### 8.1 Daily 3:00 AM Cron Job (Database + Uploads, 7-Day Retention)
```bash
mkdir -p /home/mehta/backups
chmod 700 /home/mehta/backups

cat << EOF > /home/mehta/backups/backup.sh
#!/bin/bash
DATE=\$(date +%F_%H-%M)
mysqldump -u mehta -p'${DB_PASS}' --no-tablespaces ${DB_NAME} | gzip > /home/mehta/backups/db_\$DATE.sql.gz
tar -czf /home/mehta/backups/uploads_\$DATE.tar.gz -C /var/www/${PROJECT_DIR} uploads
find /home/mehta/backups -type f -mtime +7 -delete
EOF

chmod 700 /home/mehta/backups/backup.sh
(crontab -l 2>/dev/null | grep -v '/home/mehta/backups/backup.sh'; echo "0 3 * * * /home/mehta/backups/backup.sh") | crontab -
```

### 8.2 Lock All Ownership (`chown`) & Permissions (`chmod`)
```bash
sudo chown root:root /swapfile && sudo chmod 600 /swapfile
sudo chown -R mehta:mehta /home/mehta /var/www
chmod 700 /home/mehta /home/mehta/.ssh /home/mehta/backups
chmod 600 /home/mehta/.ssh/authorized_keys
chmod 700 /home/mehta/backups/backup.sh
chmod 755 /var/www "/var/www/${PROJECT_DIR}" "/var/www/${PROJECT_DIR}/uploads"
find "/var/www/${PROJECT_DIR}/uploads" -type d -exec chmod 755 {} +
find "/var/www/${PROJECT_DIR}/uploads" -type f -exec chmod 644 {} +
chmod 600 "/var/www/${PROJECT_DIR}/.env" \
          "/var/www/${PROJECT_DIR}/.next/standalone/.env" \
          /var/www/ecosystem.config.cjs
```

### 8.3 Final 10-Second Security & Health Audit
```bash
echo "--- 1. SSH LOCKDOWN ---"
sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|pubkeyauthentication|allowusers)'
echo "--- 2. FAIL2BAN STATUS ---"
sudo fail2ban-client status sshd
echo "--- 3. LISTENING PORTS (3306, 3000 MUST BE 127.0.0.1) ---"
sudo ss -tulpn | grep -E ':(22|80|443|3000|3306)\b'
echo "--- 4. SECRET FILE PERMISSIONS (MUST BE -rw------- / 600) ---"
ls -la "/var/www/${PROJECT_DIR}/.env" "/var/www/${PROJECT_DIR}/.next/standalone/.env" /var/www/ecosystem.config.cjs
echo "--- 5. PM2 & HTTPS STATUS ---"
pm2 status
curl -sI "https://${DOMAIN}" | head -n 5
```

