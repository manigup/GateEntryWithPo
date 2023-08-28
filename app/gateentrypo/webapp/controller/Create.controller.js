sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/StandardListItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, StandardListItem) {
        "use strict";

        return Controller.extend("sap.fiori.gateentrypo.controller.Create", {

            onInit: function () {
                this.getView().setModel(new JSONModel({}), "HeaderModel");
                this.getView().setModel(new JSONModel([]), "MaterialModel");
            },

            onF4Help: function (evt) {
                this.f4Source = evt.getSource();
                this.oTemplate = new StandardListItem({ title: "{Po_Number}" });
                this.openF4Help("Select PO Number", "/PoList");
            },

            openF4Help: function (title, req) {
                const F4 = sap.ui.xmlfragment("sap.fiori.gateentrypo.fragment.F4Help", this);
                this.getView().addDependent(F4);
                sap.ui.getCore().byId("F4Help").setTitle(title);
                sap.ui.getCore().byId("F4Help").bindAggregation("items", {
                    path: req,
                    template: this.oTemplate
                });
                F4.open();
            },

            onF4HelpSearch: function (evt) {
                let oPath = evt.getSource().getBinding("items").getPath();
                oPath = oPath.includes("?search") ? oPath.split("?search")[0] : oPath.split("&search")[0];
                sap.ui.getCore().byId("F4Help").bindAggregation("items", {
                    path: oPath,
                    parameters: { custom: { search: evt.getParameter("value") } },
                    template: this.oTemplate
                });
            },

            onF4HelpConfirm: function (evt) {
                const val = evt.getParameter("selectedItem").getTitle();
                this.f4Source.setValue(val);
                this.getView().getModel("HeaderModel").getData().Matnr_Matnr = val;
                evt.getSource().destroy();

                this.getView().getModel().read("/PoList('" + val + "')/Material_Master", {
                    success: data => {
                        this.getView().getModel("MaterialModel").setData(data.results.map((item, index) => {
                            delete item.Po_Number;
                            delete item.GateEntry;
                            item.Count = index + 1;
                            return item;
                        }));
                        this.getView().getModel("MaterialModel").refresh(true);
                    }
                });
            },

            onSavePress: function () {
                const data = this.getView().getModel("HeaderModel").getData();
                this.getView().getModel().create("/GateEntryList", data, {
                    success: () =>
                        sap.m.MessageBox.show("Created successfully", {
                            onClose: () => this.onNavBack()
                        }),
                });
            }
        });
    });
