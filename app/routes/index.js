'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport, validator, mongoose) {
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

/*
	I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
	If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
	When I visit that shortened URL, it will redirect me to my original link.
*/

/*
    -check url format
    -if valid
    	-insert valid url into mongodb - assign it a random 4 digit integer that is unused (_id?)
    	-return original_url and short_url as JSON
    -if invalid 
    	-return error message
*/

    //insert new url into the database
	app.route('/new/:url')
		.get(function (req, res) {
			var url = req.params;
			console.log(validator);
			if (validator.isURL(url)) {
				
				//database insert
				//res.json();
			} else {
				res.status(500).send('Invalid URL, try again!');
			}
		});
	
	//redirect to url value using integer key
	app.route('/:id')
		.get(function (req, res) {
			res.json();
		});
		
		
/*
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
*/

};
