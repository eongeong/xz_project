//连接mysql数据库服务器
const mysql = require('mysql');

//连接数据库
// var connection = mysql.createConnection({
//     host:'127.0.0.1', //mysql所在主机地址
//     port:3306, //端口号
//     user:'root',
//     password:'',
//     database:'xz_project' //进入mysql后,进入数据库
// });

// connection.connect(); //执行连接,连接结束
// //执行sql语句
// connection.query('select  * from xz_laptop group by laptop_family',(err,result)=>{
//     if(err) throw err;
//     console.log(result);
// });

// 创建数据库连接池
var pool = mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"",
    database:"xz_project",
    connectionLimit:20 //设置连接池里的连接数量
});
//导出连接
module.exports = pool;

