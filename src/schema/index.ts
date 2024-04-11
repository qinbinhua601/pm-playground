import { Schema } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import uneditable from './uneditable'
import atom_demo from './atom_demo'
import mention from './mention'
import { customCreateListSpec } from '../extensions/flatList'

let nodes = schema.spec.nodes
nodes = nodes.addToEnd('uneditable', uneditable)
nodes = nodes.addToEnd('atom_demo', atom_demo)
nodes = nodes.addToEnd('mention', mention)
nodes = nodes.remove('image')
nodes = nodes.append({ list: customCreateListSpec() })

// HACK: mock strong as inclusive to test the compositionstart logic
schema.marks.strong.spec.inclusive = false;

export const mySchema = new Schema({
  nodes,
  marks: schema.spec.marks
})

export default {
  uneditable,
  atom_demo
}