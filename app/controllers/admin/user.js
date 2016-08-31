var express = require('express'),
    router = express.Router();



var ccap = require('ccap')(250, 20, 90); //Instantiated ccap class 





// 后端路由入口
module.exports = function(app) {
    app.use('/admin/users', router);
};


//  /admin/usrs/login
router.get('/login', function(req, res, next) {
    res.render('admin/login', {
        title: '后台登录'
    });
});

router.get('/captcha', function(req, res, next) {
    var ary = ccap.get();
    var txt = ary[0];
    var buf = ary[1];
    res.end(buf)
});



