var express = require('express'),
    router = express.Router();

var  mongoose = require('mongoose');
var  Post = mongoose.model('Post');


  module.exports = function(app) {
	app.use('/admin/post', router);	
  }


  router.get('/lists', function(req, res, next) {
  	// Post.find


  	// res.render()
  })

//  todo 动态添加分类。然后和文章和分类想对应
  router.get('/add', function(req, res, next) {
  	// 先将 新闻分类找出来。

  	res.render('admin/postadd',{
  		title:'新闻添加'
  	})
  })

  router.get('/edit/:/:id', function(req, res, next) {
  	res.render()
  })