
module.exports = function(app) {

	var fsPath = require('fs-path');
	var fs = require('fs-extra');
	
	// Initializing constants
	var constants = require("./constants.js");
	
	var baseFolder=constants.baseFolder
	var staticResourcePath=constants.staticResourcePath

	var request=null, response=null
	app.post("/uploadCoverageReport", function(req, res) {
		request=req
		response=res
		startUpload()
	})
	
	function failure(status) {
		response.send({"failure": true, "statusCode": status})
	}

	function startUpload() {
		if(request.body) {
			findFileByType(request.body)
		} else {
			failure(1)
		}
	}

	function findFileByType(req) {
		if(req.forComponent && req.fileName && req.fileData) {
			createFileWithData(req.forComponent, req.fileName, req.fileData)
		} else {
			failure(2)
		}
	}

	function createFileWithData(baseName, fileName, fileData) {
		var file=baseFolder + baseName + "/" +fileName

		fsPath.writeFile(file, fileData, function(err){
		  if(err) {
		    failure(3);
		  } else {
		    createResources(baseName)
		  }
		});
	}

	function createResources(baseName) {
		var toPath="/resources"
		var toFolderPath=baseFolder + baseName + toPath

		fs.ensureDir(toFolderPath, err => {
		    if (err) {
		    	failure(4);
		    } else {
				copyResources(toFolderPath)
		    }
		})

	}

	function copyResources(toFolderPath) {
		fs.copy(staticResourcePath, toFolderPath, err => {
		    if (err) {
		    	failure(5);
		    } else {
		    	response.send({"success": true});
		    }
	    })
	}
	
}