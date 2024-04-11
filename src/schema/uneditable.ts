import { Node } from 'prosemirror-model'

// 'uneditable', 
export default {
  inline: true,
  // alowGapCursor: true,
  atom: true,
  // selectable: false,
  group: 'inline',
  attrs: {
    num: { default: 0 },
  },
  // isLeaf: true,
  toDOM: (node: Node) => {
    const attrs = {
      'data-uneditable': 'true',
      'data-num': node.attrs.num.toString(),
      // 'contenteditable': true
    };

    return ['div', attrs, 'uneditable ' + node.attrs.num];
  },

  parseDOM: [
    {
      tag: 'span[data-uneditable]',
      getAttrs: (node: HTMLSpanElement) => {
        return {
          num: Number(node.getAttribute('data-num'))
        }
      }
    }
  ]
}