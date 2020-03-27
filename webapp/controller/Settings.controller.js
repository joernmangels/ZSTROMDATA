sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	//"sap/ui/model/Filter"

], function(Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("de.mangels.controller.Settings", {

		_formFragments: {},

		onInit: function(evt) {

			// var oViewModel = new JSONModel({
			// 	_PANEL1: false
			// });
			// this.getView().setModel(oViewModel, "viewcontrol");

			// For test
			// var oModel = new JSONModel(jQuery.sap.getModulePath("de.mangels.model", "/Settings.json"));
			// this.getView().setModel(oModel);
			// this.getView().bindElement("/SettingsCollection/0");

			//this._loaddata_all();
			//this._transfer_modeldata_all();
			this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");
			this.getView().setModel(this.getOwnerComponent().getModel("mc_woche"), "mc_woche");
			this.getView().setModel(this.getOwnerComponent().getModel("mc_monat"), "mc_monat");
			this.getView().setModel(this.getOwnerComponent().getModel("mc_jahr"), "mc_jahr");
			this.getView().setModel(this.getOwnerComponent().getModel("autoreload"), "autoreload");

			// Set the initial form to be the display one
			this._showFormFragment("0", "Settings0Display");
			this._showFormFragment("1", "Settings1Display");
			this._showFormFragment("2", "Settings2Display");
			this._showFormFragment("3", "Settings3Display");
			this._showFormFragment("4", "Settings4Display");

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
			//this.getOwnerComponent().getRouter().navTo("onNavToAktuelleDaten");
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				window.history.go(-2);
			}
		},
		handleFullscreen: function(evt) {
			this.getOwnerComponent().handleFullscreen(evt);
		},
		handleImage3Press: function(evt) {

			this.getOwnerComponent().openInfoDialog();
		},
		onExit: function() {
			for (var sPropertyName in this._formFragments) {
				if (!this._formFragments.hasOwnProperty(sPropertyName)) {
					return;
				}

				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},
		handleEditPress: function() {
			//Clone the data
			//this._oSettings = jQuery.extend({}, this.getView().getModel().getData().SettingsCollection[0]);
			this._toggleButtonsAndView(true);
		},
		handleCancelPress: function() {
			//Restore the data
			//var oModel = this.getView().getModel("settings");
			//var oData = oModel.getData();

			//oData.SettingsCollection[0] = this._oSettings;
			//oModel.setData(oData);
			//this._loaddata_all();
			//this._transfer_modeldata_all();
			this._toggleButtonsAndView(false);
		},
		// _transfer_modeldata_all: function() {
		// 	this._transfer_modeldata("mc_tag");
		// },
		// _transfer_modeldata: function(art) {
		// 	var oModel = this.getOwnerComponent().getModel(art);
		// 	this.getView().setModel(oModel, art);
		// },
		_loaddata: function(art) {
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			var oModel = new JSONModel();
			var oEntry = {};

			
			url =  targetProtocol + targetHostname + "/STROM/settings_load.php";

			oEntry.NAMESET = art;
			oModel.loadData(url, oEntry, true, "POST");
			this.getView().setModel(oModel, art);
			//this.getView().bindElement("/SettingsSet/0");
		},
		// _loaddata_all: function() {
		// 	this._loaddata("mc_tag");
		// },
		handleSavePress: function() {

			this._savedata("mc_tag");
			this._savedata("mc_woche");
			this._savedata("mc_monat");
			this._savedata("mc_jahr");
			this._savedata("autoreload");
			//var oModel = new JSONModel("http://192.168.2.140/STROM/pvdaten_aktuell.php", false);
			// var oModel = new JSONModel(url, false);
			// this.getView().setModel(oModel, "pvaktuell");
			//oModel.loadData(url, oPara, true, "POST");
			//var oModel = new JSONModel(url, false);
			//this.getView().setModel(oModel, "vbaktuell");
			//this.getOwnerComponent()._loadSettings_all();
			//this._loaddata_all();
			// 
			// this.getOwnerComponent()._loadSettings_all(targetHostname);
			// this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");

			//var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			//this.getOwnerComponent()._loadSettings_all(targetHostname);

			// var view = sap.ui.getCore().byId("__component0---monitor");
			// if (view) {
			// 	//	sap.ui.controller("de.mangels.controller.Monitor")._set_autoreload(view);
			// 	var controller = sap.ui.controller("de.mangels.controller.Monitor");
			// 	controller._set_autoreload(controller);
			// }

			// var view = sap.ui.getCore().byId("__component0---monitor");
			// if (view) {
			// 	var controller = sap.ui.controller("de.mangels.controller.Monitor");
				
			// 	var oModel =  this.getView().getModel("autoreload");
			// 	view.setModel(oModel, "autoreload");
			// 	var counter = controller._get_intervall_reload(oModel);
			// 	var comp = this.getOwnerComponent();
			// 	comp._trigger.setInterval(counter);
			// }

			var savetext = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("savetext");
			MessageToast.show(savetext);
			this._toggleButtonsAndView(false);
		},
		_savedata: function(art) {

			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			url = targetProtocol + targetHostname + "/STROM/settings_save.php";

			var oEntry = {};
			var oModel = this.getView().getModel(art);

			oEntry.KEY = art;
			oEntry.W01 = oModel.getProperty("/SettingsSet/pv1_scale");
			oEntry.W02 = oModel.getProperty("/SettingsSet/pv1_targetvalue");
			oEntry.W03 = oModel.getProperty("/SettingsSet/pv1_targetvaluep");
			oEntry.W04 = oModel.getProperty("/SettingsSet/pv1_colorthreshold");
			oEntry.W05 = oModel.getProperty("/SettingsSet/pv1_threshold1");
			oEntry.W06 = oModel.getProperty("/SettingsSet/pv1_threshold1_color");
			oEntry.W07 = oModel.getProperty("/SettingsSet/pv1_threshold2");
			oEntry.W08 = oModel.getProperty("/SettingsSet/pv1_threshold2_color");
			oEntry.W09 = oModel.getProperty("/SettingsSet/pv1_threshold3");
			oEntry.W10 = oModel.getProperty("/SettingsSet/pv1_threshold3_color");
			oEntry.W11 = oModel.getProperty("/SettingsSet/pv1_threshold4");
			oEntry.W12 = oModel.getProperty("/SettingsSet/pv1_threshold4_color");
			oEntry.W13 = oModel.getProperty("/SettingsSet/vb1_scale");
			oEntry.W14 = oModel.getProperty("/SettingsSet/vb1_targetvalue");
			oEntry.W15 = oModel.getProperty("/SettingsSet/vb1_targetvaluep");
			oEntry.W16 = oModel.getProperty("/SettingsSet/vb1_colorthreshold");
			oEntry.W17 = oModel.getProperty("/SettingsSet/vb1_threshold1");
			oEntry.W18 = oModel.getProperty("/SettingsSet/vb1_threshold1_color");
			oEntry.W19 = oModel.getProperty("/SettingsSet/vb1_threshold2");
			oEntry.W20 = oModel.getProperty("/SettingsSet/vb1_threshold2_color");
			oEntry.W21 = oModel.getProperty("/SettingsSet/vb1_threshold3");
			oEntry.W22 = oModel.getProperty("/SettingsSet/vb1_threshold3_color");
			oEntry.W23 = oModel.getProperty("/SettingsSet/vb1_threshold4");
			oEntry.W24 = oModel.getProperty("/SettingsSet/vb1_threshold4_color");

			// oModel.loadData(url, oEntry, true, "POST");
			// oModel.attachRequestCompleted(function() {
			// 	// this.getOwnerComponent()._loadSettings_all(targetHostname);
			// 	// this.getView().setModel(this.getOwnerComponent().getModel("mc_tag"), "mc_tag");
			// 	// this.getView().setModel(this.getOwnerComponent().getModel("mc_woche"), "mc_woche");
			// 	// this.getView().setModel(this.getOwnerComponent().getModel("mc_monat"), "mc_monat");
			// 	// this.getView().setModel(this.getOwnerComponent().getModel("mc_jahr"), "mc_jahr");
			// 	this.getOwnerComponent()._loadSetting(targetHostname, art);
			// 	this.getView().setModel(this.getOwnerComponent().getModel(art), art);
			// });

			oModel.attachEventOnce("requestCompleted", function(oEvent) {
				this.getOwnerComponent()._loadSetting(targetHostname, art);
				this.getView().setModel(this.getOwnerComponent().getModel(art), art);
			}, this).loadData(url, oEntry, true, "POST");

		},
		_toggleButtonsAndView: function(bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// var oPanel1 = this.getView().byId("panel1");
			// var exp = oPanel1.mProperties.expanded;
			// var oViewModel = this.getView().getModel("viewcontrol");
			// oViewModel.setProperty("/_PANEL1", exp);

			// Set the right form type
			this._showFormFragment("0", bEdit ? "Settings0Change" : "Settings0Display");
			this._showFormFragment("1", bEdit ? "Settings1Change" : "Settings1Display");
			this._showFormFragment("2", bEdit ? "Settings2Change" : "Settings2Display");
			this._showFormFragment("3", bEdit ? "Settings3Change" : "Settings3Display");
			this._showFormFragment("4", bEdit ? "Settings4Change" : "Settings4Display");
		},
		_getFormFragment: function(sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "de.mangels.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		_showFormFragment: function(num, sFragmentName) {
			//var oPage = this.getView().byId("page");
			var pn = "panel" + num;
			var oPage1 = this.getView().byId(pn);
			oPage1.removeAllContent();
			oPage1.insertContent(this._getFormFragment(sFragmentName));
		}

	});
});