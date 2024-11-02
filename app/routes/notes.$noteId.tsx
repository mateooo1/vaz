import type { MetaFunction } from "@remix-run/node";
import { useState } from 'react';
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify'; // Use isomorphic-dompurify
import { Button } from '~/components/button';
import { Alert, AlertActions, AlertDescription, AlertTitle } from '~/components/alert';

import { deleteNote, getNote } from "~/models/note.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = ({ data }) => {
  const title = data ? `${data.note.title} - Remix Notes` : "Remix Notes";
  return [{ title }];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ id: params.noteId, userId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ note });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  invariant(params.noteId, "noteId not found");

  await deleteNote({ id: params.noteId, userId });

  return redirect("/notes");
};

export default function NoteDetailsPage() {
  const data = useLoaderData();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  // Sanitize Markdown content safely
  const sanitizedHTML = DOMPurify.sanitize(marked(data.note.body));

  return (
    <div className="p-4 prose prose-h1:text-3xl prose-h1:font-semibold">
      <h3 className="text-4xl font-serif font-normal">{data.note.title}</h3>
      <div 
        className="py-6" 
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }} // Render sanitized HTML
      />
      <hr className="my-4" />
      <div className="mb-16">
      <Button type="button" color="red" onClick={handleDeleteClick}>
        Delete
      </Button>
      <Alert open={isOpen} onClose={() => setIsOpen(false)}>
        <AlertTitle>Are you sure you want to delete this note?</AlertTitle>
        <AlertDescription>
          The deletion may take a few seconds to a couple of minutes to be reflected in your account after processing.
        </AlertDescription>
        <AlertActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Form method="post" onSubmit={() => setIsOpen(false)}>
            <Button type="submit" color="red">
              Delete
            </Button>
          </Form>
        </AlertActions>
      </Alert>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div className="text-red-600">An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1 className="text-red-600">Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div className="text-red-600">Note not found</div>;
  }

  return <div className="text-red-600">An unexpected error occurred: {error.statusText}</div>;
}