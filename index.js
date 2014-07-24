var MailGun = function(configObj){
	var mailgunKey = process.env.MAILGUN_KEY || configObj.apiKey;
	this.auth = "api:" + mailgunKey;
	this.hostname = "api.mailgun.net";
	this.toArray = [];
	this.text = "default text";
	this.html = "";
	this.subject = configObj.subject || "No Subject";
	this.from = configObj.from || "";
	this.domain = configObj.domain;
 
}
 
MailGun.prototype.addRecip = function(recipEmail){
	this.toArray.push(recipEmail);
}
 
MailGun.prototype.addRecipArray = function(recipArr){
	this.toArray.concat(recipArr);
}
 
MailGun.prototype.setSubject = function(subj){
	this.subject = subj;
}
 
MailGun.prototype.setText = function(text){
	this.text = text;
}
 
MailGun.prototype.setHtml = function(html){
	this.html = html;
}
 
MailGun.prototype.setFrom = function(from){
	this.from = from;
}
 
MailGun.prototype.send = function(){
	var https = require("https");
	var querystring = require("querystring");
	var body = {
		"from": this.from,
		"to" : this.formatToArray(this.toArray),
		"subject": this.subject,
		"Content-Type":"application/x-www-form-urlencoded",
		"html":this.html
	}
 
	console.log("BODY");
	console.log(body);
	var bodyStr = querystring.stringify(body);
 
	if(this.subject){
		body.subject = this.subject;
	}
 
	if(this.text){
		body.text = this.text;
		body.html = "";
	}
 
	if(this.html){
		body.html = this.html;
		body.text = "";
	}
 
 
	var options = {
			"auth": this.auth,
			"hostname" : this.hostname,
			"port": 443,
			"path": "/v2/" + this.domain + "/messages",
			"method":"POST",
			"headers":{
				"Content-Type":"application/x-www-form-urlencoded"
			}
		};
 
	console.log("OPTIONS");
	console.log(options);
 
 
 
 
 
	var req = https.request(options,function(res){
		
		req.on("error",function(e){
			console.log(e.message);
		});
 
		res.on("data",function(chunk){
			console.log(chunk.toString());
		});
	});
	req.write(bodyStr);
	req.end();
 
}
 
 
MailGun.prototype.formatToArray = function(toArray){
	var toStr = "";
	for (var i=0;i<toArray.length;i++){
		toStr+= "name <" + toArray[i] + ">,";
	}
	// get rid of trailing comma
	return toStr.replace(/,$/, "");
}
 
module.exports = MailGun;