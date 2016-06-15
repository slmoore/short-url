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
	app.route(/^\/[0-9]+$/)
		.get(urlHandler.select);

    //insert url passed as parameter to database
	app.route('/new/*')
		.get(urlHandler.insert);

/*	Used for Testing Purposes Only

    //select all urls from the database
	app.route('/selectall')
		.get(urlHandler.selectAll);

    //clear all urls from the database
	app.route('/clear')
		.get(urlHandler.clear);

    //select all counters from the database
	app.route('/selectallcounter')
		.get(urlHandler.selectAllCounter);
		
    //clear all counters from the database
	app.route('/clearcounter')
		.get(urlHandler.clearCounter);
*/

    //default unknown
	app.route('*')
		.get(function(req,res) {
			res.sendStatus('404');
		});

};
