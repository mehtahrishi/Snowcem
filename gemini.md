# GEMINI.MD — AI Coding Assistant Rules & Repository Protocol

> [!IMPORTANT]
> **MANDATORY INSTRUCTION FOR ALL AI CODING ASSISTANTS & SUBAGENTS**
> Any AI coding assistant (including Antigravity, Gemini, ChatGPT, Claude, GitHub Copilot, or subagents) working on this repository **MUST ALWAYS UPDATE BOTH `gemini.md` (for instructions/rules) AND `codebase.md` (for file tree & codebase details)** whenever changes are made to the codebase architecture, file tree, dependencies, or core component structures.

---

## 1. AI Coding Assistant Rules & Workflow
1. **Always Update Documentation**:
   - Keep instructions and rules in `gemini.md`.
   - Keep the file tree, component list, and file descriptions up-to-date in **[codebase.md](file:///C:/Users/mehta/Downloads/Projects/New-folder/codebase.md)**.
2. **Preserve Modular Component Structure**: Maintain clear separation of store components under `src/components/`, admin UI components under `src/components/admin/`, and pages under `src/app/`.
3. **TypeScript & Linting**: Always use strict typing and avoid unused imports or broken signatures.
4. **Styling Standards**: Use defined Tailwind color tokens (Snowcem Navy, Magenta, Orange) and preserve existing design tokens and animations.
5. **Admin Panel Security & Auth**:
   - Protect all admin server actions in `src/actions/` using `requireAdmin()`.
   - Protect all `/admin/*` routes with `middleware.ts` relying on `iron-session` configuration in `src/lib/auth.ts` and `src/lib/session.ts`.
   - Use `revalidatePath()` after any data mutation in server actions to ensure UI fresh state rendering.
6. **Data Access Services & Database Architecture**:
   - Database ORM: **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`) with `mysql2` driver targeting MySQL/MariaDB database.
   - Schemas located in `src/db/schema.ts` defining `categories`, `products`, `orders`, `orderItems`, and `customers` tables.
   - Database client connection initialized in `src/db/index.ts`.
   - Data Access Services in `src/services/` (`categoriesService.ts`, `productsService.ts`, `ordersService.ts`, `customersService.ts`) executing Drizzle ORM SQL queries.
7. **No Blind Edits**: Always inspect target files completely before making edits.

---

## 2. Quick References
- **Codebase Details & File Descriptions**: See **[codebase.md](file:///C:/Users/mehta/Downloads/Projects/New-folder/codebase.md)**
- **Framework**: Next.js 14 (App Router)
- **Database & ORM**: Drizzle ORM + MySQL (`drizzle.config.ts`, `src/db/schema.ts`)
- **Session Auth**: `iron-session`
- **Language**: TypeScript (`tsconfig.json`)
- **Styling**: Tailwind CSS & Vanilla CSS (`globals.css`, `tailwind.config.js`)
