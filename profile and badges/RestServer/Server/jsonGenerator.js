
module.exports = function() {
	var jsonfile = require('jsonfile')

	// Initializing constants
	var constants = require("./constants.js");

	var reporterFile=constants.reporterFile

	function readFromFile(callback) {
		jsonfile.readFile(reporterFile, callback)
	}

	function writeToFile(jsonData, callback) {
		jsonfile.writeFile(reporterFile, jsonData, callback)
	}

	var newJsonInformaion={}, success=null, failure=null
	function jsonGenerator(name, value, type, successCallBack, failCallBack) {
		success=successCallBack, failure=failCallBack
		newJsonInformaion={}
		newJsonInformaion.name=name
		newJsonInformaion.value=value
		newJsonInformaion.type=type
		readFromFile(manipulateJson)
	}

	function manipulateJson(err, jsonData) {
		if (!err && newJsonInformaion.name && newJsonInformaion.value && newJsonInformaion.type) {
			constructJSONData(jsonData)
			writeToFile(jsonData, jsonCreationSuccess)
		} else {
			failure("json upload failure")
		}
	}

	function constructJSONData(jsonData) {
		if(!jsonData[newJsonInformaion.name]) {
			jsonData[newJsonInformaion.name]={}
		}
		jsonData[newJsonInformaion.name]["name"]=newJsonInformaion.name
		jsonData[newJsonInformaion.name][newJsonInformaion.type]=newJsonInformaion.value
	}

	function jsonCreationSuccess(err) {
		if (!err) {
			success();
		} else {
			failure("json upload failure")
		}
	}

	return {
		"jsonGenerator": jsonGenerator
	}
}