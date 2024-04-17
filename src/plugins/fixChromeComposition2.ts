import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

const fixChromeCompositionSolution2Key = new PluginKey('fixChromeCompositionSolution2Key')

// 零宽字符
const ZERO_WIDTH_SPACE = '\u200B'

export default function () {
  return new Plugin({
    key: fixChromeCompositionSolution2Key,
    props: {
      handleDOMEvents: {
        compositionstart(view: EditorView) {
          if (!view.composing) {
            const { state } = view
            const { tr } = state
            const { from, $from: $pos } = state.selection
            if (
              state.selection.empty &&
              (state.storedMarks ||
                (!$pos.textOffset &&
                  $pos.parentOffset &&
                  $pos.nodeBefore!.marks.some(
                    (m) =>
                      m.type.spec.inclusive === false &&
                      m.type.name === 'strong'
                  )))
            ) {
              console.log('trigger the hacking solution 2222')
              tr.insertText(ZERO_WIDTH_SPACE)
              tr.setSelection(TextSelection.create(tr.doc, from, from + 1))
              tr.setMeta('addToHistory', false)
              view.dispatch(tr)
            }
          }
          return false
        },
      },
    },
  })
}
