import { UserSelectorItem } from "./interfaces";
import template from "templates/user-selector.twig"

export class UserSelector {
    private root: Element | null
    private items: Array<UserSelectorItem>
    private selectedKey: string
    private onSelect: (key: string) => void = (key: string) => {console.log(key)}

    constructor(private ctx: any, private uniquePrefix: string) {}

    mount(root: Element) {
        this.root = root
    }

    setItems(newItems: Array<UserSelectorItem>, selectedKey: string) {
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
        let selectorTitle = document.getElementById(this.uniquePrefix + "-user-selected")
        let listRoot = document.getElementById(this.uniquePrefix + "-user-selector-list-root")

        selectorTitle.addEventListener("click", () => {
            listRoot.classList.toggle("hidden")
        })

        
        for (let item of this.items) {
            if (item.type == "user") {
                let itemElement = document.getElementById(this.uniquePrefix + "-user-selector-item-" + item.key)
                
                itemElement.addEventListener("click", () => {
                    this.onSelect(item.key)
                    listRoot.classList.toggle("hidden")
                    this.setItems(this.items, item.key)
                })
            }
        }
        
    }


}