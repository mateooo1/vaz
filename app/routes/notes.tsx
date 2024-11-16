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

export const meta: MetaFunction = () => [{ title: "Notes" }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NotesPage() {
 
  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="flex h-full bg-white">

        <div className="flex-1 p-6">
          <Outlet />
        </div>
     </main>
    </div>
  );
}
