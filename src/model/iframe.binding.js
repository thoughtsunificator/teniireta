import { Core, Binding } from "domodel"

import InputModel from "./input.js"

import InputBinding from "./input.binding.js"

/**
 * @global
 */
class IframeBinding extends Binding {

	/**
	 * @param {object}   properties
	 * @param {Editor}   properties.editor
	 * @param {Template} properties.template
	 * @param {string}   [properties.inputStylesheetURL=null]
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { editor, template, inputStylesheetURL } = this.properties

		this.root.addEventListener("load", () => {

			if(inputStylesheetURL !== null) {
				const inputStylesheetLink = document.createElement("link")
				inputStylesheetLink.href = inputStylesheetURL
				inputStylesheetLink.type = "text/css"
				inputStylesheetLink.rel = "stylesheet"
				this.root.contentDocument.head.appendChild(inputStylesheetLink)
			}

			this.run(InputModel, {
				method: Core.METHOD.REPLACE_NODE,
				binding: new InputBinding(),
				parentNode: this.root.contentDocument.body,
			})

			editor.emit("inputLoaded")

		})

	}

}

export default IframeBinding
