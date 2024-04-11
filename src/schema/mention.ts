import { Node } from 'prosemirror-model'

// 'uneditable',
export default {
  inline: true,
  alowGapCursor: true,
  atom: true,
  // selectable: false,
  group: 'inline',
  draggable: true,
  attrs: {
    name: {
      default: '',
    },
    uid: {
      default: '',
    },
    anchor: {
      default: '',
    },
  },
  parseDOM: [
    {
      tag: 'a[class*="q-mention"]',
      getAttrs: (dom: HTMLElement) => {
        const nameDom = dom.querySelector('b')
        return {
          name: nameDom ? nameDom.textContent : '',
          uid: dom.getAttribute('data-uid'),
          anchor: dom.getAttribute('data-anchor'),
        }
      },
    },
  ],
  toDOM: (node: Node) => {
    const { name, uid, anchor } = node.attrs
    const attrs = {
      class: 'q-mention',
      'data-type': 'q-mention',
      'data-uid': uid,
      'data-anchor': anchor || 'undefined',
    }
    return ['a', attrs, '@ ', ['b', name]]
  },
}
