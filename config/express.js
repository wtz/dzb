var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// 提示组件
var flash = require('connect-flash');
var messages = require('express-messages');


var compress = require('compression');
var methodOverride = require('method-override');

module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
   
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');
  // 时间格式化处理
  app.locals.moment = require('moment')


  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(cookieParser());
//  将session值存放mongodb 里面持久化
  app.use(session({
    secret: 'dzb',
    store: new MongoStore({
       url: 'mongodb://localhost/dzb-development',
       collection: 'sessions'
    })
  }))

  app.use(flash())
  // 提示信息
  app.use(function (req, res, next) {
        res.locals.messages = messages(req, res);
        var _user = req.session.user;
        if (_user) {
            app.locals.USER = _user;
        }
        next();
    });





  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);    
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });

};
