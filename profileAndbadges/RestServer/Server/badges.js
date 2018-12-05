
module.exports = function(app) {

	// Initializing modules
	var badge = require('gh-badges');
	var fsPath = require('fs-path');
	var constants = require("./constants.js");
	var jsonGenerator = require("./jsonGenerator.js")();

	var baseFolder=constants.baseFolder, request=null, response=null
	
	app.post("/badge", function(req, res) {
		request=req, response=res
		badgeCreation()
	})
	
	function failure(status) {
		response.send({"failure": true, "statusCode": status})
	}

	function success() {
		response.send({"success": true});
	}
	
	function badgeCreation() {
		if(request.body && request.body.subject && request.body.status && request.body.fileName && request.body.type) {
			badge({ text: [ request.body.subject, request.body.status ], colorscheme: "green", template: "flat-square" },
				function(svg, err) {
					if (err) {
						return failure("svg creation failure")
					}
					writeToFile(svg)
			});
			
		} else {
			failure("request invalid")
		}
	}
	
	function writeToFile(svgText) {
		var fileName=getSubject(), originalFileName=request.body.fileName
		var filePath=baseFolder+originalFileName+"/"+fileName+".svg"
		fsPath.writeFile(filePath, svgText, function (err) {
		  if(err) {
		    return failure("svg save failure")
		  } else {
		    jsonGenerator.jsonGenerator(originalFileName, request.body.status, request.body.type, success, failure)
		  }
		});
	}

	function getSubject() {
		if (request.body.type == "version") {
			return request.body.fileName+"Version"
		}
		return request.body.fileName
	}
}