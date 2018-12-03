const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/details",(req,res)=>{
	let lid = req.query.lid;
	let sql1 = "select * from xz_laptop where lid=?"; //用lid查当前商品信息
	let sql2 = "";
	let sql3 = "";
	
	
});

module.exports = router;