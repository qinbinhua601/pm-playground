import { Schema } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
// import { addListNodes } from 'prosemirror-schema-list'
import uneditable from './uneditable'
import atom_demo from './atom_demo'
import mention from './mention'
// import flat_list from './flat_list'
import { ListAttributes, ListToDOMOptions, createListSpec, listToDOM } from 'prosemirror-flat-list'

let nodes = schema.spec.nodes
nodes = nodes.addToEnd('uneditable', uneditable)
nodes = nodes.addToEnd('atom_demo', atom_demo)
nodes = nodes.addToEnd('mention', mention)
nodes = nodes.remove('image')
// remote the original pm list
// nodes = nodes.remove('list')
// nodes = nodes.addToEnd('flat_list', flat_list)
nodes = nodes.append({ list: customCreateListSpec() })

schema.marks.strong.spec.inclusive = false;

export const mySchema = new Schema({
  // nodes: addListNodes(nodes, 'paragraph block*', 'block'),
  nodes,
  marks: schema.spec.marks
})

function customCreateListSpec() {
  const spec = createListSpec()
  spec.attrs.collapsed.default = true
  spec.toDOM = (node) => {
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

export default {
  uneditable,
  atom_demo
}