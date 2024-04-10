// 'uneditable', 
export default {
  alowGapCursor: true,
  atom: true,
  // selectable: false,
  group: 'block',
  attrs: {
    num: { default: 0 },
  },
  // isLeaf: true,
  toDOM: (node) => {
    const attrs = {
      'data-uneditable': 'true',
      'data-num': node.attrs.num.toString(),
      // 'contenteditable': true
    };

    return ['div', attrs, 'uneditable ' + node.attrs.num];
  },

  parseDOM: [
    {
      tag: 'div[data-uneditable]',
      getAttrs: node => {
        return {
          num: Number(node.getAttribute('data-num'))
        }
      }
    }
  ]
}