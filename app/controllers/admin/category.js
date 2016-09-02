var express = require('express'),
    router = express.Router();

var  mongoose = require('mongoose');
var  Category = mongoose.model('Category');


  module.exports = function(app) {
	app.use('/admin/cate', router);	
  }


  // router.get('/lists', function(req, res, next) {
  // 	// Post.find
  // 	// res.render()
  // })

  router.get('/add', function(req, res, next) {
  	res.render('admin/cateadd',{
  		title:'新闻添加'
  	})
  })

  // router.get('/edit/:/:id', function(req, res, next) {
  // 	res.render()
  // })