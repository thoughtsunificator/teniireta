import { Observable } from "domodel"

export default class extends Observable {

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
