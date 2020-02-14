sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	//"sap/ui/model/Filter"

], function(Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("de.mangels.controller.Information", {

		onInit: function(evt) {

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
		}

	});
});