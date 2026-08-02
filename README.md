# Snowcem Paints - Next.js Application & Admin Panel

This project is a modern Next.js 14 (App Router) + TypeScript website and Admin Panel for Snowcem Paints.

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Admin Authentication Credentials
ADMIN_EMAIL=admin@snowcem.com
ADMIN_PASSWORD=admin123456

# iron-session Secret Key (Must be at least 32 characters long)
SESSION_SECRET=snowcem_super_secret_session_key_32chars_min!

# SMTP Configuration (For email notifications)
SMTP_USER=noreply@snowcem.com
```

### Environment Variable Descriptions
| Variable | Description | Default / Example |
|---|---|---|
| `ADMIN_EMAIL` | Email address required for logging into `/admin/login` | `admin@snowcem.com` |
| `ADMIN_PASSWORD` | Password required for logging into `/admin/login` | `admin123456` |
| `SESSION_SECRET` | Secret key used by `iron-session` to encrypt admin cookies | `32+ characters secret key` |
| `SMTP_USER` | Email sender username for SMTP notifications | `noreply@snowcem.com` |

---

## 🛠 Setup & Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Access Admin Panel**:
   - Navigate to `http://localhost:3000/admin/login`
   - Log in with the credentials set in your `.env.local` file.

---

## 📁 Architecture Summary

- **App Router Layouts**: Main site under `src/app/` and protected Admin area under `src/app/(admin)/`.
- **Session Auth**: Server-side encrypted session cookies powered by `iron-session` (`src/lib/auth.ts`, `src/lib/session.ts`).
- **Route Guard**: Protective Next.js middleware at `middleware.ts` restricting access to `/admin/*`.
- **Server Actions & Authorization**: Located in `src/actions/` protected by `requireAdmin()`.
- **Data Access Layer**: Thread-safe file-backed JSON database engine (`src/data/db.json` & `src/services/`).
- **UI Components**: Modern admin sidebar, navigation header, data tables with sorting/filtering, sales metrics cards, and responsive charts (`src/components/admin/`).
