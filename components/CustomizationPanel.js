import { useState } from 'react';

export default function CustomizationPanel({ customization, onChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const colorPresets = [
    { name: 'Classic Gray', value: '#1f2937' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Green', value: '#059669' },
    { name: 'Teal', value: '#0d9488' },
  ];

  const allSections = [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
  ];

  const moveSection = (fromIndex, direction) => {
    const currentOrder = customization.sectionOrder.length > 0 
      ? customization.sectionOrder 
      : allSections.map(s => s.id);
    
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
    onChange({ ...customization, sectionOrder: newOrder });
  };

  const displayOrder = customization.sectionOrder.length > 0 
    ? customization.sectionOrder.map(id => allSections.find(s => s.id === id))
    : allSections;

  return (
    <div className="bg-white dark:bg-slate-800 rounded shadow-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between font-semibold hover:bg-gray-50 dark:hover:bg-slate-700"
      >
        <span>🎨 Customize</span>
        <span className="text-gray-500">{isExpanded ? '▼' : '▶'}</span>
      </button>
      
      {isExpanded && (
        <div className="p-4 border-t space-y-4">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <div className="flex gap-2">
              {['small', 'medium', 'large'].map(size => (
                <button
                  key={size}
                  onClick={() => onChange({ ...customization, fontSize: size })}
                  className={`flex-1 px-3 py-2 rounded border capitalize ${
                    customization.fontSize === size
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium mb-2">Primary Color</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {colorPresets.map(color => (
                <button
                  key={color.value}
                  onClick={() => onChange({ ...customization, primaryColor: color.value })}
                  className={`h-10 rounded border-2 ${
                    customization.primaryColor === color.value
                      ? 'border-gray-900 dark:border-white'
                      : 'border-gray-300 dark:border-slate-600'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  aria-label={color.name}
                />
              ))}
            </div>
            {/* Custom Color Picker */}
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => onChange({ ...customization, primaryColor: e.target.value })}
                className="h-10 w-16 border rounded cursor-pointer"
                aria-label="Custom color picker"
              />
              <input
                type="text"
                value={customization.primaryColor}
                onChange={(e) => onChange({ ...customization, primaryColor: e.target.value })}
                className="flex-1 px-2 py-1 border rounded text-sm bg-white dark:bg-slate-700"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Section Order */}
          <div>
            <label className="block text-sm font-medium mb-2">Section Order</label>
            <div className="space-y-2">
              {displayOrder.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-700 rounded"
                >
                  <span className="text-sm">{section.label}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveSection(index, -1)}
                      disabled={index === 0}
                      className="px-2 py-1 text-xs border rounded disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-slate-600"
                      aria-label="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveSection(index, 1)}
                      disabled={index === displayOrder.length - 1}
                      className="px-2 py-1 text-xs border rounded disabled:opacity-30 disabled:cursor-not-allowed bg-white dark:bg-slate-600"
                      aria-label="Move down"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onChange({ ...customization, sectionOrder: [] })}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-slate-300"
            >
              Reset to default order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
