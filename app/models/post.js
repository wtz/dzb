// 文章 数据建模
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ObjectId = Schema.Types.ObjectId


var PostSchema = new Schema({
  	category: {
	    type: ObjectId,
	    ref: 'Category'
	  },
	author: String,
	title: String,
	content: String,
            pv: {// 浏览次数
	    type: Number,
	    default: 0
	},
             meta: {
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



PostSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }

  next()
})

PostSchema.statics = {
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



//  建立User collection
mongoose.model('Post', PostSchema);

