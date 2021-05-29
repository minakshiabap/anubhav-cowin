sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("cowin.project1.controller.View1", {
			onInit: function () {
				this.oRouter = this.getOwnerComponent().getRouter();
			},

			onNext: function(){
				debugger;
				this.oRouter.navTo("RouteView2");
			},
		});
	});
