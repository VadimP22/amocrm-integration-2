import { ContractStatusBar } from "./components/contract-status-bar-component/component";
import { StatusBarItem } from "./components/contract-status-bar-component/interfaces";
import { ContractStatusBarController } from "./controllers/contract-status-bar-controller/controller";
import { render } from "./devutils/render";
import style from "../styles/output.css"
import { UserSelector } from "./components/user-selector/component";
import { UserSelectorItem } from "./components/user-selector/interfaces";



let el = document.getElementById("11")
let us = new UserSelector({render}, "us1")
let items: Array<UserSelectorItem> = [
    {key: "g1", type: "group", text: "group1"},
    {key: "u1", type: "user", text: "user1"},
    {key: "u2", type: "user", text: "user2"},
] 
console.log("el", el)
console.log("us", us)
us.mount(el)
us.setItems(items, "u1")

declare function _define(arg0: string[], arg1: ($: any) => () => any): void
_define(['jquery'], function ($: any) {
    var CustomWidget = function () {
        var self = this, // для доступа к объекту из методов
        system = self.system(), //Данный метод возвращает объект с переменными системы.
        langs = self.langs;  //Объект локализации с данными из файла локализации (папки i18n)
  
        this.callbacks = {
            settings: function () {},

            

            init: function () {
                console.log("init")
                $('<script src="https://cdn.tailwindcss.com"></script>').appendTo("head");
                return true;
            },

            bind_actions: function () {
                //console.log("bind action")
                if (self.system().area == 'lcard') {
                    console.log("lcard bind_actions")
                }

                return true;
            },

            render: function () {
                if (self.system().area == 'lcard') {
                    console.log("lcard render")
                    let csb = new ContractStatusBar({render}, "sb1")
                    let el = document.querySelector("#edit_card > div > div.card-entity-form__top > div.linked-form__field.linked-form__field_status.linked-form__field_status-lead")
                    csb.mount(el)
                    let ctr = new ContractStatusBarController(csb)
                    ctr.setContractId("717515")
                }

                return true;
            },

            dpSettings: function () {},

            advancedSettings: function () {
                console.log("advancedSettings")
            },

            destroy: function () {},

            contacts: {
                selected: function () {}
            },

            onSalesbotDesignerSave: function (handler_code: any, params: any) {},

            leads: {
                selected: function () {}
            },

            todo: {
                selected: function () {}
            },

            onSave: function () {
                return true
            },

            onAddAsSource: function (pipeline_id: any) {}
        };

        return this;
    };
    return CustomWidget;
});