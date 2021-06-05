sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("cowin.cowin.controller.View2", {
			onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
				this.oRouter.getRoute("View2").attachMatched(this._onRouteMatched, this);
			},
			_onRouteMatched: function(oEvent) {
				debugger;
				var that = this;
				if(!this.getOwnerComponent().getModel("local").getProperty("/center_data")){
					var district_Id = oEvent.getParameter("arguments").distict_Id;
					var sDate = oEvent.getParameter("arguments").date;
					if(district_Id.length >= 6) {
						$.ajax("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+district_Id+"&date="+sDate, {
							type: 'GET',
							success: function(data) {
								debugger;
								if(data.length === 0) {
									MessageToast.show("No vaccination data available");
								}else{
									that.getOwnerComponent().getModel("local").setProperty("/center_data", data.sessions);
								}
								that.getDataForTile(data.sessions);
								// that.getView().byId("dashboardBtn").setEnabled(true);
							},
							error: function(oErr) {
								debugger;
							}
						});
					}else {
						$.ajax("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+district_Id+"&date="+sDate, {
							type: 'GET',
							success: function(data) {
								debugger;
								if(data.length === 0) {
									MessageToast.show("No vaccination data available");
								}else{
									that.getOwnerComponent().getModel("local").setProperty("/center_data", data.sessions);
								}
								that.getDataForTile(data.sessions);
								that.getChartData(data.sessions);
								// that.getView().byId("dashboardBtn").setEnabled(true);
								
							},
							error: function(oErr) {
								debugger;
							}
						});
					}
				}else{
					var oCenterData = this.getView().getModel("local").getProperty("/center_data");
					this.getDataForTile(oCenterData);
					this.getChartData(oCenterData);
				}
				

			},
			onBack: function() {debugger;
				this.oRouter.navTo("Main");
			},
			getDataForTile: function(sessionData) {debugger;
				var total_center = sessionData.length;
				var city_name = sessionData[0].district_name;
				var state_name = sessionData[0].state_name;

				var oTileData = {
					"total_centers": total_center,
					"city": city_name,
					"state": state_name
				}
				this.getView().getModel("local").setProperty("/TileData", oTileData);
			},
			getChartData: function(sessionData) {
				var Total = sessionData.length;
				var covishield = 0;
				var covaxin = 0;
				var sputnik = 0;
				// var vaccines = ["COVISHIELD", "COVAXIN", "SPUTNIK"];
				$.each(sessionData, function(Item, Value) {
					if(Value.vaccine === "COVISHIELD") {
						covishield += 1;
					} else if(Value.vaccine === "COVAXIN") {
						covaxin += 1;
					}else {
						sputnik += 1;
					}
				});

				var oChartModel = [
					{
						"vaccine": "Covishield",
						"value": covishield,
						"percentage": parseFloat(((covishield/Total)*100).toFixed(2))
					},
					{
						"vaccine": "Covaxin",
						"value": covaxin,
						"percentage": parseFloat(((covaxin/Total)*100).toFixed(2))
					},
					{
						"vaccine": "Spuntnik V",
						"value": sputnik,
						"percentage": parseFloat(((sputnik/Total)*100).toFixed(2))
					}];
				
				this.getView().getModel("local").setProperty("/ChartData", oChartModel);
				
				var age45 = 0;
				var age18 = 0;
				$.each(sessionData, function(Item, Value) {
					if(Value.min_age_limit === 45) {
						age45 += 1;
					}else {
						age18 += 1;
					}
				}); 
				var oAgeData = {
					"age18": age18,
					"age45": age45
				}
				this.getView().getModel("local").setProperty("/ageChartData", oAgeData);
			},
			onBarSelect: function(oEvent) {
				debugger;
				var selectedBars = oEvent.getParameter("selectedBars");
				var selectedLabel = oEvent.getParameter("bar").getProperty("label");
				var selectedId = oEvent.getParameter("bar").getId();
				var selected = oEvent.getParameter("selected");
				$.each(selectedBars, function(Item, Value){
					if(Value.sId !== selectedId){
						selectedBars[Item].setSelected(false);
					}
				});
				var oTable = this.getView().byId("centerDataTable");
				if(selectedLabel.includes("18") && selected) {
					 var oFilter  = new Filter("min_age_limit", FilterOperator.EQ, 18);
				}else if(selectedLabel.includes("18") && !selected) {
					var oFilter = [];
				}else if(selectedLabel.includes("45") && selected) {
					var oFilter  = new Filter("min_age_limit", FilterOperator.EQ, 45);
				}
				else {
					var oFilter  = [];
				}
				oTable.getBinding("items").filter(oFilter);
			}
		});
	});
