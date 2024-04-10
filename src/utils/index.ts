import { DOMSerializer, DOMParser } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { mySchema } from '../schema'

export const getHTMLStringFromState = (state: EditorState) => {
  const fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(
    state.doc.content
  )
  const div = document.createElement('div')
  div.appendChild(fragment)
  return div.innerHTML
}

export const modifyListPos = (view: EditorView, show: boolean) => {
  // 应该退出
  // if (view.state.selection.$from.pos !== view.state.selection.$to.pos) return;
  const { top, left } = view.coordsAtPos(view.state.selection.$from.pos)
  const div: HTMLDivElement = document.querySelector('.list')
  if (!show) {
    div.style.display = 'none'
    return
  }
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  div.style.left = left + 'px'
  div.style.top = `${top + scrollTop}px`
  div.style.display = 'block'
}


export const getJsonFromHTML = (html) => {
  const dom = document.createElement('div')
  dom.innerHTML = html
  const res = DOMParser.fromSchema(mySchema)
  .parse(dom)
  // console.log(res)
  return res


}