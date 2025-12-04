# Yuri Winchester Portfolio

A modern portfolio website built with React, Tailwind CSS, TypeScript, and Vite.

## Setup

1.  **Install Dependencies**: `npm install`
2.  **Run Locally**: `npm run dev`
3.  **Build**: `npm run build`

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example` if available) and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database (Supabase)

The project includes a `supabase_schema.sql` file containing the SQL commands to create the necessary tables (`projects`, `skills`, `messages`) and insert sample data.

1.  Go to your Supabase project dashboard.
2.  Open the SQL Editor.
3.  Copy the content of `supabase_schema.sql` and run it.

## Deployment (Vercel)

1.  Push this code to a GitHub repository.
2.  Import the repository into Vercel.
3.  **Framework Preset**: Select **Vite**.
4.  **Environment Variables**: Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the Vercel Project Settings.
5.  Deploy!
