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

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
      <Field>
      <Label>Title</Label>
          <Input
            ref={titleRef}
            name="title"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </Field>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

      <div>
      <Field>
      <Label>Description</Label>
      <Textarea 
      ref={bodyRef}
            name="body"
            rows={8}
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            } />
    </Field>
        {actionData?.errors?.body ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        ) : null}
      </div>

      <div className="text-left">
        <Button
          type="submit"
          color="zinc"
          >
            <DocumentIcon />
          Save
        </Button>
      </div>
    </Form>
  );
}
