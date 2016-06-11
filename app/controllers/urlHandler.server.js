'use strict';

var validator = require('validator');
//mongoose model
var Urls = require('../models/urls.js');

function UrlHandler () {

	this.insert = function (req, res) {
			var url = req.params[0];
			var site = {};
			if (validator.isURL(url)) {
				console.log("valid url");
				//find if it already exists
				
				//otherwise insert
				//setup record
    			site = new Urls();
    			site.longSite = url;
    			site.shortSite = 1234;
    			//insert record
                site.save(function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('new site saved');
                  }
                });
				//display options as JSON
				res.json({
				    "original_url": site.longSite,
				    "short_url": req.protocol+'://'+req.hostname+'/'+site.shortSite
				});
			} else {
				res.status(500).send('Invalid URL, try again!');
			}
			
		};

	this.select = function (req, res) {
		/*Urls.findOne()
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});*/
	};

}

module.exports = UrlHandler;
