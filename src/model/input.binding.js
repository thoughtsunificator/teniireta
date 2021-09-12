import { Binding } from "domodel"

export default class extends Binding {

	onCreated() {

		const { editor, template } = this.properties

		editor.listen("mode set html", () => {
			this.root.innerHTML = template.toHTML(this.root.textContent)
		})

		editor.listen("mode set raw", () => {
			this.root.textContent = template.toRaw(this.root.innerHTML)
		})

		editor.listen("raw set", data => {
			const html = template.toHTML(data)
			this.root.innerHTML = html
			editor.emit("indicators refresh")
			editor.emit("input changed", { html, raw: data })
		})

		// editor.listen("command run", data => {
		// 	const selection = this.root.ownerDocument.getSelection()
		// 	const range = selection.getRangeAt(0)
		// 	const nodeList = []
		// 	if(selection.focusNode !== this.root.ownerDocument.body) {
		// 		let currentNode = selection.focusNode
		// 		nodeList.push(currentNode)
		// 		while (currentNode.parentNode !== null) {
		// 			if (currentNode === this.root.ownerDocument.body) {
		// 				break
		// 			}
		// 			currentNode = currentNode.parentNode
		// 			nodeList.push(currentNode)
		// 		}
		// 	}
		// 	const extractData = data.formatCode.beforeExtract({ nodeList })
		// 	const documentFragment = range.extractContents()
		// 	const div = document.createElement("div")
		// 	div.appendChild(documentFragment)
		// 	const bbcode = template.toBBCode(div.innerHTML)
		// 	const bbNode = data.formatCode.createBBNode({ bbcode, value: data.value, extractData })
		// 	div.innerHTML = template.toHTML(bbNode.outerBBCode || bbNode.textContent)
		// 	const fragment = document.createDocumentFragment()
		// 	div.childNodes.forEach(child => {
		// 		fragment.appendChild(child)
		// 		child.addEventListener("click", event => {
		// 			console.log(event)
		// 		})
		// 	})
		// 	data.formatCode.insertNode({ range, fragment })
		// 	this.root.focus()
		// 	editor.emit("input changed", { html: this.root.innerHTML, raw: template.toBBCode(this.root.innerHTML) })
		// })

		this.root.addEventListener("focus", event => {
			editor.emit("focused", event)
		})

		this.root.ownerDocument.addEventListener("selectionchange", event => {
			editor.emit("selection changed", { event, selection: this.root.ownerDocument.getSelection() })
		})

		this.root.addEventListener("input", () => {
			editor.emit("input changed", { html: template.toHTML(this.root.textContent), raw: template.toRaw(this.root.innerHTML) })
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

		// this.root.addEventListener("keypress", (event) => {
		// 	if (event.keyCode === 13) {
		// 		event.preventDefault()
		// 		const selection = this.root.ownerDocument.getSelection()
		// 		let range = selection.getRangeAt(0)
		// 		let firstLineNode
		// 		let secondLineNode
		// 		if (range.collapsed === false) {
		// 			range.deleteContents()
		// 		}
		// 		const initialFocusNode = selection.focusNode
		// 		if (selection.focusNode.nodeType === Node.TEXT_NODE) {
		// 			const caretFirst = selection.focusOffset === 0
		// 			let caretInBetween = false
		// 			let focusNodeSurrounded = selection.focusNode.parentNode.tagName === "DIV"
		// 			firstLineNode = document.createElement("div")
		// 			firstLineNode.className = "paragraph"
		// 			if (selection.focusOffset >= 1) { // node is split
		// 				if (selection.focusOffset < selection.focusNode.length) {
		// 					caretInBetween = true
		// 				}
		// 				range.setStart(selection.focusNode, 0)
		// 			} else {
		// 				range.selectNode(selection.focusNode)
		// 			}
		// 			if (focusNodeSurrounded === true) {
		// 				let brNode
		// 				if (caretInBetween === true) {
		// 					secondLineNode = selection.focusNode.parentNode
		// 					let documentFragment = range.extractContents()
		// 					firstLineNode.appendChild(documentFragment)
		// 					range.setStartBefore(selection.focusNode.parentNode)
		// 					range.insertNode(firstLineNode)
		// 				} else {
		// 					if (caretFirst === true) {
		// 						secondLineNode = selection.focusNode
		// 						firstLineNode = document.createElement("div")
		// 						firstLineNode.className = "paragraph"
		// 						brNode = document.createElement("br")
		// 						firstLineNode.appendChild(brNode)
		// 						range.setStartBefore(secondLineNode)
		// 						range.insertNode(firstLineNode)
		// 					} else {
		// 						secondLineNode = document.createElement("div")
		// 						secondLineNode.className = "paragraph"
		// 						brNode = document.createElement("br")
		// 						secondLineNode.appendChild(brNode)
		// 						firstLineNode = selection.focusNode.parentNode
		// 						range.setStartAfter(firstLineNode)
		// 						range.insertNode(secondLineNode)
		// 					}
		// 				}
		// 				range = selection.getRangeAt(0)
		// 				if (caretInBetween === true) {
		// 					range.setStart(secondLineNode, 0)
		// 					range.setEnd(secondLineNode, 0)
		// 				} else if (caretFirst === true) {
		// 					range.setStart(initialFocusNode, 0)
		// 					range.setEnd(initialFocusNode, 0)
		// 				} else {
		// 					range.setStartBefore(brNode)
		// 					range.setEndBefore(brNode)
		// 				}
		// 			} else {
		// 				range.surroundContents(firstLineNode)
		// 				secondLineNode = document.createElement("div")
		// 				secondLineNode.className = "paragraph"
		// 				if (caretInBetween === true) {
		// 					let secondLineFocusNode = firstLineNode.nextSibling
		// 					range.selectNode(firstLineNode.nextSibling)
		// 					range.surroundContents(secondLineNode)
		// 					range.setStart(secondLineFocusNode, 0)
		// 					range.setEnd(secondLineFocusNode, 0)
		// 				} else {
		// 					let brNode = document.createElement("br")
		// 					secondLineNode.appendChild(brNode)
		// 					if (caretFirst === true) {
		// 						range.setStartBefore(firstLineNode)
		// 					} else {
		// 						range.setStartAfter(firstLineNode)
		// 					}
		// 					range.insertNode(secondLineNode)
		// 					range = selection.getRangeAt(0)
		// 					if (caretFirst === true) {
		// 						range.setStart(initialFocusNode, 0)
		// 						range.setEnd(initialFocusNode, 0)
		// 					} else {
		// 						range.setStartBefore(brNode)
		// 						range.setEndBefore(brNode)
		// 					}
		// 				}
		// 			}
		// 		} else {
		// 			secondLineNode = document.createElement("div")
		// 			secondLineNode.className = "paragraph"
		// 			const brNode = document.createElement("br")
		// 			secondLineNode.appendChild(brNode)
		// 			if (selection.focusNode === this.root) {
		// 				const secondLineClone = secondLineNode.cloneNode(true)
		// 				range.insertNode(secondLineNode)
		// 				range.setStartAfter(secondLineNode)
		// 				range.insertNode(secondLineClone)
		// 				range.setStartBefore(secondLineClone.firstChild)
		// 				range.setEndBefore(secondLineClone.firstChild)
		// 			} else {
		// 				range.setStartAfter(selection.focusNode)
		// 				range.insertNode(secondLineNode)
		// 				range.setStartBefore(brNode)
		// 				range.setEndBefore(brNode)
		// 			}
		// 		}
		// 		if(typeof firstLineNode === "undefined") {
		// 			secondLineNode.scrollIntoView()
		// 		} else {
		// 			firstLineNode.scrollIntoView()
		// 		}
		// 	}
		// })

	}

}
