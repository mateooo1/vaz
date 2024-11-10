import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Input } from "~/components/input";
import { Field, Label } from '~/components/fieldset'
import { Textarea } from '~/components/textarea'
import { Button } from '~/components/button'
import { DocumentIcon } from '@heroicons/react/16/solid'
import { createNote } from "~/models/note.server";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 },
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 },
    );
  }

  const note = await createNote({ body, title, userId });

  return redirect(`/notes/${note.id}`);
};

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  useEffect(() => {
    const textareas = document.querySelectorAll<HTMLTextAreaElement>("textarea");

    textareas.forEach((textarea) => {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";

      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    });
  }, []);

  return (
<Form method="post">
  <div className="relative max-w-4xl mx-auto px-4 py-6">
    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
      <label htmlFor="title" className="sr-only">
        Title
      </label>
      <input
        ref={titleRef}
        name="title"
        aria-invalid={actionData?.errors?.title ? true : undefined}
        aria-errormessage={actionData?.errors?.title ? "title-error" : undefined}
        placeholder="Title"
        className="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
      />
      {actionData?.errors?.title ? (
        <div className="pt-1 text-red-700" id="title-error">
          {actionData.errors.title}
        </div>
      ) : null}
      <label htmlFor="description" className="sr-only">
        Description
      </label>
      <textarea
        ref={bodyRef}
        name="body"
        aria-invalid={actionData?.errors?.body ? true : undefined}
        aria-errormessage={actionData?.errors?.body ? "body-error" : undefined}
        className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        placeholder="Write a description..."
        defaultValue={''}
      />

      {/* Spacer element to match the height of the toolbar */}
      <div aria-hidden="true">
        <div className="py-2">
          <div className="h-9" />
        </div>
        <div className="h-px" />
        <div className="py-2">
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
      </div>
    </div>

    {/* Actions Container */}
    <div className="absolute inset-x-0 bottom-0 pb-8"> {/* Adjusted bottom padding */}
      <div className="flex justify-end space-x-4 px-4 sm:px-6"> {/* Increased padding on the right */}
        <div className="flex-shrink-0">
          <button
            type="button"
            className="group inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
          >
            <PaperClipIcon aria-hidden="true" className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" />
            <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Attach a file</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <Button
            type="submit"
           >
            Create
          </Button>
        </div>
      </div>
    </div>
  </div>
</Form>

  );
}
