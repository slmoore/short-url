'use strict';

var validator = require('validator');
//mongoose model
var Urls = require('../models/urls.js');
var Counters = require('../models/counters.js');

function UrlHandler () {

	var getNextSequence = function(siteObj) {
    var query = Counters.findOneAndUpdate(
					{_id: 'ShortSiteID'},
					{$inc: {seq: 1} },
					{upsert: true}
		).exec();
		
		return query.then(function(doc) {
			var promise = new Promise(function(resolve,reject){
				siteObj.shortSite = doc.seq;
				if (siteObj.shortSite === undefined) {
  			  reject("Sequence failed");
  			}
  			resolve("Sequence incremented");
			});
			return promise;
		});
	};

	this.insert = function (req, res) {
			var url = req.params[0];
			var site = {};
			if (validator.isURL(url)) {
				//look for the same url in the db
				Urls.findOne({ longSite: url }, function(err,data) {
					if (err) throw err;
					//if it already exists return it
					if (data) {
						return res.json({
				    	"original_url": data.longSite,
				    	"short_url": req.protocol+'://'+req.hostname+'/'+data.shortSite
						});
				  //if it is new then build and insert it before returning the json
					} else {
		  			site = new Urls();
		  			site.longSite = url;
		  			//assign the shortSite value
		  			getNextSequence(site)
		  		  .then(function() {
			  			//insert document
			        return site.save(function (err, product) {
			          if (err) {
			          	throw err;
			          }
			        });
		  			})
		        .then(function() {
							//display options as JSON
							return res.json({
						    "original_url": site.longSite,
						    "short_url": req.protocol+'://'+req.hostname+'/'+site.shortSite
							});
		        })
		        .catch(function() {
		        	return res.status('500').send('Unable to save!  Please try again or contact the site Admin!');
		        });
					}
				});
			//if not a valid URL
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

/*	Used for Testing Purposes Only

	this.selectAll = function(req, res) {
		Urls.find({}, function(err, data) {
			if (err) return res.status('500').send('Error found, could not find documents.');
			res.json(data);
		});
	};

	this.clear = function (req, res) {
		Urls.remove({}, function(err) {
			if (err) return res.status('500').send('Error found, could not clear documents.');
			return res.send('Clear successful');
		});
	};
	
	this.selectAllCounter = function(req, res) {
		Counters.find({}, function(err, data) {
			if (err) return res.status('500').send('Error found, could not find documents.');
			res.json(data);
		});
	};
	
	this.clearCounter = function (req, res) {
		Counters.remove({}, function(err) {
			if (err) return res.status('500').send('Error found, could not clear documents.');
			return res.send('Clear successful');
		});
	};
	
*/

}

module.exports = UrlHandler;
