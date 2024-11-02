import { Link } from "@remix-run/react";
import { Text } from "~/components/text";

export default function NoteIndexPage() {
  return (
    <p>
      <Text>
      No note selected. Select a note on the left, or{" "}
      <Link to="new" className="text-gray-500 underline">
        create a new note.
      </Link>
      </Text>
    </p>
  );
}
