sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.fiori.gateentrypo.BaseController", {

        /**
         * method to access router in every controller of the application
         */
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },

        onNavBack: function () {
            var previousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();
            if (previousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getRouter().navTo("Report");
            }
        }
    });
});