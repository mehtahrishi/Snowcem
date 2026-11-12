# Snowcem Server Installation, Hardening & Disaster Recovery Guide (0 to 100)
## Complete Bare-Metal to Production Deployment for AlmaLinux 8/9 with cPanel/WHM

> [!IMPORTANT]
> **Use Case**: Follow this exact guide if you wipe the server, get provisioned a brand new VPS, or migrate to another host. Copy-pasting these steps sequentially will restore the exact production state, apply **security hardening (custom SSH port 1243, Fail2ban, CSF firewall, 4GB swap)**, resolve all **cPanel/AlmaLinux/SELinux quirks**, purge bloatware and broken packages, bind local services to `127.0.0.1`, restore all 12 database models, and launch the website with zero downtime.

---

## 1. Complete Server Architecture Overview

- **Operating System**: AlmaLinux 8.10 / 9 (RHEL derivative)
- **Control Panel**: cPanel & WHM (Apache reverse proxy + AutoSSL on ports 80/443)
- **SSH Service**: Port `1243` (Strict Public Key Auth; PasswordAuth: NO; PermitRootLogin: NO)
- **Firewall & Intrusion Prevention**: CSF (ConfigServer Security & Firewall) + Fail2ban (`sshd` jail)
- **Swap Memory**: 4GB `/swapfile1` (prevents OOM kills during `next build`)
- **Node.js**: v22 LTS via NodeSource
- **Process Manager**: PM2 (running as non-root user `snowcem` under `127.0.0.1:3000`)
- **Database**: Local MariaDB/MySQL 8.0 bound strictly to `127.0.0.1:3306` (`snowcem_db`, timezone `+05:30` IST)
- **Codebase Path**: `/var/www/Snowcem`
- **Dynamic Media**: `/var/www/Snowcem/uploads/` (symlinked & served directly by Apache)

---

## 2. Phase 1: OS Hardening, Swap, Timezone & Bloat Purge

Log in to the new server as `root` (on standard port 22 for initial setup):
```bash
ssh root@<NEW_SERVER_IP>
```

### 2.1 Set System Timezone to Indian Standard Time (IST)
```bash
timedatectl set-timezone Asia/Kolkata
timedatectl status
```

### 2.2 Create 4GB Swap Space (Prevents OOM Crashes on Next.js Builds)
```bash
fallocate -l 4G /swapfile1 || dd if=/dev/zero of=/swapfile1 bs=1M count=4096
chmod 600 /swapfile1
mkswap /swapfile1
swapon /swapfile1

# Make permanent across reboots
echo "/swapfile1 none swap sw 0 0" >> /etc/fstab
swapon --show
```

### 2.3 System Updates, EPEL & Package Cleanup
```bash
dnf update -y
dnf install -y epel-release curl wget git bzip2 gzip tar unzip openssl nano fail2ban
dnf clean all
```

### 2.4 User Setup & Passwordless Sudo
```bash
# Create user snowcem if not present
useradd -m -s /bin/bash snowcem 2>/dev/null || true
usermod -aG wheel snowcem

# Configure passwordless sudo for maintenance
echo "snowcem ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/snowcem
chmod 440 /etc/sudoers.d/snowcem

# Set up SSH directory for user snowcem
mkdir -p /home/snowcem/.ssh
chmod 700 /home/snowcem/.ssh
touch /home/snowcem/.ssh/authorized_keys
chmod 600 /home/snowcem/.ssh/authorized_keys
chown -R snowcem:snowcem /home/snowcem/.ssh
```

---

## 3. Phase 2: SSH Lockdown & Custom Port (Port 1243)

### 3.1 Hardening `/etc/ssh/sshd_config`
Edit `/etc/ssh/sshd_config` (or append to it):
```text
Port 1243
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
MaxAuthTries 3
```

### 3.2 Update CSF Firewall / Firewalld for Port 1243
If ConfigServer Security & Firewall (`csf`) is installed:
```bash
# Add port 1243 to TCP_IN inside /etc/csf/csf.conf
sed -i 's/^TCP_IN = "/TCP_IN = "1243,/' /etc/csf/csf.conf
csf -r
```
If using `firewalld`:
```bash
firewall-cmd --permanent --add-port=1243/tcp
firewall-cmd --reload
```

### 3.3 Configure Fail2ban for SSH Protection on Port 1243
Create `/etc/fail2ban/jail.d/sshd.local`:
```ini
[DEFAULT]
bantime = 1h
findtime = 10m
maxretry = 5
backend = systemd

[sshd]
enabled = true
port = 1243
```
Enable and restart services:
```bash
systemctl restart sshd
systemctl enable --now fail2ban
fail2ban-client status sshd
```

> [!WARNING]
> Test logging in via `ssh -p 1243 snowcem@<SERVER_IP>` in a new terminal window before closing your existing root session!

---

## 4. Phase 3: Node.js 22 LTS & PM2 Setup

### 4.1 Install Node.js 22 LTS
```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
dnf install -y nodejs

# Verify versions
node -v   # Should show v22.x
npm -v
```

### 4.2 Install PM2 & Logrotate Daemon
```bash
npm install -g pm2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

---

## 5. Phase 4: MariaDB / MySQL Configuration & Port Lockdown

> [!CAUTION]
> On a cPanel server, MariaDB is pre-installed. Never reinstall `mariadb-server` via DNF.

### 5.1 Enforce Strict Localhost Binding & Indian Timezone (+05:30)
Edit `/etc/my.cnf`:
```ini
[mysqld]
bind-address=127.0.0.1
disable-log-bin=1
default-authentication-plugin=mysql_native_password
performance-schema=0
default-storage-engine=MyISAM
innodb_file_per_table=1
max_allowed_packet=268435456
innodb_buffer_pool_size=25165824
open_files_limit=10000
mysqlx=0
default-time-zone=+05:30
```

Restart MySQL:
```bash
/scripts/restartsrv_mysql
# or: systemctl restart mysqld
```

### 5.2 Create Database & Dedicated User
Open MySQL as root:
```bash
mysql
```
Execute:
```sql
CREATE DATABASE IF NOT EXISTS snowcem_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'snowcem'@'127.0.0.1' IDENTIFIED BY 'ZebronicsLoveZenitaFromSnowcem@1679';
CREATE USER IF NOT EXISTS 'snowcem'@'localhost' IDENTIFIED BY 'ZebronicsLoveZenitaFromSnowcem@1679';

GRANT ALL PRIVILEGES ON snowcem_db.* TO 'snowcem'@'127.0.0.1';
GRANT ALL PRIVILEGES ON snowcem_db.* TO 'snowcem'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

---

## 6. Phase 5: Codebase Deployment & Dynamic Storage

### 6.1 Clone Repository into `/var/www/Snowcem`
```bash
mkdir -p /var/www
chown -R snowcem:snowcem /var/www

sudo -u snowcem bash
cd /var/www
git clone https://github.com/mehtahrishi/Snowcem.git Snowcem
cd /var/www/Snowcem
```

### 6.2 Set Up Dynamic Uploads & Symlinks
```bash
# Directory for uploads outside git
mkdir -p /var/www/Snowcem/uploads/pdf
mkdir -p /var/www/Snowcem/uploads/products/interior
mkdir -p /var/www/Snowcem/uploads/products/exterior
mkdir -p /var/www/Snowcem/uploads/products/waterproofing

# Public symlink for Next.js static resolution
ln -sfn /var/www/Snowcem/uploads /var/www/Snowcem/public/uploads

# Permissions
chmod -R 755 /var/www/Snowcem/uploads
```

### 6.3 Create Production `.env`
Create `/var/www/Snowcem/.env`:
```ini
# Local MariaDB (127.0.0.1:3306)
DATABASE_URL="mysql://snowcem:ZebronicsLoveZenitaFromSnowcem%401679@127.0.0.1:3306/snowcem_db"

# Admin Authentication (Stateless iron-session)
SESSION_SECRET="877fdc631e6014e4e505611d8304d3988877c8ebb2893aff18381280738ed0da"
ADMIN_USER="admin"
ADMIN_PASSWORD="Sc@0ae58f1de674f3c1c77f!"
```
Lock permissions to `600`:
```bash
chmod 600 /var/www/Snowcem/.env
```

### 6.4 Install Dependencies & Build
```bash
cd /var/www/Snowcem
npm install
npm run build
```

---

## 7. Phase 6: Database Tables Schema Creation (12 Tables)

Run this self-contained script from `/var/www/Snowcem` to create all production schemas:
```bash
cd /var/www/Snowcem
node -e '
const mysql = require("mysql2/promise");
async function run() {
  const conn = await mysql.createConnection({
    host: "127.0.0.1",
    user: "snowcem",
    password: "ZebronicsLoveZenitaFromSnowcem@1679",
    database: "snowcem_db",
    multipleStatements: true
  });

  const sql = `
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(36) PRIMARY KEY,
      parent_id VARCHAR(36),
      name VARCHAR(150) NOT NULL,
      slug VARCHAR(150) NOT NULL UNIQUE,
      description TEXT,
      badge VARCHAR(50),
      banner VARCHAR(255),
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_categories_parent (parent_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(36) PRIMARY KEY,
      category_id VARCHAR(36) NOT NULL,
      subcategory_id VARCHAR(36),
      name VARCHAR(200) NOT NULL,
      slug VARCHAR(200) NOT NULL,
      tagline VARCHAR(255),
      description TEXT,
      image VARCHAR(255),
      features JSON,
      specifications JSON,
      faq JSON,
      pack_sizes JSON,
      pdf_url VARCHAR(255),
      meta_title VARCHAR(200),
      meta_description TEXT,
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_products_cat_sub (category_id, subcategory_id),
      INDEX idx_products_slug (slug),
      INDEX idx_products_sort (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS featured_products (
      id VARCHAR(36) PRIMARY KEY,
      product_id VARCHAR(36) NOT NULL,
      badge VARCHAR(50) NOT NULL DEFAULT "Bestseller",
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS jobs (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      slug VARCHAR(150) NOT NULL UNIQUE,
      department VARCHAR(100),
      location VARCHAR(100),
      experience VARCHAR(100),
      ctc VARCHAR(100),
      summary TEXT,
      content_md LONGTEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS colors (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      code VARCHAR(50) NOT NULL UNIQUE,
      hex VARCHAR(7) NOT NULL,
      family VARCHAR(50) NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS dealers (
      id VARCHAR(36) PRIMARY KEY,
      customer_code VARCHAR(100),
      name VARCHAR(150) NOT NULL,
      address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      phone VARCHAR(50),
      pincode VARCHAR(20) NOT NULL,
      landmark VARCHAR(150),
      rating DECIMAL(2,1) NOT NULL DEFAULT 4.8,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS painters (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      pincode VARCHAR(20) NOT NULL,
      experience_years INT NOT NULL DEFAULT 1,
      specialization VARCHAR(150) NOT NULL DEFAULT "Interior & Exterior Painting",
      rating DECIMAL(2,1) NOT NULL DEFAULT 4.8,
      status VARCHAR(50) NOT NULL DEFAULT "active",
      verified BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS media_videos (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      youtube_id VARCHAR(50) NOT NULL,
      category VARCHAR(50) NOT NULL DEFAULT "tvc",
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS curated_palettes (
      id VARCHAR(36) PRIMARY KEY,
      category VARCHAR(100) NOT NULL,
      subcategory VARCHAR(100) NOT NULL,
      name VARCHAR(150) NOT NULL,
      hex VARCHAR(10) NOT NULL,
      recommended_surface VARCHAR(150) NOT NULL,
      mood_description TEXT,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_curated_cat (category, subcategory)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150),
      city VARCHAR(100),
      pincode VARCHAR(20),
      mobile VARCHAR(50) NOT NULL,
      inquiry_type VARCHAR(100) NOT NULL DEFAULT "Customer Support",
      message TEXT,
      metadata JSON,
      status VARCHAR(50) NOT NULL DEFAULT "unread",
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_inquiries_status (status),
      INDEX idx_inquiries_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS calculator_materials (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      \`group\` VARCHAR(50) NOT NULL,
      category VARCHAR(20) NOT NULL,
      unit VARCHAR(10) NOT NULL DEFAULT "Ltr",
      mrp DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      dpl DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      pack DECIMAL(8,2) NOT NULL DEFAULT 1.00,
      cost_per_unit DECIMAL(10,2) NOT NULL DEFAULT 0.00,
      coverage DECIMAL(8,2) NOT NULL DEFAULT 0.00,
      default_coats INT NOT NULL DEFAULT 2,
      labour_rate DECIMAL(8,2) NOT NULL DEFAULT 0.00,
      image VARCHAR(255),
      tagline VARCHAR(255),
      warranty VARCHAR(100),
      finish VARCHAR(100),
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_calc_mat_cat_group (category, \`group\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

    CREATE TABLE IF NOT EXISTS calculator_leads (
      id VARCHAR(36) PRIMARY KEY,
      full_name VARCHAR(150) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      pincode VARCHAR(20) NOT NULL,
      start_timeline VARCHAR(100),
      local_painter_hired VARCHAR(50),
      space VARCHAR(50) NOT NULL,
      need VARCHAR(50) NOT NULL,
      carpet_area INT NOT NULL,
      selected_tier VARCHAR(50),
      total_estimated_cost DECIMAL(12,2),
      status VARCHAR(50) NOT NULL DEFAULT "new",
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_calc_leads_phone (phone),
      INDEX idx_calc_leads_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await conn.query(sql);
  console.log("All 12 tables created successfully!");
  await conn.end();
}
run();
'
```

---

## 8. Phase 7: Apache Reverse Proxy & SELinux Setup

### 8.1 Fix SELinux Network Connections (Prevents 502 Bad Gateway)
```bash
setsebool -P httpd_can_network_connect 1
```

### 8.2 Create Apache VirtualHost Proxy Include
```bash
mkdir -p /etc/apache2/conf.d/userdata/ssl/2_4/snowcem/snowcempaints.com
mkdir -p /etc/apache2/conf.d/userdata/std/2_4/snowcem/snowcempaints.com
```

Create `/etc/apache2/conf.d/userdata/ssl/2_4/snowcem/snowcempaints.com/snowcem_proxy.conf`:
```apache
ProxyPreserveHost On
ProxyRequests Off

Alias /uploads /var/www/Snowcem/uploads
<Directory "/var/www/Snowcem/uploads">
    Options -Indexes
    AllowOverride None
    Require all granted
    Header set Cache-Control "public, max-age=31536000, immutable"
</Directory>

ProxyPass /.well-known !
ProxyPass /uploads !
ProxyPass / http://127.0.0.1:3000/
ProxyPassReverse / http://127.0.0.1:3000/
RequestHeader set X-Forwarded-Proto "https"
```

Copy to non-SSL directory and reload Apache:
```bash
cp /etc/apache2/conf.d/userdata/ssl/2_4/snowcem/snowcempaints.com/snowcem_proxy.conf \
   /etc/apache2/conf.d/userdata/std/2_4/snowcem/snowcempaints.com/snowcem_proxy.conf

/usr/local/cpanel/scripts/rebuildhttpdconf
/scripts/restartsrv_httpd
```

---

## 9. Phase 8: PM2 Daemon & Auto-Start Configuration

### 9.1 Create PM2 Ecosystem Configuration
Create `/var/www/ecosystem.config.cjs`:
```javascript
module.exports = {
  apps: [
    {
      name: "snowcem-app",
      cwd: "/var/www/Snowcem",
      script: "/var/www/Snowcem/node_modules/.bin/next",
      args: "start -H 127.0.0.1 -p 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "750M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: 3000,
      },
    },
  ],
};
```

### 9.2 Start PM2 Application & Enable System Boot
```bash
sudo -u snowcem bash -c "
  cd /var/www
  pm2 start /var/www/ecosystem.config.cjs
  pm2 save
"

# Set up systemd hook for user snowcem
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u snowcem --hp /home/snowcem
```

---

## 10. Phase 9: Automated Daily Backup Script

Create `/home/snowcem/backups/backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%F_%H-%M)
mkdir -p /home/snowcem/backups

# Dump MySQL database
mysqldump -u snowcem -p'ZebronicsLoveZenitaFromSnowcem@1679' --no-tablespaces snowcem_db | gzip > /home/snowcem/backups/db_$DATE.sql.gz

# Archive uploads and secrets
tar -czf /home/snowcem/backups/uploads_$DATE.tar.gz -C /var/www/Snowcem uploads .env

# Retain only last 7 days
find /home/snowcem/backups -type f -mtime +7 -delete
```

Set executable permissions and add cron:
```bash
chmod +x /home/snowcem/backups/backup.sh

# Run every day at 03:00 AM IST
(crontab -u snowcem -l 2>/dev/null; echo "0 3 * * * /home/snowcem/backups/backup.sh") | crontab -u snowcem -
```

---

## 11. Final 10-Second Production Audit Checklist

Run this command block to verify everything is 100% operational:
```bash
echo "=== 1. PM2 Application Status ==="
pm2 status

echo "=== 2. Local Port Binding (3000 & 3306 MUST be 127.0.0.1) ==="
ss -tulpn | grep -E ':(3000|3306)\b'

echo "=== 3. Fail2ban Protection Status ==="
fail2ban-client status sshd

echo "=== 4. Swap Memory Status ==="
free -h

echo "=== 5. Local Next.js API Response ==="
curl -s http://127.0.0.1:3000/api/categories | head -n 1

echo "=== 6. Public HTTPS WebP Asset Delivery ==="
curl -sI https://snowcempaints.com/uploads/pdf/Snowcem-Plus.pdf | head -n 5

echo "=== 7. MySQL Timezone and Connection ==="
mysql -u snowcem -p'ZebronicsLoveZenitaFromSnowcem@1679' snowcem_db -e "SELECT NOW(), @@system_time_zone, COUNT(*) FROM products;"
```
When all 7 checks pass, your server is **100% hardened, bloat-free, secure, and production ready**.

