const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/details",(req,res)=>{
	let lid = req.query.lid;
	let output = {}
	
	let sql1 = "select * from xz_laptop where lid=?"; //用lid查当前商品信息
	let sql2 = "select * from xz_laptop_pic where laptop_id=?"; //用lid查当前商品图片列表	
	//用lid查当前商品同系列的规格列表
	let sql3 = "select lid,spec from xz_laptop where laptop_family=(select laptop_family from xz_laptop where lid=?)";
	
	Promise.all([
		new Promise(function(open){
			pool.query(sql1,[lid],(err,result)=>{
				if(err) throw err;
				output.product = result[0];
				open();
			});
		}),
		new Promise(function(open){
			pool.query(sql2,[lid],(err,result)=>{
				if(err) throw err;
				output.pics = result;
				open();
			});
		}),
		new Promise(function(open){
			pool.query(sql3,[lid],(err,result)=>{
				if(err) throw err;
				output.specs = result;
				open();
			});
		})
	]).then(function(){
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求			
		});
		res.write(JSON.stringify(output));
		res.end();
	});
	
});

router.get("/search",(req,res)=>{
	let output = [];
	function promise(keywork,sqlName,output){
		new Promise(function(open){
			let sql =`select ${sqlName} from xz_laptop where ${sqlName} like ?`;
			pool.query(sql,[keywork],(err,result)=>{
				if(err) throw err;
				if(result.length != 0){
					if(!output.length){
						output[output.length] = result[0];
					}
					let is = false;
					for(let i = 0;i < result.length; i++){
						for(let j = 0;j < output.length;j++){
							if(result[i][sqlName] == output[j][sqlName]){
								is = true;
								break;
							}
						}
						if(is == false){
							output[output.length] = result[i];
						}else{
							is = false;
						}
					}
				}
				open();
			});
		});
	}
	
	(async ()=>{
		for(let i = 0;i < req.query.keywork.length;i++){
			keywork = `%${req.query.keywork[i]}%`;
				
			await promise(keywork,"title",output);
			
			await promise(keywork,"subtitle",output);
			
			await promise(keywork,"spec",output);
			
			await promise(keywork,"os",output);
			
			await promise(keywork,"resolution",output);
			
			await promise(keywork,"video_card",output);
			
			await promise(keywork,"cpu",output);
			
			await promise(keywork,"video_memory",output);
			
			await promise(keywork,"category",output);
			
			await new Promise(function(open){
				let sql ='select disk from xz_laptop where disk like ?';
				pool.query(sql,[keywork],(err,result)=>{
					if(err) throw err;
					if(result.length != 0){
						if(!output.length){
							output[output.length] = result[0];
						}
						let is = false;
						for(let i = 0;i < result.length; i++){
							for(let j = 0;j < output.length;j++){
								if(result[i].disk == output[j].disk){
									is = true;
									break;
								}
							}
							if(is == false){
								output[output.length] = result[i];
							}else{
								is = false;
							}
						}
					}
					if(i == req.query.keywork.length - 1){			
						res.writeHead(200,{
							"Content-Type":"application/json;charset=utf-8",
							"Access-Control-Allow-Origin":"*"  // 允许跨域请求
						});
						res.write(JSON.stringify(output));
						res.end();
					}
					open();
				});
			});
		}
	})();
	
});

router.get("/products",(req,res)=>{
	let keywork = `%${req.query.keywork}%`;
	let sql = "select *,(select md from xz_laptop_pic where laptop_id=lid limit 1)as md from xz_laptop where title like ? or subtitle like ? or spec like ? or os like ? or resolution like ? or video_card like ? or cpu like ? or video_memory like ? or category like ? or disk like ?";
	pool.query(sql,[keywork,keywork,keywork,keywork,keywork,keywork,keywork,keywork,keywork,keywork],(err,result)=>{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求
		});
		res.write(JSON.stringify(result));
		res.end();
	});
});

router.get("/jiarugouwuche",(req,res)=>{
	let uid = req.query.uid;
	let lid = req.query.lid;
	let count = req.query.count;
	pool.query("select laptop_id from xz_shoppingcart_item where laptop_id=?",[lid],(err,result)=>{
		if(!result.length){
			let sql = "insert into xz_shoppingcart_item(user_id,laptop_id,count,is_checked) values(?,?,?,false)";
			pool.query(sql,[uid,lid,count],(err,result)=>{});
		}else{
			let sql = "update xz_shoppingcart_item set count=? where laptop_id=? and user_id=?";
			pool.query(sql,[count,lid,uid],(err,result)=>{});
		}
		res.end();
	});
	
});

router.get("/quchugouwuche",(req,res)=>{
	let uid = req.query.uid;
	let lid = req.query.lid;
	let count = req.query.count;
	let sql = "delete from xz_shoppingcart_item where user_id=? and laptop_id=? and count=?";
	pool.query(sql,[uid,lid,count],(err,result)=>{
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  //允许跨域请求
		});
		res.end();
	});
});

router.get("/collect",(req,res)=>{
	if(req.query.uid){
		let uid = req.query.uid;
		let lid = req.query.lid;
		let count = req.query.count;
		pool.query("select laptop_id from xz_collect where laptop_id=?",[lid],(err,result)=>{
			if(!result.length){
				let sql = "insert into xz_collect(user_id,laptop_id,count) values(?,?,?)";
				pool.query(sql,[uid,lid,count],(err,result)=>{});
			}else{
				let sql = "update xz_collect set count=? where laptop_id=? and user_id=?";
				pool.query(sql,[count,lid,uid],(err,result)=>{});
			}
			res.end();
		});
	}
});

router.get("/getcollect",(req,res)=>{
	if(req.query.uid){
		let uid = req.query.uid;
		let sql = "select xz_collect.*,(select md from xz_laptop_pic where laptop_id=lid limit 1)as md,title,price from xz_collect,xz_laptop where lid=laptop_id and user_id=?";
		pool.query(sql,[uid],(err,result)=>{
			res.writeHead(200,{
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Origin":"*"
			});
			res.write(JSON.stringify(result));
			res.end();
		});
	}
});
router.get("/deletecollect",(req,res)=>{
	if(req.query.uid){
		let uid = req.query.uid;
		let lid = req.query.lid;
		let sql = "delete from xz_collect where user_id=? and laptop_id=?";
		pool.query(sql,[uid,lid],(err,result)=>{res.end();});
	}
});

module.exports = router;