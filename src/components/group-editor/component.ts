import { DifferenceItem, DifferenceType, GroupItem } from "./interfaces";
import template from "templates/group-editor.twig"

export class GroupEditor {
    private initialList: Array<GroupItem>
    private differences: Array<DifferenceItem> = []
    private root: Element | null
    private onSaveCallback: (diffs: Array<DifferenceItem>) => void = (diffs: Array<DifferenceItem>) => {console.log(diffs)}


    constructor(private ctx: any, private uniquePrefix: string) {}

    mount(root: Element) {
        this.root = root
    }

    setItems(initialList: Array<GroupItem>) {
        this.initialList = initialList
        this.render()
        this.bindEventListeners()
    }

    setOnSaveCallback(newCallback: (diffs: Array<DifferenceItem>) => void) {
        this.onSaveCallback = newCallback
    }

    private render() {
        if (typeof(this.root) !== "undefined") {
            this.root.innerHTML = this.ctx.render(template, {
                items: this.initialList,
                prefix: this.uniquePrefix,
            })
        }
        else {
            throw new Error("Component isn't mounted")
        }
    }

    private bindEventListeners() {
        for (let item of this.initialList) {
            let e = document.getElementById(this.uniquePrefix + "-remove-btn-" + item.key)
            e.addEventListener("click", () => {
                console.log("remove", item.key)
                this.remove(item.key)
                this.differences.push({
                    type: "delete",
                    key: item.key,
                    previos: "",
                    new: ""
                })
                this.setItems(this.initialList)
            })
        }

        let addInput: any = document.getElementById(this.uniquePrefix + "-add-input")

        let addButton = document.getElementById(this.uniquePrefix + "-add-btn")
        addButton.addEventListener("click", () => {
            console.log("add", addInput.value)
            this.initialList.push({
                key: "new",
                name: addInput.value
            })

            this.differences.push({
                type: "add",
                key: "",
                previos: addInput.value,
                new: addInput.value
            })

            this.setItems(this.initialList)
        })

        let saveButton = document.getElementById(this.uniquePrefix + "-save-btn") 
        saveButton.addEventListener("click", () => {
            console.log("save")
            this.onSaveCallback(this.differences)
        })


    }

    private remove(key: string) {
        this.initialList = this.initialList.filter((gi) => { return gi.key != key})
    }
}