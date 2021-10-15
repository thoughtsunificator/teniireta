import { Observable } from "domodel"

/**
 * @global
 */
class Editor extends Observable {

	constructor() {
		super()
		this._toolbar = null
	}

	/**
	 * @type {Toolbar}
	 */
	get toolbar() {
		return this._toolbar
	}

	set toolbar(toolbar) {
		this._toolbar = toolbar
	}

}

export default Editor
