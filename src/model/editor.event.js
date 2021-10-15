import { EventListener } from "domodel"

/**
 * @global
 */
class EditorEventListener extends EventListener {

	/**
	 * @event EditorEventListener#inputLoaded
	 */

	/**
	 * @event EditorEventListener#inputChanged
	 * @property {object} data
	 * @property {string} data.html
	 * @property {string} data.raw
	 */

	/**
	 * @event EditorEventListener#keyPressed
	 * @property {Event} event
	 */

	/**
	 * @event EditorEventListener#setHTMLMode
	 */
	setHTMLMode() {
		const { template } = this.properties
		this.root.innerHTML = template.toHTML(this.root.textContent)
	}

	/**
	 * @event EditorEventListener#setRawMode
	 */
	setRawMode() {
		const { template } = this.properties
		this.root.textContent = template.toRaw(this.root.innerHTML)
	}

	/**
	 * @event EditorEventListener#setRaw
	 * @property {string} data
	 */
	setRaw(data) {
		const { editor, template } = this.properties
		const html = template.toHTML(data)
		this.root.innerHTML = html
		editor.emit("inputChanged", { html, raw: data })
	}

}

export default EditorEventListener
