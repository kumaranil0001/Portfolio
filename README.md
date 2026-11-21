# Anil404 — AI & Software Engineering Portfolio & Studio Control Center

A high-octane, dark minimalist editorial portfolio and full CMS Control Center built for **Anil Kumar Rout (Anil404)** — AI Researcher & Software Engineer specializing in Deep Generative Models, Distributed Systems & Computational Neuroscience.

Generated from Stitch Project **`14793156635913874723`** (*Obsidian Kinetic* Design System).

---

## ⚡ Tech Stack & Architecture

- **Runtime & Package Manager**: [Bun](https://bun.sh) (v1.3.14)
- **Framework**: [Next.js 15+ App Router](https://nextjs.org) with TypeScript & React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com) (Obsidian Kinetic Design Tokens, Glass Refraction & Hardware Curves)
- **Database & Storage**: [Supabase](https://supabase.com) (PostgreSQL 16, pgvector HNSW similarity indexing, S3-compatible asset bucket `portfolio-assets`)
- **Hosting Target**: [Vercel](https://vercel.com) (Configured with `vercel.json`)

---

## 🚀 Key Features

### 1. High-Fidelity Public Experience (`/`)
- **Void Canvas Aesthetics**: Ultra-deep blacks (`#0C0C0C`), metallic chrome gradients, and neon jewel emissive wells (Cyber Magenta `#B600A8`, Deep Ultraviolet `#7621B0`, Molten Amber `#BE4C00`).
- **3D Magnetic Developer Portrait**: Real-time cursor-following magnetic physics with ambient aura.
- **Intentional Headless Fallback**: If the avatar photo is removed in the Admin Center, the system seamlessly transitions to an intentional generative obsidian cyber node with pulsing geometry.
- **Academic Foundation & B.Tech Honors**: Showcases coursework, research initiatives, and BCI telemetry.
- **Technical Capabilities (Stark White Breakout)**: High-contrast white card showcasing 5 core engineering domains with inverted pitch-black typography.
- **Featured Case Studies**: NeuroPulse Engine, AetherDB Vector Router, and OmniMesh Autonomous Agents with asymmetric grids and live telemetry.
- **Interactive Transmission Console**: Inquiry form recording directly to Supabase with real-time feedback.

---

### 2. Animated Running Marquee & Dedicated Tech Pages (`/stack/[slug]`)
- **Continuous Infinite Glide**: Dual-row running marquee (Row 1 Left-to-Right, Row 2 Right-to-Left) with hover pause.
- **Fully Interactive Badges**: Every single framework (PyTorch, Next.js 15, CUDA, Supabase, Rust, Docker, Redis, etc.) is clickable!
- **Dedicated Tech Pages (`/stack/[slug]`)**:
  - Architectural rationale ("Why I Choose & Deploy It").
  - Subsystem topology & engineering tradeoffs.
  - Execution primitives & deployed API routines.
  - **Work & Projects Powered By This Stack**: Live case studies and codebases built with that specific tool!

---

### 3. Studio Control Center (`/admin`)
Accessible at `/admin` (Login at `/admin/login`).

- **Authentication**:
  - Supabase Auth integration.
  - Instant Master Passkey: `admin123456` (Configurable via `ADMIN_SECRET_KEY` in `.env.local`).
- **Hero & Identity Configuration**:
  - Live edit: Full legal name, moniker, tagline, credentials, and bio narrative.
  - **Single-Click Photo Upload & Removal**: Upload to Supabase Storage or delete photo with instant graceful mesh fallback.
  - **Live Preview Refraction Card**: Real-time mirror of the public hero stage.
- **Socials & Channels Manager**:
  - Live toggles and URL management for GitHub, Twitter/X, LinkedIn, Instagram, Email, and custom links.
- **Running Marquee Stack Matrix**:
  - Add new frameworks, change marquee row (Row 1 ➔ Row 2), edit deep architectural notes, and preview dedicated `/stack/[slug]` pages.
- **Projects & Research (CRUD)**:
  - Add, edit, unpublish, and delete case studies.
  - Manage tags, metrics, and URLs.
  - **"Does Not Care If It Remove" Photo Control**: Single-click removal of screenshots. If all images are removed, the project dynamically displays a sleek headless telemetry and architecture blueprint canvas!
- **Capabilities & Academics**:
  - Manage 5 engineering domains, degree title, university honors, core focus points, and research initiatives.
- **Supabase Cloud Sync & JSON Backup**:
  - 1-Click "Push All Seed Data to Supabase".
  - Copy ready-to-run PostgreSQL schema (`schema.sql`).
  - Export complete site state to portable JSON or restore from JSON backup.

---

## 🛠️ Quick Start & Local Development

### 1. Install Dependencies with Bun
```bash
bun install
```

### 2. Run the Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public portfolio, or [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

### 3. Build for Production
```bash
bun run build
bun run start
```

---

## 🗄️ Supabase Configuration (Optional & Seamless)

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and paste the contents of `src/lib/supabase/schema.sql`.
3. Copy your project credentials into `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_SECRET_KEY=admin123456
```
4. In `/admin#tab-supabase`, click **"Push All Seed Data to Supabase"** to populate all tables and seed records with one click!

*Note: The application has built-in offline/local persistence (localStorage + cookie session) and runs 100% interactively even before Supabase is connected!*

---

## ☁️ Deploying to Vercel

1. Push this repository to GitHub:
```bash
git remote add origin https://github.com/your-username/portfolio.git
git branch -M main
git push -u origin main
```
2. Import the repository in [vercel.com](https://vercel.com).
3. Vercel will automatically detect Next.js.
4. Set the build command to `bun run build` and install command to `bun install` (pre-configured in `vercel.json`).
5. Add the Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_SECRET_KEY`
6. Click **Deploy**!
