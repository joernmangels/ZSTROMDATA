sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/IntervalTrigger"
	//"sap/ui/model/Filter"

], function(Controller, History, JSONModel, MessageToast, IntervalTrigger) {
	"use strict";

	return Controller.extend("de.mangels.controller.Monitor", {

		onInit: function() {

			this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");
			this.getView().setModel(this.getOwnerComponent().getModel("autoreload"), "autoreload");
			this.refreshModel();
			//this._set_autoreload(this);
			this._set_autoreload_comp();

			// this._trigger = new IntervalTrigger(3 * 60 * 1000 /* 5 Minuten */ );
			// //this._trigger = new IntervalTrigger(10 * 1000 /* 10 Sekunden */ );
			// this._trigger.addListener(this.onRefreshTriggered, this);

		},
		onBeforeRendering: function() {
			//this._set_autoreload(this.getView());
		},
		onExit: function() {},
		_set_autoreload: function(_this) {
			//var oModel_ar = _this.getOwnerComponent().getModel("autoreload");

			var oModel_ar = _this.getView().getModel("autoreload");

			var oEntry = {};
			var counter;

			oEntry.W01 = oModel_ar.getProperty("/SettingsSet/pv1_scale");
			oEntry.W02 = oModel_ar.getProperty("/SettingsSet/pv1_targetvalue");

			switch (oEntry.W01) {
				case 'Sekunden':
					counter = oEntry.W02 * 1000;
					break;
				case 'Seconds':
					counter = oEntry.W02 * 1000;
					break;
				case 'Minuten':
					counter = oEntry.W02 * 60 * 1000;
					break;
				case 'Minutes':
					counter = oEntry.W02 * 60 * 1000;
					break;
				case 'Stunden':
					counter = oEntry.W02 * 60 * 60 * 1000;
					break;
				case 'Hours':
					counter = oEntry.W02 * 60 * 60 * 1000;
					break;
			}

			_this._trigger = new IntervalTrigger(counter);
			_this._trigger.addListener(_this.onRefreshTriggered, _this);
		},
		_set_autoreload_comp: function() {
			var comp = this.getOwnerComponent();
			var oModel = comp.getModel("autoreload");

			//var oModel_ar = _this.getModel("autoreload");
			var counter = this._get_intervall_reload(oModel);

			comp._trigger = new IntervalTrigger(counter);
			comp._trigger.addListener(this.onRefreshTriggered, this);
		},
		_get_intervall_reload: function(oModel_ar) {
			//var comp = this.getOwnerComponent();
			//var oModel_ar = comp.getModel("autoreload");

			var oEntry = {};
			var counter;

			oEntry.W01 = oModel_ar.getProperty("/SettingsSet/pv1_scale");
			oEntry.W02 = oModel_ar.getProperty("/SettingsSet/pv1_targetvalue");

			switch (oEntry.W01) {
				case 'Sekunden':
					counter = oEntry.W02 * 1000;
					break;
				case 'Seconds':
					counter = oEntry.W02 * 1000;
					break;
				case 'Minuten':
					counter = oEntry.W02 * 60 * 1000;
					break;
				case 'Minutes':
					counter = oEntry.W02 * 60 * 1000;
					break;
				case 'Stunden':
					counter = oEntry.W02 * 60 * 60 * 1000;
					break;
				case 'Hours':
					counter = oEntry.W02 * 60 * 60 * 1000;
					break;
			}
			return counter;
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
		onVBReload: function(evt) {
			var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("vbautoreload");
			//this.showBusyIndicator(2000, 0);
			this.loadModel_vb();
			sap.m.MessageToast.show(autoreload);
		},
		onPVReload: function(evt) {
			var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("pvautoreload");
			this.loadModel_pv();
			sap.m.MessageToast.show(autoreload);
		},
		refreshModel: function() {
			var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("autoreload");
			var oModel_ar = this.getView().getModel("autoreload");
			var oEntry = {};

			oEntry.W01 = oModel_ar.getProperty("/SettingsSet/pv1_scale");
			oEntry.W02 = oModel_ar.getProperty("/SettingsSet/pv1_targetvalue");

			this.loadModel_pv();
			this.loadModel_vb();

			sap.m.MessageToast.show(autoreload + " " + oEntry.W02 + " " + oEntry.W01);
		},
		onRefreshTriggered: function() {
			// (this.byId("List").getItems() || []).forEach(function(oItem) {
			// 	oItem.getElementBinding( "pl" ).refresh();
			// });
			//var oView = this.byId();
			// var oModel = oView.getBindingContext().getModel();
			// oModel.refresh();

			//var route = this.getOwnerComponent().getRouter();
			var url = window.location.href;
			if (url.indexOf("Monitor") > "0") {

				// Wenn der Reload-Button aktiviert wurde dann reload
				var al_button = this.getView()._autoreload;

				if (al_button === "true") {
					this.refreshModel();
					// var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("autoreload");
					// this.loadModel_pv();
					// this.loadModel_vb();
					// sap.m.MessageToast.show(autoreload);
					//var oModel = this.getOwnerComponent().getModel("pl");
					//if (!oModel.hasPendingChanges()) {
					//	oModel.refresh(true);
					//	sap.m.MessageToast.show(autoreload);
					//}
				}
			}
		},
		handleAutoreload: function(evt) {
			var oView = this.getView();
			// this.getOwnerComponent().handleautoreload(evt, oView);
			if (oView) {
				var autoreload = 'false';
				if (!oView._autoreload) {
					oView._autoreload = autoreload;
				}
				if (evt.getSource().getPressed()) {
					oView._autoreload = 'true';
				} else {
					oView._autoreload = 'false';
				}
			}
		},
		onNavButtonPressed: function() {
			//this.getView().destroy();
			//var view = sap.ui.getCore().byId("__component0---monitor");
			//view.destroy();

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
			// var oTile = this.getView().byId("watt");
			// oTile.setBusy(true);
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");

			sap.ui.core.BusyIndicator.show();

			var oModel = this.getView().getModel("pvaktuell");
			//var oModel = new JSONModel("http://192.168.2.140/STROM/pvdaten_aktuell.php", false);
			//url = "http://" + targetHostname + "/STROM/pvdaten_aktuell.php";
			url = targetProtocol + targetHostname + "/STROM/pvdaten_aktuell.php";
			var oModel = new JSONModel(url, false);
			this.getView().setModel(oModel, "pvaktuell");

			var oModel2 = this.getView().getModel("pvaktuell_rt");
			//var oModel2 = new JSONModel("http://192.168.2.140/STROM/pvleistung_echtzeit.php", false);
			//url = "http://" + targetHostname + "/STROM/pvleistung_echtzeit.php";
			url = targetProtocol + targetHostname + "/STROM/pvleistung_echtzeit.php";
			var oModel2 = new JSONModel(url, false);
			this.getView().setModel(oModel2, "pvaktuell_rt");

			oModel2.attachRequestCompleted(function() {
				sap.ui.core.BusyIndicator.hide();
			});
			// oTile.setBusy(false);
		},
		loadModel_vb: function() {
			// var oTile = this.getView().byId("watt");
			// oTile.setBusy(true);
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");

			sap.ui.core.BusyIndicator.show();

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
				sap.ui.core.BusyIndicator.hide();
			});
		}

	});
});