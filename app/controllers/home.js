var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

var _ =  require('underscore');

var  Category = mongoose.model('Category');
var  Post = mongoose.model('Post');


// 每周会议 前10条记录
// 通知公告
// 教育新闻
// 部门新闻
// 办公指南


	





// 前端路由入口
module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    	Category.find({})
                .populate({
                  path: 'post',
                  select: 'title',
                  options: { limit: 100 }
                })
              .exec(function(err, result) {
    		var mettingArr = _.find(result,{name:'每周会议'});
    		var noteArr = _.find(result,{name:'通知公告'});
    		var eduArr = _.find(result,{name:'教育新闻'});
    		var depArr = _.find(result,{name:'部门新闻'});

    		res.render('index', {
		      title: '湖北师范大学党政办',
		      mettings: mettingArr.post,
		      notes: noteArr.post,
		      edus: eduArr.post,
		      deps: depArr.post
		    });	              
              })	
});


router.get('/posts', function(req, res, next) {
	//  post type
	var postType = req.query.type;
	Category.find({name: postType})
		.populate({
			path: 'post',
			select: 'title',
			options: { limit: 10} 
		})
		.exec(function(err, results) {
			if(err) console.log(err);
			console.log('GGGG:', results[0].post)
			res.render('posts', {
			      title: '湖北师范大学党政办',
			      type: postType,
			      posts: results[0].post	      
			    });	              		
		})
})


// 详情页面
router.get('/detail/:id', function(req, res, next) {
     var _id = req.params.id;

     Post.findById(_id, function(err, article) {
     	if(err) console.log(err)
	
	res.render('detail', {
		title:'详情页面',
		article: article	
	})     		
     })
})



