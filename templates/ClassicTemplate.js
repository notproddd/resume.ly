export default function ClassicTemplate({ data, customization = {} }) {
  const { fontSize = 'medium', primaryColor = '#1f2937', sectionOrder = [] } = customization;
  
  const fontSizes = {
    small: { base: '0.75rem', heading: '1.25rem', subheading: '0.75rem' },
    medium: { base: '0.875rem', heading: '1.5rem', subheading: '0.875rem' },
    large: { base: '1rem', heading: '1.75rem', subheading: '1rem' }
  };
  
  const sizes = fontSizes[fontSize];
  
  const sections = {
    summary: (
      <div className="mb-3" key="summary">
        <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Summary</div>
        <div style={{ fontSize: sizes.base, opacity: 0.95 }}>{data.summary}</div>
      </div>
    ),
    experience: (
      <div key="experience">
  <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Experience</div>
        <div className="mt-2 space-y-3">
          {(data.experience||[]).map((e, i) => (
            <div key={i}>
              <div className="font-semibold" style={{ fontSize: sizes.base }}>{e.role} — {e.company}</div>
              <div className="text-xs" style={{ opacity: 0.9 }}>{e.from} — {e.to}</div>
              <div style={{ fontSize: sizes.base, opacity: 0.95 }}>{e.details}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    education: (
      <div className="mt-4" key="education">
  <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Education</div>
  <div style={{ fontSize: sizes.base, opacity: 0.95 }}>{(data.education||[]).map((ed,i)=> <div key={i}>{ed.degree}, {ed.school} — {ed.year}</div>)}</div>
      </div>
    ),
    skills: (
      <div className="mt-4" key="skills">
  <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Skills</div>
  <div style={{ fontSize: sizes.base, opacity: 0.95 }}>{(data.skills||[]).join(', ')}</div>
      </div>
    )
  };
  
  const orderedSections = sectionOrder.length > 0 
    ? sectionOrder.map(id => sections[id]).filter(Boolean)
    : Object.values(sections);

  return (
    <div className="text-black dark:text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold" style={{ fontSize: sizes.heading }}>{data.contact?.name}</div>
          <div style={{ fontSize: sizes.base, opacity: 0.9 }}>{data.contact?.title}</div>
        </div>
  <div className="text-right" style={{ fontSize: sizes.base, opacity: 0.9 }}>
          <div>{data.contact?.email}</div>
          <div>{data.contact?.phone}</div>
        </div>
      </div>
      <hr className="my-3 border-gray-200" />
      {orderedSections}
    </div>
  )
}
