import React from "react";
import { renderToString } from "react-dom/server";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";

const TEMPLATES = [
  { id: "classic", name: "Classic", Component: ClassicTemplate },
  { id: "modern", name: "Modern", Component: ModernTemplate },
];

export function exportAsWord(data, templateId = "classic") {
  if (!data) {
    alert("No resume data found!");
    return;
  }

  const Template = TEMPLATES[templateId] || ClassicTemplate;

  // ✅ Convert your React template into HTML string
  const resumeHTML = renderToString(<Template data={data} />);

  // ✅ Wrap with Word-compatible HTML
  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${data.contact?.name || "Resume"}</title>
      <style>
        body { font-family: Inter, Arial, sans-serif; padding: 40px; color: #222; }
        h1, h2, h3 { margin-bottom: 4px; }
        div { line-height: 1.5; }
      </style>
    </head>
    <body>
      ${resumeHTML}
    </body>
    </html>
  `;

  // ✅ Generate .doc Blob
  const blob = new Blob(["\ufeff", html], {
    type: "application/msword;charset=utf-8",
  });

  // ✅ Trigger download
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${(data.contact?.name || "resume").replace(/\s+/g, "_")}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
