sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"de/mangels/controller/formatter"
	//"sap/ui/model/Filter"

], function(Controller, History, JSONModel, MessageToast, formatter) {
	"use strict";

	return Controller.extend("de.mangels.controller.Aktuell", {

		onInit: function(evt) {
			// var oModel = new JSONModel("http://192.168.2.140/STROM/pvdaten_aktuell.php", false);
			// this.getView().setModel(oModel, "pvaktuell");
			//this.showBusyIndicator(2000, 0);
			this.loadModel_pv();
			this.loadModel_vb();
			this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");
			
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
		},
		onNavButtonPressed: function() {
			this.getOwnerComponent().getRouter().navTo("home");
		},
		handleFullscreen: function(evt) {
			this.getOwnerComponent().handleFullscreen(evt);
		},
		handleSettings: function(evt) {
			this.getOwnerComponent().getRouter().navTo("onNavToSettings");
		},
		handleImage3Press: function(evt) {
			//MessageToast.show("The ImageContent is pressed.");
			this.getOwnerComponent().openInfoDialog();
		},
		pressleistung_pv: function(evt) {
			var refresh_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("refreshed");
			//this.showBusyIndicator(2000, 0);
			this.loadModel_pv();
			// var oModel = this.getView().getModel("pvaktuell");
			// oModel.refresh(true);
			MessageToast.show(refresh_text);

		},
		pressleistung_vb: function(evt) {
			var refresh_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("refreshed");
			//this.showBusyIndicator(2000, 0);
			this.loadModel_vb();
			// var oModel = this.getView().getModel("pvaktuell");
			// oModel.refresh(true);
			MessageToast.show(refresh_text);

		},
		loadModel_pv: function() {
			// var oTile = this.getView().byId("watt");
			// oTile.setBusy(true);
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			
			//this.showBusyIndicator(2000, 0);
			//sap.ui.core.BusyIndicator.show();
			var PPV = this.byId("PPV");
			PPV.setBusy(true);
			
			var oModel = this.getView().getModel("pvaktuell");
			//var oModel = new JSONModel("http://192.168.2.140/STROM/pvdaten_aktuell.php", false);
			//url = "http://" + targetHostname + "/STROM/pvdaten_aktuell.php";
			url = targetProtocol + targetHostname + "/STROM/pvdaten_aktuell.php";
			var oModel = new JSONModel(url, false);
			this.getView().setModel(oModel, "pvaktuell");


			var oModel2 = this.getView().getModel("pvaktuell_rt");
			//url = "http://" + targetHostname + "/STROM/pvleistung_echtzeit.php";
			url = targetProtocol + targetHostname + "/STROM/pvleistung_echtzeit.php";
			//var oModel2 = new JSONModel("http://192.168.2.140/STROM/pvleistung_echtzeit.php", false);
			var oModel2 = new JSONModel(url, false);
			this.getView().setModel(oModel2, "pvaktuell_rt");
			oModel2.attachRequestCompleted(function() {
				//sap.ui.core.BusyIndicator.hide();
				PPV.setBusy(false);
			});

			// oTile.setBusy(false);
		},
		loadModel_vb: function() {
			// var oTile = this.getView().byId("watt");
			// oTile.setBusy(true);
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
		    var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
		    
			//this.showBusyIndicator(2000, 0);
			//sap.ui.core.BusyIndicator.show();
			var PVB = this.byId("PVB");
			PVB.setBusy(true);
			
			var oModel3 = this.getView().getModel("vbaktuell");
			//var oModel3 = new JSONModel("http://192.168.2.140/STROM/vbdaten_aktuell.php", false);
			//url = "http://" + targetHostname + "/STROM/vbdaten_aktuell.php";
			url = targetProtocol + targetHostname + "/STROM/vbdaten_aktuell.php";
			var oModel3 = new JSONModel(url, false);
			this.getView().setModel(oModel3, "vbaktuell");

			var oModel4 = this.getView().getModel("vbaktuell_rt");
			//var oModel4 = new JSONModel("http://192.168.2.140/STROM/vbleistung_echtzeit.php", false);
			//url = "http://" + targetHostname + "/STROM/vbleistung_echtzeit.php";
			url = targetProtocol + targetHostname + "/STROM/vbleistung_echtzeit.php";
			var oModel4 = new JSONModel(url, false);
			this.getView().setModel(oModel4, "vbaktuell_rt");
			// oTile.setBusy(false);
			oModel4.attachRequestCompleted(function() {
				//sap.ui.core.BusyIndicator.hide();
				PVB.setBusy(false);
			});
		}
	});
});