import { Node } from 'prosemirror-model'
// atom_demo
export default {
  group: "inline",
  inline: true,
  atom: true,
  attrs: {},
  parseDOM: [{
    tag: "span[data-atom-demo]",
  }],          
  toDOM: (_node: Node) => {
    const dom = document.createElement("span");
    dom.setAttribute("data-atom-demo", "true");
    dom.innerText = " atom ";
    return dom;
  },
}