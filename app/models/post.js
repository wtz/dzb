// 文章 数据建模
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;




var PostSchema = new Schema({
  	name: { type: String, required: true},
  	password: { type: String, required: true},
  	//roal: { type: String, required: true}, // 第一次建立超级管理员的时候用到。后面用下面这个
  	roal: { type: String, default:'editor'},
  	created: { type: Date }
});




// // 先生成10个单位的盐，然后将盐加入到密码中混合生成 hash
// UserSchema.pre('save', function(next) {
// 	var user = this;
// 	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
// 		if(err) next(err)

// 		bcrypt.hash(user.password, salt, function(err, hash) {
// 			if(err) next(err)
// 			user.password = hash;
// 			next()	
// 		})

// 	})
// })



// UserSchema 实例方法&& 静态方法
// UserSchema.methods = {
// 	comparePassword: function(_password, cb) {
// 		// 将用户传递来的密码 加盐 和传递过来的对比
// 		bcrypt.compare(_password, this.password, function(err, isMatch) {
// 			if(err) cb(err)
// 			cb(null, isMatch)
// 		})
// 	}

// }

PostSchema.statics = {
	fetch: function(cb) {
		return this
		     .find({})
		     .sort('created')
		     .exec(cb)
	},
	findById: function(id, cb) {
		return this
		      .findOne({_id: id})
		      .exec(cb)
	}
}



//  建立User collection
mongoose.model('Post', PostSchema);

