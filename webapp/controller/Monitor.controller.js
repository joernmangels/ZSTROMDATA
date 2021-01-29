sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/IntervalTrigger"
	//"sap/ui/model/Filter"

], function (Controller, History, JSONModel, MessageToast, IntervalTrigger) {
	"use strict";

	return Controller.extend("de.mangels.controller.Monitor", {

		onInit: function () {

			this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");
			this.getView().setModel(this.getOwnerComponent().getModel("autoreload"), "autoreload");
			this.refreshModel();

			var oViewSettings = new JSONModel({
				_autoreload: false,
				_autoreload_time: 0,
				_autoreload_eh: "",
				_autoreload_pg_percent: parseFloat("100"),
				_autoreload_pg_time: "",
				_autoreload_fin_time: new Date()
			});
			this.getView().setModel(oViewSettings, "GLOSET");

			//this._set_autoreload(this);
			//this._set_autoreload_comp();

			// this._trigger = new IntervalTrigger(3 * 60 * 1000 /* 5 Minuten */ );
			// //this._trigger = new IntervalTrigger(10 * 1000 /* 10 Sekunden */ );
			// this._trigger.addListener(this.onRefreshTriggered, this);

		},
		onBeforeRendering: function () {
			//this._set_autoreload(this.getView());
		},
		onExit: function () {},
		_set_autoreload: function (_this) {
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
		_get_intervall_reload: function (oModel_ar) {
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
		hideBusyIndicator: function () {
			sap.ui.core.BusyIndicator.hide();
		},
		showBusyIndicator: function (iDuration, iDelay) {
			sap.ui.core.BusyIndicator.show(iDelay);

			if (iDuration && iDuration > 0) {
				if (this._sTimeoutId) {
					jQuery.sap.clearDelayedCall(this._sTimeoutId);
					this._sTimeoutId = null;
				}

				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function () {
					this.hideBusyIndicator();
				});
			}
		},
		onVBReload: function (evt) {
			var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("vbautoreload");
			//this.showBusyIndicator(2000, 0);
			this.loadModel_vb();
			sap.m.MessageToast.show(autoreload);
		},
		onPVReload: function (evt) {
			var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("pvautoreload");
			this.loadModel_pv();
			sap.m.MessageToast.show(autoreload);
		},
		refreshModel: function () {
			var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("autoreload");
			var oModel_ar = this.getView().getModel("autoreload");
			var oEntry = {};

			oEntry.W01 = oModel_ar.getProperty("/SettingsSet/pv1_scale");
			oEntry.W02 = oModel_ar.getProperty("/SettingsSet/pv1_targetvalue");

			this.loadModel_pv();
			this.loadModel_vb();

			sap.m.MessageToast.show(autoreload + " " + oEntry.W02 + " " + oEntry.W01);
		},
		onRefreshTriggered: function () {
			// var url = window.location.href;
			// if (url.indexOf("Monitor") > "0") {

			// 	// Wenn der Reload-Button aktiviert wurde dann reload
			// 	var al_button = this.getView()._autoreload;

			// 	if (al_button === "true") {
			// 		this.refreshModel();
			// 		// var autoreload = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("autoreload");
			// 		// this.loadModel_pv();
			// 		// this.loadModel_vb();
			// 		// sap.m.MessageToast.show(autoreload);
			// 		//var oModel = this.getOwnerComponent().getModel("pl");
			// 		//if (!oModel.hasPendingChanges()) {
			// 		//	oModel.refresh(true);
			// 		//	sap.m.MessageToast.show(autoreload);
			// 		//}
			// 	}
			// }
			////////////////////////////////////////////////////////////////////////////////
			var url = window.location.href;
			var oViewModel = this.getView().getModel("GLOSET");

			if (url.indexOf("Monitor") > "0") {
				// Wenn der Reload-Button aktiviert wurde dann reload
				if (oViewModel.getProperty("/_autoreload")) {
					this.refreshModel();
				}
			}
		},
		handleSettings: function(evt) {
			this.getOwnerComponent().getRouter().navTo("onNavToSettings");
		},
		onNavButtonPressed: function () {
			//this.getView().destroy();
			//var view = sap.ui.getCore().byId("__component0---monitor");
			//view.destroy();
			var toggle = this.getView().byId("TG");
			toggle.setPressed(false);
			var oViewModel = this.getView().getModel("GLOSET");
			oViewModel.setProperty("/_autoreload", false);
			this._set_autoreload_comp();			
			
			this.getOwnerComponent().getRouter().navTo("home");
		},
		handleFullscreen: function (evt) {
			this.getOwnerComponent().handleFullscreen(evt);
		},
		handleImage3Press: function (evt) {
			//MessageToast.show("The ImageContent is pressed.");
			this.getOwnerComponent().openInfoDialog();
		},
		loadModel_pv: function () {
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

			oModel2.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
			// oTile.setBusy(false);
		},
		loadModel_vb: function () {
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
			oModel4.attachRequestCompleted(function () {
				sap.ui.core.BusyIndicator.hide();
			});
		},
		onSecondTriggered: function () {
			var reload_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("reload");

			var oViewModel = this.getView().getModel("GLOSET");
			var autoreload_time = oViewModel.getProperty("/_autoreload_time");
			var time_fin = oViewModel.getProperty("/_autoreload_fin_time");

			var time_now = new Date();
			var time_rest = time_fin - time_now;
			//var time_total = 1000 * 60 * autoreload_min;
			var time_total = autoreload_time;

			var newPercent = (100 / time_total) * time_rest;
			newPercent = Math.round(newPercent);

			var rest_date = new Date(time_rest);
			
			//var rest_mins = rest_date.getMinutes();
			//var rest_secs = rest_date.getSeconds();
			var rest_mins = ("00" + rest_date.getMinutes()).slice(-2);
			var rest_secs = ("00" + rest_date.getSeconds()).slice(-2);

			if (newPercent >= 0) {
				oViewModel.setProperty("/_autoreload_pg_percent", newPercent);
				//oViewModel.setProperty("/_autoreload_pg_text", reload_text + " " + rest_mins + ":" + rest_secs);
				oViewModel.setProperty("/_autoreload_pg_text", rest_mins + ":" + rest_secs);
			} else {
				this._trigger_second.setInterval(0);

				var that = this;
				var promise1 = new Promise(function (resolve, reject) {
					that.onRefreshTriggered_new();
					resolve("reload");
				});
				promise1.then(function (value) {
					that._set_autoreload_comp();
				});

			}
		},
		onRefreshTriggered_new: function () {
			var oViewModel = this.getView().getModel("GLOSET");
			var autoreload = oViewModel.getProperty("/_autoreload");
			//var autoreload_min = oViewModel.getProperty("/_autoreload_min");
			//var autoreload_except_recordresults = oViewModel.getProperty("/_autoreload_except_recordresults");

			//var intervall = " " + autoreload_min + " min";
			var url = window.location.href;

			if (autoreload) {
				//if (!autoreload_except_recordresults) {
				if (url.indexOf("Monitor") > "0") {
					//var autoreload_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("autoreload") + intervall;
					var autoreload_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("autoreload");
					this.refreshModel();
					sap.m.MessageToast.show(autoreload_text);
				}
			}
		},
		_set_autoreload_comp: function () {
			var comp = this.getOwnerComponent();
			var oModel = comp.getModel("autoreload");
			var oModel_ar = this.getView().getModel("autoreload");

			var oViewModel = this.getView().getModel("GLOSET");
			var counter = this._get_intervall_reload(oModel);
			oViewModel.setProperty("/_autoreload_time", counter);
			oViewModel.setProperty("/_autoreload_eh", oModel_ar.getProperty("/SettingsSet/pv1_scale"));

			var autoreload = oViewModel.getProperty("/_autoreload");
			//var autoreload_time = parseInt(oViewModel.getProperty("/_autoreload_time"));
			oViewModel.setProperty("/_autoreload_pg_percent", parseFloat("100"));
			oViewModel.setProperty("/_autoreload_pg_time", "");

			var jetzt = new Date();
			var jetztfin = new Date(jetzt.getTime() + counter);
			oViewModel.setProperty("/_autoreload_fin_time", jetztfin);

			if (autoreload) {
				this._trigger_second = new sap.ui.core.IntervalTrigger(1000);
				this._trigger_second.addListener(this.onSecondTriggered, this);
			} else {
				if (this._trigger_second) {
					this._trigger_second.setInterval(0);
				}
			}

			// comp._trigger = new IntervalTrigger(counter);
			// comp._trigger.addListener(this.onRefreshTriggered, this);
		},
		handleAutoreload: function (evt) {
			var oView = this.getView();
			// this.getOwnerComponent().handleautoreload(evt, oView);

			var oViewModel = this.getView().getModel("GLOSET");

			if (oView) {
				var autoreload = false;
				if (!oView._autoreload) {
					oView._autoreload = autoreload;
					oViewModel.setProperty("/_autoreload", oView._autoreload);
				}
				if (evt.getSource().getPressed()) {
					oView._autoreload = true;
					oViewModel.setProperty("/_autoreload", oView._autoreload);
				} else {
					oView._autoreload = false;
					oViewModel.setProperty("/_autoreload", oView._autoreload);
				}
			}

			this._set_autoreload_comp();
		},

	});
});