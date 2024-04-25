import { EditorView } from "prosemirror-view";
import { Node } from "prosemirror-model";

export class Uneditable {
  dom: HTMLSpanElement
  constructor(node: Node, _view:EditorView) {
    this.dom = document.createElement("span");
    this.dom.style.color = 'red'
    const div = document.createElement("span");
    div.textContent = node.attrs.num.toString();
    this.dom.appendChild(div);
  }
  selectNode() {
    this.dom.classList.add("ProseMirror-selectednode")
  }
  deselectNode() {
    this.dom.classList.remove("ProseMirror-selectednode")
  }
}