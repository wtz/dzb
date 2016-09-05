var express = require('express'),
    router = express.Router();

var  mongoose = require('mongoose');
var  Post = mongoose.model('Post');
var  Category = mongoose.model('Category');
var _ = require('underscore');




  module.exports = function(app) {
	app.use('/admin/post', router);	
  }





  // 找出该分类下面的所有文章
  router.get('/list', function(req, res, next) {
            
          Category.find({})
                .populate({
                  path: 'post',
                  select: 'title',
                  options: { limit: 6 }
                })
              .exec(function(err, categories) {
                  res.render('admin/postlist',{
                      title: '文章分类',
                      categories:  categories
                    }) 
              })

          // Post.find({})
          //     .populate('category', 'name')
          //     .exec(function(err, posts) {
          //           if(err) console.log(err)      
          //           res.render('admin/postlist',{
          //             title: '文章分类',
          //             posts:  posts
          //           }) 
          //     })         
  })


  router.get('/add', function(req, res, next) {
      Category.fetch(function(err, category) {
          if(err) console.log(err)
          res.render('admin/postadd',{
            title:'文章添加',
            category:category
          }) 
      })
  })


 //  添加新文章
 router.post('/add', function(req, res, next) {
    var postForm  = req.body.post;
    var  categoryId =   postForm.category;
    var _post = new Post(postForm);

    _post.save(function(err, post) {
        if(err) console.log(err)
        // 由于post 有分类字段category: {
    //   type: ObjectId,
    //   ref: 'Category'
    // }, 引用了分类。所以添加文章时，必须先将该分类post 字段添加post的_id
    
        Category.findById(categoryId, function(err, category) {
            if(err) console.log(err)
            category.post.push(post._id);

            category.save(function(err, category){
                 res.redirect('/admin/post/add')
            })


        })    

    })      
 })



  // 编辑文章
  router.get('/edit/:id', function(req, res, next) {
      var _id= req.params.id;

      Post.findById(_id, function(err, post) {
        Category.find({}, function(err, categories) {
          res.render('admin/postedit', {
            title: '文章编辑',
            post: post,
            category: categories
          })
        })
      })

  })

  // 更新文章
  router.post('/update/:id', function(req, res, next) {
        var _id = req.params.id;
        var postForm = req.body.post;
        var _postNewForm;
        Post.findById(_id, function(err, post) {
             _postNewForm = _.extend(post, postForm);
             console.log('FINAL:',_postNewForm)
            _postNewForm.save(function(err, post) {
                  if (err) {
                    console.log(err)
                  }

                  // 如果分类改变了。则需要

                  res.redirect('/admin/cate/list')

              })  
        })	

  })



//  delete
router.get('/delete/:id', function(req, res, next) {
      var _id= req.params.id;
      Post.findByIdAndRemove({_id:_id}, function(err, post) {
          if(err) console.log(err)
            res.redirect('/admin/cate/list')
      })
  })






