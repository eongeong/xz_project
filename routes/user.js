//路由器属于是express下的功能
const express = require('express');

//引入mysql连接池
const pool = require("../pool.js");

var router = express.Router(); //调用路由器功能


//往路由器中添加路由
router.post('/login',(req,res)=>{
    //向浏览器发送数据
    var obj = req.body;
    //验证表单提交的内容是否为空
    //验证用户名为空
    var $uname = obj.uname;
    if($uname == ""){
        res.send({code:401,msg:"uname required"});
        return;
    }
    //验证用户密码是否为空
    var $upwd = obj.upwd;
    if($upwd == ""){
        res.send({code:402,msg:"upwd required"});
        return;
    }

    pool.query("update xz_user set in_login=true where uname=? and upwd=?",[$uname,$upwd],(err,result,fields)=>{
        if(err) throw err;
        res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求			
		});
		res.write(result.affectedRows.toString());
		res.end();
    });


});



router.post('/register',(req,res)=>{
    //浏览器发送的数据
    
    var obj = req.body;
    //验证表单提交的内容是否为空
    //验证用户名为空
    var $uname = obj.uname;
    if($uname == ''){
        res.send({code:401,msg:"uname required"});
        return; //终止函数中的代码继续执行
    }
    //验证密码为空
    var $upwd = obj.upwd;
    if($upwd == ''){
        res.send({code:402,msg:"upwd required"});
        return;
    }
    //验证邮箱是否为空
    var $email = obj.email;
    if($email == ''){
        res.send({code:403,msg:"email required"});
        return;
    }
    //验证电话是否为空
    var $phone = obj.phone;
    if($phone == ""){
        res.send({code:404,msg:"phone required"});
        return;
    }
    //当验证都通过了,执行插入数据库操作
    var sql="INSERT INTO xz_user(uname,upwd,email,phone) VALUES(?,?,?,?)"
    pool.query(sql,[$uname,$upwd,$email,$phone],(err,result,fields)=>{
        if(err) throw err;
        //如何判断插入成功--result.affectedRows>0
        if(result.affectedRows>0){
        	res.redirect("/login.html");//重定向到登录页面
        	res.send();
        }else{
            res.send({code:301,msg:"reg error"});
        }
    });
});

router.get('/uname_verify',(req,res)=>{
	pool.query("select uname from xz_user where uname=?",[req.query.uname],(err,result)=>{
		if(err) throw err;
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求			
		});
		res.write(JSON.stringify(result));
		res.end();
	});
});

//导出当前路由器
module.exports = router;