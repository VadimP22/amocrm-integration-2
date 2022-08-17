import { UserAdderItem } from "./interfaces";
import template from "templates/user-adder.twig"

export class UserAdder {
    private root: Element | null
    private items: Array<UserAdderItem>
    private selectedKey: string
    private onSelect: (key: string, newValue: boolean) => void = (key: string, newValue: boolean) => {console.log(key, newValue)}
    private isListHidden: boolean = true

    constructor(private ctx: any, private uniquePrefix: string) {}

    mount(root: Element) {
        this.root = root
    }

    setItems(newItems: Array<UserAdderItem>) {
        this.items = newItems
        this.render()
        this.bindEventListeners()
    }

    setOnSelectCallback(newOnSelect: (key: string, newValue: boolean) => void) {
        this.onSelect = newOnSelect
    }

    private render() {
        if (typeof(this.root) !== "undefined") {
            this.root.innerHTML = this.ctx.render(template, {
                items: this.items,
                prefix: this.uniquePrefix,
                isListHidden: this.isListHidden
            })
        }
        else {
            throw new Error("Component isn't mounted")
        }
    }

    private bindEventListeners() {
        let listRoot = document.getElementById(this.uniquePrefix + "-user-adder-list-root")
        let title = document.getElementById(this.uniquePrefix + "-user-adder-title")

        title.addEventListener("click", () => {
            this.isListHidden = !this.isListHidden
            this.setItems(this.items)
        })

        for (let item of this.items) {
            if (item.type == "user") {
                let element = document.getElementById(this.uniquePrefix + "-user-adder-item-" + item.key)
                element.addEventListener("click", () => {
                    item.isSelected = !item.isSelected
                    this.onSelect(item.key, item.isSelected)
                    this.setItems(this.items)
                })
            }
        }
    }


}