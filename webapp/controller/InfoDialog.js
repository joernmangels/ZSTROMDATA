sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel"
], function (UI5Object, JSONModel) {
	"use strict";

	return UI5Object.extend("de.mangels.controller.InfoDialog", {

		constructor : function (oView) {
			this._oView = oView;	
		},


		open : function () {
			var oView = this._oView;
			var oDialog = oView.byId("infoDialog");
			
			// create dialog lazily
			if (!oDialog) {
				var oFragmentController = {
					onCloseDialog : function () {
						oDialog.close();
					}
				};
				// create dialog via fragment factory
				oDialog = sap.ui.xmlfragment(oView.getId(), "de.mangels.view.InfoDialog", oFragmentController);
				// connect dialog to the root view of this component (models, lifecycle)
				oView.addDependent(oDialog);
			}
			oDialog.open();
		}
	});

});