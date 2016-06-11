'use strict';

var path = process.cwd();
var UrlHandler = require(path + '/app/controllers/urlHandler.server.js');
var urlHandler = new UrlHandler();

module.exports = function (app) {
	
	//return homepage
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	//redirect to original url value matching integer key
	app.route('/:id')
		.get(urlHandler.select);

    //insert url passed as parameter to database
	app.route('/new/*')
		.get(urlHandler.insert);

};
