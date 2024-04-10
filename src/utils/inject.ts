import { getHTMLStringFromState, getJsonFromHTML } from "./index"
import {NodeSelection, TextSelection} from 'prosemirror-state'

/**
 * copy the html content to the clipboard
 */
function copyHtmlToClipboard() {
  const html = getHTMLStringFromState(window.view.state)
  const textarea = document.createElement('textarea')
  textarea.value = html
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function getValue() {
  const html = getHTMLStringFromState(window.view.state)
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent
}

let reusedRange= null

const textRange = function(node, from, to) {
  let range = reusedRange || (reusedRange = document.createRange())
  range.setEnd(node, to == null ? node.nodeValue.length : to)
  range.setStart(node, from || 0)
  return range
}

/**
 * inject to the global window object
 */
export default function () {
  window.NodeSelection = NodeSelection
  window.TextSelection = TextSelection
  window.copyHtmlToClipboard = copyHtmlToClipboard
  window.getHTMLStringFromState = getHTMLStringFromState
  window.textRange = textRange
  window.getValue = getValue
  window.getJsonFromHTML = getJsonFromHTML
}