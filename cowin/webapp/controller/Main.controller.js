sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("cowin.cowin.controller.Main", {
			onInit: function () {
				this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.getRoute("Main").attachMatched(this._oRouteMatched, this);				
			},
			_oRouteMatched: function() {debugger;
				var that = this;
				$.ajax("https://cdn-api.co-vin.in/api/v2/admin/location/states", {
					type: 'GET',
					success: function(data) {
						debugger;
						that.getOwnerComponent().getModel("local").setProperty("/states", data.states);
					},
					error: function(oErr) {
						debugger;
					}
				});
			},
			onBtnPress: function() {debugger;
				this.oRouter.navTo("View2");
			},
			onRadioBtnSelect: function(oEvent) {
				var sIndex = oEvent.getParameter("selectedIndex");
				if (sIndex){
					debugger;
					this.getView().byId("pinBox").setVisible(false);
					this.getView().byId("cityBox").setVisible(true);
				}else {
					debugger;
					this.getView().byId("pinBox").setVisible(true);
					this.getView().byId("cityBox").setVisible(false);
				}
			},
			onSearch: function(oEvent) {
				var sId = oEvent.getParameter("id");
				if(sId.includes("pinButton")) {
					debugger;
				}else {
					debugger;
				}
			},
			onStateSelect: function(oEvent) {
				debugger;
				var that = this;
				var sKey = oEvent.getParameter("selectedItem").getKey();
				this.getView().byId("citySelect").setSelectedKey("");
				$.ajax("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+ sKey, {
					type: 'GET',
					success: function(data) {
						debugger;
						that.getOwnerComponent().getModel("local").setProperty("/districts", data.districts);
					},
					error: function(oErr) {
						debugger;
					}
				});
			},
			onCitySelect: function(oEvent) {
				debugger;
			}
		});
	});
