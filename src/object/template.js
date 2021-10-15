/**
 * @global
 */
class Template {

	/**
	 * @abstract
	 * @param {string} input
	 * @returns {string}
	 */
	toHTML(input) {

	}

	/**
	 * @abstract
	 * @param {string} input
	 * @returns {string}
	 */
	toRaw(input) {

	}

}

export default Template
