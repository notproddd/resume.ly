export default function CreativeTemplate({ data, customization = {} }) {
  const { fontSize = 'medium', primaryColor = '#6366f1', sectionOrder = [] } = customization;
  
  const fontSizes = {
    small: { base: '0.75rem', heading: '1.5rem', subheading: '0.875rem' },
    medium: { base: '0.875rem', heading: '1.875rem', subheading: '1rem' },
    large: { base: '1rem', heading: '2.25rem', subheading: '1.125rem' }
  };
  
  const sizes = fontSizes[fontSize];
  
  // quick util to get lighter bg colors
  const getLightBg = (color) => {
    return color + '15'; // works with 6-digit hex
  };
  
  const sections = {
    summary: (
      <div className="mb-6" key="summary">
        <div 
          className="font-bold mb-3 pb-2 flex items-center gap-2" 
          style={{ fontSize: sizes.subheading, borderBottom: `3px solid ${primaryColor}` }}
        >
            <span style={{ color: primaryColor }}>●</span>
            <span>About Me</span>
        </div>
        <div 
          className="p-4 rounded-lg" 
          style={{ 
            fontSize: sizes.base, 
            lineHeight: '1.7',
            backgroundColor: getLightBg(primaryColor),
            borderLeft: `4px solid ${primaryColor}`
          }}
        >
          {data.summary}
        </div>
      </div>
    ),
    experience: (
      <div className="mb-6" key="experience">
        <div 
          className="font-bold mb-3 pb-2 flex items-center gap-2" 
          style={{ fontSize: sizes.subheading, borderBottom: `3px solid ${primaryColor}` }}
        >
            <span style={{ color: primaryColor }}>●</span>
            <span>Experience</span>
        </div>
        <div className="space-y-4">
          {(data.experience || []).map((e, i) => (
            <div 
              key={i} 
              className="pl-4 relative"
              style={{ borderLeft: `2px solid ${primaryColor}40` }}
            >
              <div 
                className="absolute left-0 w-2 h-2 rounded-full -translate-x-1/2"
                style={{ backgroundColor: primaryColor, top: '0.5rem' }}
              />
              <div className="font-bold" style={{ fontSize: sizes.base, color: primaryColor }}>
                {e.role}
              </div>
              <div style={{ fontSize: sizes.base, fontWeight: 600, opacity: 0.9 }}>{e.company}</div>
              <div className="text-xs mb-1" style={{ opacity: 0.85 }}>{e.from} – {e.to}</div>
              <div style={{ fontSize: sizes.base, lineHeight: '1.6', opacity: 0.95 }}>{e.details}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    education: (
      <div className="mb-6" key="education">
        <div 
          className="font-bold mb-3 pb-2 flex items-center gap-2" 
          style={{ fontSize: sizes.subheading, borderBottom: `3px solid ${primaryColor}` }}
        >
            <span style={{ color: primaryColor }}>●</span>
            <span>Education</span>
        </div>
        <div className="space-y-3">
          {(data.education || []).map((ed, i) => (
            <div 
              key={i} 
              className="p-3 rounded-lg"
              style={{ 
                fontSize: sizes.base,
                backgroundColor: getLightBg(primaryColor),
                borderLeft: `3px solid ${primaryColor}`
              }}
            >
              <div className="font-bold" style={{ color: primaryColor }}>{ed.degree}</div>
              <div style={{ opacity: 0.95 }}>{ed.school}</div>
              <div style={{ opacity: 0.85, fontSize: '0.75rem' }}>{ed.year}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    skills: (
      <div className="mb-6" key="skills">
        <div 
          className="font-bold mb-3 pb-2 flex items-center gap-2" 
          style={{ fontSize: sizes.subheading, borderBottom: `3px solid ${primaryColor}` }}
        >
            <span style={{ color: primaryColor }}>●</span>
            <span>Skills</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {(data.skills || []).map((skill, i) => (
            <span 
              key={i}
              className="px-3 py-1 rounded-full font-medium"
              style={{ 
                fontSize: sizes.base,
                backgroundColor: primaryColor + '30',
                color: primaryColor
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )
  };
  
  const orderedSections = sectionOrder.length > 0 
    ? sectionOrder.map(id => sections[id]).filter(Boolean)
    : Object.values(sections);

  return (
    <div className="text-black dark:text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system' }}>
      <div 
        className="mb-6 p-6 rounded-lg"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}20 0%, ${getLightBg(primaryColor)} 100%)`
        }}
      >
        <div 
          className="font-bold mb-1" 
          style={{ fontSize: sizes.heading }}
        >
          {data.contact?.name}
        </div>
        <div 
          className="font-semibold mb-3" 
          style={{ fontSize: sizes.subheading, opacity: 0.9 }}
        >
          {data.contact?.title}
        </div>
        <div className="flex flex-wrap gap-4" style={{ fontSize: sizes.base, opacity: 0.9 }}>
          <div className="flex items-center gap-1">
            <span style={{ color: primaryColor }}>✉</span>
            {data.contact?.email}
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: primaryColor }}>☎</span>
            {data.contact?.phone}
          </div>
        </div>
      </div>

      <div>
        {orderedSections}
      </div>
    </div>
  );
}
