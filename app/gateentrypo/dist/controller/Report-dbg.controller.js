sap.ui.define([
    "./BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.fiori.gateentrypo.controller.Report", {

            onInit: function () {

            },

            onCreatePress: function () {
                this.getRouter().navTo("Create");
            },

            onMatnrPress: function (evt) {
                const source = evt.getSource();
                if (!this._oPopover) {
                    this._oPopover = sap.ui.xmlfragment("sap.fiori.gateentrypo.fragment.Popover", this);
                    this.getView().addDependent(this._oPopover);
                }
                this.getView().getModel().read("/PoList('1000000076')/Material_Master", {
                    success: data => {
                        debugger;
                        this._oPopover.openBy(source);
                    }
                });
            }
        });
    });
