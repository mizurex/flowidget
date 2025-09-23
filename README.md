Flowidget
=========

Flowidget is a Next.js application that lets you create and embed an AI-powered support widget for your website. Provide your business details (services, pricing, hours, locations, contacts, policies, links) and the widget delivers instant, accurate answers to visitors 24/7.

Features
--------
- AI website widget trained on your business details
- Guided wizard to create a widget and generate embed code
- Dashboard with widget status and basic usage stats
- Authentication via Supabase (SSR-ready)
- Clean, responsive UI with a focus on performance and clarity

Tech Stack / Languages
----------------------
- TypeScript
- Next.js
- React
- Tailwind CSS
- Motion
- Supabase 
- Node.js 

Getting Started
---------------

Prerequisites
- Node.js 18+
- npm, pnpm, yarn, or bun
- Supabase project with anon key and URL

Install dependencies
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Environment variables
Create a `.env.local` file in the repository root with the following values:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open http://localhost:3000 in your browser.

Build for production
```bash
npm run build && npm run start
```

Project Structure
-----------------
```
src/
  app/
    (auth)/signin/page.tsx          # Sign-in
    (auth)/callback/route.ts        # Auth callback
    (user)/dashboard/page.tsx       # User dashboard
    (user)/wizard/                  # Widget creation flow
    layout.tsx                      # Root layout
    page.tsx                        # Landing page
  components/
    sections/                       # Header, Hero, Footer, etc.
    widget/                         # Widget popups and sign-in
    model/                          # Create widget modal
    HeaderLoggedIn.tsx              # Authenticated header
    DashBoard-ui.tsx                # Dashboard UI
  lib/
    supabase-browser.ts             # Supabase browser client
    supabase-server.ts              # Supabase server client (SSR)
    schema/                         # Zod schemas
```
Deployment
----------
You can deploy on Vercel or any platform that supports Next.js App Router.
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set in the deployment environment
- Run `npm run build` during the build step

Note 
- This is a half baked project with ongoing feature development and improvements.