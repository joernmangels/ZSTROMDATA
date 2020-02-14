sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"de/mangels/controller/formatter",
	"sap/ui/integration/library"

], function(Controller, History, JSONModel, MessageToast, formatter, integrationLibrary) {
	"use strict";

	return Controller.extend("de.mangels.controller.Cards_Watt", {

		onInit: function(evt) {
			//var cardManifests = new JSONModel();
			// componentCardUrl = sap.ui.require.toUrl("sap/ui/integration/sample/CardsLayout/componentCard/manifest.json"),
			// homeIconUrl = sap.ui.require.toUrl("sap/ui/integration/sample/CardsLayout/images/CompanyLogo.png"),
			// date = DateFormat.getDateInstance({style: "long"}).format(new Date());

			//cardManifests.loadData(sap.ui.require.toUrl("de/mangels/cards/CadardManifests.json"));

			// this.getView().setModel(cardManifests, "manifests");
			// this.getView().setModel(new JSONModel({
			// 	componentCardUrl: componentCardUrl,
			// 	homeIconUrl: homeIconUrl,
			// 	date: date
			// }));
		}

	});
});