import { GroupEditor } from "../../components/group-editor/component";
import { DifferenceItem, GroupItem } from "../../components/group-editor/interfaces";

declare const $: any

export class GroupEditorController {
    constructor(private groupEditor: GroupEditor) {}

    process() { 
        $.get("/api/v4/account?with=users_groups").done((response: any) => {  
            let groups = response._embedded.users_groups
            let items: Array<GroupItem> = []
            for (let group of groups) {
                items.push({
                    key: `${group.id}`,
                    name: group.name
                })
            }
            this.groupEditor.setItems(items)

        }).fail((err: any) => {
            console.log(err)
        })

        this.groupEditor.setOnSaveCallback((diffs: Array<DifferenceItem>) => {
            for (let diff of diffs) {
                if (diff.type == "add") {
                    this.addGroup(diff.new)
                } 
                else if (diff.type == "delete") {
                    this.removeGroup(diff.key)
                }
            }
            alert("Сохранено!")
        })
    }

    private addGroup(name: string) {
        let formData = `name=${name}`
        $.ajax({
            type: 'POST',
            url: "/ajax/groups/add",
            data: formData,
            processData: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }

    private removeGroup(key: string) {
        $.ajax({
            type: 'POST',
            url: `/ajax/groups/del/${key}/`,
            data: "",
            processData: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }
}