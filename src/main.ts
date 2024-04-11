import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { DOMParser } from 'prosemirror-model'
import { gapCursor } from 'prosemirror-gapcursor'
import { exampleSetup } from 'prosemirror-example-setup'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import { mySchema } from './schema'
import injectToWindow from './utils/inject'
import { UneditableView } from './extensions/uneditable/UneditableView'
import fixChromeComposition from './plugins/fixChromeComposition'
import { listInputRulePlugin, listKeymapPlugin, customCreateListPlugins } from './extensions/flatList'

// create the EditorView instance
window.view = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector('#content') as HTMLDivElement
    ),
    plugins: [
      listKeymapPlugin,
      listInputRulePlugin,
      ...customCreateListPlugins({ schema: mySchema }),
      ...exampleSetup({ schema: mySchema }),
      gapCursor(),
      fixChromeComposition()
    ],
  }),
  editable: () => true,
  nodeViews: {
    uneditable(node, view, getPos) {
      return new UneditableView(node, view, getPos)
    },
  },
})

// add dev tools
applyDevTools(window.view)

injectToWindow()