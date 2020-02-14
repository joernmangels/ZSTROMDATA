sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"de/mangels/controller/formatter"
	//"sap/ui/model/Filter"

], function(Controller, History, JSONModel, MessageToast, formatter) {
	"use strict";

	return Controller.extend("de.mangels.controller.Topvalues", {

		onInit: function(evt) {
			this.loadModel_pv();
			this.loadModel_vb();

		},
		onNavButtonPressed: function() {
			this.getOwnerComponent().getRouter().navTo("home");
		},
		handleFullscreen: function(evt) {
			this.getOwnerComponent().handleFullscreen(evt);
		},
		handleImage3Press: function(evt) {
			//MessageToast.show("The ImageContent is pressed.");
			this.getOwnerComponent().openInfoDialog();
		},
		loadModel_pv: function() {
			var oModel = new JSONModel();
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			var oEntry = {};
			
			url = targetProtocol + targetHostname + "/STROM/get_high_pv.php";
			oModel.loadData(url, oEntry, true, "GET");

			//this.showBusyIndicator(2000, 0);
			//var busyDialog4 = (sap.ui.getCore().byId("busy4")) ? sap.ui.getCore().byId("busy4") : new sap.m.BusyDialog('busy4',{text:'test', title: 'Loading'});
			//busyDialog4.open();
			//sap.ui.core.BusyIndicator.show();
			var that = this;
			that.getView().setBusy(true);
			
			oModel.attachRequestCompleted(function() {
				var pv_high_day = this.getProperty("/HighlightPVSet/pv_high_day");
				var pv_high_day_value = this.getProperty("/HighlightPVSet/pv_high_day_value");
				var pv_high_month = this.getProperty("/HighlightPVSet/pv_high_month");
				var pv_high_month_monat = this.getProperty("/HighlightPVSet/pv_high_month_monat");
				var pv_high_month_value = this.getProperty("/HighlightPVSet/pv_high_month_value");
				var pv_high_power = this.getProperty("/HighlightPVSet/pv_high_power");
				var pv_high_power_value = this.getProperty("/HighlightPVSet/pv_high_power_value");
				var pv_high_week = this.getProperty("/HighlightPVSet/pv_high_week");
				var pv_high_week_kw = this.getProperty("/HighlightPVSet/pv_high_week_kw");
				var pv_high_week_value = this.getProperty("/HighlightPVSet/pv_high_week_value");
				var pv_high_year = this.getProperty("/HighlightPVSet/pv_high_year");
				var pv_high_year_jahr = this.getProperty("/HighlightPVSet/pv_high_year_jahr");
				var pv_high_year_value = this.getProperty("/HighlightPVSet/pv_high_year_value");

				var tabData = [{
					"PVTAB": [{
						"art": "J",
						"zeit1": pv_high_year.substring(0, 10),
						"zeit2": pv_high_year_jahr,
						"value": pv_high_year_value + " kw/h"
					}, {
						"art": "M",
						"zeit1": pv_high_month.substring(0, 10),
						"zeit2": pv_high_month_monat,
						"value": pv_high_month_value + " kw/h"
					}, {
						"art": "W",
						"zeit1": pv_high_week.substring(0, 10),
						"zeit2": pv_high_week_kw,
						"value": pv_high_week_value + " kw/h"
					}, {
						"art": "D",
						"zeit1": pv_high_day.substring(0, 10),
						"zeit2": "",
						"value": pv_high_day_value + " kw/h"
					}, {
						"art": "L",
						"zeit1": pv_high_power.substring(0, 10),
						"zeit2": pv_high_power.substring(10),
						"value": pv_high_power_value + " Watt"
					}]
					
				}];

				this.setData(tabData);
				//busyDialog4.close();
				//sap.ui.core.BusyIndicator.close();
				that.getView().setBusy(false);
			});

			this.getView().setModel(oModel, "pvhigh");

		},
		loadModel_vb: function() {
			var oModel = new JSONModel();
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			var oEntry = {};
			
			//url = "http://" + targetHostname + "/STROM/get_high_vb.php";
			url = targetProtocol + targetHostname + "/STROM/get_high_vb.php";
			oModel.loadData(url, oEntry, true, "GET");

			//this.showBusyIndicator(2000, 0);
			sap.ui.core.BusyIndicator.show();
			
			oModel.attachRequestCompleted(function() {
				var vb_high_day = oModel.getProperty("/HighlightVBSet/vb_high_day");
				var vb_high_day_value = oModel.getProperty("/HighlightVBSet/vb_high_day_value");
				var vb_high_month = oModel.getProperty("/HighlightVBSet/vb_high_month");
				var vb_high_month_monat = oModel.getProperty("/HighlightVBSet/vb_high_month_monat");
				var vb_high_month_value = oModel.getProperty("/HighlightVBSet/vb_high_month_value");
				var vb_high_power = oModel.getProperty("/HighlightVBSet/vb_high_power");
				var vb_high_power_value = oModel.getProperty("/HighlightVBSet/vb_high_power_value");
				var vb_high_week = oModel.getProperty("/HighlightVBSet/vb_high_week");
				var vb_high_week_kw = oModel.getProperty("/HighlightVBSet/vb_high_week_kw");
				var vb_high_week_value = oModel.getProperty("/HighlightVBSet/vb_high_week_value");
				var vb_high_year = oModel.getProperty("/HighlightVBSet/vb_high_year");
				var vb_high_year_jahr = oModel.getProperty("/HighlightVBSet/vb_high_year_jahr");
				var vb_high_year_value = oModel.getProperty("/HighlightVBSet/vb_high_year_value");

				var tabData = [{
					"VBTAB": [{
						"art": "J",
						"zeit1": vb_high_year.substring(0, 10),
						"zeit2": vb_high_year_jahr,
						"value": vb_high_year_value + " kw/h"
					}, {
						"art": "M",
						"zeit1": vb_high_month.substring(0, 10),
						"zeit2": vb_high_month_monat,
						"value": vb_high_month_value + " kw/h"
					}, {
						"art": "W",
						"zeit1": vb_high_week.substring(0, 10),
						"zeit2": vb_high_week_kw,
						"value": vb_high_week_value + " kw/h"
					}, {
						"art": "D",
						"zeit1": vb_high_day.substring(0, 10),
						"zeit2": "",
						"value": vb_high_day_value + " kw/h"
					}, {
						"art": "L",
						"zeit1": vb_high_power.substring(0, 10),
						"zeit2": vb_high_power.substring(10),
						"value": vb_high_power_value + " Watt"
					}]

				}];

				this.setData(tabData);
				sap.ui.core.BusyIndicator.close();
			});

			this.getView().setModel(oModel, "vbhigh");

		},
		hideBusyIndicator: function() {
			sap.ui.core.BusyIndicator.hide();
		},
		showBusyIndicator: function(iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}

				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
					this.hideBusyIndicator();
				});
			}
		}

	});
});