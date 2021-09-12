import { Core, Binding } from "domodel"

import IframeModel from "./iframe.js"
import StatusBarModel from "./status-bar.js"

import IframeBinding from "./iframe.binding.js"
import StatusBarBinding from "./status-bar.binding.js"

export default class extends Binding {

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
