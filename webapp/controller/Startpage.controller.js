sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(jquery, Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("de.mangels.controller.Startpage", {
		onInit: function(evt) {
			var isPhone = sap.ui.Device.system.phone;
			var desktop, phone;
			this.loadModel_both();

			if (isPhone) {
				desktop = false;
				phone = true;
			} else {
				desktop = true;
				phone = false;
			}
			
			var appVersion = this.getOwnerComponent().getManifestEntry("/sap.app/applicationVersion/version");
			var oViewModel = new JSONModel({
				_VIEWPHONE: phone,
				_VIEWDESKTOP: desktop,
				_APPVERSION: appVersion
			});

			this.getView().setModel(oViewModel, "screendata");
			
			this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");
			//this.getView().setModel(this.getOwnerComponent().getModel("mc_woche"), "mc_woche");

			// var oContent = this.getView().byId("content");
			// //oContent.removeAllContent();
			// var oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "de.mangels.view.Settings1Display");
			// oContent.insertContent(this._getFormFragment(oFormFragment));

		},
		handleReload: function(evt) {
			// var refresh_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("reload");
			// var oModel1 = this.getView().getModel("pvaktuell");
			// var oModel2 = this.getView().getModel("vbaktuell");
			// oModel1.setData(null);
			// oModel2.setData(null);
			//this.showBusyIndicator(1000, 0);
			// this.loadModel_both();
			
			// MessageToast.show(refresh_text);
			// oModel1.refresh();
			// oModel2.refresh();
			// oModel1.resetChanges();
			// oModel2.resetChanges();
			location.reload();
		},
		handleSettings: function(evt) {
			this.getOwnerComponent().getRouter().navTo("onNavToSettings");
		},
		// _loadSetting: function(art) {
		// 	var url;
		// 	var targetHostname;
		// 	var oModel = new JSONModel();
		// 	var oEntry = {};

		// 	targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
		// 	url = "http://" + targetHostname + "/STROM/settings_load.php";

		// 	// var oModel1 = this.getView().getModel(art);
		// 	// if (oModel1 !== undefined) {
		// 	// 	oModel1.setData({});
		// 	// }

		// 	oEntry.NAMESET = art;

		// 	oModel.loadData(url, oEntry, true, "POST");
		// 	this.getView().setModel(oModel, art);
		// 	//this.getView().bindElement("/SettingsSet/0");

		// },
		// _loadSettings_all: function() {
		// 	this._loadSetting("mc_tag");
		// },
		onactdatapress: function(evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("onNavToAktuelleDaten");
		},
		oninformation: function(evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("onNavToInformation");
		},
		onmonitor: function(evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("onNavToMonitor");
		},
		onauswerten: function(evt) {
			this.showBusyIndicator(2000, 0);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("onNavToAuswertung1");
		},
		ontopwerte: function(evt) {
			this.showBusyIndicator(2000, 0);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("onNavToTopValues");
		},
		handleFullscreen: function(evt) {
			this.getOwnerComponent().handleFullscreen(evt);
		},
		handleImage3Press: function(evt) {
			//MessageToast.show("The ImageContent is pressed.");
			this.getOwnerComponent().openInfoDialog();
		},
		loadModel_both: function() {
			// var oTile = this.getView().byId("watt");
			// oTile.setBusy(true);
			var url;
			//var targetHostname;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
            var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			
			var oModel = this.getView().getModel("pvaktuell");
			//url = "http://" + targetHostname + "/STROM/pvdaten_aktuell.php";
			url = targetProtocol + targetHostname + "/STROM/pvdaten_aktuell.php";
			//var oModel = new JSONModel("http://192.168.2.140/STROM/pvdaten_aktuell.php", false);
			var oModel = new JSONModel(url, false);
			this.getView().setModel(oModel, "pvaktuell");

			var oModel2 = this.getView().getModel("vbaktuell");
			//url = "http://" + targetHostname + "/STROM/vbdaten_aktuell.php";
			url = targetProtocol + targetHostname + "/STROM/vbdaten_aktuell.php";
			//var oModel2 = new JSONModel("http://192.168.2.140/STROM/vbdaten_aktuell.php", false);
			var oModel2 = new JSONModel(url, false);
			this.getView().setModel(oModel2, "vbaktuell");
			// oTile.setBusy(false);
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