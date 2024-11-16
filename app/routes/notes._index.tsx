import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from 'react';
import { getNoteListItems } from "~/models/note.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { Text } from "~/components/text";
import { Badge } from '~/components/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/table'


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
};

export default function NoteIndexPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  return (
    <div className="h-full border-r bg-gray-50">
      <Link to="new" className="block p-4 text-xl text-gray-500">
        <Text className="text-4xl">+ New Note</Text>
      </Link>

      <hr />

      {data.noteListItems.length === 0 ? (
        <Text className="p-4">No notes yet</Text>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Title</TableHeader>
              <TableHeader>Label</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.noteListItems.map((note) => (
              <TableRow key={note.id}>
                <TableCell className="font-medium"><Link
                  to={note.id}
                >📝 {note.title}</Link></TableCell>
                <TableCell>
                <Badge color="lime">documentation</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>

  );
}
