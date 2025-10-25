export default function ModernTemplate({ data, customization = {} }) {
  const { fontSize = 'medium', primaryColor = '#2563eb', sectionOrder = [] } = customization;
  
  const fontSizes = {
    small: { base: '0.75rem', heading: '1.25rem', subheading: '0.75rem' },
    medium: { base: '0.875rem', heading: '1.5rem', subheading: '0.875rem' },
    large: { base: '1rem', heading: '1.75rem', subheading: '1rem' }
  };
  
  const sizes = fontSizes[fontSize];
  
  // Convert hex to RGB for alpha blending
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 37, g: 99, b: 235 };
  };
  
  const rgb = hexToRgb(primaryColor);
  const bgColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
  
  const sections = {
    summary: (
      <div className="mt-3 p-3 rounded" style={{ backgroundColor: bgColor }} key="summary">
        <div style={{ fontSize: sizes.base, opacity: 0.95 }}>{data.summary}</div>
      </div>
    ),
    experience: (
      <div key="experience">
        <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Experience</div>
  <div className="mt-2 space-y-3" style={{ fontSize: sizes.base, opacity: 0.95 }}>
          {(data.experience||[]).map((e,i)=> (
            <div key={i}>
              <div className="font-semibold">{e.role}</div>
              <div className="text-xs" style={{ opacity: 0.9 }}>{e.company} • {e.from} — {e.to}</div>
              <div className="mt-1">{e.details}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    education: (
      <div key="education">
        <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Education</div>
  <div className="mt-2" style={{ fontSize: sizes.base, opacity: 0.95 }}>{(data.education||[]).map((ed,i)=> <div key={i}>{ed.degree} — {ed.school}</div>)}</div>
      </div>
    ),
    skills: (
      <div className="mt-4" key="skills">
        <div className="font-semibold" style={{ fontSize: sizes.subheading }}>Skills</div>
  <div className="mt-2" style={{ fontSize: sizes.base, opacity: 0.95 }}>{(data.skills||[]).join(', ')}</div>
      </div>
    )
  };
  
  const orderedSections = sectionOrder.length > 0 
    ? sectionOrder.map(id => sections[id]).filter(Boolean)
    : Object.values(sections);

  return (
    <div className="text-black dark:text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="font-bold" style={{ fontSize: sizes.heading }}>{data.contact?.name}</div>
          <div style={{ fontSize: sizes.base, opacity: 0.9 }}>{data.contact?.title}</div>
        </div>
        <div className="w-40 text-right" style={{ fontSize: sizes.base, opacity: 0.9 }}>
          <div>{data.contact?.email}</div>
          <div>{data.contact?.phone}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>{orderedSections.filter((_, i) => i % 2 === 0)}</div>
        <div>{orderedSections.filter((_, i) => i % 2 === 1)}</div>
      </div>
    </div>
  )
}
