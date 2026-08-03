# GEMINI.MD — AI Coding Assistant Rules & Repository Protocol

> [!IMPORTANT]
> **MANDATORY INSTRUCTION FOR ALL AI CODING ASSISTANTS & SUBAGENTS**
> Any AI coding assistant (including Antigravity, Gemini, ChatGPT, Claude, GitHub Copilot, or subagents) working on this repository **MUST ALWAYS UPDATE BOTH `GEMINI.MD` (for instructions/rules) AND `CODEBASE.MD` (for file tree & codebase details)** whenever changes are made to the codebase architecture, file tree, dependencies, or core component structures.

---

## 1. AI Coding Assistant Rules & Workflow
1. **Always Update Documentation**:
   - Keep instructions and rules in **[GEMINI.MD](file:///c:/Users/mehta/Downloads/Projects/New-folder/GEMINI.MD)**.
   - Keep the file tree, component list, and file descriptions up-to-date in **[CODEBASE.MD](file:///c:/Users/mehta/Downloads/Projects/New-folder/CODEBASE.MD)**.
   - Maintain master project documentation in **[README.MD](file:///c:/Users/mehta/Downloads/Projects/New-folder/README.MD)**.
2. **Preserve Modular Component Structure**: Maintain clear separation of store components under `src/components/`, admin UI components under `src/components/admin/`, static data under `src/data/`, and pages under `src/app/`.
3. **TypeScript & Linting**: Always use strict typing, no implicit `any`, and avoid unused imports or broken signatures.
4. **Styling Standards**: Use defined Tailwind color tokens (`snowcem-orange`, `snowcem-navy`, `snowcem-magenta`) and preserve existing design tokens and animations.
5. **Static Data Catalog**: Public storefront components (`ProductsMegaMenu`, `Footer`, `app/products/*`) use static TypeScript datasets (`categoriesData.ts`, `productsData.ts`) for 100% uptime and instant rendering without database latency.
6. **Admin Panel Security & Auth**:
   - Protect all admin server actions in `src/actions/` using `requireAdmin()`.
   - Protect all `/admin/*` routes with `middleware.ts` relying on `iron-session` configuration in `src/lib/auth.ts` and `src/lib/session.ts`.
7. **No Blind Edits**: Always inspect target files completely before making edits.

---

## 2. Quick References
- **Codebase Details & File Descriptions**: See **[CODEBASE.MD](file:///c:/Users/mehta/Downloads/Projects/New-folder/CODEBASE.MD)**
- **Master Documentation & Approach**: See **[README.MD](file:///c:/Users/mehta/Downloads/Projects/New-folder/README.MD)**
- **Framework**: Next.js 14 (App Router)
- **Database & ORM**: Drizzle ORM + MySQL (`drizzle.config.ts`, `src/db/schema.ts`)
- **Session Auth**: `iron-session`
- **Language**: TypeScript (`tsconfig.json`)
- **Styling**: Tailwind CSS & Vanilla CSS (`globals.css`, `tailwind.config.js`)
