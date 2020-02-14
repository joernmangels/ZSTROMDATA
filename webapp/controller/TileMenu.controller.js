sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageToast'
], function(jQuery, Controller, JSONModel, MessageToast) {
	"use strict";

	var PageController = Controller.extend("de.mangels.controller.TileMenu", {

		onInit: function(evt) {
			// set mock model
			// var sPath = jQuery.sap.getModulePath("de.varelmann.model", "/TileMenu.json");
			// var oModel = new JSONModel(sPath);
			// this.getView().setModel(oModel);
		},
		// 	press: function(evt) {
		// 		// Navigation bei Klick auf Menü-Tile
		// 		var oContext = evt.getSource().getBindingContext("menu");
		// 		var oModel = evt.getSource().getModel("menu");
		// 		var target = oModel.getProperty(oContext.getPath()).target;

		// 		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		// 		oRouter.navTo(target);
		// 	}

		// });

		onTilePress: function(oEvent) {
			//Navigation bei Klick auf Menü-Tile
			var oContext = oEvent.getSource().getBindingContext("menu");
			var oModel = oEvent.getSource().getModel("menu");
			var target = oModel.getProperty(oContext.getPath()).target;

			if (typeof target != "undefined") {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo(target);
			}

			var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getProperty("title");

			// if (oCtx == "Wareneingang zur Bestellung buchen") {
			// 	//MessageToast.show(oCtx);
			// 	// 	this.getRouter().navTo("employee",{
			// 	// 	employeeId : oCtx.getProperty("EmployeeID")
			// 	// });
			// 	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// 	oRouter.navTo("MasterDetail");
			// }
			if (oCtx == "Einstellungen") {
				MessageToast.show(oCtx);
			}
		}

	});
	return PageController;

});