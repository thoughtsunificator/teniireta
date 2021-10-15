import assert from "assert"
import { Observable } from "domodel"

import { Editor } from "../index.js"

describe("Editor", () => {

	it("instance", () => {
		assert.ok(Editor.prototype instanceof Observable)
	})

})
