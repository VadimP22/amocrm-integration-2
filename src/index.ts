import { ContractStatusBar } from "./components/contract-status-bar-component/component";
import { StatusBarItem } from "./components/contract-status-bar-component/interfaces";
import { ContractStatusBarController } from "./controllers/contract-status-bar-controller/controller";
import { render } from "./devutils/render";
import style from "../styles/output.css"
import { UserSelector } from "./components/user-selector/component";
import { UserSelectorItem } from "./components/user-selector/interfaces";
import { UserSelectorController } from "./controllers/user-selector-controller/controller";
import { UserAdder } from "./components/user-adder/component";
import { UserAdderItem } from "./components/user-adder/interfaces";
import { UserAdderController } from "./controllers/user-adder-controller/controller";
import { Modal } from "./components/modal/component";
import { createContractSelect } from "./components/contract-select/component";


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
                return true;
            },

            dpSettings: function () {},

            advancedSettings: function () {
                console.log("advancedSettings")
                let buttonStyle = "border border-black hover:bg-gray-300"

                let workArea = document.querySelector("#work_area")
                


                let modal1 = new Modal({render}, "md-1", true)
                let modalButton1 = document.createElement("button")
                modalButton1.style.marginLeft = "30px"
                modalButton1.onclick = () => {modal1.switchVisibility()}
                modalButton1.innerHTML = "Статус-бар контракта"
                modalButton1.className = buttonStyle
                workArea.appendChild(modalButton1)

                let modal2 = new Modal({render}, "md-2")
                let modalButton2 = document.createElement("button")
                modalButton2.style.marginLeft = "30px"
                modalButton2.onclick = () => {modal2.switchVisibility()}
                modalButton2.innerHTML = "Выбор ответстенного"
                modalButton2.className = buttonStyle
                workArea.appendChild(modalButton2)

                let modal3 = new Modal({render}, "md-3")
                let modalButton3 = document.createElement("button")
                modalButton3.style.marginLeft = "30px"
                modalButton3.onclick = () => {modal3.switchVisibility()}
                modalButton3.innerHTML = "Подписчики контракта"
                modalButton3.className = buttonStyle
                workArea.appendChild(modalButton3)

                let modalButton4 = document.createElement("button")
                modalButton4.style.marginLeft = "30px"
                modalButton4.innerHTML = "Редактор групп"
                modalButton4.className = buttonStyle
                workArea.appendChild(modalButton4)


                let contractStatusBar = new ContractStatusBar({render}, "csb-1")
                contractStatusBar.mount(modal1.getContentNode())
                let statusBarController = new ContractStatusBarController(contractStatusBar)

                let userSelector = new UserSelector({render}, "us-1")
                userSelector.mount(modal2.getContentNode())
                let userSelectorController = new UserSelectorController(userSelector)

                let userAdder = new UserAdder({render}, "ua-1")
                userAdder.mount(modal3.getContentNode())
                let userAdderController = new UserAdderController(userAdder)

                $.get(`/api/v4/leads`).done((response: any) => {
                    console.log(response._embedded.leads)
                    let select = createContractSelect(response._embedded.leads, (key: string) => {
                        console.log(key)
                        statusBarController.setContractId(key)
                        userSelectorController.setContractId(key)
                        userAdderController.setContractId(key)
                        alert("Выбрано!")
                    })
                    workArea.appendChild(select)
                    alert("Сначала выберите сделку из списка!")

                    
                }).fail(function (err: any) {
                    console.log(err)
                })
                

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