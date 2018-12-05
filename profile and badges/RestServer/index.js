/*var express = require('express')
 
var app = express()
 
app.get('/notes', function(req, res) {
  res.json({notes: "This is your notebook. Edit this to start saving your notes!"})
})
 
app.listen(3000)*/

var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('privatekey.pem');
var certificate = fs.readFileSync('certificate.pem');

var credentials = {key: privateKey, cert: certificate};

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

app.use('/', express.static(__dirname + '/public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Initializing badges
require("./Server/badges.js")(app);

// Initializing uploadFile
require("./Server/uploadFile.js")(app);
 
app.get("/account", function(req, res) {
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
});


app.post("/accountInfo", function(req, res) {
	
	var autInfo = {};
	
	autInfo["8390006464"] = {"PIN":"dummy1"};
	autInfo["MEAAWARD"] = {"PIN":"amadeus"};
	autInfo["246246246"] = {"PIN":"dummy"};
	autInfo["john.smith@email.com"] = {"PIN":"dummy"};
	autInfo["8390006565"] = {"PIN":"dummy"};
	autInfo["8390006666"] = {"PIN":"dummy"};
	autInfo["8390006767"] = {"PIN":"dummy1"};
	autInfo["135135135"] = {"PIN":"dummy"};
	autInfo["323059483"] = {"PIN":"dummy"};
	autInfo["user5"] = {"PIN":"use5"};
	
	var mockAccounts = {};
	mockAccounts["8390006464"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"Sophia",
		"LAST_NAME_1":"Scott",
		"DATE_OF_BIRTH_1":"197410200000",
		"NATIONALITY_1":"FR",
		"PREF_AIR_FREQ_AIRLINE_1_1":"SQ",
		"PREF_AIR_FREQ_NUMBER_1_1":"MERCIAUTO1",
		"PREF_AIR_FREQ_AIRLINE_1_2":"SQ",
		"PREF_AIR_FREQ_NUMBER_1_2":"MERCIAUTO3",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"GOLD",
		"CONTACT_POINT_EMAIL_1":"test@test.com",
		"CONTACT_POINT_HOME_PHONE_1":"+33 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+33 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+33 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"8390006464",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy1",
		"PASSWORD_2": "dummy1",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"400",
		"CONTACT_POINT_SOS_PHONE":"+1 110000009898",

	};
	mockAccounts["MEAAWARD"] = {
		"DIRECT_LOGIN":"YES",
		"USER_ID":"MEAAWARD",
		"PASSWORD_1":"amadeus",
		"PASSWORD_2":"amadeus",
		"PAYMENT_TYPE":"CC1",
		"DELIVERY_TYPE":"ETCKT",
		"CONTACT_POINT_MOBILE":"+1 0400667788",
		"NUMBER_OF_PROFILES":"3",

		
		
		"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"firstmeaawardadd",
		"LAST_NAME_1":"secondmeaawardadd",
		"DATE_OF_BIRTH_1":"198612040000",
		"NATIONALITY_1":"IN",
		"PREF_AIR_FREQ_AIRLINE_1_1":"SQ",
		"PREF_AIR_FREQ_NUMBER_1_1":"121212",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"SVEIGGJ",
		"PREF_AIR_FREQ_LEVEL_NAME_1_1":"SVEIGGJ",
		"PREF_AIR_FREQ_MILES_1_1":"500000",
		"CONTACT_POINT_EMAIL_1":"testagain@amadeustest.com",
		"CONTACT_POINT_HOME_PHONE_1":"+91 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+91 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+1 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+91",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+91",
		"PREF_AIR_MEAL_1":"STRD",

		"TYPE_2":"ADT",
		"TITLE_2":"MR",
		"FIRST_NAME_2":"firstnameaa",
		"LAST_NAME_2":"secondnameaa",
		"DATE_OF_BIRTH_2":"197410200000",
		"NATIONALITY_2":"FR",
		"PREF_AIR_FREQ_AIRLINE_2_1":"SV",
		"PREF_AIR_FREQ_NUMBER_2_1":"11223531",
		"PREF_AIR_FREQ_PIN_2_1":"1234",
		"PREF_AIR_FREQ_LEVEL_2_1":"GOLD",
		"PREF_AIR_FREQ_MILES_2_1":"2000",
		"CONTACT_POINT_EMAIL_2":"test@test.com",
		"CONTACT_POINT_HOME_PHONE_2":"+33 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_2":"+33 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_2":"+33 0400667788",
		"PREF_AIR_MEAL_2":"STRD",

		"TYPE_3":"ADT",
		"TITLE_3":"MR",
		"FIRST_NAME_3":"firstname",
		"LAST_NAME_3":"secondname",
		"DATE_OF_BIRTH_3":"197410200000",
		"NATIONALITY_3":"FR",
		"PREF_AIR_FREQ_AIRLINE_3_1":"SV",
		"PREF_AIR_FREQ_NUMBER_3_1":"11223531",
		"PREF_AIR_FREQ_PIN_3_1":"1234",
		"PREF_AIR_FREQ_LEVEL_3_1":"GOLD",
		"PREF_AIR_FREQ_MILES_3_1":"12000",
		"CONTACT_POINT_EMAIL_3":"test@test.com",
		"CONTACT_POINT_HOME_PHONE_3":"+33 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_3":"+33 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_3":"+33 0400667788",
		"PREF_AIR_MEAL_3":"STRD",
		
		"IDENTITY_DOCUMENT_TYPE_1_PSPT_BK_GLOBAL_DEFAULT_1":"C",
		
		"IDENTITY_DOCUMENT_ISSUING_COUNTRY_1_PSPT_BK_GLOBAL_DEFAULT_1":"IN",
		"IDENTITY_DOCUMENT_EXPIRY_DATE_1_PSPT_BK_GLOBAL_DEFAULT_1":"202012090000",
		
		"IDENTITY_DOCUMENT_NUMBER_1_VISA_BK_GLOBAL_DEFAULT_1":"123456789",
		"IDENTITY_DOCUMENT_PLACE_OF_ISSUING_1_VISA_BK_GLOBAL_DEFAULT_1":"FR",
		"IDENTITY_DOCUMENT_ISSUE_DATE_1_VISA_BK_GLOBAL_DEFAULT_1":"202009090000",
		"IDENTITY_DOCUMENT_PLACE_OF_BIRTH_1_VISA_BK_GLOBAL_DEFAULT_1":"India",
		"IDENTITY_DOCUMENT_APPLICABLE_COUNTRY_1_VISA_BK_GLOBAL_DEFAULT_1":"US",
		"IDENTITY_DOCUMENT_NUMBER_1_PSPT_BK_GLOBAL_DEFAULT_1":"929191919191",
		"IDENTITY_DOCUMENT_ISSUE_DATE_1_PSPT_BK_GLOBAL_DEFAULT_1":"201409090000",
		"IDENTITY_DOCUMENT_NATIONALITY_1_PSPT_BK_GLOBAL_DEFAULT_1":"SV",
		
		"CONTACT_POINT_SOS_PHONE":"+91 110000009898",
		"CONTACT_POINT_SOS_COUNTRY_CODE":"91",
		"CONTACT_POINT_SOS_NAME":"Poo",
		
		"IDENTITY_DOCUMENT_TYPE_2_PSPT_BK_GLOBAL_DEFAULT_1":"C",
		"IDENTITY_DOCUMENT_NUMBER_2_PSPT_BK_GLOBAL_DEFAULT_1":"535476573",
		"IDENTITY_DOCUMENT_ISSUING_COUNTRY_2_PSPT_BK_GLOBAL_DEFAULT_1":"AF",
		"IDENTITY_DOCUMENT_EXPIRY_DATE_2_PSPT_BK_GLOBAL_DEFAULT_1":"202209090000",
		"IDENTITY_DOCUMENT_NUMBER_2_VISA_BK_GLOBAL_DEFAULT_1":"123456789",
		"IDENTITY_DOCUMENT_PLACE_OF_ISSUING_2_VISA_BK_GLOBAL_DEFAULT_1":"US",
		"IDENTITY_DOCUMENT_ISSUE_DATE_2_VISA_BK_GLOBAL_DEFAULT_1":"202409090000",
		"IDENTITY_DOCUMENT_PLACE_OF_BIRTH_2_VISA_BK_GLOBAL_DEFAULT_1":"India",
		"IDENTITY_DOCUMENT_APPLICABLE_COUNTRY_2_VISA_BK_GLOBAL_DEFAULT_1":"IN",

		"IDENTITY_DOCUMENT_TYPE_3_PSPT_BK_GLOBAL_DEFAULT_1":"C",
		"IDENTITY_DOCUMENT_NUMBER_3_PSPT_BK_GLOBAL_DEFAULT_1":"535476573",
		"IDENTITY_DOCUMENT_ISSUING_COUNTRY_3_PSPT_BK_GLOBAL_DEFAULT_1":"AG",
		"IDENTITY_DOCUMENT_EXPIRY_DATE_3_PSPT_BK_GLOBAL_DEFAULT_1":"202209090000",
		"IDENTITY_DOCUMENT_NUMBER_3_VISA_BK_GLOBAL_DEFAULT_1":"123456789",
		"IDENTITY_DOCUMENT_PLACE_OF_ISSUING_3_VISA_BK_GLOBAL_DEFAULT_1":"UK",
		"IDENTITY_DOCUMENT_ISSUE_DATE_3_VISA_BK_GLOBAL_DEFAULT_1":"202409090000",
		"IDENTITY_DOCUMENT_PLACE_OF_BIRTH_3_VISA_BK_GLOBAL_DEFAULT_1":"India",
		"IDENTITY_DOCUMENT_APPLICABLE_COUNTRY_3_VISA_BK_GLOBAL_DEFAULT_1":"GE",
		
		"AIR_CC_ADDRESS_FIRSTLINE":"4th floor, amadeusaaa",
		"AIR_CC_ADDRESS_SECONDLINE":"kadubeesana halli, prestige tech parkaaa",
		"AIR_CC_ADDRESS_CITY":"Bangaloreaaa",
		"AIR_CC_ADDRESS_STATE":"karnatakaaaa",
		"AIR_CC_ADDRESS_ZIPCODE":"560103111",
		"AIR_CC_ADDRESS_COUNTRY":"Indiaaaa",
		
		"CONTACT_1_ADDRESS_INFORMATION_NAME":"firstname secondnamebbb",
		"CONTACT_1_ADDRESS_INFORMATION_COMPANY_NAME":"amadeusbbb",
		"CONTACT_1_ADDRESS_INFORMATION_EMAIL":"test@amadeus.combbb",
		"CONTACT_1_ADDRESS_INFORMATION_FIRST_ADDRESS_LINE":"kadubeesanahallibbb",
		"CONTACT_1_ADDRESS_INFORMATION_CITY":"bangalorebbb",
		"CONTACT_1_ADDRESS_INFORMATION_ZIP_CODE":"560103222",
		"CONTACT_1_ADDRESS_INFORMATION_COUNTRY":"Francebbb"
		
	}; 
	
	mockAccounts["john.smith@email.com"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"John",
		"LAST_NAME_1":"Smith",
		"DATE_OF_BIRTH_1":"198510200000",
		"NATIONALITY_1":"SG",
		"PREF_AIR_FREQ_AIRLINE_1_1":"SQ",
		"PREF_AIR_FREQ_NUMBER_1_1":"MERCITEST1",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"GOLD",
		"CONTACT_POINT_EMAIL_1":"john.smith@email.com",
		"CONTACT_POINT_HOME_PHONE_1":"+33 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+33 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+33 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"john.smith@email.com",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy",
		"PASSWORD_2": "dummy",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"125000",
		"CONTACT_POINT_SOS_PHONE":"+1 110000009898",

	};
	
	mockAccounts["246246246"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"JACOB",
		"LAST_NAME_1":"CLARK",
		"DATE_OF_BIRTH_1":"198510200000",
		"NATIONALITY_1":"FR",
		"PREF_AIR_FREQ_AIRLINE_1_1":"MH",
		"PREF_AIR_FREQ_NUMBER_1_1":"246246246",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"GOLD",
		"CONTACT_POINT_EMAIL_1":"JACOB@CLARK.COM",
		"CONTACT_POINT_HOME_PHONE_1":"+33 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+33 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+33 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"246246246",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy",
		"PASSWORD_2": "dummy",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"10000",

	};
	
	mockAccounts["8390006666"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"DONALD",
		"LAST_NAME_1":"KING",
		"DATE_OF_BIRTH_1":"198510200000",
		"NATIONALITY_1":"IN",
		"PREF_AIR_FREQ_AIRLINE_1_1":"SQ",
		"PREF_AIR_FREQ_NUMBER_1_1":"8390006666",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"SILVER",
		"CONTACT_POINT_EMAIL_1":"DONALD@KING.COM",
		"CONTACT_POINT_HOME_PHONE_1":"+91 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+91 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+91 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"8390006565",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy",
		"PASSWORD_2": "dummy",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"1600",
		"CONTACT_POINT_SOS_PHONE":"+1 110000009898",

	};
	
	mockAccounts["135135135"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"DONALD",
		"LAST_NAME_1":"KING",
		"DATE_OF_BIRTH_1":"198510200000",
		"NATIONALITY_1":"IN",
		"PREF_AIR_FREQ_AIRLINE_1_1":"MH",
		"PREF_AIR_FREQ_NUMBER_1_1":"135135135",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"GOLD",
		"CONTACT_POINT_EMAIL_1":"DONALD@KING.COM",
		"CONTACT_POINT_HOME_PHONE_1":"+91 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+91 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+91 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"8390006565",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy",
		"PASSWORD_2": "dummy",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"1600",
		"CONTACT_POINT_SOS_PHONE":"+91 110000009898",

	};
	
	mockAccounts["323059483"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"DONALD",
		"LAST_NAME_1":"KING",
		"DATE_OF_BIRTH_1":"198510200000",
		"NATIONALITY_1":"IN",
		"PREF_AIR_FREQ_AIRLINE_1_1":"MH",
		"PREF_AIR_FREQ_NUMBER_1_1":"323059483",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"GOLD",
		"CONTACT_POINT_EMAIL_1":"DONALD@KING.COM",
		"CONTACT_POINT_HOME_PHONE_1":"+91 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+91 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+91 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"8390006565",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy",
		"PASSWORD_2": "dummy",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"1600",
		"CONTACT_POINT_SOS_PHONE":"+91 110000009898",

	};
	
	mockAccounts["8390006767"] = {"TYPE_1":"ADT",
		"TITLE_1":"MR",
		"FIRST_NAME_1":"DANIEL",
		"LAST_NAME_1":"Martin",
		"DATE_OF_BIRTH_1":"198610200000",
		"NATIONALITY_1":"IN",
		"PREF_AIR_FREQ_AIRLINE_1_1":"SQ",
		"PREF_AIR_FREQ_NUMBER_1_1":"8390006767",
		"PREF_AIR_FREQ_PIN_1_1":"1234",
		"PREF_AIR_FREQ_LEVEL_1_1":"SILVER",
		"CONTACT_POINT_EMAIL_1":"DANIEL@Martin.COM",
		"CONTACT_POINT_HOME_PHONE_1":"+91 0455557733",
		"CONTACT_POINT_BUSINESS_PHONE_1":"+91 0054000000",
		"CONTACT_POINT_MOBILE_PHONE_1":"+91 0400667788",
		"CONTACT_POINT_HOME_PHONE_OC":"+33",
		"CONTACT_POINT_HOME_PHONE":"0400667788",
		"CONTACT_POINT_MOBILE_1_OC":"+33",
		"PREF_AIR_MEAL_1":"STRD",
		"USER_ID":"8390006767",
		"DIRECT_LOGIN":"YES",
		"CONTACT_POINT_MOBILE_1": "+33 0400667788",
		"PASSWORD_1": "dummy",
		"PASSWORD_2": "dummy",
		"NUMBER_OF_PROFILES" : "1",		
		"PAYMENT_TYPE":"CC1",
		"PREF_AIR_FREQ_MILES_1_1":"5500",
		"CONTACT_POINT_SOS_PHONE":"+1 110000009898",

	};
	
	

	mockAccounts["user3"] = {"name":"user3","lastname":"test3"};
	mockAccounts["user4"] = {"name":"user4","lastname":"test4"};
	mockAccounts["user5"] = {"name":"user5","lastname":"test5"};
	
    if(!req.body.ID || !req.body.PIN) {
        return res.send({"ERROR_TYPE": "E", "ERROR_MESSAGE": "missing a parameter","ERROR_CODE":"420"});
    } else {
		if(mockAccounts[req.body.ID] && autInfo[req.body.ID].PIN == req.body.PIN){
			return res.send(mockAccounts[req.body.ID]);
		}else{
			return res.send({"ERROR_TYPE": "E", "ERROR_MESSAGE": "wrong userId or password","ERROR_CODE":"9211"});
		}
    }
});
 
/*var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});*/

httpServer.listen(5100,function(){
	console.log("Listening on port 5100")
});
//httpsServer.listen(3005);
httpsServer.listen(5101,function(){
console.log("listening on port 5101");
});