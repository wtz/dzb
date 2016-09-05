var express = require('express'),
    router = express.Router();

var  mongoose = require('mongoose');
var  Category = mongoose.model('Category');


  module.exports = function(app) {
	app.use('/admin/cate', router);	
  }


  // 找出所有的分类
  router.get('/list', function(req, res, next) {
       Category.fetch(function(err, category) {
            if(err) console.log(err)
            res.render('admin/catelist',{
              title:'分类',
              category: category
            })        
       })

  	
  })

  router.get('/add', function(req, res, next) {
    res.render('admin/cateadd',{
      title:'新闻添加'
    })
  })


  router.post('/add', function(req, res, next) {
      var _category = req.body.category;
      var cate = new Category(_category);

      cate.save(function(err, category) {
          if(err) console.log(err)
          res.redirect('/admin/cate/add')  
      })



  })


  router.get('/edit/:id', function(req, res, next) {
      var _id= req.params.id;
      Category.findById(_id, function(err, category) {
          if(err) console.log(err)
          res.render('admin/cateedit',{
            title:'分类编辑',
            category:category
          })  
      })
    
  })

  // edit
  router.post('/edit/:id', function(req, res, next) {
      var _id= req.params.id;
      var _cate = req.body.category;

      Category.findById(_id, function(err, category) {
          if(err) console.log(err)
          
          category.name = _cate.name;
          category.save(function(err, cate) {
              if(err) console.log(err)
              res.redirect('/admin/cate/list')  
          })

      })
    
  })


//  delete
router.get('/delete/:id', function(req, res, next) {
      var _id= req.params.id;
      Category.findByIdAndRemove({_id:_id}, function(err, category) {
          if(err) console.log(err)
            res.redirect('/admin/cate/list')
      })
  })



