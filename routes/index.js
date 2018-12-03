const express = require("express");
const router = express.Router();
const pool = require("../pool");

//index/
router.get("/",(req,res)=>{
	pool.query("select price,xz_index_product.* from  xz_laptop,xz_index_product where lid=laptop_id order by seq_recommended asc",[],(err,result)=>{
		if(err) throw err;
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"  // 允许跨域请求			
		});
		res.write(JSON.stringify(result));			
		res.end();		
	});
});


module.exports = router;