import { UserAdder } from "../../components/user-adder/component"
import { UserAdderItem } from "../../components/user-adder/interfaces"

declare const $: any

export class UserAdderController {
    private contractId: string

    constructor(private userAdder: UserAdder) {
        this.userAdder.setOnSelectCallback((key: string, newValue: boolean) => {
            if (newValue) {
                this.subscribe(key)
            } 
            else {
                this.unsubscribe(key)
            }
        })
    }

    public setContractId(newContractId: string) {
        this.contractId = newContractId
        this.fetch()
    }

    private fetch() {
        $.get("/ajax/get_managers_with_group/").done((response1: any) => {
            $.get(`/api/v4/leads/${this.contractId}/subscriptions`).done((response2: any) => {
                
                this.apply(response2._embedded.subscriptions, response1.managers, response1.groups)
            }).fail((err: any) => {
                console.log(err)
            })
                
        }).fail((err: any) => {
            console.log(err)
        })
    }

    private apply(subscriptions: Array<any>, managers: any, groups: any) {
        console.log(subscriptions)
        console.log(managers)
        console.log(groups)

        let items: Array<UserAdderItem> = []


        for (let group in groups) {
            let newGroupItem: UserAdderItem = {
                key: "group",
                text: groups[group],
                type: "group",
                isSelected: false
            }
            items.push(newGroupItem)

            for (let manager in managers) {
                if (managers[manager].group == group) {
                    items.push({
                        key: manager,
                        text: managers[manager].title,
                        type: "user",
                        isSelected: false
                    })
                }
            }

        }

        for (let s of subscriptions) {
            let subscriberId = `${s.subscriber_id}`
            for (let item of items) {
                if (item.key == subscriberId) {
                    item.isSelected = true
                }
            }
        }


        this.userAdder.setItems(items)
    }

    private getUnsubscribeFormData(userId: string): string {
        return `request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Buser_id%5D%5B%5D=${userId}&request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Bentity_type%5D=2&request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Bentity_id%5D=${this.contractId}&request%5Bsubscriptions%5D%5Bunsubscribe%5D%5Bevent%5D=chat_message`
    }

    private getSubscribeFormData(userId: string): string {
        return `request%5Bsubscriptions%5D%5Bsubscribe%5D%5Buser_id%5D%5B%5D=${userId}&request%5Bsubscriptions%5D%5Bsubscribe%5D%5Bentity_type%5D=2&request%5Bsubscriptions%5D%5Bsubscribe%5D%5Bentity_id%5D=${this.contractId}&request%5Bsubscriptions%5D%5Bsubscribe%5D%5Bevent%5D=chat_message`
    }

    private subscribe(userId: string) {
        $.ajax({
            type: 'POST',
            url: "/ajax/v1/subscriptions/subscribe",
            data: this.getSubscribeFormData(userId),
            processData: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }

    private unsubscribe(userId: string) {
        $.ajax({
            type: 'POST',
            url: "/ajax/v1/subscriptions/unsubscribe",
            data: this.getUnsubscribeFormData(userId),
            processData: false,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        }).done(function (response: any) {
            
        }).fail(function (err: any) {
            console.log(err)
        });
    }
}