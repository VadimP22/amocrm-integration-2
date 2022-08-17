import template from "templates/contract-status-bar.twig"
import { StatusBarItem } from "./interfaces"

export class ContractStatusBar {
    private root: Element | null
    private items: Array<StatusBarItem>
    private onSelect: (key: string) => void = (key: string) => {console.log(key)}
    private selectedKey: string

    constructor(private ctx: any, private uniquePrefix: string) {}

    mount(root: Element) {
        this.root = root
    }

    setItems(newItems: Array<StatusBarItem>, selectedKey: string) {
        this.items = newItems
        this.selectedKey = selectedKey

        this.render()
        this.bindEventListeners()
    }

    setOnSelectCallback(newOnSelect: (key: string) => void) {
        this.onSelect = newOnSelect
    }

    private render() {
        if (typeof(this.root) !== "undefined") {
            this.root.innerHTML = this.ctx.render(template, {
                items: this.items,
                prefix: this.uniquePrefix,
                selectedKey: this.selectedKey
            })
        }
        else {
            throw new Error("Component isn't mounted")
        }
    }

    private bindEventListeners() {
        let listRoot = document.getElementById(this.uniquePrefix + "-list-root")
        let status = document.getElementById(this.uniquePrefix + "-status")

        status.addEventListener("click", () => {
            listRoot.classList.toggle("hidden")
        })

        for (let item of this.items) {
            let itemElement = document.getElementById(this.uniquePrefix + "-item-" + item.key)

            itemElement.addEventListener("click", () => {
                this.onSelect(item.key)
                listRoot.classList.toggle("hidden")
                this.setItems(this.items, item.key)
            })
        }
    }
}