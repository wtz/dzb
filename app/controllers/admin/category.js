var express = require('express'),
    router = express.Router();

var  mongoose = require('mongoose');
var  Category = mongoose.model('Category');


  module.exports = function(app) {
	app.use('/admin/cate', router);	
  }


  router.get('/list', function(req, res, next) {
  	res.render('admin/catelist',{
        title:'分类'
      })
  })

  router.get('/add', function(req, res, next) {
  	res.render('admin/cateadd',{
  		title:'新闻添加'
  	})
  })

  // router.get('/edit/:/:id', function(req, res, next) {
  // 	res.render()
  // })