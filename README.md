# Yuri Winchester Portfolio

A modern portfolio website built with React, Tailwind CSS, and TypeScript.

## Setup

1.  **Install Dependencies**: `npm install`
2.  **Run Locally**: `npm start`

## Database (Supabase)

The project includes a `supabase_schema.sql` file containing the SQL commands to create the necessary tables (`projects`, `skills`, `messages`) and insert sample data.

1.  Go to your Supabase project dashboard.
2.  Open the SQL Editor.
3.  Copy the content of `supabase_schema.sql` and run it.

## Deployment (Vercel)

1.  Push this code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel will automatically detect the Create React App framework and deploy it.
4.  The `vercel.json` file handles SPA routing (rewrites to `index.html`).
