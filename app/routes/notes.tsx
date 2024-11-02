import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { UserIcon } from '@heroicons/react/16/solid'
import { Text } from "~/components/text";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Notes</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-gray-100 hover:bg-gray-500 active:bg-gray-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-gray-500">
            <Text className="text-4xl">
            + New Note
            </Text>
          </Link>

          <hr />

          {data.noteListItems.length === 0 ? (
            <Text className="p-4">No notes yet</Text>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={note.id}
                  >
                    <Text>
                      📝 {note.title}
                      </Text>
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>


        <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
            <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              <span className="sr-only">Home</span>
            </button>
            <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Home
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
              </svg>
              <span className="sr-only">Bookmark</span>
            </button>
            <div id="tooltip-bookmark" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Bookmark
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-post" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
              </svg>
              <span className="sr-only">New post</span>
            </button>
            <div id="tooltip-post" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              New post
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-search" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div id="tooltip-search" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Search
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <UserIcon className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-500" />
              <span className="sr-only">Logout</span>
            </button>
            <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              Logout
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
