import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from 'react';
import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { Tooltip } from 'react-tooltip'
import { useUser } from "~/utils";
import { UserIcon } from '@heroicons/react/16/solid'
import { Text } from "~/components/text";
import Nav from "~/components/Nav";

export const meta: MetaFunction = () => [{ title: "Notes" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const [isTooltipVisible, setTooltipVisible] = useState(false);

/*
 TO-DO -> Logout
 */


  return (
    <div className="flex h-full min-h-screen flex-col">
      <div className="p-3">
      <Nav />
      </div>
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
      </main>
    </div>
  );
}
