// 评论 和 回复 
// 1篇文章 可以有多个用户评论
//  1个用户可以评论该文章，也可以对其他用户的评论进行评论。
//  根据文章id 找到 改篇文章，然后根据文章id, comment 去查询 comment
//  
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var CommentSchema = new Schema({
  	post: {type: ObjectId, ref: 'Post'},   // 1条评论对应1篇文章
  	from: {type: ObjectId, ref: 'User'},  // 是哪个用户评论的
  	reply: [
  		{
  			from: {type: ObjectId, ref: 'User'},
  			to: {type: ObjectId, ref: 'User'},
  			content: String
  		}
  	],
  	content: String,
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

CommentSchema.pre('save', function(next) {
	if(this.isNew){
		// 新增加
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		// 编辑的时候就updateAt 更新
		this.meta.updateAt = Date.now()
	}

	next()
})



// CommentSchema  静态方法
CommentSchema.statics = {
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





mongoose.model('Comment', CommentSchema);

