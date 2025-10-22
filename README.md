# resume.ly
# Resume Builder

A web app to help people build professional resumes quickly. This repository contains a starter Next.js + Tailwind CSS project that provides a form-based editor, multiple resume templates, and PDF export.

## Goals (v1)
- Simple form UI for entering resume data (contact, summary, experience, education, skills)
- Multiple visual templates (downloadable as PDF)
- Export to PDF (client-side or server-side rendering)
- Sample resume and templates to get started

## Tech stack (default)
- Next.js (React)
- Tailwind CSS
- html-to-pdf (or Puppeteer for server-side rendering)
- Optionally: NextAuth / JWT for user accounts
- Deployed to Vercel (recommended for Next.js)

## Getting started (local)
1. Clone the repo
2. Install dependencies
   - npm install
3. Run dev server
   - npm run dev
4. Open http://localhost:3000

## Project structure (planned)
- /pages — Next.js pages (editor, templates, preview)
- /components — form components, template renderers
- /templates — HTML/CSS templates for resumes
- /public — static assets
- /lib — export utilities (PDF generation)
- /examples — sample resume JSON

## Contributing
Contributions welcome. Open issues for feature requests and bugs.

## License
MIT (change as needed)
