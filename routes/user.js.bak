//路由器属于是express下的功能
const express = require('express');

//引入mysql连接池
const pool = require("../pool.js");

let router = express.Router(); //调用路由器功能


//往路由器中添加路由
router.post('/login',(req,res)=>{
    //向浏览器发送数据
    let obj = req.body;
    //验证表单提交的内容是否为空
    //验证用户名为空
    let $uname = obj.uname;
    if($uname == ""){
        res.send({code:401,msg:"uname required"});
        return;
    }
    //验证用户密码是否为空
    let $upwd = obj.upwd;
    if($upwd == ""){
        res.send({code:402,msg:"upwd required"});
        return;
    }

    pool.query("select * from xz_user where uname=? and upwd=?",[$uname,$upwd],(err,result,fields)=>{
        if(err) throw err;
        if(result.length>0){
        	req.session["uid"]=result[0]["uid"];
        	req.session["uname"]=result[0]["uname"];
	        res.writeHead(200,{
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Origin":"*"  // 允许跨域请求			
			});
			res.write("1");
			res.end();
        }else{
        	res.writeHead(200,{
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Origin":"*"			
			});
			res.write("0");
			res.end();
        }
        
    });
});

router.get('/uname',(req,res)=>{
	if(req.session["uid"] !== undefined){
		let output = {};
		output.uid = req.session["uid"];
		output.uname = req.session["uname"];
		
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"			
		});
		res.write(JSON.stringify(output));
		res.end();		
	}
	res.end();
});
router.get('/isLogin',(req,res)=>{
	if(req.session["uid"] === undefined){
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
		});
		res.write("0");
		res.end();
	}else{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
		});
		res.write("1");
		res.end();
	}
});

router.get("/outLogin",(req,res)=>{
	req.session["uid"]=undefined;
	res.end();
})

router.post('/register',(req,res)=>{
    //浏览器发送的数据
    
    let obj = req.body;
    //验证表单提交的内容是否为空
    //验证用户名为空
    let $uname = obj.uname;
    if($uname == ''){
        res.send({code:401,msg:"uname required"});
        return; //终止函数中的代码继续执行
    }
    //验证密码为空
    let $upwd = obj.upwd;
    if($upwd == ''){
        res.send({code:402,msg:"upwd required"});
        return;
    }
    //验证邮箱是否为空
    let $email = obj.email;
    if($email == ''){
        res.send({code:403,msg:"email required"});
        return;
    }
    //验证电话是否为空
    let $phone = obj.phone;
    if($phone == ""){
        res.send({code:404,msg:"phone required"});
        return;
    }
    //当验证都通过了,执行插入数据库操作
    let sql="INSERT INTO xz_user(uname,upwd,email,phone) VALUES(?,?,?,?)"
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