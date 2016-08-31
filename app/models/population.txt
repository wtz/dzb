var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;

console.log('Running mongoose version %s', mongoose.version);


// 创建UserSchema
// 1 个user 可以有多篇文章
var UserSchema = new Schema({
	name:String,
	posts:[{
	  type: Schema.Types.ObjectId,
          ref: 'Post' // 指向Post collection	
	}]
})

// 创建user model
// 相当于创建了集合User collection
var User = mongoose.model('User',UserSchema);




// 创建postSchema
var PostSchema = new Schema({
	title: String,
        poster: {
	   type: Schema.Types.ObjectId,
	   ref: 'User'  //指向 User collection
	},
	comments: [{
	   type: Schema.Types.ObjectId,
           ref: 'Comment'	
	}]

})
var Post = mongoose.model('Post',PostSchema);


// 创建评论schema
var CommentSchema = new Schema({
	post: {
	   type: Schema.Types.ObjectId,
	   ref: 'Post'
	},

	commenter: {
	   type: Schema.Types.ObjectId,
	   ref: 'User'	
	},
	
	content: String
})

var Comment = mongoose.model('Comment', CommentSchema)








/*********链接数据库************/

mongoose.connect('mongodb://localhost/population-test', function(err){
	if (err) throw err;
        
        createData();
})


function createData() {
     
	    var userIds    = [new ObjectId, new ObjectId, new ObjectId];
            var postIds    = [new ObjectId, new ObjectId, new ObjectId];
	    var commentIds = [new ObjectId, new ObjectId, new ObjectId];

	    var users    = [];
	    var posts    = [];
	    var comments = [];

	    users.push({
		_id   : userIds[0],
		name  : 'wutianzhi',
		posts : [postIds[0]]
	    });
	    users.push({
		_id   : userIds[1],
		name  : 'wangguohua',
		posts : [postIds[1]]
	    });
	    users.push({
		_id   : userIds[2],
		name  : 'huangxin',
		posts : [postIds[2]]
	    });




	    posts.push({
		_id      : postIds[0],
		title    : '吴天志发表',
		poster   : userIds[0],
		comments : [commentIds[0]]
	    });
	    posts.push({
		_id      : postIds[1],
		title    : '王国华发表',
		poster   : userIds[1],
		comments : [commentIds[1]]
	    });
	    posts.push({
		_id      : postIds[2],
		title    : '黄鑫发表',
		poster   : userIds[2],
		comments : [commentIds[2]]
	    });


	

	    comments.push({
		_id       : commentIds[0],
		content   : 'comment-by 黄鑫',
		commenter : userIds[1],
		post      : postIds[0]
	    });
	    comments.push({
		_id       : commentIds[1],
		content   : 'comment-by 王国华',
		commenter : userIds[2],
		post      : postIds[1]
	    });
	    comments.push({
		_id       : commentIds[2],
		content   : 'comment-by 吴天志',
		commenter : userIds[1],
		post      : postIds[2]
	    });



	
	    // 向数据库中 创建数据3 个collection    create 的方法是
	
	    User.create(users, function(err, docs) {
		Post.create(posts, function(err, docs) {
		    Comment.create(comments, function(err, docs) {
			// run example on here
			 console.log('last::', docs)	
			 //example1() 
			 example2() 
			 //example3() 
		    });
		});
	    });
}



// Query#populate examples
function example1(done) {

    User.find()
        .populate('posts', 'title', null, {sort: { title: -1 }})
        .exec(function(err, docs) {
           // console.log('all post',docs)
	   //console.log(docs[0].posts[0].title);    // post-by-aikin
        });


    User.findOne({name: 'wutianzhi'})
        .populate({path: 'posts', select: { title: 1 }, options: {sort: { title: -1 }}})
        .exec(function(err, doc) {
            console.log(doc.posts[0].title);        // post-by-luajin
        });

}








function example2(done) {

    Post.findOne({title: '王国华发表'})
        .populate('poster comments', '-_id')
        .exec(function(err, doc) {
            console.log(doc.poster.name);           // aikin
            console.log(doc.poster._id);            // undefined

            console.log(doc.comments[0].content);  // comment-by-luna
            console.log(doc.comments[0]._id);      // undefined
        });

    Post.findOne({title: '王国华发表'})
        .populate({path: 'poster comments', select: '-_id'})
        .exec(function(err, doc) {
            console.log(doc.poster.name);           // aikin
            console.log(doc.poster._id);            // undefined

            console.log(doc.comments[0].content);  // comment-by-luna
            console.log(doc.comments[0]._id);      // undefined
        });

    Post.findOne({title: '王国华发表'})
        .populate(['poster', 'comments'])
        .exec(function(err, doc) {
            console.log(doc.poster.name);          // aikin
            console.log(doc.comments[0].content);  // comment-by-luna
        });

    Post.findOne({title: '王国华发表'})
        .populate([
            {path:'poster',   select: '-_id'},
            {path:'comments', select: '-content'}
        ])
        .exec(function(err, doc) {
            console.log(doc.poster.name);          // aikin
            console.log(doc.poster._id);           // undefined

            console.log(doc.comments[0]._id);      // 会打印出对应的 comment id
            console.log(doc.comments[0].content);  // undefined
        });
}




// Model#populate example
// 2次populate
function example3(done) {

    Post.find({title: '黄鑫发表'})
        .populate('poster comments')  // 关联2个字段 注意 poster 和 comments 都是ref 类型的
        .exec(function(err, docs) {

            var opts = [{
                path   : 'comments.commenter',
                select : 'name',
                model  : 'User'   // 注意这里的User model
            }];

	    // 找出的docs 为	
            Post.populate(docs, opts, function(err, populatedDocs) {

                console.log(populatedDocs[0].poster.name);                  // aikin
                console.log(populatedDocs[0].comments[0].commenter.name);  // luna

                done();
            });
        });

}


// Document#populate example
function example4(done) {

    User.findOne({name: 'wutianzhi'})
        .exec(function(err, doc) {

            var opts = [{
                path   : 'posts',
                select : 'title'
            }];
		
	    // doc 为找出的文档document 然后它也有populate 这个方法。	
            // 之前Scheme定义的时候指出每个user 有多个posts posts是个引用ref 
	   doc.populate(opts, function(err, populatedDoc) {
                console.log(populatedDoc.posts[0].title);  // post-by-aikin
                done();
            });
        });
}

function done(){
    mongoose.connection.db.dropDatabase(function() {
        mongoose.connection.close();
    });
}






























