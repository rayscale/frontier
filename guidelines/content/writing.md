# Writing

Writing rules apply to every label, message, and piece of interface text. They keep the interface
consistent and make it translatable.

## Labels

A label names the value it describes. Use a noun or a short noun phrase for fields and sections:
"Name", "API key", "Billing address". Do not use a full sentence as a label.

A required field is marked with the word "required" in its label or help text. An asterisk alone is
not enough. See [Forms](../patterns/forms.md).

## Actions

An action label starts with a verb and names the result: "Save changes", "Delete file", "Create
project". Do not use "OK" or "Submit" when a specific verb exists.

A destructive action names what it destroys. When the result is irreversible, the confirmation says
so and names the object again.

## Errors

An error says what happened and how to resolve it. It does not blame the person and does not use a
generic apology.

- Write "The file is larger than 10 MB. Choose a smaller file."
- Do not write "Invalid input."

An error summary at the start of a form lists each error with a link to its field. The field keeps
the same message next to it. See [Forms](../patterns/forms.md).

## Empty states

An empty state says what is missing and what the person can do next. It does not pretend that the
absence is a success, and it does not leave the person without a path.

- Write "No projects yet. Create a project to get started."

## Confirmations

A confirmation says what changed, briefly. It does not repeat the label of the action or add
enthusiasm.

- Write "Changes saved."
- Do not write "Awesome! Your changes were saved successfully!"

## Numbers, dates, and units

Numbers are displayed with tabular figures where they align. Dates and numbers follow the person's
locale. Units are written explicitly and do not change between places that show the same value.

A count uses the singular and plural forms of its language. Do not build a plural by appending a
letter in one language.

## Punctuation and spacing

Use one space after a period. Do not end a label or a short action with a period. Use the serial
comma only when the language requires it. Avoid ellipses, exclamation marks, and decorative
punctuation.

## Translation and direction

Write text that can expand in translation. Do not embed text in images, and do not rely on a fixed
width to carry meaning. Directional symbols mirror in right-to-left layouts; code remains left to
right. See [Accessibility](../foundations/accessibility.md) and [Symbols](../foundations/symbols.md).

## Principle

Interface text should be specific enough to act on, short enough to scan, and neutral enough to
translate.
