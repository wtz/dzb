var express = require('express'),
    router = express.Router();

var  mongoose = require('mongoose');

var  Employees = mongoose.model('Employees');
var _ = require('underscore');





module.exports = function(app) {
	app.use('/admin/worker/', router)		
}


router.get('/add', function(req, res, next) {
	res.render('admin/workadd',{
		title:"员工添加"
	})
})

router.post('/add', function(req, res, next) {
	var workedForm = req.body.employees;

	var worker = new Employees(workedForm);

	worker.save(function(err, employ) {
		if(err) console.log(err)

		res.redirect('/admin/worker/list')	
	})


})

router.get('/list',function(req, res, next) {
	Employees.fetch(function(err, employees) {
		if(err) console.log(err)
		res.render('admin/workerlist',{
			title: '员工列表',
			employees: employees	
		})
	})
})


router.get('/edit/:id',function(req, res, next) {
	var _id = req.params.id;
	Employees.findById(_id, function(err, employ) {
		if(err) console.log(err)
		res.render('admin/workeredit',{
			title: '员工编辑',
			employ: employ	
		})
	})
})

router.post('/edit/:id',function(req, res, next) {
	var _id = req.params.id;
	      var _employ= req.body.employees;
	      var newEmply;

	      Employees.findById(_id, function(err, employ) {
	          if(err) console.log(err)
			
		newEmply = _.extend(employ, _employ)			          
	          newEmply.save(function(err, employ) {
	              if(err) console.log(err)
	              res.redirect('/admin/worker/list')  
	          })

	      })	

})

router.get('/delete/:id', function(req, res, next) {
    var _id = req.params.id;
    Employees.findByIdAndRemove({ _id: _id }, function(err, employ) {
        if (err) console.log(err)
        res.redirect('/admin/worker/list')
    })
})

