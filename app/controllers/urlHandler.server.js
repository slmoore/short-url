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
				Urls.findOne({ longSite: url }, function(err,data) {
					if (err) {
						return res.status('500').send(err.message);
					}
					if (data) {
						return res.json({
				    	"original_url": data.longSite,
				    	"short_url": req.protocol+'://'+req.hostname+'/'+data.shortSite
						});
					} else {
						//otherwise setup new document
		  			site = new Urls();
		  			site.longSite = url;
		  			site.shortSite = 1234;
		  			//insert document
		        site.save(function (err) {
		          if (err) {
		            return res.status('500').send(err.message);
		          } else {
		            console.log('new site saved');
		          }
		        });
						//display options as JSON
						return res.json({
					    "original_url": site.longSite,
					    "short_url": req.protocol+'://'+req.hostname+'/'+site.shortSite
						});
					}
				});
			} else {
				return res.status('500').send('Invalid URL. Please try again!');
			}
		};

  //redirect to the original url
	this.select = function (req, res) {
		Urls.find({ shortSite: req.path.substring(1) })
		  .limit(1)
		  .exec(function (err, data) {
				if (err) { 
					return res.status('500').send(err.message);
				}
				if (data.length) {
				  return res.redirect(data[0].longSite);
				}
				
				return res.status('404').send('Unknown location. Please try again!');
			});
	};

}

module.exports = UrlHandler;
