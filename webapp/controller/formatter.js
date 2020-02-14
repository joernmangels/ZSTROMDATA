sap.ui.define(function() {
	"use strict";

	var formatter = {
		topvalues_art: function(sStateValue) {
			var sStateValueToLower = sStateValue.toLowerCase();
			var topvalues_year = this.getModel("i18n").getResourceBundle().getText("topvalues_year");
			var topvalues_month = this.getModel("i18n").getResourceBundle().getText("topvalues_month");
			var topvalues_week = this.getModel("i18n").getResourceBundle().getText("topvalues_week");
			var topvalues_day = this.getModel("i18n").getResourceBundle().getText("topvalues_day");
			var topvalues_power = this.getModel("i18n").getResourceBundle().getText("topvalues_power");
			
			switch (sStateValueToLower) {
				case "j":
					return topvalues_year;
				case "m":
					return topvalues_month;
				case "w":
					return topvalues_week;					
				case "d":
					return topvalues_day;										
				case "l":
					return topvalues_power;										
			}
		},
		percentage_pv_heute: function(akt, maxpv) {
			return Math.round(100 / maxpv * akt);
		},
		aktuelle_leistungVB: function(value) {
			if (value < "500") {
				return "Good";
			}
			if (value > "500" && value < "1200") {
				return "Critical";
			}
			if (value > "1200") {
				return "Error";
			}
		},
		gesamt_jahrVB: function(value) {
			if (value < "4500.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_monatVB: function(value) {
			if (value < "350.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_wocheVB: function(value) {
			if (value < "80.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_heuteVB_neu: function(value1, value2) {
			if (value1 < value2) {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_heuteVB: function(value) {
			if (value < "12.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		aktuelle_leistung: function(value) {
			if (value < "1") {
				return "Error";
			}
			if (value > "0" && value < "800") {
				return "Critical";
			}
			if (value > "800") {
				return "Good";
			}
		},
		gesamt_jahr: function(value) {
			if (value > "2500.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_monat: function(value) {
			if (value > "300.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_woche: function(value) {
			if (value > "70.0") {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_heute_neu: function(value1, value2) {
			if (value1 > value2) {
				return "Good";
			} else {
				return "Error";
			}
		},
		gesamt_heute: function(value) {
				if (value > "9.0") {
					return "Good";
				} else {
					return "Error";
				}
			}
			// qual_key: function(sStatus) {
			// 	// N=Nicht erfasst T=teilweise erfasst V=Vollständig erfasst
			// 	if (sStatus === "U") {
			// 		return true;
			// 	} else {
			// 		return false;
			// 	}
			// },
			// mastericon: function(sStatus) {
			// 	// N=Nicht erfasst T=teilweise erfasst V=Vollständig erfasst
			// 	if (sStatus === "N") {
			// 		return "sap-icon://cancel";
			// 	}
			// 	if (sStatus === "T") {
			// 		return "sap-icon://alert";
			// 	}
			// 	if (sStatus === "V") {
			// 		return "sap-icon://complete";
			// 	}
			// 	if (sStatus === "L") {
			// 		return "sap-icon://locked";
			// 	}
			// },
			// MSType: function(sStatus) {
			// 	// N=Nicht erfasst T=teilweise erfasst V=Vollständig erfasst
			// 	if (sStatus === "N") {
			// 		return "Error";
			// 	}
			// 	if (sStatus === "T") {
			// 		return "Warning";
			// 	}
			// 	if (sStatus === "V") {
			// 		return "Success";
			// 	}
			// },
			// MSText: function(sStatus) {
			// 	// N=Nicht erfasst T=teilweise erfasst V=Vollständig erfasst
			// 	if (sStatus === "N") {
			// 		return "Der Vorgang wurde noch nicht erfasst";
			// 	}
			// 	if (sStatus === "T") {
			// 		return "Der Vorgang wurde teilweise erfasst";
			// 	}
			// 	if (sStatus === "V") {
			// 		return "Der Vorgang wurde vollständig erfasst";
			// 	}
			// },
			// status: function(sStatus) {
			// 	if (sStatus === "Available") {
			// 		return "Success";
			// 	} else if (sStatus === "Out of Stock") {
			// 		return "Warning";
			// 	} else if (sStatus === "Discontinued") {
			// 		return "Error";
			// 	} else {
			// 		return "None";
			// 	}
			// },
			// intBoolRandomizer: function(iRandom) {
			// 	return iRandom % 2 === 0;
			// },
			// favorite: function(sStatus) {
			// 	return sStatus.length % 2 === 0;
			// }
	};

	return formatter;

}, /* bExport= */ true);