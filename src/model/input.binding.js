import { Binding } from "domodel"

/**
 * @global
 */
class InputBinding extends Binding {

	/**
	 * @param {object}   properties
	 * @param {Editor}   properties.editor
	 * @param {Template} properties.template
	 */
	constructor(properties) {
		super(properties)
	}

	onCreated() {

		const { editor, template } = this.properties

		this.root.addEventListener("input", () => {
			editor.emit("inputChanged", { html: template.toHTML(this.root.textContent), raw: template.toRaw(this.root.innerHTML) })
		})

		this.root.addEventListener("keypress", event => {
			if (event.keyCode === 13) {
				event.preventDefault()
				const selection = this.root.ownerDocument.getSelection()
				const range = selection.getRangeAt(0)
				const brNode = document.createTextNode("\n")
				range.insertNode(brNode)
				range.setStartAfter(brNode)
			}
		})

	}

}

export default InputBinding
