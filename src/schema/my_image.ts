// my_image
export default {
  group: "inline",
  inline: true,
  atom: true,
  attrs: {
    src: {},
    alt: {default: null},
    title: {default: null}
  },
  allowGapCursor: true,
  draggable: true,
  parseDOM: [{tag: "img.my-image", getAttrs(dom) {
    return {
      src: dom.getAttribute("src"),
      title: dom.getAttribute("title"),
      alt: dom.getAttribute("alt")
    }
  }}],
  toDOM(node) {
    let {src, alt, title} = node.attrs;
    // return ["span", {class: 'my-image', 'data-my-image': true}, ["img", {src, alt, title}]] 
    return ["img", {src, alt, title, class: 'my-image'}]
  }
}
