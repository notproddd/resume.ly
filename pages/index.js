import { useEffect, useRef, useState } from "react";
import useResumeHistory from "../hooks/useResumeHistory";
import { downloadJson, validateResumeJson } from "../lib/jsonImportExport";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";
import CustomizationPanel from "../components/CustomizationPanel";
import TemplateSelector from "../components/TemplateSelector";
import { exportElementToPdf } from "../lib/exportPdf";

const TEMPLATES = [
  { id: "classic", name: "Classic", Component: ClassicTemplate },
  { id: "modern", name: "Modern", Component: ModernTemplate },
  { id: "minimal", name: "Minimal", Component: MinimalTemplate },
  { id: "creative", name: "Creative", Component: CreativeTemplate },
];

const sample = {
  contact: {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 555 1234",
    title: "Product Designer",
  },
  summary:
    "Product designer with 6 years of experience building delightful interfaces that scale.",
  experience: [
    {
      role: "Senior Designer",
      company: "Acme Co",
      from: "2021",
      to: "Present",
      details: "Led cross-functional teams to ship the core product.",
    },
    {
      role: "Designer",
      company: "Beta LLC",
      from: "2018",
      to: "2021",
      details: "Created user flows and prototypes.",
    },
  ],
  education: [
    { school: "State University", degree: "B.Sc. Design", year: "2017" },
  ],
  skills: ["Figma", "User Research", "Prototyping"],
};

export default function Editor() {
  const [data, setData, { undo, redo, canUndo, canRedo, replace }] = useResumeHistory(sample, 20);
  const fileInputRef = useRef(null);
  const [templateId, setTemplateId] = useState("classic");
  const [customization, setCustomization] = useState({
    fontSize: 'medium',
    primaryColor: '#1f2937',
    sectionOrder: []
  });
  const [dark, setDark] = useState(false);
  const [errors, setErrors] = useState({ contact: {} });
  const previewRef = useRef(null);
  const sections = [
    { id: "contact", label: "Contact" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
  ];
  const [activeSection, setActiveSection] = useState("contact");

  // Intentionally run only on mount — the setData reference comes from our history hook.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem("resume:data", JSON.stringify(data))
      } catch (e) {}
    }, 300)
    return () => clearTimeout(id)
  }, [data]);

  // Keyboard shortcuts for undo/redo (Cmd/Ctrl+Z, Shift+Cmd/Ctrl+Z)
  useEffect(() => {
    function onKey(e) {
      const key = (e.key || '').toLowerCase();
      const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (!cmdOrCtrl) return;

      if (!e.shiftKey && key === 'z') {
        e.preventDefault();
        if (canUndo) undo();
      }

      if (e.shiftKey && key === 'z') {
        e.preventDefault();
        if (canRedo) redo();
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo, canUndo, canRedo]);

  // Intentionally run only on mount — setData (from hook) intentionally omitted from deps.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resume:data");
      if (saved) setData(JSON.parse(saved));
    } catch (e) {}

    try {
      const savedTemplate = localStorage.getItem("resume:templateId");
      if (savedTemplate) setTemplateId(savedTemplate);
    } catch (e) {}

    try {
      const savedCustomization = localStorage.getItem("resume:customization");
      if (savedCustomization) setCustomization(JSON.parse(savedCustomization));
    } catch (e) {}

    try {
      const savedDark = localStorage.getItem("resume:dark");
      if (savedDark !== null) setDark(savedDark === "true");
      else if (window.matchMedia) setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (e) {}
  }, [setData])

  useEffect(() => {
    try {
      localStorage.setItem("resume:dark", dark ? "true" : "false");
    } catch (e) {}

    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle("dark", !!dark);
    }
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem("resume:templateId", templateId);
    } catch (e) {}
  }, [templateId]);

  useEffect(() => {
    try {
      localStorage.setItem("resume:customization", JSON.stringify(customization));
    } catch (e) {}
  }, [customization]);

  const Template = TEMPLATES.find((t) => t.id === templateId).Component;

  function validateEmail(value) {
    if (!value) return "Email is required";
    const re = /^\S+@\S+\.\S+$/;
    return re.test(value) ? "" : "Enter a valid email address";
  }

  function validateName(value) {
    return value && value.trim().length > 1 ? "" : "Name is required";
  }

  function handleContactChange(field, value) {
    setData((d) => ({ ...d, contact: { ...d.contact, [field]: value } }));
    setErrors((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: field === "email" ? validateEmail(value) : field === "name" ? validateName(value) : "",
      },
    }));
  }

  function computeProgress() {
    let total = 5;
    let done = 0;
    if (data.contact?.name && !validateName(data.contact?.name)) done++;
    if (data.contact?.email && !validateEmail(data.contact?.email)) done++;
    if (data.summary && data.summary.trim().length > 10) done++;
    if ((data.experience || []).length > 0) done++;
    if (((data.skills || []).length || 0) > 0) done++;
    return Math.round((done / total) * 100);
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }

  function addExperience() {
    setData((d) => ({
      ...d,
      experience: [
        ...(d.experience || []),
        { role: "", company: "", from: "", to: "", details: "" },
      ],
    }));
  }

  function removeExperience(idx) {
    setData((d) => ({
      ...d,
      experience: d.experience.filter((_, i) => i !== idx),
    }));
  }

  function addEducation() {
    setData((d) => ({
      ...d,
      education: [...(d.education || []), { school: "", degree: "", year: "" }],
    }));
  }

  function removeEducation(idx) {
    setData((d) => ({
      ...d,
      education: d.education.filter((_, i) => i !== idx),
    }));
  }

  function handleEducationChange(e, i, field) {
    setData((d) => {
      const ed = [...(d.education || [])];
      ed[i] = { ...ed[i], [field]: e.target.value };
      return { ...d, education: ed };
    });
  }

  function handleSkillsChange(e) {
    const skillsArray = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setData((d) => ({ ...d, skills: skillsArray }));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">resume.ly</h1>
            <nav className="hidden sm:flex items-center gap-2" aria-label="Sections">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`text-sm px-2 py-1 rounded ${activeSection === s.id ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-slate-300'}`}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { if (canUndo) undo(); }}
              disabled={!canUndo}
              className="px-3 py-2 border rounded bg-white dark:bg-slate-800 disabled:opacity-50"
              title="Undo (Cmd/Ctrl+Z)"
            >
              Undo
            </button>

            <button
              onClick={() => { if (canRedo) redo(); }}
              disabled={!canRedo}
              className="px-3 py-2 border rounded bg-white dark:bg-slate-800 disabled:opacity-50"
              title="Redo (Shift+Cmd/Ctrl+Z)"
            >
              Redo
            </button>

            <button
              onClick={async () => {
                try {
                  await exportElementToPdf(
                    previewRef.current,
                    `${(data.contact?.name || "resume").replace(/\s+/g, "_")}.pdf`
                  );
                } catch (error) {
                  alert('Failed to export PDF: ' + (error.message || error));
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>

            <button
              onClick={() => downloadJson(data, `${(data.contact?.name || 'resume').replace(/\s+/g,'_')}.json`)}
              className="bg-green-600 text-white px-3 py-2 rounded"
              title="Export resume as JSON"
            >
              Export JSON
            </button>

            <input
              type="file"
              accept="application/json"
              ref={fileInputRef}
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                  try {
                    const parsed = JSON.parse(ev.target.result);
                    const { valid, error } = validateResumeJson(parsed);
                    if (!valid) {
                      alert('Invalid resume JSON: ' + error);
                      return;
                    }
                    // replace state without adding to history
                    replace(parsed);
                    setErrors({ contact: {} });
                    alert('Resume imported successfully');
                  } catch (err) {
                    alert('Failed to parse JSON: ' + (err.message || err));
                  }
                };
                reader.readAsText(f);
                // reset so the same file can be selected again if needed
                e.target.value = '';
              }}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="px-3 py-2 border rounded bg-white dark:bg-slate-800"
              title="Import resume from JSON"
            >
              Import JSON
            </button>

            <button
              onClick={() => {
                try {
                  localStorage.removeItem("resume:data");
                  localStorage.removeItem("resume:templateId");
                  localStorage.removeItem("resume:customization");
                } catch (e) {}
                // replace without adding to history
                replace(sample);
                setCustomization({ fontSize: 'medium', primaryColor: '#1f2937', sectionOrder: [] });
                setTemplateId('classic');
              }}
              className="px-3 py-2 border rounded bg-white dark:bg-slate-800"
            >
              Reset
            </button>

            <button
              onClick={() => setDark((d) => !d)}
              aria-pressed={!!dark}
              className="px-3 py-2 border rounded bg-white dark:bg-slate-800"
              title="Toggle dark mode"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1 space-y-4">
            {/* Template Selector */}
            <TemplateSelector 
              templates={TEMPLATES}
              selectedId={templateId}
              onSelect={setTemplateId}
              customization={customization}
            />

            {/* Customization Panel */}
            <CustomizationPanel 
              customization={customization}
              onChange={setCustomization}
            />

            <div className="w-full bg-white dark:bg-slate-800 rounded overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Progress</h3>
                  <p className="text-xs text-gray-500 dark:text-slate-300">{computeProgress()}% complete</p>
                </div>
                <div>
                  <button onClick={() => { replace(sample); setErrors({contact:{}}); }} className="text-xs text-gray-500">Load sample</button>
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700">
                <div
                  className="h-2 bg-blue-600"
                  style={{ width: `${computeProgress()}%` }}
                  aria-hidden
                />
              </div>
            </div>

            <section id="contact" className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Contact</h2>
              <label className="block text-sm">
                Name
                <input
                  aria-required
                  aria-invalid={!!errors.contact?.name}
                  className={`mt-1 dark:bg-slate-800 border block w-full rounded p-2 ${errors.contact?.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                  value={data.contact?.name || ""}
                  onChange={(e) => handleContactChange('name', e.target.value)}
                />
                {errors.contact?.name && <p className="text-red-600 text-sm mt-1">{errors.contact.name}</p>}
              </label>
              <label className="block text-sm mt-2">
                Title
                <input
                  className="mt-1 block w-full border rounded p-2 bg-white dark:bg-slate-700"
                  value={data.contact?.title || ""}
                  onChange={(e) => handleContactChange('title', e.target.value)}
                />
              </label>
              <label className="block text-sm mt-2">
                Email
                <input
                  aria-required
                  aria-invalid={!!errors.contact?.email}
                  className={`mt-1 dark:bg-slate-800 border block w-full rounded p-2 ${errors.contact?.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                  value={data.contact?.email || ""}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  onBlur={(e) => setErrors((p) => ({ ...p, contact: { ...p.contact, email: validateEmail(e.target.value) } }))}
                />
                {errors.contact?.email && <p className="text-red-600 text-sm mt-1">{errors.contact.email}</p>}
              </label>
              <label className="block text-sm mt-2">
                Phone
                <input
                  className="mt-1 block w-full border rounded p-2 bg-white dark:bg-slate-700"
                  value={data.contact?.phone || ""}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                />
              </label>
            </section>

            <section id="summary" className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Summary</h2>
              <textarea
                className="w-full border rounded p-2 bg-white dark:bg-slate-700"
                rows="5"
                value={data.summary || ""}
                onChange={(e) => setData((d) => ({ ...d, summary: e.target.value }))}
              />
            </section>

            <section id="experience" className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Experience</h2>
              {(data.experience || []).map((exp, i) => (
                <div key={i} className="border rounded p-2 mb-2 bg-white dark:bg-slate-700">
                  <input
                    placeholder="Role"
                    className="w-full border p-1 rounded dark:bg-slate-800"
                    value={exp.role}
                    onChange={(e) =>
                      setData((d) => {
                        const ex = [...d.experience];
                        ex[i] = { ...ex[i], role: e.target.value };
                        return { ...d, experience: ex };
                      })
                    }
                  />
                  <input
                    placeholder="Company"
                    className="w-full border p-1 rounded mt-1 dark:bg-slate-800"
                    value={exp.company}
                    onChange={(e) =>
                      setData((d) => {
                        const ex = [...d.experience];
                        ex[i] = { ...ex[i], company: e.target.value };
                        return { ...d, experience: ex };
                      })
                    }
                  />
                  <textarea
                    placeholder="Details"
                    className="w-full border p-1 rounded mt-1 dark:bg-slate-800"
                    value={exp.details}
                    onChange={(e) =>
                      setData((d) => {
                        const ex = [...d.experience];
                        ex[i] = { ...ex[i], details: e.target.value };
                        return { ...d, experience: ex };
                      })
                    }
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => removeExperience(i)}
                      className="text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="mt-2 w-full border rounded px-3 py-2 bg-white dark:bg-slate-700"
              >
                Add Experience
              </button>
            </section>

            <section id="education" className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Education</h2>
              {(data.education || []).map((edu, i) => (
                <div key={i} className="border rounded p-2 mb-2 bg-white dark:bg-slate-700">
                  <input
                    placeholder="School"
                    className="w-full border p-1 rounded dark:bg-slate-800"
                    value={edu.school || ""}
                    onChange={(e) => handleEducationChange(e, i, "school")}
                  />
                  <input
                    placeholder="Degree"
                    className="w-full border p-1 rounded mt-1 dark:bg-slate-800"
                    value={edu.degree || ""}
                    onChange={(e) => handleEducationChange(e, i, "degree")}
                  />
                  <input
                    placeholder="Year"
                    className="w-full border p-1 rounded mt-1 dark:bg-slate-800"
                    value={edu.year || ""}
                    onChange={(e) => handleEducationChange(e, i, "year")}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => removeEducation(i)}
                      className="text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="mt-2 w-full border rounded px-3 py-2 bg-white dark:bg-slate-700"
              >
                Add Education
              </button>
            </section>

            <section id="skills" className="bg-white dark:bg-slate-800 p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Skills</h2>
              <textarea
                placeholder="Figma, User Research, Prototyping"
                className="w-full border rounded p-2 bg-white dark:bg-slate-700"
                rows="3"
                value={(data.skills || []).join(", ")}
                onChange={handleSkillsChange}
              />
              <p className="text-xs text-gray-500 dark:text-slate-300 mt-1">
                Enter skills separated by a comma.
              </p>
            </section>
          </aside>

          <main className="md:col-span-2">
            <div
              className="bg-white dark:bg-slate-800 p-6 rounded shadow preview-padding-sm"
              ref={previewRef}
              role="region"
              aria-label="Resume preview"
            >
              <Template data={data} customization={customization} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
