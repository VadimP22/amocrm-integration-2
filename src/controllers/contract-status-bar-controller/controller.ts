import { ContractStatusBar } from "../../components/contract-status-bar-component/component"
import { StatusBarItem } from "../../components/contract-status-bar-component/interfaces"

declare const $: any

export class ContractStatusBarController {
    private contractId: string

    constructor(private contractStatusBar: ContractStatusBar) {
        this.contractStatusBar.setOnSelectCallback((key: string) => {
            this.updateContractSelectedId(key)
        })
    }

    public setContractId(newContractId: string) {
        this.contractId = newContractId
        this.fetch()
    }

    private fetch() {
        $.get(`/api/v4/leads/${this.contractId}`).done((response1: any) => {
            console.log(response1)

            $.get(`/api/v4/leads/pipelines/${response1.pipeline_id}`).done((response2: any) => {
                console.log(response2)
                this.apply(response2._embedded.statuses, `${response1.status_id}`)
            }).fail(function (err: any) {
                console.log(err)
            })

        }).fail(function (err: any) {
            console.log(err)
        })
    }

    private apply(statuses: Array<any>, selectedId: string) {
        let items: Array<StatusBarItem> = []
        let selectedKey = ""

        for (let status of statuses) {
            items.push({
                key: `${status.id}`,
                text: status.name,
                color: status.color
            })

            if (selectedId == `${status.id}`) {
                selectedKey = `${status.id}`
            }
        }

        this.contractStatusBar.setItems(items, selectedKey)

    }

    private updateContractSelectedId(newContractStatusId: string) {
        let newStatusId = parseInt(newContractStatusId)
        let object = {status_id: newStatusId}
        let json = JSON.stringify(object)

        $.ajax({
            type: 'PATCH',
            url: `/api/v4/leads/${this.contractId}`,
            data: json,
            processData: false,
            contentType: 'application/json',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }
}