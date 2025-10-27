# resume.ly

Resume builder made with Next.js and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features

- Live preview as you edit
- Multiple resume templates (Classic, Modern, Minimal, Creative)
- Dark mode support
- PDF export (client-side using html-to-image + jspdf)
- Customization options (colors, fonts, section ordering)
- Auto-saves to localStorage

## Structure

- `/pages/index.js` - Main editor page
- `/templates/` - Resume template components
- `/components/` - UI components
- `/lib/exportPdf.js` - PDF generation logic

## Deploy

Works on Vercel out of the box. Just connect your repo.

## TODO

- Add more templates
- Better mobile layout
- Maybe add auth + backend storage?
- Export to JSON/import feature

## License

MIT
