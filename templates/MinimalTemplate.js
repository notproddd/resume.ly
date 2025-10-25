export default function MinimalTemplate({ data, customization = {} }) {
  const { fontSize = 'medium', primaryColor = '#000000', sectionOrder = [] } = customization;
  
  const fontSizes = {
    small: { base: '0.75rem', heading: '1.25rem', subheading: '0.875rem' },
    medium: { base: '0.875rem', heading: '1.5rem', subheading: '1rem' },
    large: { base: '1rem', heading: '1.75rem', subheading: '1.125rem' }
  };
  
  const sizes = fontSizes[fontSize];
  
  const sections = {
    summary: (
      <div className="mb-4" key="summary">
        <div 
          className="uppercase tracking-wider font-bold mb-1" 
          style={{ fontSize: sizes.subheading, letterSpacing: '0.1em' }}
        >
          Profile
        </div>
        <div style={{ fontSize: sizes.base, lineHeight: '1.6', opacity: 0.95 }}>
          {data.summary}
        </div>
      </div>
    ),
    experience: (
      <div className="mb-4" key="experience">
        <div 
          className="uppercase tracking-wider font-bold mb-2" 
          style={{ fontSize: sizes.subheading, letterSpacing: '0.1em' }}
        >
          Experience
        </div>
        <div className="space-y-3">
          {(data.experience || []).map((e, i) => (
            <div key={i}>
              <div className="font-semibold" style={{ fontSize: sizes.base, color: primaryColor }}>
                {e.role}
              </div>
              <div style={{ fontSize: sizes.base, opacity: 0.9 }}>
                {e.company} | {e.from} – {e.to}
              </div>
              <div style={{ fontSize: sizes.base, lineHeight: '1.5', opacity: 0.95 }}>
                {e.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    education: (
      <div className="mb-4" key="education">
        <div 
          className="uppercase tracking-wider font-bold mb-2" 
          style={{ fontSize: sizes.subheading, letterSpacing: '0.1em' }}
        >
          Education
        </div>
        <div className="space-y-2">
          {(data.education || []).map((ed, i) => (
            <div key={i} style={{ fontSize: sizes.base }}>
              <div className="font-semibold" style={{ color: primaryColor }}>{ed.degree}</div>
              <div style={{ opacity: 0.9 }}>{ed.school} | {ed.year}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    skills: (
      <div className="mb-4" key="skills">
        <div 
          className="uppercase tracking-wider font-bold mb-2" 
          style={{ fontSize: sizes.subheading, letterSpacing: '0.1em' }}
        >
          Skills
        </div>
        <div style={{ fontSize: sizes.base, lineHeight: '1.6', opacity: 0.95 }}>
          {(data.skills || []).join(' • ')}
        </div>
      </div>
    )
  };
  
  const orderedSections = sectionOrder.length > 0 
    ? sectionOrder.map(id => sections[id]).filter(Boolean)
    : Object.values(sections);

  return (
    <div className="text-black dark:text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
      <div className="text-center mb-6 pb-4" style={{ borderBottom: `2px solid ${primaryColor}` }}>
        <div className="font-bold" style={{ fontSize: sizes.heading }}>
          {data.contact?.name}
        </div>
        <div style={{ fontSize: sizes.subheading, opacity: 0.9 }}>
          {data.contact?.title}
        </div>
        <div className="flex justify-center gap-4 mt-2" style={{ fontSize: sizes.base, opacity: 0.9 }}>
          <span>{data.contact?.email}</span>
          <span>•</span>
          <span>{data.contact?.phone}</span>
        </div>
      </div>

      <div>
        {orderedSections}
      </div>
    </div>
  );
}
