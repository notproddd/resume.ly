# resume.ly

Simple Next.js + Tailwind starter for a resume builder app.

Getting started

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

Open http://localhost:3000

What's included

- Basic editor UI at `/pages/index.js`
- Preview component in `/components/TemplatePreview.js`
- Client-side PDF export using `html2canvas` + `jspdf` in `/components/ExportPDFButton.js`
- Tailwind CSS configuration and global styles

Try it

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Open http://localhost:3000 and try editing the sample resume. Click "Download PDF" to export.

Deployment

This project is ready to be deployed on Vercel. Push to a GitHub repo and import the project in Vercel — it will detect Next.js and build automatically.

Next steps

- Add structured form fields for lists (experience/education) with add/remove
- Add multiple templates in `/templates` and template selector
- Server-side PDF rendering with Puppeteer for higher fidelity
- Authentication (NextAuth) and user resume saving

## License

MIT (change as needed)
