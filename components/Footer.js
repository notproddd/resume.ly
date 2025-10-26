export default function Footer() {
  const sections = [
    { name: 'Summary', href: '#summary' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Portfolio', href: '#' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand/Intro */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resume Builder
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Create your professional resume with ease.
            </p>
          </div>

          {/* Column 2: Section Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 tracking-wider uppercase">
              Sections
            </h3>
            <ul className="mt-4 space-y-2">
              {sections.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-sm text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social/External Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 tracking-wider uppercase">
              Links
            </h3>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((item) => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-8 border-t border-gray-200 dark:border-slate-700 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()}  resume.ly   All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}