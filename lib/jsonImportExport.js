// Helpers for exporting/importing resume JSON and basic validation

export function downloadJson(data, filename = 'resume.json') {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // revoke after a short delay
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  } catch (e) {
    console.error('Failed to download JSON', e);
    throw e;
  }
}

// Very small, forgiving validator for the resume JSON shape.
// Returns { valid: boolean, error?: string }
export function validateResumeJson(obj) {
  if (!obj || typeof obj !== 'object') return { valid: false, error: 'Root value must be an object' };

  // contact should be an object with at least a name or email
  if (!obj.contact || typeof obj.contact !== 'object') return { valid: false, error: 'Missing contact object' };
  if (!obj.contact.name && !obj.contact.email) return { valid: false, error: 'Contact should include name or email' };

  if ('summary' in obj && typeof obj.summary !== 'string') return { valid: false, error: 'summary must be a string' };

  if ('experience' in obj) {
    if (!Array.isArray(obj.experience)) return { valid: false, error: 'experience must be an array' };
    // optional: ensure items are objects
    for (let i = 0; i < obj.experience.length; i++) {
      if (!obj.experience[i] || typeof obj.experience[i] !== 'object') return { valid: false, error: `experience[${i}] must be an object` };
    }
  }

  if ('education' in obj) {
    if (!Array.isArray(obj.education)) return { valid: false, error: 'education must be an array' };
    for (let i = 0; i < obj.education.length; i++) {
      if (!obj.education[i] || typeof obj.education[i] !== 'object') return { valid: false, error: `education[${i}] must be an object` };
    }
  }

  if ('skills' in obj && !Array.isArray(obj.skills)) return { valid: false, error: 'skills must be an array' };

  // customization object is optional but if present should be an object
  if ('customization' in obj && obj.customization !== null && typeof obj.customization !== 'object') return { valid: false, error: 'customization must be an object' };

  return { valid: true };
}

const jsonUtils = { downloadJson, validateResumeJson };
export default jsonUtils;
