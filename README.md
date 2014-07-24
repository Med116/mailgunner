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

