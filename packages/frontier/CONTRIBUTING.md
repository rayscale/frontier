# Contributing to frontier

`frontier` is the React implementation of the Frontier design language. It turns
[the guidelines](../../guidelines/README.md) into components, styles, and a public API.

Follow the workspace [CONTRIBUTING.md](../../CONTRIBUTING.md) and [AGENTS.md](../../AGENTS.md)
first. This file adds the rules that are specific to this package and does not repeat workspace
policy.

## Source of truth

Before implementing or changing anything:

1. Read the relevant guideline, its foundations, and any pattern it references.
2. Inspect existing components, styles, tokens, tests, stories, and public exports.
3. Reuse an existing component, pattern, or token before creating one.
4. If a guideline and the implementation disagree, investigate both and report the conflict.

The guidelines decide visual and interaction behavior. React, CSS, and package decisions belong
here. A decision that applies beyond this package belongs in the guidelines, not only in code.

## Architecture and decoupling

Build focused, composable components with minimal public APIs. Separate public behavior from
internal implementation.

- Prefer native HTML semantics and browser behavior.
- Keep application logic out of the package.
- Avoid unnecessary state, effects, refs, memoization, wrappers, and abstractions.
- Derive values during render instead of duplicating state.
- Preserve useful native attributes, event handlers, and refs.
- Follow the Rules of Hooks.
- Do not manipulate the DOM without a concrete reason.

Reuse is the default. Before writing markup, behavior, or styles, check whether an existing
component, helper, or token already covers it. Compose the existing piece instead of copying it.
Do not duplicate a behavior, a class, or a token under a new name.

### Decoupling pattern

Public components compose through public APIs. They never depend on another component's internals.

- A component may import another component's public entry, props, and types. It must not reach into
  its files, context, CSS classes, DOM structure, or private state.
- Keep each component's public surface in its `index.ts`. Everything else—parts, hooks, helpers,
  context, internal types—is private to that component.
- Keep external interaction primitives, when used, behind a component-owned wrapper. Do not expose
  their props, state, or types as the public API.
- Place code shared by two or more components in `source/internal/`; keep component-specific code
  inside the component folder. Do not create a third location for the same concern.
- Inside `source/internal/`, shared functions and hooks (class joining, behavior shared by native
  inputs) go in `helpers/`, and shared presentational pieces that render markup and own a
  stylesheet (the required marker) go in `primitives/{name}/`. Internal code follows the component
  rules: kebab-case files, no barrels, and no export from the package entry.
- Style components with tokens and their own public classes. Do not select another component's
  internals.
- If a composition would create a cycle, extract a shared internal contract or pass behavior
  through props or context. Do not import across component internals.
- Tests and stories use the same public API a consumer uses.

### Compound components

Use a namespace API when a component has meaningful public parts:

```tsx
<Tabs.Root>
  <Tabs.List>...</Tabs.List>
  <Tabs.Panel>...</Tabs.Panel>
</Tabs.Root>
```

- One namespace per compound component.
- Prefer `Root`, `Trigger`, `Content`, `Item`, `List`, `Panel`, and similar role names.
- Do not add `Root` when the component has no meaningful parts.
- Do not create empty or uniform subcomponents.
- Keep internal helpers private.
- Preserve accessible relationships across parts.
- Type the namespace with an exported interface and document each part on that interface, so
  hovering a part shows what it is for. A comment on the part function is not what a consumer sees.

  ```ts
  export interface TFieldComponent {
    /** Groups one field's parts and shares its ids and accessible relationships. */
    Root: typeof FieldRoot
    /** Renders the control's label with the required marker. */
    Label: typeof FieldLabel
  }

  export const Field: TFieldComponent = { Root: FieldRoot, Label: FieldLabel }
  ```

### Interaction primitives

Use a headless primitive when a component needs complex focus, dismissal, keyboard, positioning,
or coordinated state. Do not recreate that behavior by hand.

- Wrap the primitive in a Frontier component and expose Frontier's own props, types, and composition.
- Keep primitive imports, state adapters, and types private.
- Do not require consumers to import the primitive.
- Do not forward every prop for convenience.
- Verify the installed primitive's actual API; do not assume behavior from another version.
- Use primitives only where they add real behavior. Do not use them for simple presentational
  components or for native elements that already do the job.
- Test the integration and the public contract, not the primitive's internals.

## Package structure

```text
packages/frontier/
├── source/
│   ├── components/        # public components
│   ├── internal/          # code shared by two or more components
│   │   ├── helpers/       # shared functions and hooks
│   │   └── primitives/    # shared presentational pieces with their own styles
│   ├── styles/            # stylesheet entry, fonts, tokens, and system stories
│   ├── typography/        # Frontier Sans sources, build pipeline, tests, and specimens
│   ├── index.ts           # public package entry
│   └── styles.d.ts
├── scripts/
├── .storybook/
├── vitest.setup.ts
└── package.json
```

Use `source/components/{component}/` for a public component:

```text
source/components/{component}/
├── {component}.tsx
├── {component}.css
├── {component}.stories.tsx
├── {component}.test.tsx
├── index.ts
├── types.ts       # only when the public contract needs shared types
├── context.ts     # only when the component needs context
├── parts/         # only meaningful subcomponents
├── helpers/       # component-specific helpers
└── hooks/         # component-specific hooks
```

Tests live beside the source they cover: a component at `source/components/button/button.tsx` has
its tests at `source/components/button/button.test.tsx`. Do not mirror the tree under a separate
`tests/` directory.

- Only create files the component needs.
- Keep implementation, stylesheet, story, and public entry at the component root.
- Split only along a real boundary. Never split by line count.
- Keep public components in `source/components`; keep shared internal code in `source/internal`.
- Do not add barrels inside `parts/`, `helpers/`, or `hooks/`.
- Re-export public types from the component's `index.ts` to avoid cycles.

## Naming

Follow the workspace naming rules. Package-specific names follow the same conventions.

- Files and directories: kebab-case (`radio-group/`, `radio-group.tsx`).
- React components and namespaces: PascalCase.
- Variables, functions, hooks, and parameters: camelCase.
- Named types and interfaces: `T`-prefixed PascalCase (`TButtonProps`, `TDialogState`).
- Generic parameters: `T`-prefixed PascalCase (`TValue`, `TElement`, `TResult`).
- Tests and stories: `{component}.test.tsx` and `{component}.stories.tsx`.
- CSS classes: BEM-inspired with the `frontier-` prefix (`frontier-button`,
  `frontier-dialog__title`, `frontier-button--primary`).
- Use English names and established terminology. Avoid unexplained abbreviations and synonyms.

## TypeScript and React

- Use strict TypeScript. Never use `any`.
- Prefer accurate types, discriminated unions, explicit narrowing, and `unknown` at trust
  boundaries.
- Avoid unjustified casts, non-null assertions, and redundant checks.
- Prefer immutable values and `readonly` where it expresses the contract.
- Use `satisfies` when it validates without losing inference.
- Keep props minimal. Avoid boolean combinations that allow invalid states.
- Type optional props as `prop?: T | undefined` so callers can pass an explicit `undefined` under
  `exactOptionalPropertyTypes`. When spreading props into a primitive that does not allow it, drop
  the `undefined` values with `omitUndefined`.
- Use controlled or uncontrolled state according to the component's contract.
- Derive values during render. Use effects only for external synchronization.
- Use `useMemo` and `useCallback` only for a concrete identity, performance, or correctness need.
- Support refs where the contract needs them, and make them reach the intended element.
- Handle meaningful errors explicitly. Do not swallow errors or hide invalid states.

## Styles and tokens

The styles in `source/styles/` implement the guidelines and are the only source of values.

- Reuse tokens for color, spacing, typography, radii, borders, focus, controls, icons, layering,
  and motion.
- Prefer semantic tokens over palette variables.
- Never hardcode a value when a token exists. Never duplicate a token under a new name.
- Add a token only for a reusable design decision, in the correct category.
- Inspect the consumers of a shared token before changing it.
- Component-scoped custom properties use the `--_` prefix and stay in the component stylesheet or
  an inline style from the component. Never add them to `source/styles/tokens/`.
- Expose a customization value as an intentional prop, not as a public custom property.
- Every transition uses the motion tokens: `--frontier-duration-*` and `--frontier-easing-*`. Never
  hardcode a duration or a curve.
- A transition must do one of the jobs in the [motion foundation](../../guidelines/foundations/motion.md):
  confirm an input, explain a change, reveal a temporary surface, or show progress. Nothing
  transitions while it is at rest.
- Move `transform`, `opacity`, `background-color`, `border-color`, and `color`; avoid animating
  layout properties such as `width`, `height`, or `margin`.
- Enter with `--frontier-duration-enter` and leave with `--frontier-duration-exit`, which is shorter.
  A tooltip enters with `--frontier-duration-base` and leaves with `--frontier-duration-fast`.
- Use `--frontier-press-travel` for the press response instead of a local offset.
- Wrap every transition and animation in a `prefers-reduced-motion: reduce` fallback that keeps the
  final state and the information it carries. Do not remove state feedback under reduced motion.

### CSS

- Style with component classes and stylesheets. Do not add Tailwind or another utility framework.
- Use inline styles only for values that are genuinely dynamic at runtime. Prefer CSS custom
  properties for dynamic values.
- Do not use inline styles to bypass tokens.
- Avoid global selectors, excessive specificity, and `!important`.
- Use logical properties, preserve writing directions, and respect `prefers-reduced-motion`.
- Use semantic attributes for state (`:focus-visible`, `[data-open]`, `[aria-selected='true']`)
  instead of redundant state classes.
- Never use unscoped generic classes such as `.root`, `.content`, or `.active`.

## Typography

Frontier Sans lives in `source/typography/` and has its own Python toolchain; read its
[README](./source/typography/README.md) before changing it.

- Edit glyph definitions, features, or metrics in `source/typography/`, never the compiled fonts.
- Run `pnpm typography:build`, `pnpm typography:test`, and `pnpm typography:validate` after any
  change to the typeface.
- Compiled fonts, UFO masters, and virtual environments are generated output and stay out of
  version control.
- The family token lists Frontier Sans first and Outfit as the fallback; do not hardcode a family.

## Icons

Icons live in `source/icons` and are exported from the package entry. They belong to the set, not to
the component that first needed them.

- Add an icon as `source/icons/svg/{name}/icon.svg` plus an `icon.json` that satisfies
  `source/icons/metadata.schema.json`. That pair is the only source: the React components, the
  barrel, and the metadata module are generated from it.
- Run `pnpm --filter @rayscale/frontier generate:icons` after changing an icon source. The build
  regenerates everything through `prebuild`, so never edit `components/`, `generated.ts`, or
  `metadata.generated.ts` by hand.
- Draw on the 24-unit grid. The SVG carries the stroke, caps, and joins for designers, and the
  `Icon` primitive applies the same icon tokens at runtime; a component never sets its own stroke,
  cap, or size.
- Size icons with the named scale (`inline`, `control`, `standalone`) instead of raw pixels.
- Icons are decorative: they are hidden from assistive technology, and the control that contains one
  carries the accessible name.
- Add an icon only when no existing icon carries the meaning.

## Stories

Stories are interactive documentation of the public contract. They use Storybook with React and
Vite.

### Location and shape

- Component stories live at `source/components/{component}/{component}.stories.tsx`.
- Foundation and system reference stories may live under `source/styles/`.
- Use CSF and `satisfies Meta<typeof Component>` for component stories.
- Add `tags: ['autodocs']` to component metadata.
- Provide `args` and `argTypes` for meaningful public props. Do not expose private props.
- Shape stories around public behavior: `Default`, variants, sizes, states, composition, and
  meaningful interaction. `Default` comes first.
- Do not create a story for every trivial prop combination.
- Use concise Title Case names of one to three words. Avoid `With`, `Has`, `Using`, `Example`,
  `Basic`, and `Demo`.
- Use real components, real tokens, and realistic content. Never mock appearance.
- Keep stories deterministic and independent. Do not duplicate the test suite.

### Centered content

Every story uses a centered layout:

```tsx
const meta = {
  parameters: {
    layout: 'centered',
  },
} satisfies Meta
```

Do not use `fullscreen` or `padded`, and do not simulate a full page inside a story. Center the
content itself; the canvas only shows the theme's page background.

### Descriptions and detail

Every component story has a component-level description, and every exported story has a
one-sentence description of what it demonstrates:

```tsx
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Triggers one action with a label that names the result.',
      },
    },
  },
} satisfies Meta<typeof Button>

type TStory = StoryObj<typeof meta>

export const Default: TStory = {
  parameters: {
    docs: {
      description: {
        story: 'Shows the primary action with its default label and size.',
      },
    },
  },
}
```

Add details that help a reader understand the contract: meaningful `args`, prop descriptions in
`argTypes`, state explanations, and realistic content. Document non-obvious behavior, constraints,
and accessibility responsibilities. Do not restate the implementation.

### Composition

- Demonstrate composition with real components and public APIs.
- For a compound component, use the namespace API in at least one story.
- Add a composition story whenever the component is meant to be used with siblings, layout, or
  another public component.
- Reuse existing components in stories instead of recreating their markup.
- Keep interaction stories focused on one behavior; do not turn a story into an application.

### Modes

The preview provides Light and Dark modes. The page background is white in light mode and black in
dark mode. Do not set a story-specific background or override the mode palette; use the Storybook
mode control.

## Testing

- Use Vitest. Place tests beside the source file they cover.
- Import the unit under test from its own folder's index (`./index.js`), not from the package root.
- For React component tests, use React Testing Library and `user-event`; add them when the first
  component test is introduced.
- Use Arrange–Act–Assert and descriptive names.
- Test public behavior and observable contracts with accessible queries (`getByRole`,
  `getByLabelText`, `getByText`).
- Verify callbacks, state changes, composition, accessible names, and boundary conditions.
- Use asynchronous queries and `waitFor` only when behavior is asynchronous.
- Keep tests deterministic and isolated. Restore mocks; avoid sleeps, snapshots, and order
  dependence.
- Do not test behavior a primitive already guarantees. Test Frontier's integration, defaults, state
  mapping, styling contracts, and accessibility relationships.
- Add a regression test for every bug fix. It must fail before the fix and pass after.
- Do not delete, skip, or weaken assertions to make a run pass.

For behavior jsdom cannot represent, verify it in Storybook. Do not add a second browser automation
framework; use the configured Storybook setup when a browser test project exists.

## Accessibility

Follow the accessibility, focus, and interaction guidelines.

- Prefer native semantics and the correct interactive element.
- Provide names, descriptions, labels, and error associations where required.
- Use ARIA only for semantics native HTML cannot express. Never add contradictory or redundant
  ARIA.
- Ensure keyboard support, logical focus order, and visible focus from the focus tokens.
- Respect focus management from primitives.
- Avoid keyboard traps except in a correctly implemented modal.
- Restore focus when an interaction requires it.
- Communicate disabled, invalid, selected, expanded, and loading states correctly, never through
  color or motion alone.
- Maintain contrast and respect reduced motion.
- Never remove accessibility behavior to simplify an implementation.

## Comments and documentation

- Do not add ordinary code comments. Prefer clear code and naming.
- Comments are only for information the code cannot express: a platform workaround, a critical
  invariant, an interoperability constraint, a primitive limitation, or a correctness decision.
- Short category comments are allowed in token files.
- Document the public contract: props and types, composition, variants, states, non-obvious
  behavior, accessibility responsibilities, and customization points.
- Keep the README, Storybook docs, examples, and public types aligned.
- Do not document private helpers, internal adapters, or trivial internals.

## Exports and public API

- Export supported components, helpers, and public types through the entries declared in
  `package.json`.
- Keep each component's `index.ts` limited to that component's public API.
- Never export internal helpers, private hooks, adapters, or internal types.
- Do not expose an interaction primitive as a substitute for a Frontier component.
- Keep exports, declarations, package metadata, styles, and documentation synchronized.
- Preserve supported import paths and module formats.
- Treat export changes as public API changes.
- Verify that the build emits the expected files and declarations.
- The package exposes `@rayscale/frontier/styles.css`; keep its source and export path aligned.

## Dependencies

- Reuse installed dependencies before adding one. Check the package and workspace manifests.
- Preserve the React and React DOM peer ranges.
- Use pnpm. Do not edit the lockfile by hand.
- Remove a dependency only after checking scripts, build configuration, exports, and usage.

## Verification

Run the checks that cover the change from the package:

```sh
pnpm --filter @rayscale/frontier test
pnpm --filter @rayscale/frontier typecheck
pnpm --filter @rayscale/frontier build
pnpm --filter @rayscale/frontier storybook:build
pnpm lint
pnpm format:check
```

`pnpm lint` builds the workspace first. Use `pnpm lint:files <paths>` for a fast file-only check.
Format changed files with `pnpm format:files <paths>` or `pnpm format`.

Before finishing:

- Run the checks above that apply.
- Verify exports, declarations, styles, and package metadata when they change.
- Report any check that could not run and any failure that remains.
- Do not delete tests, weaken assertions, suppress diagnostics, or loosen compiler or lint rules
  to pass.

## Completion criteria

A package change is complete when:

- It follows the design guidelines.
- The public API is coherent and leaks no internal or primitive details.
- Existing components, tokens, styles, and naming are reused and respected.
- Accessibility and interaction behavior are preserved.
- Tests and stories reflect the real public contract.
- Formatting, lint, type-check, build, tests, and Storybook build ran.
- Exports, styles, and documentation are synchronized.
- The diff contains no accidental changes.
- Remaining limitations and failures are reported honestly.

## Commits

Follow the workspace [CONTRIBUTING.md](../../CONTRIBUTING.md) for Conventional Commits and the
repository [AGENTS.md](../../AGENTS.md) for commit policy. Keep each commit focused on one logical
change.
