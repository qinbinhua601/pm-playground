import { Plugin, PluginKey } from 'prosemirror-state'
import { EditorView, __endComposition } from 'prosemirror-view'

const fixChromeCompositionKey = new PluginKey('fixChromeCompositionKey')

export default function () {
  return new Plugin({
    key: fixChromeCompositionKey,
    props: {
      handleDOMEvents: {
        compositionstart(_view: EditorView) {
          const view = _view as EditorView & {
            domObserver: any,
            markCursor: any,
            input: any,
          }
          if (!view.composing) {
            view.domObserver.flush()
            let { state } = view,
              $pos = state.selection.$from
            if (
              state.selection.empty &&
              (state.storedMarks ||
                (!$pos.textOffset &&
                  $pos.parentOffset &&
                  $pos.nodeBefore!.marks.some(
                    (m) => m.type.spec.inclusive === false && m.type.name === 'strong'
                  )))
            ) {
              console.log('trigger the hacking solution 1111')
              // Need to wrap the cursor in mark nodes different from the ones in the DOM context
              view.markCursor = view.state.storedMarks || $pos.marks()
              __endComposition(view)
              view.markCursor = null
              console.log('qin', 'hacked', view.composing)
              view.input.composing = true;
            }
            return false
          }
        },
      },
    },
  })
}
