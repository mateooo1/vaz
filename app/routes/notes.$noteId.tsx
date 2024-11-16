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
import { Text } from '~/components/text';
import { Alert, AlertActions, AlertDescription, AlertTitle } from '~/components/alert';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
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
      <div className="border-b border-gray-200 pb-5">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1 id="message-heading" className="text-base font-semibold leading-6 text-gray-900">
          {data.note.title}
          </h1>
          <p className="mt-1 truncate text-sm text-gray-500">Note description here.</p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:ml-6 sm:mt-0 sm:flex-shrink-0 sm:justify-start">
          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Open
          </span>
          <Menu as="div" className="relative ml-3 inline-block text-left">
            <div>
              <MenuButton className="-my-2 flex items-center rounded-full bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                    <a
                      href="#"
                      className="flex justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 no-underline"
                    >
                      <span>Edit</span>
                    </a>

                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="flex justify-between px-4 py-2 text-sm no-underline text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    onClick={handleDeleteClick}
                  >
                    <span>Delete</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    className="flex w-full font-medium justify-between px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    <span>Archive</span>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>

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
      <div 
        className="py-6" 
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }} // Render sanitized HTML
      />
      <hr className="my-4" />
      <div className="mb-16">
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
    return <Text>Note not found</Text>;
  }

  return <div className="text-red-600">An unexpected error occurred: {error.statusText}</div>;
}