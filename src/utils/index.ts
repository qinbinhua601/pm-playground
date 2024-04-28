import { DOMSerializer, DOMParser } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { mySchema } from '../schema'

export const getHTMLStringFromState = (state: EditorState) => {
  const fragment = DOMSerializer.fromSchema(state.schema).serializeFragment(
    state.doc.content
  )
  const div = document.createElement('div')
  div.appendChild(fragment)
  return div.innerHTML
}

export const getJsonFromHTML = (html: string) => {
  const dom = document.createElement('div')
  dom.innerHTML = html
  const res = DOMParser.fromSchema(mySchema).parse(dom)
  // console.log(res)
  return res
}


