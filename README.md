dzb
===

a school website power by node+mongodb+angularjs+grunt+bower


dzb 数据库设计

admin:
{
	id:id
	username:'',
	password:'wtz';
	roal:  'admin' || editor  //  admin 超级管理员权限。editor 只有编辑发布文章的权限
	
}

// 公共信息
//新闻分类
category:{
	id:id
	type: []'notice' ||   //通知公告、每周会议，办公指南、规章制度
			// 用印管理  会议安排   请示报告 ]

}

// 文章信息
post:{
	id:id
	source: category.type  // 那个分类下的
	author:''
	create:
	title:''
	content:''
	comment:[]  // 只有通知公告。每周会议，有评论功能。其他的类别没有评论功能。
             hits:// 浏览次数
             createtime

}

// 人员系统

person{
	id:id
	duty: // zhiwu
	name:
	repon:// 职责
	location:    // 工作地点
	createTime  //创建时间
}

// upload  拖动上传，在线预览文件
upload{
	id:id,
	fileName:
	filePath:;
	createTime:''
}

