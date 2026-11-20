/** Vertical metrics of Geist, in units of a 1000 unit em. */
export const metrics = [
  { name: 'Cap height', value: 710 },
  { name: 'x-height', value: 530 },
  { name: 'Baseline', value: 0 },
  { name: 'Descender', value: -150 },
] as const

/** The characters of the explorer: Basic Latin, figures, and the common accented letters. */
export const glyphs = Array.from(
  [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'abcdefghijklmnopqrstuvwxyz',
    '0123456789',
    'ÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕØÚÙÛÜÝßÆŒ',
    'áàâäãåçéèêëíìîïñóòôöõøúùûüýÿæœ',
    '&@#$%€£¥?!¿¡*+−×÷=<>≤≥/\\|()[]{}',
  ].join(''),
)
