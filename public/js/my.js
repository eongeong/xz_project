function log(content){
	console.log(content);
}

function createXhr(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }else{
        return new ActiveXObject("Microsoft.XMLHttp");
    }
}

function ajax({url,type,data,dataType}){
	return new Promise(function(open,err){
		//创建xhr对象
		var xhr = createXhr();
		//绑定监听事件
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				if(dataType != undefined && dataType.toLowerCase()=="json"){
					var res = JSON.parse(xhr.responseText);
				}else{
					var res = xhr.responseText;
				}
				open(res);
			}
		}
		if(type.toLowerCase() == "get" && data != undefined){
			url += "?" + data;
		}
		//打开连接
		xhr.open(type,url,true);		
		if(type.toLowerCase() == "post"){
			//增加:设置请求消息头
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlenconded");
		}
		//发送请求
		if(type.toLowerCase() == "post" && data != undefined){
			xhr.send(data);
		}else{
			xhr.send(null);
		}
	});
}

String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

String.prototype.ltrim = function(){
	return this.replace(/(^\s*)/g,"");
}

String.prototype.rtrim = function(){
	return this.replace(/(\s*$)/g,"");
}

String.prototype.startWith = function(str){
	return new RegExp("^"+str).test(this);	
}

String.prototype.endWith = function(str){
	return new RegExp(str+"$").test(this);
}
