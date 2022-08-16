import { ContractStatusBar } from "./components/contract-status-bar";
import { StatusBarItem } from "./components/contract-status-bar/interfaces";
import { render } from "./devutils/render";


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
                    let items: Array<StatusBarItem> = [
                        {key: "k1", text: "hello1", color: "red"},
                        {key: "k2", text: "hello2", color: "green"},
                        {key: "k3", text: "hello3", color: "blue"}
                    ]
                    let el = document.querySelector("#edit_card > div > div.card-entity-form__top > div.linked-form__field.linked-form__field_status.linked-form__field_status-lead")
                    console.log("el", el)
                    csb.mount(el)
                    csb.setItems(items, "k2")
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