(function() {

	function getJSONData() {
		$.get("../CoverageReportJson/report.json")
		.done(function(json) {
			if(Object.keys(json).length > 0) {
				constructCoverageReport(json)	
			} else {
				noDataToShow()
			}
		})
		.fail(function() {
			noDataToShow()
		})
	}
	getJSONData()

	function constructCoverageReport(json) {
		for(item in json) {
			var data=json[item]
			appendCoverageReportToDOM(data)
		}
	}

	function appendCoverageReportToDOM(item) {
		var html=`
			<tr>
              <td>${item.name}</td>
              <td><a target="_blank" href="../CoverageReport/${item.name}/index.html">${(item.percentage?item.percentage:"-")}</td>
              <td>${(item.version?item.version:"-")}</td>
          	</tr>
		`;

		$("#reportData").append(html)
	}

	function noDataToShow() {
		var html=`
			<tr>
			  <td></td>
              <td>No data available</td>
              <td></td>
          	</tr>
		`;

		$("#reportData").append(html)
	}

})();