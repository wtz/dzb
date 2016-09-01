var express = require('express'),
    router = express.Router();

var ccap = require('ccap')(250, 20, 90); 
  
var  mongoose = require('mongoose');
var  md5 = require('md5');

// 这里取到的是数据collection
var  User = mongoose.model('User');




// 后端路由入口
module.exports = function(app) {
    app.use('/admin/users', function(req, res, next) {
        var _user = req.session.user;
        if (_user) {
            app.locals.USER = _user;
        }
        next();
    }, router);
};



// signup 
router.get('/signup', function(req, res, next) {
    res.render('admin/signup', {
        title: '注册'
    });
});

// reg users
router.post('/signup', function(req, res, next) {
    var user = req.body.user;
    // 第一次用超级管理员时用的
    //user.roal = "admin";
    var userMan  = new User(user);

    // 判断改用户名已创建，如果数据库里有，则return提示换个用户名
    User.find({name:user.name},function(err, u) {
    	if(err) console.log(err)

    	if(u.length){
    		// 提示该用户名已存在
    		res.redirect('/')
    	}else{
    		userMan.save(function(err, user) {
		    	if(err) console.log(err)
		    	res.redirect('/admin/users/userlist');	
		    })

    	}	
    })
});


router.get('/userlist', function(req, res, next) {
     User.find({roal:'editor'}, function(err, users) {
     	if(err) next(err)

     	res.render('admin/userlist', {
	        title: '管理员工列表',
	        users: users
	    });	

     })	
});









//  /admin/usrs/login
router.get('/login', function(req, res, next) {
    res.render('admin/login', {
        title: '后台登录'
    });
});

// 处理登录
router.post('/login', function(req, res, next) {
	var name = req.body.user.name;
	var pwd = req.body.user.password;

	User.findOne({ name: name }, function(err, user) {
		if(err) console.log(err)		

		if(!user){
			res.redirect('/')	
		}	

		user.comparePassword(pwd, function(err, isMatch) {
			if(err) console.log(err)

			if(isMatch){
				console.log('登录成功');
				// 如何不做数据持久化。用户登录后，假如server 重启后，就清空掉session 的值
				// 登录数据如何持久化 ,将 session 放进数据库里面mongodb
				// 将该用户信息放进session 里面
				req.session.user = user;
				res.redirect('/admin/users/welcome')
			}else{
				console.log('密码错误')			
			}	

		})
	})


});



// welcome
router.get('/welcome', function(req, res, next) {
    res.render('admin/welcome', {
        title: '后台登录'
    });
});


router.get('/logout', function(req, res, next) {
    delete req.session.user;
    delete app.locals.USER;
    res.redirect('/')
});





// 生成验证码
router.get('/captcha', function(req, res, next) {
    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];
    res.end(buf)
});



