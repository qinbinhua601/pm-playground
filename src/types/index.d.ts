import {NodeSelection, TextSelection} from 'prosemirror-state'
import { EditorView } from 'prosemirror-view';
export {};

declare global {
  interface Window {
    getJsonFromHTML: any;
    getHTMLStringFromState: any;
    view: EditorView;
    NodeSelection: NodeSelection;
    TextSelection: TextSelection;
    copyHtmlToClipboard: () => void;
    reconfig: () => void;
    currentSelectedIndex: number;
    app: any;
    Vue: any;
    textRange: any;
    getValue: any;
  }
}
