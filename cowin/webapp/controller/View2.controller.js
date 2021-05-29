sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("cowin.cowin.controller.View2", {
			onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
			},
			onBack: function() {debugger;
				this.oRouter.navTo("Main");
			}
		});
	});
