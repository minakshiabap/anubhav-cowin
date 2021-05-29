sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,History) {
		"use strict";

		return Controller.extend("cowin.project1.controller.View2", {
			onInit: function () {

			},

			onBack: function(){
				debugger;
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			 var oHistory, sPreviousHash;
        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();
        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
        	this.getView().getParent().to("idView1");
            // oRouter.navTo("idView1", {}, true);
        }
			}
		});
	});
