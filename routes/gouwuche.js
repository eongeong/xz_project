const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/",(req,res)=>{
	let uid = req.query.uid;
	let sql = "select count,price from xz_shoppingcart_item,xz_laptop where user_id=? and lid=laptop_id";
	pool.query(sql,[uid],(err,result)=>{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求
		});
		res.write(JSON.stringify(result));
		res.end();
	});
});
router.get("/qingkong",(req,res)=>{
	let uid = req.query.uid;
	let sql = "delete from xz_shoppingcart_item where user_id=?";
	pool.query(sql,[uid],(err,result)=>{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求
		});
		res.end();
	});
});
router.get("/getgouwuche",(req,res)=>{
	let uid = req.query.uid;
	let sql = "select lid,count,price,(select sm from xz_laptop_pic where laptop_id=lid limit 1)as sm,title from xz_shoppingcart_item,xz_laptop where user_id=? and lid=laptop_id";
	pool.query(sql,[uid],(err,result)=>{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  
		});
		res.write(JSON.stringify(result));
		res.end();
	});
});
router.get("/updateGouwuche",(req,res)=>{
	let count = req.query.count;
	let lid = req.query.lid;
	let uid = req.query.uid;
	console.log(uid)
	let sql = "update xz_shoppingcart_item set count=? where laptop_id=? and user_id=?";
	pool.query(sql,[count,lid,uid],(err,result)=>{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  
		});
		res.end();
	});
});


module.exports = router;