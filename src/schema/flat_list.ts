import { createListSpec } from "prosemirror-flat-list"

const myList = createListSpec()
export default {
  ...myList,
  attrs: {
    ...myList.attrs,
    collapsed: {
      default: true
    }
  }
}