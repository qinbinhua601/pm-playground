// 'tab',

export default {
  atom: true,
  selectable: false,
  group: 'inline',
  inline: true,
  whitespace: 'pre',
  // isLeaf: true,
  toDOM: (node) => {
    const NO_WIDTH_SPACE = '\u200b';
    return [
      'span',
      {
        class: 'qin-tab',
      },
      '    ',
    ]
  },

  parseDOM: [
    {
      tag: 'span.qin-tab',
    },
  ],
}
