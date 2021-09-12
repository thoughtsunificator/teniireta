import { Core, Binding } from "domodel"

import InputModel from "./input.js"

import InputBinding from "./input.binding.js"

export default class extends Binding {

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

			editor.emit("initialized")
		})

	}

}
