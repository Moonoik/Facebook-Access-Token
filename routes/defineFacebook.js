var cheerio = require('cheerio'),
	request = require('request');

var facebookManagement = function() {
	this.author = "4ntiweb";
}

facebookManagement.prototype.unicodeToChar = function(text) {
	return text.replace(/\\u[\dA-F]{4}/gi, 
		function (match) {
			return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
		});
}

facebookManagement.prototype.getTokendata = function(accessToken, cbData) {
	var that = this;
	request('https://graph.facebook.com/v2.7/me?access_token='+accessToken+'&fields=id,name,cover,picture,age_range,birthday,gender,posts,friends,email,likes', function(err, res, jsonData){
		if(!err & res.statusCode === 200)
			cbData(that.unicodeToChar(jsonData));
		else
			cbData(null);
	});
}

facebookManagement.prototype.parseFacebook = function(parseData, cbData) {
	var $ = cheerio.load(parseData);
	var scriptList = $('script');

	for(var i = 0; i < scriptList.length; i++) {
		try {
			userAccesstoken = scriptList[i].children[0].data.match(/([A-Za-z0-9]){175,}"/g)[0].slice(0, -1);
			if(userAccesstoken) {
				this.getTokendata(userAccesstoken, function(retData){
					cbData(retData);
				});
			}
		}
		catch(exception) {
			userAccesstoken = '';
		}
	}
}

exports.facebookManagement = facebookManagement;