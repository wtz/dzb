// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


// cate [{id:1},{}]  类型 数组里面是对象
var CategorySchema = new Schema({
  	cate: [Schema.Types.Mixed]
});



mongoose.model('Category', CategorySchema);

