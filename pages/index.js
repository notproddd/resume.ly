import { useEffect, useRef, useState } from "react";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import { exportElementToPdf } from "../lib/exportPdf";

const TEMPLATES = [
  { id: "classic", name: "Classic", Component: ClassicTemplate },
  { id: "modern", name: "Modern", Component: ModernTemplate },
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
  const [data, setData] = useState(sample);
  const [templateId, setTemplateId] = useState("classic");
  const previewRef = useRef(null);
  // this fixes
  useEffect(() => {
    try {
      const saved = localStorage.getItem("resume:data");
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to loead resume data:", e);
    }
  }, []);
  useEffect(() => {
    const id = setTimeout(
      () => localStorage.setItem("resume:data", JSON.stringify(data)),
      300
    );
    return () => clearTimeout(id);
  }, [data]);

  const Template = TEMPLATES.find((t) => t.id === templateId).Component;

  // --- Experience Handlers ---
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

  // --- Education Handlers ---
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

  // --- Skills Handler ---
  function handleSkillsChange(e) {
    const skillsArray = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setData((d) => ({ ...d, skills: skillsArray }));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">resume.ly</h1>
          <div className="flex items-center gap-3">
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                exportElementToPdf(
                  previewRef.current,
                  `${(data.contact?.name || "resume").replace(/\s+/g, "_")}.pdf`
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("resume:data");
                setData(sample);
              }}
              className="px-3 py-2 border rounded"
            >
              Reset
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <aside className="md:col-span-1 space-y-4">
            <section className="bg-white p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Contact</h2>
              <label className="block text-sm">
                Name
                <input
                  className="mt-1 block w-full border rounded p-2"
                  value={data.contact?.name || ""}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      contact: { ...d.contact, name: e.target.value },
                    }))
                  }
                />
              </label>
              <label className="block text-sm mt-2">
                Title
                <input
                  className="mt-1 block w-full border rounded p-2"
                  value={data.contact?.title || ""}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      contact: { ...d.contact, title: e.target.value },
                    }))
                  }
                />
              </label>
              <label className="block text-sm mt-2">
                Email
                <input
                  className="mt-1 block w-full border rounded p-2"
                  value={data.contact?.email || ""}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      contact: { ...d.contact, email: e.target.value },
                    }))
                  }
                />
              </label>
              <label className="block text-sm mt-2">
                Phone
                <input
                  className="mt-1 block w-full border rounded p-2"
                  value={data.contact?.phone || ""}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      contact: { ...d.contact, phone: e.target.value },
                    }))
                  }
                />
              </label>
            </section>

            <section className="bg-white p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Summary</h2>
              <textarea
                className="w-full border rounded p-2"
                rows="5"
                value={data.summary || ""}
                onChange={(e) =>
                  setData((d) => ({ ...d, summary: e.target.value }))
                }
              />
            </section>

            <section className="bg-white p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Experience</h2>
              {(data.experience || []).map((exp, i) => (
                <div key={i} className="border rounded p-2 mb-2">
                  <input
                    placeholder="Role"
                    className="w-full border p-1 rounded"
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
                    className="w-full border p-1 rounded mt-1"
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
                    className="w-full border p-1 rounded mt-1"
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
                className="mt-2 w-full border rounded px-3 py-2"
              >
                Add Experience
              </button>
            </section>

            {/* --- NEW: Education Section --- */}
            <section className="bg-white p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Education</h2>
              {(data.education || []).map((edu, i) => (
                <div key={i} className="border rounded p-2 mb-2">
                  <input
                    placeholder="School"
                    className="w-full border p-1 rounded"
                    value={edu.school || ""}
                    onChange={(e) => handleEducationChange(e, i, "school")}
                  />
                  <input
                    placeholder="Degree"
                    className="w-full border p-1 rounded mt-1"
                    value={edu.degree || ""}
                    onChange={(e) => handleEducationChange(e, i, "degree")}
                  />
                  <input
                    placeholder="Year"
                    className="w-full border p-1 rounded mt-1"
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
                className="mt-2 w-full border rounded px-3 py-2"
              >
                Add Education
              </button>
            </section>

            {/* --- NEW: Skills Section --- */}
            <section className="bg-white p-4 rounded shadow-sm">
              <h2 className="font-semibold mb-2">Skills</h2>
              <textarea
                placeholder="Figma, User Research, Prototyping"
                className="w-full border rounded p-2"
                rows="3"
                value={(data.skills || []).join(", ")}
                onChange={handleSkillsChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter skills separated by a comma.
              </p>
            </section>
          </aside>

          <main className="md:col-span-2">
            <div
              className="bg-white p-6 rounded shadow"
              ref={previewRef}
              role="region"
              aria-label="Resume preview"
            >
              <Template data={data} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
