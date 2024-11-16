import { useEffect } from 'react';
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useRouteError, useLoaderData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import MessyDoodle from "~/components/doodles/MessyDoodle";


import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import NotFoundError from "~/components/NotFoundError";
import { Avatar } from '~/components/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '~/components/dropdown';
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '~/components/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '~/components/sidebar';
import { SidebarLayout } from '~/components/sidebar-layout';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import {
  Cog6ToothIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid';
import { useMatches } from "@remix-run/react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return json({ user });
};

const handleLogout = async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
    });

    if (response.ok) {
      window.location.href = '/login';
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("An error occurred during logout:", error);
  }
};

export default function App() {
  const matches = useMatches();
  const isIndexPage = matches.some(match => 
    ["routes/_index", "routes/join", "routes/login", "routes/about"].includes(match.id)
  );
  

  const data = useLoaderData<typeof loader>();
  const user = useOptionalUser();

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-white dark:bg-zinc-900">
        {!isIndexPage && (
          <SidebarLayout
            navbar={
              <Navbar>
                <NavbarSpacer />
                <NavbarSection>
                  <NavbarItem href="/search" aria-label="Search">
                    <MagnifyingGlassIcon />
                  </NavbarItem>
                  <NavbarItem href="/inbox" aria-label="Inbox">
                    <InboxIcon />
                  </NavbarItem>
                  <Dropdown>
                    <DropdownButton as={NavbarItem}>
                      <Avatar src="https://catalyst.tailwindui.com/profile-photo.jpg" square />
                    </DropdownButton>
                    <DropdownMenu className="min-w-64" anchor="bottom end">
                      <DropdownItem href="/my-profile">
                        <UserIcon />
                        <DropdownLabel>My profile</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/settings">
                        <Cog8ToothIcon />
                        <DropdownLabel>Settings</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem href="/privacy-policy">
                        <ShieldCheckIcon />
                        <DropdownLabel>Privacy policy</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/share-feedback">
                        <LightBulbIcon />
                        <DropdownLabel>Share feedback</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem href="/logout">
                        <ArrowRightStartOnRectangleIcon />
                        <DropdownLabel onClick={handleLogout}>Sign out</DropdownLabel>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarSection>
              </Navbar>
            }
            sidebar={
              <Sidebar>
                <SidebarHeader>
                  <Dropdown>
                    <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                      <Avatar src="https://robohash.org/matt.png" />
                      <SidebarLabel>Tailwind Labs</SidebarLabel>
                      <ChevronDownIcon />
                    </DropdownButton>
                    <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                      <DropdownItem href="/teams/1/settings">
                        <Cog8ToothIcon />
                        <DropdownLabel>Settings</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem href="/teams/1">
                        <Avatar slot="icon" src="#empty-image-replace" />
                        <DropdownLabel>Tailwind Labs</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/teams/2">
                        <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
                        <DropdownLabel>Workcation</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem href="/teams/create">
                        <PlusIcon />
                        <DropdownLabel>New team&hellip;</DropdownLabel>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <SidebarSection className="max-lg:hidden">
                    <SidebarItem href="/search">
                      <MagnifyingGlassIcon />
                      <SidebarLabel>Search</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/inbox">
                      <InboxIcon />
                      <SidebarLabel>Inbox</SidebarLabel>
                    </SidebarItem>
                  </SidebarSection>
                </SidebarHeader>
                <SidebarBody>
                  <SidebarSection>
                    <SidebarItem href="/home">
                      <HomeIcon />
                      <SidebarLabel>Home</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/notes">
                      <Square2StackIcon />
                      <SidebarLabel>Notes</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/orders">
                      <TicketIcon />
                      <SidebarLabel>Orders</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/settings">
                      <Cog6ToothIcon />
                      <SidebarLabel>Settings</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/broadcasts">
                      <MegaphoneIcon />
                      <SidebarLabel>Broadcasts</SidebarLabel>
                    </SidebarItem>
                  </SidebarSection>
                  <SidebarSection>
                    <SidebarItem href="/support">
                      <QuestionMarkCircleIcon />
                      <SidebarLabel>Support</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem href="/changelog">
                      <SparklesIcon />
                      <SidebarLabel>Changelog</SidebarLabel>
                    </SidebarItem>
                  </SidebarSection>
                </SidebarBody>
                <SidebarFooter className="max-lg:hidden">
                  <Dropdown>
                    <DropdownButton as={SidebarItem}>
                      <span className="flex min-w-0 items-center gap-3">
                        <Avatar src="https://robohash.org/matt.png" className="size-10" square alt="" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">Erica</span>
                          <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                            {user?.email && user.email}
                          </span>
                        </span>
                      </span>
                      <ChevronUpIcon />
                    </DropdownButton>
                    <DropdownMenu className="min-w-64" anchor="top start">
                      <DropdownItem href="/my-profile">
                        <UserIcon />
                        <DropdownLabel>My profile</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/settings">
                        <Cog8ToothIcon />
                        <DropdownLabel>Settings</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem href="/privacy-policy">
                        <ShieldCheckIcon />
                        <DropdownLabel>Privacy policy</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/share-feedback">
                        <LightBulbIcon />
                        <DropdownLabel>Share feedback</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem onClick={handleLogout}>
                        <ArrowRightStartOnRectangleIcon />
                        <DropdownLabel>Sign out</DropdownLabel>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </SidebarFooter>
              </Sidebar>
            }
          >
            <Outlet />
          </SidebarLayout>
        )}
        {isIndexPage && <Outlet />}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Response && error.status === 404) {
    return <NotFoundError />;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">

<div className="grid h-screen place-content-center bg-white px-4">
  <div className="text-center">
    <MessyDoodle />
    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>

    <p className="mt-4 text-gray-500">We can't find that page.</p>
  </div>
</div>
        <Scripts />
      </body>
    </html>
  );
}
