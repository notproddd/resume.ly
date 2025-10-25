import { useState } from 'react';

const sampleData = {
  contact: { name: 'John Doe', email: 'john@email.com', phone: '555-0100', title: 'Software Engineer' },
  summary: 'Experienced developer with passion for creating elegant solutions.',
  experience: [{ role: 'Developer', company: 'Tech Co', from: '2020', to: 'Present', details: 'Built amazing products' }],
  education: [{ school: 'University', degree: 'B.S. Computer Science', year: '2019' }],
  skills: ['React', 'Node.js', 'TypeScript']
};

export default function TemplateSelector({ templates, selectedId, onSelect, customization }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 rounded shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between font-semibold hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        <span>📄 Templates</span>
        <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
      </button>

      {isExpanded && (
        <div className="p-4 border-t">
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => {
              const Template = template.Component;
              const isSelected = selectedId === template.id;

              return (
                <button
                  key={template.id}
                  onClick={() => onSelect(template.id)}
                  className={`relative group overflow-hidden rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900'
                      : 'border-gray-200 dark:border-slate-600 hover:border-gray-400'
                  }`}
                >
                  {/* Preview Thumbnail */}
                  <div 
                    className="bg-white p-3 overflow-hidden"
                    style={{ 
                      height: '180px',
                      transform: 'scale(0.35)',
                      transformOrigin: 'top left',
                      width: '285%',
                      pointerEvents: 'none'
                    }}
                  >
                    <Template data={sampleData} customization={customization} />
                  </div>

                  {/* Overlay with template name */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                      isSelected ? 'bg-blue-600 bg-opacity-20' : 'bg-black bg-opacity-0 group-hover:bg-opacity-30'
                    }`}
                  >
                    <div className={`px-3 py-1 rounded-full font-medium text-sm ${
                      isSelected 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity'
                    }`}>
                      {template.name}
                    </div>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 text-xs text-gray-500 dark:text-slate-400">
            Click a template to preview it with your content
          </div>
        </div>
      )}
    </div>
  );
}
