var passport = require('passport');
var Account = require('./models/account');
var mongojs=require('mongojs');
var db=mongojs('polls',['polls']);
var path = require('path');

module.exports = function (app) {
    
  app.get('/', function (req, res) {
      res.render('index', { user : req.user });
  });

  app.get('/mypolls', function (req, res) {
      res.render('mypolls', { user : req.user });
  });
  app.get('/polls', function(req, res){
	console.log('i received a get request');
	db.polls.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});
  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
      Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
          if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
          }

          passport.authenticate('local')(req, res, function () {
            res.redirect('/');
          });
      });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });
  
};