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

		this.listen(editor, "setHTMLMode", () => {
			this.root.innerHTML = template.toHTML(this.root.textContent)
		})

		this.listen(editor, "setRawMode", () => {
			this.root.textContent = template.toRaw(this.root.innerHTML)
		})

		this.listen(editor, "setRaw", (data) => {
			const html = template.toHTML(data)
			this.root.innerHTML = html
			editor.emit("inputChanged", { html, raw: data })
		})

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
