//导入路由器
//使用路由器--把路由器挂载到特定的路径下 /user
//路由访问: /user/login /user/register
const user = require(__dirname+"/routes/user.js");
const index = require(__dirname+"/routes/index.js");
const product = require(__dirname+"/routes/product.js");
const gouwuche = require(__dirname+"/routes/gouwuche.js");
const express = require("express");
const session = require("express-session");
const stringRandom = require("string-random");

//const querystring = require("querystring");

const bodyParser = require("body-parser");


var app = express();

app.listen(5050,(req,res)=>{
    console.log('server listening at port 5050...');
});

//内置中间件--托管所有的态资源
app.use(express.static(__dirname+'/public'));
//session中间件
let str = stringRandom(128);
app.use(session({ //建立持久会话
	secret:`${str}`,
	resave:false,
	saveUninitialized:true
}));
//使用body-parser中间件,只能给服务器使用
app.use(bodyParser.urlencoded({
    extended:false //不使用querystring的查询字符串
}));

app.use('/user',user);// usre.js 挂载到 /user下边
app.use("/index",index);
app.use("/product",product);
app.use("/gouwuche",gouwuche);

