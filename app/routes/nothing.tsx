import type { MetaFunction } from '@remix-run/node';
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { BookmarkSquareIcon, MapPinIcon, MusicalNoteIcon, RssIcon } from '@heroicons/react/24/solid'
export const meta: MetaFunction = () => {
    return [
      { title: 'Dashboard' },
      { name: 'description', content: 'Welcome to Remix+Vite!' },
    ];
  };

const links = [
    {
        name: 'Maps',
        href: '#',
        icon: MapPinIcon,
    },
    { name: 'Music', href: '#', description: 'A complete API reference for our libraries.', icon: MusicalNoteIcon },
    {
        name: 'Guides',
        href: '#',
        description: 'Installation guides that cover popular setups.',
        icon: BookmarkSquareIcon,
    },
    { name: 'Blog', href: '#', icon: RssIcon },
]
  

export default function Dashboard() {
  return ( <>
    <div className="bg-white">
      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul role="list" className="-mt-6 divide-y divide-gray-900/5 border-b border-gray-900/5">
            {links.map((link, linkIdx) => (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                  <link.icon aria-hidden="true" className="h-6 w-6 text-gray-600" />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">
                    <a href={link.href}>
                      <span aria-hidden="true" className="inset-0" />
                      {link.name}
                    </a>
                  </h3>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
    </>
  )
}
