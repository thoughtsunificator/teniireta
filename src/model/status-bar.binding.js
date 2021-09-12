import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { editor } = this.properties

		this.identifier.html.addEventListener("change", () => {
			editor.emit("mode set html")
		})

		this.identifier.raw.addEventListener("change", () => {
			editor.emit("mode set raw")
		})

	}

}
