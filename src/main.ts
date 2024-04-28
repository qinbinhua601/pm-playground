import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { DOMParser } from 'prosemirror-model'
import { gapCursor } from 'prosemirror-gapcursor'
import { exampleSetup } from 'prosemirror-example-setup'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import { mySchema } from './schema'
import injectToWindow from './utils/inject'
import { Uneditable } from './extensions/uneditable/UneditableView'
import fixChromeCompositionSolution1 from './plugins/fixChromeComposition'
import { listInputRulePlugin, listKeymapPlugin, customCreateListPlugins } from './extensions/flatList'
import showPluginsAvailability from './utils/showPluginsAvailability'

const plugins = [
  listKeymapPlugin,
  listInputRulePlugin,
  ...customCreateListPlugins({ schema: mySchema }),
  ...exampleSetup({ schema: mySchema }),
  gapCursor(),
  // fixChromeCompositionSolution1(),
]

if (location.href.indexOf('?fixChromeCompositionSolution1=1') !== -1) {
  plugins.push(fixChromeCompositionSolution1())
}

// create the EditorView instance
window.view = new EditorView(document.querySelector('#editor'), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector('#content') as HTMLDivElement
    ),
    plugins
  }),
  editable: () => true,
  nodeViews: {
    uneditable(node, view) {
      return new Uneditable(node, view)
    },
  },
})

// add dev tools
applyDevTools(window.view)

// export global functions to window
injectToWindow()

// show plugins availability
showPluginsAvailability()