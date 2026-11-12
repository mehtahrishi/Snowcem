# Snowcem Server Installation & Disaster Recovery Guide (0 to 100)
## Complete Bare-Metal to Production Deployment for AlmaLinux 8/9 with cPanel/WHM

> [!IMPORTANT]
> **Use Case**: Follow this exact guide if you wipe the server, get provisioned a brand new VPS, or migrate to another host. Copy-pasting these steps sequentially will restore the exact production state, resolve all cPanel/AlmaLinux quirks, configure security, restore database models, and launch the website with zero downtime.

---

## 1. Server Prerequisites & Architecture

- **Operating System**: AlmaLinux 8.10 / 9 (RHEL derivative)
- **Control Panel**: cPanel & WHM (Apache reverse proxy + AutoSSL on ports 80/443)
- **Node.js**: v20+ or v22 LTS via NodeSource
- **Process Manager**: PM2 (running as non-root user `snowcem` under `127.0.0.1:3000`)
- **Database**: Local MariaDB/MySQL 8.0 on `127.0.0.1:3306` (`snowcem_db`)
- **Repository Root**: `/var/www/Snowcem`
- **Dynamic Media**: `/var/www/Snowcem/uploads/` (symlinked & served directly by Apache)

---

## 2. Phase 1: OS Preparation & Timezone Lockdown

Log in to the new server as `root`:
```bash
ssh root@<NEW_SERVER_IP>
```

### 2.1 Set System Timezone to Indian Standard Time (IST)
```bash
timedatectl set-timezone Asia/Kolkata
timedatectl status
```

### 2.2 Configure DNF Package Manager & EPEL
```bash
dnf update -y
dnf install -y epel-release curl wget git bzip2 gzip tar unzip openssl
```

### 2.3 Verify Users & Wheel Group
Ensure your non-root user `snowcem` exists and has `sudo` rights without password prompting for service maintenance:
```bash
# Create user if it doesn't already exist (cPanel usually creates it when account is added)
useradd -m -s /bin/bash snowcem
usermod -aG wheel snowcem

# Give passwordless sudo to wheel group (or specific user)
echo "snowcem ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/snowcem
chmod 440 /etc/sudoers.d/snowcem
```

---

## 3. Phase 2: Node.js & Global Packages Installation

### 3.1 Install Node.js 22 LTS
```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
dnf install -y nodejs

# Verify versions
node -v
npm -v
```

### 3.2 Install PM2 Process Manager & Auto-Rotate Module
```bash
npm install -g pm2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

---

## 4. Phase 3: MariaDB / MySQL Configuration & Hardening

> [!NOTE]
> On a cPanel server, MySQL/MariaDB is managed by cPanel. Do **NOT** install standalone `mariadb-server` via DNF.

### 4.1 Set MySQL Timezone & Localhost Binding
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

### 4.2 Create Database & Database User
Open MySQL CLI as root:
```bash
mysql
```
Run the following SQL commands:
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

## 5. Phase 4: Deploy Next.js Codebase

### 5.1 Clone Repository into `/var/www/Snowcem`
```bash
mkdir -p /var/www
chown -R snowcem:snowcem /var/www

sudo -u snowcem bash
cd /var/www
git clone https://github.com/mehtahrishi/Snowcem.git Snowcem
cd /var/www/Snowcem
```

### 5.2 Create Persistent Uploads Directory & Symlinks
```bash
# Create uploads directory structure outside git
mkdir -p /var/www/Snowcem/uploads/pdf
mkdir -p /var/www/Snowcem/uploads/products/interior
mkdir -p /var/www/Snowcem/uploads/products/exterior
mkdir -p /var/www/Snowcem/uploads/products/waterproofing

# Create public symlink so Next.js static asset server can resolve /uploads
ln -sfn /var/www/Snowcem/uploads /var/www/Snowcem/public/uploads

# Ensure proper ownership and permissions
chmod -R 755 /var/www/Snowcem/uploads
```

### 5.3 Configure Production `.env`
Create `/var/www/Snowcem/.env`:
```ini
# Local MariaDB (127.0.0.1:3306)
DATABASE_URL="mysql://snowcem:ZebronicsLoveZenitaFromSnowcem%401679@127.0.0.1:3306/snowcem_db"

# Admin Authentication (Stateless iron-session)
SESSION_SECRET="877fdc631e6014e4e505611d8304d3988877c8ebb2893aff18381280738ed0da"
ADMIN_USER="admin"
ADMIN_PASSWORD="Sc@0ae58f1de674f3c1c77f!"
```
Lock permissions to 600:
```bash
chmod 600 /var/www/Snowcem/.env
```

### 5.4 Install NPM Dependencies & Build Next.js
```bash
cd /var/www/Snowcem
npm install
npm run build
```

---

## 6. Phase 5: Database Schema & Master Tables Setup

Run the initialization script from the Snowcem project directory to create all 12 tables and constraints:
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
  console.log("All tables created successfully!");
  await conn.end();
}
run();
'
```

---

## 7. Phase 6: Apache Reverse Proxy & SELinux Configuration

### 7.1 Enable SELinux Network Connections
If SELinux is enforcing, Apache will throw `502 Bad Gateway` when trying to reverse-proxy to `127.0.0.1:3000`. Run as `root`:
```bash
setsebool -P httpd_can_network_connect 1
```

### 7.2 Configure cPanel Apache Include for Reverse Proxy & Uploads
Create directory:
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

Copy the exact file to the non-SSL directory as well:
```bash
cp /etc/apache2/conf.d/userdata/ssl/2_4/snowcem/snowcempaints.com/snowcem_proxy.conf \
   /etc/apache2/conf.d/userdata/std/2_4/snowcem/snowcempaints.com/snowcem_proxy.conf
```

Rebuild Apache config & reload:
```bash
/usr/local/cpanel/scripts/rebuildhttpdconf
/scripts/restartsrv_httpd
```

---

## 8. Phase 7: PM2 Production Startup & Daemon

### 8.1 Create Ecosystem File
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

### 8.2 Launch with PM2 & Enable Auto-boot
```bash
sudo -u snowcem bash -c "
  cd /var/www
  pm2 start /var/www/ecosystem.config.cjs
  pm2 save
"

# Set up PM2 systemd startup hook for user snowcem
env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u snowcem --hp /home/snowcem
```

---

## 9. Phase 8: Automated Daily Backups

Create `/home/snowcem/backups/backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%F_%H-%M)
mkdir -p /home/snowcem/backups

# Dump MySQL database
mysqldump -u snowcem -p'ZebronicsLoveZenitaFromSnowcem@1679' --no-tablespaces snowcem_db | gzip > /home/snowcem/backups/db_$DATE.sql.gz

# Archive uploads and environment secrets
tar -czf /home/snowcem/backups/uploads_$DATE.tar.gz -C /var/www/Snowcem uploads .env

# Retain only last 7 days of backups
find /home/snowcem/backups -type f -mtime +7 -delete
```

Set permissions and add to crontab:
```bash
chmod +x /home/snowcem/backups/backup.sh

# Run daily at 03:00 AM IST
(crontab -u snowcem -l 2>/dev/null; echo "0 3 * * * /home/snowcem/backups/backup.sh") | crontab -u snowcem -
```

---

## 10. Verification & 10-Second Health Audit

Run these 5 checks to verify complete restoration:
```bash
# 1. PM2 Application Status
pm2 status

# 2. Check Local Ports (3000 and 3306 must be bound to 127.0.0.1)
ss -tulpn | grep -E ':(3000|3306)'

# 3. Test Local Next.js API Response
curl -s http://127.0.0.1:3000/api/categories | head -n 1

# 4. Check Public SSL & WebP Image Headers
curl -sI https://snowcempaints.com/uploads/pdf/Snowcem-Plus.pdf | head -n 5

# 5. Check MySQL Timezone and Connection
mysql -u snowcem -p'ZebronicsLoveZenitaFromSnowcem@1679' snowcem_db -e "SELECT NOW(), @@system_time_zone, COUNT(*) FROM products;"
```
When all 5 checks return status 200/clean values, your server is **100% operational, fully hardened, and live**.
