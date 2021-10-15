import { Binding } from "domodel"

/**
 * @global
 */
class StatusBarBinding extends Binding {

	/**
	 * @param {object} properties
	 * @param {Editor} properties.editor
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { editor } = this.properties

		this.identifier.html.addEventListener("change", () => {
			editor.emit("setHTMLMode")
		})

		this.identifier.raw.addEventListener("change", () => {
			editor.emit("setRawMode")
		})

	}

}

export default StatusBarBinding
