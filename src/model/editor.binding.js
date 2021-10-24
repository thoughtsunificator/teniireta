import { Core, Binding } from "domodel"

import IframeModel from "./iframe.js"
import StatusBarModel from "./status-bar.js"

import IframeBinding from "./iframe.binding.js"
import StatusBarBinding from "./status-bar.binding.js"

import EditorEventListener from "./editor.event.js"

/**
 * @global
 */
class EditorBinding extends Binding {

	/**
	 * @param {object}   properties
	 * @param {Editor}   properties.editor
	 * @param {Template} properties.template
	 * @param {string}   [properties.inputStylesheetURL=null]
	 */
	constructor(properties) {
		super(properties, new EditorEventListener(properties.editor))
	}

	onCreated() {

		const { editor, template, inputStylesheetURL = null } = this.properties

		this.run(IframeModel, {
			binding: new IframeBinding(),
			parentNode: this.root
		})

		this.run(StatusBarModel, {
			binding: new StatusBarBinding(),
			parentNode: this.root
		})

	}

}

export default EditorBinding
