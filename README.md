# npm install mailgunner

Example code

	var MailGun  = require("mailgunner");

	var from = "you@mail.com";
	var domain = "your_mailgun_domain.com";
	var apiKey = "your_mailgun_api_key";

	var configObj = {
			domain:domain,
			from:from,
			apiKey:apiKey

		};

	var mailgunner = new MailGun(configObj);
	mailgunner.setHtml("<h1>Testing mailgunner module</h1>");
	mailgunner.setSubject("Mailgun Test");
	mailgunner.addRecip("somebody@mail.com");
	// or add people/recips by array
	mailgunner.addRecipArray(["friend@mail.com","someone_else@mail.net","a_third_person@place.com"]);
	mailgunner.send();


## environment variable

if you dont want to pass in your apiKey all the time, 
you can set the ENV VAR MAILGUN_KEY by exporting it to your environment
or you can set it like this with node
    process.env.MAILGUN_KEY = "fjdkgjfd"

