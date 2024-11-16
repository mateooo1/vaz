import type { MetaFunction } from '@remix-run/node';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { BookmarkSquareIcon, MapPinIcon, MusicalNoteIcon, RssIcon, CloudArrowDownIcon, ArchiveBoxArrowDownIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

const links = [
    {
        name: 'Maps',
        href: '#',
        description: 'Finding places and getting directions',
        icon: MapPinIcon,
    },
    {
        name: 'Music',
        href: '#',
        description: 'Playing tracks and exploring new tunes',
        icon: MusicalNoteIcon,
    },
    {
        name: 'Personal Drive',
        href: '#',
        description: 'Storing files and accessing them anytime',
        icon: ArchiveBoxArrowDownIcon, 
    },
    {
        name: 'VPN',
        href: '#',
        description: 'Safe and private internet access',
        icon: ComputerDesktopIcon, 
    },
    {
        name: 'Stories',
        href: '#',
        description: 'View and share short-lived updates and content',
        icon: RssIcon, // RSS for blog updates
    },
];

export const meta: MetaFunction = () => {
    return [
        { title: 'Dashboard' },
        { name: 'description', content: 'Welcome to Remix+Vite!' },
    ];
};

export default function Dashboard() {
    return (
        <>
            <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
                <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
                    <h2 className="sr-only">Popular pages</h2>
                    <ul role="list" className="divide-y divide-gray-200 border-b border-gray-200">
    {links.map((link, linkIdx) => (
        <li key={linkIdx} className="relative flex items-center gap-x-4 py-4 hover:bg-gray-50 transition duration-150 ease-in-out"> {/* Reduced py-6 to py-4 */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 shadow-sm ring-1 ring-gray-300">
                <link.icon aria-hidden="true" className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-auto">
                <h3 className="text-base font-semibold text-gray-900">{link.name}</h3> {/* Adjusted font size */}
                {link.description && <p className="text-sm text-gray-500">{link.description}</p>} {/* Added description */}
            </div>
            <div className="flex-none self-center">
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </div>
        </li>
    ))}
</ul>
                </div>
            </main>
        </>
    );
}