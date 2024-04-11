import {
  ListAttributes,
  ProsemirrorNode,
  createListClipboardPlugin,
  createListRenderingPlugin,
  createSafariInputMethodWorkaroundPlugin,
  defaultListClickHandler,
  handleListMarkerMouseDown,
  listInputRules,
  listKeymap,
  ListToDOMOptions,
  createListSpec,
  listToDOM,
} from 'prosemirror-flat-list'
import { keymap } from 'prosemirror-keymap'
import { Plugin } from 'prosemirror-state'
import { inputRules } from 'prosemirror-inputrules'
import { Node, NodeSpec, Schema } from 'prosemirror-model'

export const listKeymapPlugin = keymap(listKeymap)
export const listInputRulePlugin = inputRules({ rules: listInputRules })

export function customCreateListPlugins({ schema }: { schema: Schema }) {
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

export function customCreateListSpec() {
  const spec: NodeSpec = createListSpec()
  spec.attrs!.collapsed.default = true
  spec.toDOM = (node: Node) => {
    return customListToDOM({ node })
  }
  return spec
}

function customListToDOM(options: ListToDOMOptions) {
  if (options.nativeList) {
    return listToDOM(options)
  }

  const attrs = options.node.attrs as ListAttributes
  if (attrs.kind !== 'ordered') {
    return listToDOM(options)
  }

  return listToDOM({
    ...options,
    getMarkers: () => {
      // Return an empty array to render an empty marker container element.
      return []
    },
  })
}
