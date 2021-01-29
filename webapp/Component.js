sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"de/mangels/controller/InfoDialog",
	"de/mangels/controller/formatter"

], function(Controller, UIComponent, JSONModel, ResourceModel, InfoDialog, formatter) {
	"use strict";

	return UIComponent.extend("de.mangels.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {

			var targetHostname, targetprotocol;
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			//version
			var appVersion = this.getManifestEntry("/sap.app/applicationVersion/version");
			
			//SetUp HostName
			var currentHostname = window.location.hostname;
			if (currentHostname === "localhost" || currentHostname === "127.0.0.1" || currentHostname === "192.168.2.200") {
			//if (currentHostname === "localhost" || currentHostname === "192.168.2.140") {
				targetHostname = "192.168.2.200:6580";
				targetprotocol = "http://";
				//targetHostname = "192.168.2.140";
				//targetHostname = "jmcam.goip.de";
			} else {
				//targetHostname = "jmangels.goip.de";
				targetHostname = "jmangels.goip.de:6580";
				//targetHostname = "jmangels.goip.de:6581";
				//targetprotocol = "https://";
				targetprotocol = "http://";
			}
			
			this._loadSettings_all(targetprotocol, targetHostname);
			//this._loadhighlights(targetHostname);

			// var oipInfoModel = new JSONModel();
			// oipInfoModel = this.getipinfo();
			// this.setModel(oipInfoModel, "ipinfo");
			// var ip = this.getModel("ipinfo").getProperty("/ip");

			//targetHostname = this.gethost();

			var oHostNameModel = new JSONModel({
				_HOSTNAME: targetHostname,
				_PROTOCOL: targetprotocol
			});
			this.setModel(oHostNameModel, "hostName");

			// set the device model
			//this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();

			// Changelog Model
			var oChgModel = new JSONModel(jQuery.sap.getModulePath("de.mangels.model.Changelog", "/Changelog.json"));
			this.setModel(oChgModel, "chl");

			// Menu Model
			// var oMenuModel = new JSONModel(jQuery.sap.getModulePath("de.mangels.model.Tilemenu", "/Tilemenu.json"));
			// this.setModel(oMenuModel, "menu");

			// set Info dialog
			this._infoDialog = new InfoDialog(this.getAggregation("rootControl"));

			// set data model
			/*			var oData = {
				recipient: {
					name: "World"
				}
			};
			var oModel = new JSONModel(oData);
			this.setModel(oModel);*/

		},
		onRefreshTriggered: function() {},
		_loadSetting: function(protocol, host, art) {
			//var targetHostname;
			var url;
			var oModel = new JSONModel();
			var oEntry = {};

			//targetHostname = this.getModel("hostName").getProperty("/_HOSTNAME");
			//url = "http://" + targetHostname + "/STROM/settings_load.php";
			//url = "https://" + host + "/STROM/settings_load.php";
			url = protocol + host + "/STROM/settings_load.php";
			// var oModel1 = this.getView().getModel(art);
			// if (oModel1 !== undefined) {
			// 	oModel1.setData({});
			// }

			oEntry.NAMESET = art;

			oModel.loadData(url, oEntry, true, "POST");
			this.setModel(oModel, art);
			//this.getView().bindElement("/SettingsSet/0");

		},
		_loadSettings_all: function(protocol, host) {
			this._loadSetting(protocol, host, "mc_tag");
			this._loadSetting(protocol, host, "mc_woche");
			this._loadSetting(protocol, host, "mc_monat");
			this._loadSetting(protocol, host, "mc_jahr");
			this._loadSetting(protocol, host, "autoreload");
		},
		// _loadhighlights: function(host) {
		// 	var url;
		// 	var oModel = new JSONModel();
		// 	var oEntry = {};

		// 	url = "http://" + host + "/STROM/get_high_pv.php";
		// 	oModel.loadData(url, oEntry, true, "GET");
		// 	this.setModel(oModel, "pvhigh");
		// },
		openInfoDialog: function() {
			this._infoDialog.open();
		},
		handleFullscreen: function(evt) {
			var oCore = sap.ui.getCore();
			if (!this._oShell) {
				//	this._oShell = sap.ui.getCore().byId("Shell1");
				this._oShell = oCore.byId("Shell1");
			}

			if (evt.getSource().getPressed()) {
				//MessageToast.show(evt.getSource().getId() + " Pressed");
				this._oShell.setAppWidthLimited(false);
			} else {
				//MessageToast.show(evt.getSource().getId() + " Unpressed");
				this._oShell.setAppWidthLimited(true);
				//this._getSplitApp().setMode('ShowHideMode');
			}
		},
		gethost: function() {
			var local = "localhost";
			var remote = "jmangels.goip.de";
			var url;
			var rt;

			url = "http://" + local;
			//url = "http://" + remote;

			var xhr = new XMLHttpRequest();
			var gurl = url + "/ZSTROMDATA/webapp/view/App.view.xml";
			xhr.open('HEAD', gurl, true);
			xhr.send();

			if (xhr.status == "404") {
				console.log("Switch to Remote-Environment");
				rt = remote;
			} else {
				console.log("Switch to Local-Environment");
				rt = local;
			}

			return rt;

		},
		getipinfo: function() {
			// jQuery.ajax({
			// 	url: 'freegeoip.net/json/',
			// 	type: 'POST',
			// 	dataType: 'jsonp',
			// 	success: function(location) {
			// 		console.log(location);
			// 	}
			// });
			// var url = "http://freegeoip.net/json";
			// var oModel = new JSONModel(url, true, "POST");
			// return oModel;
		}

		//});
		//},
		// createContent: function() {
		// 	// create root view
		// 	return sap.ui.view("AppView", {
		// 		viewName: "de.mangels.view.App",
		// 		type: "XML"
		// 	});
		//}
	});
});