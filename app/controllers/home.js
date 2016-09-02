var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');



// 前端路由入口
module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Generator-Express MVC',
    });
});

