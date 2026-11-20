# Forms

Forms collect input. Frontier keeps forms explicit: every field has a visible label, errors are
explained next to the field and summarized at the start, and no state depends on color alone.

## Labels and help

Every field has a visible label that describes the value. The label is part of the field's
accessible name. Required fields are marked in text, not only with an asterisk. Help text explains a
constraint before the person encounters it, and it sits with the field it describes.

## Validation

Validate when the person has had a reasonable chance to enter a valid value: on blur for a field
that has been touched, and on submit for the form. Do not show an error while a value is still being
typed for the first time.

An error explains what happened and how to resolve it. It is attached to the field, announced as an
error, and also listed in a summary at the start of the form. The summary links to each field it
describes. See [Writing](../content/writing.md).

## No color-only errors

An invalid field includes a message and, where useful, an icon. A red border or red text alone is
not an error state. See [Colors](../foundations/colors.md).

## Read-only and disabled

A read-only field remains focusable and selectable, and its value is read normally. A disabled field
does not accept input and is explained where the context requires it. Neither state is communicated by color alone.
See [States](./states.md).

## Grouping

Related fields are grouped with space and, where the group needs a name, a group label. A group is
not a card with a border; the structure comes from spacing and layout. See
[Spacing](../foundations/spacing.md).

## Submission

A submit action keeps its label while the form is submitting and shows a busy state. It is not
disabled without explanation. When submission fails, the error is shown with the form and the
person's input is preserved.

## Long forms

A long form is divided into sections with clear headings. The error summary remains at the start,
and each field keeps its error next to it. A person does not lose entered values when moving between
sections.

## Principle

A form should say what it needs, show errors where they belong, and never lose what the person
entered.
