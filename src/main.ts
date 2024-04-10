import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { DOMParser } from 'prosemirror-model'
import { gapCursor } from 'prosemirror-gapcursor'
import { exampleSetup } from 'prosemirror-example-setup'
import { applyDevTools } from 'prosemirror-dev-toolkit'
// import { createListPlugins, listInputRules, listKeymap } from 'prosemirror-flat-list'
import {   ListAttributes,
  ProsemirrorNode,
  createListClipboardPlugin,
  createListRenderingPlugin,
  createSafariInputMethodWorkaroundPlugin,
  defaultListClickHandler,
  handleListMarkerMouseDown,
  listInputRules,
  listKeymap } from 'prosemirror-flat-list'
import { keymap } from 'prosemirror-keymap'
import { inputRules } from 'prosemirror-inputrules'
import { mySchema } from './schema'
import injectToWindow from './utils/inject'

const listKeymapPlugin = keymap(listKeymap)
const listInputRulePlugin = inputRules({ rules: listInputRules })
const listPlugins = customCreateListPlugins({ schema: mySchema })

console.log('iqn', listInputRules)

// create the EditorView instance
window.view = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      // '<p>123 <img src="https://i.picsum.photos/id/31/100/100.jpg?hmac=Ui97WnJnLgfGqyNJQduJHjppDXDxMFvJiBh6IAv1T2I" alt="1" title="1"></p><p>123<img src="https://i.picsum.photos/id/31/100/100.jpg?hmac=Ui97WnJnLgfGqyNJQduJHjppDXDxMFvJiBh6IAv1T2I" alt="1" title="1"></p><p></p><p></p>'
      // document.querySelector('#content2')
      // document.querySelector('#content3')
      // document.querySelector('#content4')
      document.querySelector('#content5') as HTMLDivElement
      // document.querySelector('#content')
    ),
    plugins: [
      listKeymapPlugin,
      listInputRulePlugin,
      ...listPlugins,
      ...exampleSetup({ schema: mySchema }),
      gapCursor()
    ],
  }),
  editable: () => true,
  nodeViews: {},
})

// add dev tools
applyDevTools(window.view)

injectToWindow()


function customCreateListPlugins({ schema }: { schema: Schema }) {
  return [
    customCreateListEventPlugin(),
    createListRenderingPlugin(),
    createListClipboardPlugin(schema),
    createSafariInputMethodWorkaroundPlugin(),
  ]
}

function customCreateListEventPlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        mousedown: (view, event) =>
          handleListMarkerMouseDown({
            view,
            event,
            onListClick: customListClickHandler,
          }),
      },
    },
  })
}

function customListClickHandler(node: ProsemirrorNode) {
  const attrs = node.attrs as ListAttributes
  if (attrs.kind !== 'ordered') {
    return defaultListClickHandler(node)
  }

  const collapsable = node.childCount >= 2
  const collapsed = collapsable ? !attrs.collapsed : false
  return { ...attrs, collapsed }
}
