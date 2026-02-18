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

Getting Started
---------------

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


Note 
- This is a half baked project with ongoing feature development and improvements.