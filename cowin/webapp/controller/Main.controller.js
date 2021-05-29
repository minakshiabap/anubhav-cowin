sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("cowin.cowin.controller.Main", {
			onInit: function () {
				this.oRouter = this.getOwnerComponent().getRouter();
			},
			onBtnPress: function() {debugger;
				this.oRouter.navTo("View2");
			}
		});
	});
