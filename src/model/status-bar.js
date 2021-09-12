export default {
	tagName: "div",
	className: "status_bar",
	children: [
		{
			tagName: "div",
			textContent: "Mode:"
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					children: [
						{
							tagName: "input",
							type: "radio",
							name: "mode",
							checked: true,
							identifier: "html"
						},
						{
							tagName: "span",
							textContent: `HTML`
						}
					]
				}
			]
		},
		{
			tagName: "div",
			children: [
				{
					tagName: "label",
					children: [
						{
							tagName: "input",
							type: "radio",
							name: "mode",
							identifier: "raw"
						},
						{
							tagName: "span",
							textContent: `Raw`
						}
					]
				}
			]
		}
	]
}
