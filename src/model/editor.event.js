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

	/**
	 * @event EditorEventListener#setRawMode
	 */

	/**
	 * @event EditorEventListener#setRaw
	 * @property {string} data
	 */

}

export default EditorEventListener
