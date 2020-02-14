sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
	//"sap/ui/model/Filter"

], function(Controller, History, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("de.mangels.controller.Auswertung1", {

		onInit: function(evt) {

			var oEntry = this.init_data_view();
			var oModel = this.loaddata(oEntry);
			var oModel_cp = this.loaddata_cp(oEntry);
			this.init_enterdates();
			this.init_Chart(evt, oModel, "Chart1", "idPopOver1", "column");
			this.init_Chart(evt, oModel, "Chart2", "idPopOver2", "bar");

			//this.init_Chart_cp(evt, oModel_cp, "Chart1", "idPopOver1", "column");
			//this.init_Chart_cp(evt, oModel_cp, "Chart2", "idPopOver2", "bar");
		},
		init_data_view: function() {
			var datum_heute = new Date();
			datum_heute.setHours(23, 59, 59);
			// datum_heute.setMinutes(59);
			// datum_heute.setSeconds(59);
			var date2 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');
			datum_heute.setDate(1);
			var date3 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');

			var oEntry = {};
			//var date2 = new Date().toISOString().substr(0, 19).replace('T', ' ');

			oEntry.ART = "PV";
			oEntry.TABLE = "TAG";
			oEntry.START = date3;
			oEntry.ENDE = date2;
			//oEntry.START = datum_heute.getFullYear() + "-" + datum_heute.getMonth() + "-" + "01" + " 23:59:59";
			//oEntry.ENDE = datum_heute.getFullYear() + "-" + datum_heute.getMonth() + "-" + datum_heute.getDate() + " 23:59:59";
			// oEntry.START = "2012-01-20 23:59:59";
			// oEntry.ENDE = "2018-02-05 23:59:59";

			var title = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("pvtitle_chart");
			var tag = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tage");
			//var charttitle = title + "-" + tag;

			var oViewModel = new JSONModel({
				_ART: oEntry.ART,
				_TABLE: oEntry.TABLE,
				_START: oEntry.START,
				_ENDE: oEntry.ENDE,
				_TITLE1: title,
				_TITLE2: tag
			});

			this.getView().setModel(oViewModel, "controldata");
			return oEntry;
		},
		init_enterdates: function() {
			this._oEnterDatesDialogFragment = sap.ui.xmlfragment("de.mangels.view.EnterDatesDialog", this.getView().getController());
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "i18n/i18n.properties"
			});
			this._oEnterDatesDialogFragment.setModel(i18nModel, "i18n");

			var oViewModel = this.getView().getModel("controldata");
			this._oEnterDatesDialogFragment.setModel(oViewModel, "fdata");

		},
		loaddata: function(oPara) {
			//var oModel = new sap.ui.model.json.JSONModel("model/Strom.json");
			var oModel = new sap.ui.model.json.JSONModel();
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");

			// Post data to the server
			//oModel.loadData("http://192.168.2.140/STROM/get_data_json.php", oPara, true, "POST");
			//url = "http://" + targetHostname + "/STROM/get_data_json.php";
			url = targetProtocol + targetHostname + "/STROM/get_data_json.php";
			oModel.loadData(url, oPara, true, "POST");

			//oModel.attachRequestCompleted(function() {
			return oModel;
			//});
		},
		loaddata_cp: function(oPara) {
			//var oModel = new sap.ui.model.json.JSONModel("model/Strom.json");
			var oModel = new sap.ui.model.json.JSONModel();
			var url;
			var targetHostname = this.getOwnerComponent().getModel("hostName").getProperty("/_HOSTNAME");
			var targetProtocol = this.getOwnerComponent().getModel("hostName").getProperty("/_PROTOCOL");
			// Post data to the server
			//oModel.loadData("http://192.168.2.140/STROM/get_data_compare_json.php", oPara, true, "POST");
			//url = "http://" + targetHostname + "/STROM/get_data_compare_json.php";
			url = targetProtocol + targetHostname + "/STROM/get_data_compare_json.php";
			oModel.loadData(url, oPara, true, "POST");

			//oModel.attachRequestCompleted(function() {
			return oModel;
			//});
		},
		onEnterDatePress: function() {

			this._oEnterDatesDialogFragment.open();
			// var oView = this.getView();
			// var oDialog = oView.byId("enterDatesDialog");
			// if (!oDialog) {
			// 	oDialog = sap.ui.xmlfragment(oView.getId(), "de.mangels.view.EnterDatesDialog", this);
			// 	oView.addDependent(oDialog);
			// }
			// oDialog.open();
		},
		onCloseEnterDates: function() {
			//this.getView().byId("enterDatesDialog").close();
			this.binding_change();
			this._oEnterDatesDialogFragment.close();

		},
		onNavButtonPressed: function() {
			this.getOwnerComponent().getRouter().navTo("home");
		},
		handleFullscreen: function(evt) {
			this.getOwnerComponent().handleFullscreen(evt);
		},
		handleImage3Press: function(evt) {
			MessageToast.show("The ImageContent is pressed.");
			this.getOwnerComponent().openInfoDialog();
		},
		_Feeds: function(oVizFrame, art) {
			var datum_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("datum");

			if (art === "PV" || art === "VB") {
				var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "valueAxis",
						"type": "Measure",
						"values": ["kw/h"]
					}),
					// oFeedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					// 	"uid": "valueAxis",
					// 	"type": "Measure",
					// 	"values": ["Sugar"]
					// }),
					// oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					// 	"uid": "valueAxis",
					// 	"type": "Measure",
					// 	"values": ["Tea"]
					// }),

					oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "categoryAxis",
						"type": "Dimension",
						// "values": ["Datum"]
						"values": [datum_text]
					});

				oVizFrame.addFeed(oFeedValueAxis);
				// oVizFrame.addFeed(oFeedValueAxis1);
				// oVizFrame.addFeed(oFeedValueAxis2);
				oVizFrame.addFeed(oFeedCategoryAxis);

			} else if (art === "CP") {

				var oFeedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "valueAxis",
						"type": "Measure",
						"values": ["kw/h"]
					}),
					// oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					// 	"uid": "valueAxis2",
					// 	"type": "Measure",
					// 	"values": ["kw/h-VB"]
					// }),
					oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "categoryAxis",
						"type": "Dimension",
						// "values": ["Datum"]
						"values": [datum_text]
					}),
					oFeedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "color",
						"type": "Dimension",
						"values": ["Zaehler"]
					});

				oVizFrame.addFeed(oFeedValueAxis1);
				//oVizFrame.addFeed(oFeedValueAxis2);
				oVizFrame.addFeed(oFeedCategoryAxis);
				oVizFrame.addFeed(oFeedColor);
			}
		},
		_FlattenedDataset: function(oVizFrame, art) {
			var datum_text = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("datum");
			if (art === "PV" || art === "VB") {
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
						// name: "Datum",
						name: datum_text,
						value: "{Datum}"
					}],

					measures: [{
						name: "kw/h",
						value: "{Wert}"
					}],

					data: {
						// path: dataSet
						path: "/DataSet"
					}
				});
			} else if (art === "CP") {
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
						// name: "Datum",
						name: datum_text,
						value: "{Datum}"
					}, {
						name: "Zaehler",
						value: "{Zaehler}"
					}],

					measures: [{
						name: "kw/h",
						value: "{Wert}"
					}],

					data: {
						path: "/DataSet"
					}
				});
			}

			oVizFrame.setDataset(oDataset);
		},
		_VizProperties: function(oVizFrame, art, charttitle) {
			if (art === "PV" || art === "VB") {
				oVizFrame.setVizProperties({
					plotArea: {
						dataLabel: {
							visible: true
						}
					},
					tooltip: {
						visible: true
					},
					title: {
						text: charttitle
					}
				});
			} else if (art === "CP") {
				oVizFrame.setVizProperties({
					plotArea: {
						colorPalette: ["#31B404", "#FF0040"],
						dataLabel: {
							visible: true
						}
					},
					tooltip: {
						visible: true
					},
					title: {
						text: charttitle
					}
				});
			}
		},
		// Erste Init-Function für Einspeisung und Verbrauch
		init_Chart: function(evt, oModel, chartnum, popovernum, type) {
			var color;
			var art = this.getView().getModel("controldata").getProperty("/_ART");
			var titlechart1 = this.getView().getModel("controldata").getProperty("/_TITLE1");
			var titlechart2 = this.getView().getModel("controldata").getProperty("/_TITLE2");
			var startdatum = this.getView().getModel("controldata").getProperty("/_START");
			var endedatum = this.getView().getModel("controldata").getProperty("/_ENDE");
			var bis = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("bis");
			var charttitle = titlechart1 + "-" + titlechart2 + " (" + startdatum.substr(0, 10) + " " + bis + " " + endedatum.substr(0, 10) +
				")";

			var sampleDatajson = oModel;

			var oVizFrame = this.getView().byId(chartnum);

			oVizFrame.setBusy(true);
			oVizFrame.setVizType(type);

			var oPopOver = this.getView().byId(popovernum);
			oPopOver.connect(oVizFrame.getVizUid());

			this._VizProperties(oVizFrame, art, charttitle);
			// oVizFrame.setVizProperties({
			// 	plotArea: {
			// 		//colorPalette: d3.scale.category20().range(),
			// 		// dataLabel: {
			// 		// 	showTotal: true
			// 		// }
			// 		dataLabel: {
			// 			visible: true
			// 		}
			// 	},
			// 	tooltip: {
			// 		visible: true
			// 	},
			// 	title: {
			// 		text: charttitle
			// 	}
			// });

			this._FlattenedDataset(oVizFrame, art);
			// var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			// 	dimensions: [{
			// 		name: "Datum",
			// 		value: "{Datum}"
			// 	}],

			// 	measures: [{
			// 		name: "kw/h",
			// 		value: "{Wert}"
			// 	}],

			// 	data: {
			// 		// path: dataSet
			// 		path: "/DataSet"
			// 	}
			// });
			// oVizFrame.setDataset(oDataset);

			oVizFrame.setVizScales([{
				feed: "color",
				palette: "#31B404" //Grün 
			}]);

			oVizFrame.setModel(sampleDatajson);

			this._Feeds(oVizFrame, art);
			// var oFeedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 		"uid": "valueAxis",
			// 		"type": "Measure",
			// 		"values": ["kw/h"]
			// 	}),
			// 	// oFeedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 	// 	"uid": "valueAxis",
			// 	// 	"type": "Measure",
			// 	// 	"values": ["Sugar"]
			// 	// }),
			// 	// oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 	// 	"uid": "valueAxis",
			// 	// 	"type": "Measure",
			// 	// 	"values": ["Tea"]
			// 	// }),

			// 	oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
			// 		"uid": "categoryAxis",
			// 		"type": "Dimension",
			// 		"values": ["Datum"]
			// 	});

			// oVizFrame.addFeed(oFeedValueAxis);
			// // oVizFrame.addFeed(oFeedValueAxis1);
			// // oVizFrame.addFeed(oFeedValueAxis2);
			// oVizFrame.addFeed(oFeedCategoryAxis);
			oVizFrame.setBusy(false);
		},
		// Erste Init-Function für Vergleich
		init_Chart_cp: function(evt, oModel, chartnum, popovernum, type) {
			var color;
			var art = this.getView().getModel("controldata").getProperty("/_ART");
			var titlechart1 = this.getView().getModel("controldata").getProperty("/_TITLE1");
			var titlechart2 = this.getView().getModel("controldata").getProperty("/_TITLE2");
			var startdatum = this.getView().getModel("controldata").getProperty("/_START");
			var endedatum = this.getView().getModel("controldata").getProperty("/_ENDE");
			var bis = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("bis");
			var charttitle = titlechart1 + "-" + titlechart2 + " (" + startdatum.substr(0, 10) + " " + bis + " " + endedatum.substr(0, 10) +
				")";

			// var dataSet = this.getView().getModel("controldata").getProperty("/_SET");
			//var sampleDatajson = new sap.ui.model.json.JSONModel("model/Strom.json");

			if (art === "PV") {
				color = "#31B404"; //Grün
			} else if (art === "VB") {
				color = "#FF0040"; //Rot
			}

			var sampleDatajson = oModel;
			var oVizFrame = this.getView().byId(chartnum);
			oVizFrame.setBusy(true);
			oVizFrame.setVizType(type);

			var oPopOver = this.getView().byId(popovernum);
			oPopOver.connect(oVizFrame.getVizUid());

			oVizFrame.setVizProperties({
				plotArea: {
					//colorPalette  : d3.scale.category20().range(),
					//drawingEffect : "glossy",
					// dataLabel: {
					// 	showTotal: true
					// }
					colorPalette: ["#31B404", "#FF0040"],

					dataLabel: {
						visible: true
					}

					// secondaryScale: {
					// 	fixedRange: true,
					// 	minValue: 0,
					// 	maxValue: 20
					// },
				},
				tooltip: {
					visible: true
				},
				title: {
					text: charttitle
				}
				// yAxis: {
				// 	scale: {
				// 		fixedRange: true,
				// 		minValue: 0,
				// 		maxValue: 20
				// 	}
				// },
				// valueAxis: {
				// 	title: {
				// 		visible: false
				// 	}
				// },
				// categoryAxis: {
				// 	title: {
				// 		visible: false

				// 	}
				// }
			});
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				dimensions: [{
					name: "Datum",
					value: "{Datum}"
				}, {
					name: "Zaehler",
					value: "{Zaehler}"
				}],

				measures: [{
					name: "kw/h",
					value: "{Wert}"
				}],

				data: {
					path: "/DataSet"
				}
			});

			// oVizFrame.setVizScales([{
			// 	feed: "color",
			// 	palette: [
			// 		["#31B404"],
			// 		["#FF0040"]
			// 	]
			// }]);

			// oVizFrame.setVizScales([{
			// 	feed: "color",
			// 	palette: ["#31B404"]
			// }]);

			oVizFrame.setDataset(oDataset);

			oVizFrame.setModel(sampleDatajson);

			var oFeedValueAxis1 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "valueAxis",
					"type": "Measure",
					"values": ["kw/h"]
				}),
				// oFeedValueAxis2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
				// 	"uid": "valueAxis2",
				// 	"type": "Measure",
				// 	"values": ["kw/h-VB"]
				// }),
				oFeedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "categoryAxis",
					"type": "Dimension",
					"values": ["Datum"]
				}),
				oFeedColor = new sap.viz.ui5.controls.common.feeds.FeedItem({
					"uid": "color",
					"type": "Dimension",
					"values": ["Zaehler"]
				});

			oVizFrame.addFeed(oFeedValueAxis1);
			//oVizFrame.addFeed(oFeedValueAxis2);
			oVizFrame.addFeed(oFeedCategoryAxis);
			oVizFrame.addFeed(oFeedColor);
			oVizFrame.setBusy(false);
		},
		handleSelectionChange1: function(oEvent) {

			var oViewModel = this.getView().getModel("controldata");

			var oItem = oEvent.getParameter("selectedItem");
			if (oItem.getKey() === "0") {
				// PV
				oViewModel.setProperty("/_ART", "PV");
				// oViewModel.setProperty("/_SET", "/PvTageSet");
				var pvtitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("pvtitle_chart");
				oViewModel.setProperty("/_TITLE1", pvtitle);
			} else if (oItem.getKey() === "1") {
				// VB
				oViewModel.setProperty("/_ART", "VB");
				// oViewModel.setProperty("/_SET", "/VbTageSet");
				var vbtitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("vbtitle_chart");
				oViewModel.setProperty("/_TITLE1", vbtitle);
			} else if (oItem.getKey() === "2") {
				// CP
				oViewModel.setProperty("/_ART", "CP");
				// oViewModel.setProperty("/_SET", "/VbTageSet");
				var cptitle = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("cptitle_chart");
				oViewModel.setProperty("/_TITLE1", cptitle);
			}
			this.binding_change();
		},
		handleSelectionChange2: function(oEvent) {

			var oViewModel = this.getView().getModel("controldata");

			var oItem = oEvent.getParameter("selectedItem");
			if (oItem.getKey() === "0") {
				//TAG
				oViewModel.setProperty("/_TABLE", "TAG");
				var pvtitlet = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("tage");
				oViewModel.setProperty("/_TITLE2", pvtitlet);

			} else if (oItem.getKey() === "1") {
				// WOCHE
				oViewModel.setProperty("/_TABLE", "WOCHE");
				var pvtitlew = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("wochen");
				oViewModel.setProperty("/_TITLE2", pvtitlew);

			} else if (oItem.getKey() === "2") {
				// MONAT
				oViewModel.setProperty("/_TABLE", "MONAT");
				var pvtitlem = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("monate");
				oViewModel.setProperty("/_TITLE2", pvtitlem);

			} else if (oItem.getKey() === "3") {
				// JAHR
				oViewModel.setProperty("/_TABLE", "JAHR");
				var pvtitlej = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("jahre");
				oViewModel.setProperty("/_TITLE2", pvtitlej);
			}
			this.binding_change();
		},
		update_chart: function(oEntry, charttitle, chartnum) {
			var color;
			var oModel = this.loaddata(oEntry);
			var oVizFrame = this.getView().byId(chartnum);
			oVizFrame.setModel(oModel);
			oVizFrame.setVizProperties({
				title: {
					text: charttitle
				}
			});

			if (oEntry.ART === "PV") {
				color = "#31B404"; //Grün
			} else if (oEntry.ART === "VB") {
				color = "#FF0040"; //Rot
			}
			oVizFrame.setVizScales([{
				feed: "color",
				palette: [color]
			}]);
		},
		update_chart_new: function(oEntry, charttitle, chartnum) {
			// vizFrame.vizUpdate({
			//           'data' : data,
			//           'properties' : properties,
			//           'scales' : scales,
			//           'customizations' : customizations,
			//           'feeds' : feeds
			//       });

			var oModel;
			var oVizFrame = this.getView().byId(chartnum);
			oVizFrame.removeAllFeeds();

			this._Feeds(oVizFrame, oEntry.ART);
			this._VizProperties(oVizFrame, oEntry.ART, charttitle);
			this._FlattenedDataset(oVizFrame, oEntry.ART);

			switch (oEntry.ART) {
				case "PV":
					oModel = this.loaddata(oEntry);
					oVizFrame.setVizScales([{
						feed: "color",
						palette: "#31B404" //Grün
					}]);
					break;
				case "VB":
					oModel = this.loaddata(oEntry);
					oVizFrame.setVizScales([{
						feed: "color",
						palette: "#FF0040" //Rot
					}]);
					break;
				case "CP":
					oModel = this.loaddata_cp(oEntry);
			}

			oVizFrame.setModel(oModel);

		},
		binding_change: function(evt) {
			var oEntry = {};
			// var color;
			oEntry.ART = this.getView().getModel("controldata").getProperty("/_ART");
			oEntry.TABLE = this.getView().getModel("controldata").getProperty("/_TABLE");
			oEntry.START = this.getView().getModel("controldata").getProperty("/_START");
			oEntry.ENDE = this.getView().getModel("controldata").getProperty("/_ENDE");

			var titlechart1 = this.getView().getModel("controldata").getProperty("/_TITLE1");
			var titlechart2 = this.getView().getModel("controldata").getProperty("/_TITLE2");
			var bis = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("bis");
			var charttitle = titlechart1 + "-" + titlechart2 + " (" + oEntry.START.substr(0, 10) + " " + bis + " " + oEntry.ENDE.substr(0, 10) +
				")";

			// if (oEntry.ART === "PV" || oEntry.ART === "VB") {
			// 	this.update_chart(oEntry, charttitle, "Chart1");
			// 	this.update_chart(oEntry, charttitle, "Chart2");
			// }
			this.update_chart_new(oEntry, charttitle, "Chart1");
			this.update_chart_new(oEntry, charttitle, "Chart2");
		},
		onZeitraumSetzen: function(oEvent) {
			var awoche = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("awoche");
			var amonat = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("amonat");
			var ajahr = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ajahr");
			var ende;
			var start;
			//the selected item could be found via the "item" parameter of "selectionChange" event
			//sap.m.MessageToast.show("oEvent.getParameter('time').getText(): " + oEvent.getParameter("item").getText() + " selected");

			var oModelData = this._oEnterDatesDialogFragment.getModel("fdata");

			var selected = oEvent.getParameter("item").getText();

			var datum_heute = new Date();
			datum_heute.setHours(23);
			datum_heute.setMinutes(59);
			datum_heute.setSeconds(59);
			var date2 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');

			if (selected === awoche) {
				var day_aktuell = datum_heute.getDay(); //Aktueller Wochentag	Freitag=5
				day_aktuell = day_aktuell - 1;
				var jetzt = datum_heute.getTime();
				var damals = jetzt - (day_aktuell * 24 * 3600 * 1000);
				var date5 = new Date();
				date5.setTime(damals);

				ende = date2;
				var start = date5.toISOString().substr(0, 19).replace('T', ' ');

			}
			if (selected === amonat) {
				datum_heute.setDate(1);
				var date3 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');
				start = date3;
				ende = date2;
			}
			if (selected === ajahr) {
				datum_heute.setDate(1);
				datum_heute.setMonth(0);
				var date3 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');
				start = date3;
				ende = date2;
			}
			oModelData.setProperty("/_START", start);
			oModelData.setProperty("/_ENDE", ende);

			//the selected item could also be found via the "selectItem" association not only when "selectionChange" but when needed
			// this.getView().byId('selectedItem').setText("getSelectedItem(): " +
			// 	sap.ui.getCore().byId(this.getView().byId('item').getSelectedItem()).getText());
		},
		onSelectRadio: function(oEvent) {
			var awoche = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("awoche");
			var amonat = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("amonat");
			var ajahr = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ajahr");
			var lwoche = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("lwoche");
			var lmonat = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("lmonat");
			var ljahr = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ljahr");
			var ende;
			var start;

			var oModelData = this._oEnterDatesDialogFragment.getModel("fdata");
			var oSelectedIndex = oEvent.getParameter("selectedIndex");
			var oRadioButtonSrc = oEvent.getSource().getAggregation("buttons");
			// var oSelectedRadioText = oRadioButtonSrc[oSelectedIndex].getText();
			// alert(oSelectedRadioText);

			var datum_heute = new Date();
			datum_heute.setHours(23);
			datum_heute.setMinutes(59);
			datum_heute.setSeconds(59);
			var date2 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');

			switch (oSelectedIndex) {
				case 1: //A Woche
					var day_aktuell = datum_heute.getDay(); //Aktueller Wochentag	Freitag=5
					day_aktuell = day_aktuell - 1;
					var jetzt = datum_heute.getTime();
					var damals = jetzt - (day_aktuell * 24 * 3600 * 1000);
					var date5 = new Date();
					date5.setTime(damals);

					ende = date2;
					var start = date5.toISOString().substr(0, 19).replace('T', ' ');
					break;
				case 0: //A Monat
					datum_heute.setDate(1);
					var date3 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');
					start = date3;
					ende = date2;
					break;
				case 2: //A Jahr
					datum_heute.setDate(1);
					datum_heute.setMonth(0);
					datum_heute.setHours(1, 0, 0);
					var date3 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');
					start = date3;
					ende = date2;
					break;
				case 4: //L Woche
					var jetzt = datum_heute.getTime();
					var damals = jetzt - (7 * 24 * 3600 * 1000);
					var dt = new Date();
					dt.setTime(damals);

					var currentWeekDay = dt.getDay();
					var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
					var wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
					var wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
					start = wkStart.toISOString().substr(0, 19).replace('T', ' ');
					ende = wkEnd.toISOString().substr(0, 19).replace('T', ' ');
					break;
				case 3: //L Monat
					var jetzt = datum_heute.getTime();
					var damals = jetzt - (30 * 24 * 3600 * 1000);
					var dt = new Date();
					dt.setTime(damals);
					dt.setDate(1);
					var start = dt.toISOString().substr(0, 19).replace('T', ' ');
					var lastDayOfMonth = new Date(dt.getFullYear(), dt.getMonth()+1, 0, 23, 59);
					var ende = lastDayOfMonth.toISOString().substr(0, 19).replace('T', ' ');
					break;
				case 5: //L Jahr
					var ljahr = datum_heute.getFullYear() - 1;
					datum_heute.setDate(1);
					datum_heute.setMonth(0);
					datum_heute.setHours(1, 0, 0);
					datum_heute.setFullYear(ljahr);
					var date3 = datum_heute.toISOString().substr(0, 19).replace('T', ' ');
					start = date3;
					var datum_3112 = new Date();
					datum_3112.setDate(31);
					datum_3112.setMonth(11);
					datum_3112.setFullYear(ljahr);
					datum_3112.setHours(24, 59, 0);
					ende = datum_3112.toISOString().substr(0, 19).replace('T', ' ');
					break;

			}
			oModelData.setProperty("/_START", start);
			oModelData.setProperty("/_ENDE", ende);
		}

	});
});