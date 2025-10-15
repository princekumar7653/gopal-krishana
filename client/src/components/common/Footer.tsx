import { SOCIAL_LINKS } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 Portfolio. Built with React, Vite, Tailwind CSS & Redux.
            </p>
          </div>
          
          <div className="flex space-x-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <span className="sr-only">{link.name}</span>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}