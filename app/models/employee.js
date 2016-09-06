var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var EmployeesSchema = new Schema({
  	name: String,
  	duty: String,
	repon: String,
	location: String,
  	meta:{
  		createAt: {
  			type: Date,
  			default: Date.now()
  		},
  		updateAt: {
  			type: Date,
  			default: Date.now()	
  		}
  	}
});







EmployeesSchema.pre('save', function(next) {
	if(this.isNew){
		// 新增加
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		// 编辑的时候就updateAt 更新
		this.meta.updateAt = Date.now()
	}

	next()
})



// EmployeesSchema  静态方法
EmployeesSchema.statics = {
	fetch: function(cb) {
		return this
		     .find({})
		     .sort('meta.updateAt')
		     .exec(cb)
	},
	findById: function(id, cb) {
		return this
		      .findOne({_id: id})
		      .exec(cb)
	}
}





mongoose.model('Employees', EmployeesSchema);

