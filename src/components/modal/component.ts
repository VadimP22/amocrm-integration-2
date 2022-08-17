import template from "templates/modal.twig"

export class Modal {
    private div: Element

    constructor(private ctx: any, private uniquePrefix: string, dark = false) {
        let bg = "bg-white"
        if (dark) {
            bg = "bg-slate-600"
        }

        this.div = document.createElement("div")
        this.div.className = "hidden z-50 flex fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-gray-900/40 backdrop-blur-sm"
        this.div.innerHTML = this.ctx.render(template, {prefix: this.uniquePrefix, bg: bg})

        document.body.appendChild(this.div)

        this.bindEventListeners()
    }

    private bindEventListeners() {
        let closeButton = document.getElementById(this.uniquePrefix + "-modal-close-button")

        closeButton.onclick = () => {
            this.switchVisibility()
        }
    }

    public getContentNode() {
        return document.getElementById(this.uniquePrefix + "-modal-content")
    }

    public switchVisibility() {
        this.div.classList.toggle("hidden")
    }
}