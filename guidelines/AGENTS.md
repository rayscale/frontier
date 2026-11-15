# AGENTS.md — Frontier design guidelines

`guidelines/` is the authoritative source of Frontier's design decisions. It is independent of any
implementation.

This file covers how to write and change the guidelines. Follow the root `AGENTS.md` for
repository-wide rules.

## 1. Authority

- The guidelines define intent, not code, styling, tokens, or framework APIs.
- A rule must remain valid if the implementation changes.
- Implementations follow the guidelines. Code does not extend the language.
- When a guideline and an implementation disagree, determine which one is wrong before changing
  either.
- The guidelines lead; the implementation adapts.

## 2. Ownership

- One rule has one owner. Other documents link to the owner instead of repeating it.
- Principles own intent and conflict resolution.
- Foundations own shared visual and spatial rules, including every concrete value in
  `foundations/values.md`.
- Patterns own recurring interaction behavior.
- Components own only the contract of a primitive; they link to patterns and foundations for
  everything shared.
- Content owns voice and writing rules.

## 3. Writing

- Write in English, in a normative, calm voice.
- State the rule and the reason behind it. Explain consequences that are not obvious.
- Use conceptual examples. Do not name CSS properties, APIs, classes, components of a specific
  framework, or implementation workarounds.
- Do not restate values. Link to `foundations/values.md`.
- Use sentence case for headings.
- Keep one rule per paragraph; do not duplicate a rule that another document owns.
- Document exceptions where the owning rule lives, with the reason and the condition.

## 4. Changing the guidelines

1. Read the target document, its layer `README.md`, and the related principles, foundations, and
   patterns.
2. Search for an existing owner of the rule.
3. Decide whether the change is a gap, a contradiction, or a deliberate difference.
4. Make the smallest coherent change. Update indexes, links, and affected examples.
5. If the change affects an implementation, report the required follow-up.

Do not redefine shared guidance to match one implementation's incidental behavior.

## 5. Review checklist

- The rule lives in the correct layer.
- Every described movement does a job: it confirms input, explains a change, reveals a temporary
  surface, or shows progress.
- No rule is duplicated; related documents link to the owner.
- Values are stated only in `foundations/values.md`.
- No implementation details, class names, or framework APIs.
- Terminology matches the rest of the guidelines.
- Links and layer indexes resolve.
- The document follows the voice and writing rules in `content/`.
- `pnpm format:check` passes for changed files.
