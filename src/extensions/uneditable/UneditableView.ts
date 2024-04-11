export class UneditableView {
  dom: HTMLSpanElement
  constructor(node, view, getPos) {
    // console.log(node);
    this.dom = document.createElement("span");
    this.dom.style.color = 'red'
    const div = document.createElement("span");
    // div.setAttribute('contenteditable', 'false')
    div.textContent = node.attrs.num.toString();
    this.dom.appendChild(div);
  }
  selectNode() {
    this.dom.classList.add("ProseMirror-selectednode")
    this.dom.removeAttribute('contenteditable')
  }
  deselectNode() {
    this.dom.classList.remove("ProseMirror-selectednode")
    this.dom.setAttribute('contenteditable', 'false')
    // this.dom.removeAttribute('contenteditable')
  }
}