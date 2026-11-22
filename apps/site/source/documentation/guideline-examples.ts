/**
 * The live examples for the Do and Don't tables of the guidelines. Each key is a guideline, relative
 * to the guidelines folder. Its value lists, for each Do and Don't table of the file in order, the
 * example for each row of the table, in order. The guidelines do not name their examples: they
 * stay independent of the site.
 */
export const guidelineExamples: ReadonlyMap<string, readonly (readonly string[])[]> = new Map([
  [
    'content/writing.md',
    [
      ['writing-label'],
      ['writing-action'],
      ['writing-error'],
      ['writing-empty'],
      ['writing-confirmation'],
    ],
  ],
  [
    'foundations/colors.md',
    [['colors-primary-role'], ['colors-status-alone', 'colors-status-contrast']],
  ],
  ['foundations/motion.md', [['motion-purpose'], ['motion-exit', 'motion-first-frame']]],
  ['foundations/shape.md', [['shape-nested-radius'], ['shape-full-rounding']]],
  ['foundations/typeface.md', [['typeface-emphasis'], ['typeface-case']]],
  ['patterns/forms.md', [['forms-label'], ['forms-validation-timing'], ['forms-error-placement']]],
  [
    'patterns/hierarchy.md',
    [['hierarchy-disclosure'], ['hierarchy-depth'], ['hierarchy-alignment'], ['hierarchy-current']],
  ],
])
