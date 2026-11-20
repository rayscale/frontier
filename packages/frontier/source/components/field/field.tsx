import { FieldBox } from './parts/field-box.js'
import { FieldControl } from './parts/field-control.js'
import { FieldDescription } from './parts/field-description.js'
import { FieldError } from './parts/field-error.js'
import { FieldIcon } from './parts/field-icon.js'
import { FieldLabel } from './parts/field-label.js'
import { FieldRoot } from './parts/field-root.js'

import './field.css'

export interface TFieldComponent {
  /** Draws the control's surface and carries its invalid and disabled styling. */
  Box: typeof FieldBox
  /** Renders the native input that the label and messages describe. */
  Control: typeof FieldControl
  /** Renders helper text associated with the control. */
  Description: typeof FieldDescription
  /** Renders the error message that marks the control invalid and announces itself. */
  Error: typeof FieldError
  /** Places decorative or interactive content before or after the control inside the box. */
  Icon: typeof FieldIcon
  /** Renders the control's label with the required marker. */
  Label: typeof FieldLabel
  /** Groups one field's parts and shares its ids, state, and accessible relationships. */
  Root: typeof FieldRoot
}

/** Lays out a control with its label, description, and error message. */
export const Field: TFieldComponent = {
  Box: FieldBox,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
  Icon: FieldIcon,
  Label: FieldLabel,
  Root: FieldRoot,
}
