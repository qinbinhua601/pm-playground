import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { DOMParser } from 'prosemirror-model'
import { gapCursor } from 'prosemirror-gapcursor'
import { exampleSetup } from 'prosemirror-example-setup'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import { mySchema } from './schema'
import injectToWindow from './utils/inject'
import { UneditableView } from './extensions/uneditable/UneditableView'
import fixChromeCompositionSolution1 from './plugins/fixChromeComposition'
import fixChromeCompositionSolution2 from './plugins/fixChromeComposition2'
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
      fixChromeCompositionSolution1(),
      // fixChromeCompositionSolution2(),
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


const plugins = window.view.state.plugins.map((item) => item.key)

if(plugins.includes('fixChromeCompositionKey$')) {
  document.getElementById('app').innerText = 'fixChromeComposition'
}

if (plugins.includes('fixChromeCompositionSolution2Key$')) {
  document.getElementById('app').innerText = 'fixChromeComposition2'
}