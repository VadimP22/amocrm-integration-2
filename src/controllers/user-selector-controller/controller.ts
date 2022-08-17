import { UserSelector } from "../../components/user-selector/component"
import { UserSelectorItem } from "../../components/user-selector/interfaces"

declare const $: any

export class UserSelectorController {
    private contractId: string

    constructor(private userSelector: UserSelector) {
        userSelector.setOnSelectCallback((key: string) => {
            this.updateAssignee(key)
        })
    }

    public setContractId(newContractId: string) {
        this.contractId = newContractId
        this.fetch()
    }

    private fetch() {
        $.get("/ajax/get_managers_with_group/").done((response1: any) => {
            console.log(response1)

            $.get(`/api/v4/leads/${this.contractId}`).done((response2: any) => {
                console.log(response2)
                this.apply(response1.groups, response1.managers, `${response2.responsible_user_id}`)
            }).fail((err: any) => {
                console.log(err)
            })
            
        }).fail((err: any) => {
            console.log(err)
        })
    }

    private apply(groups: any, managers: any, responsibleUserId: string) {
        let items: Array<UserSelectorItem> = []

        for (let group in groups) {
            let newGroupItem: UserSelectorItem = {
                key: "group",
                text: groups[group],
                type: "group"
            }
            items.push(newGroupItem)

            for (let manager in managers) {
                if (managers[manager].group == group) {
                    items.push({
                        key: manager,
                        text: managers[manager].title,
                        type: "user"
                    })
                }
            }

        }

        console.log(items)
        this.userSelector.setItems(items, responsibleUserId)
    }

    private updateAssignee(id: string) {
        let newAssigneeId = parseInt(id)
        let object = {responsible_user_id: newAssigneeId}
        let json = JSON.stringify(object)

        $.ajax({
            type: 'PATCH',
            url: `/api/v4/leads/${this.contractId}`,
            data: json,
            processData: false,
            contentType: 'application/json',
        }).done(function (response: any) {
            console.log(response)
        }).fail(function (err: any) {
            console.log(err)
        });
    }
}