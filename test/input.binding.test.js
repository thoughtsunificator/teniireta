import assert from "assert"
import { JSDOM } from "jsdom"
import { Core, Binding } from "domodel"

import InputBinding from "../src/model/input.binding.js"

const virtualDOM = new JSDOM()
const window = virtualDOM.window
const { document } = window

const RootModel = { tagName: "div" }
let rootBinding

describe("InputBinding", () => {

	beforeEach(() => {
		rootBinding = new Binding()
		Core.run(RootModel, { parentNode: document.body, binding: rootBinding })
	})

	afterEach(() => {
		rootBinding.remove()
	})

	it("instance", () => {
		assert.ok(new Binding() instanceof Binding)
	})


	it("onCreated", () => {

	})

})
