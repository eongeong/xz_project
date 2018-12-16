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
//去除字符串两端的空白字符
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
//去除字符串左端的空白字符
String.prototype.ltrim = function(){
	return this.replace(/(^\s*)/g,"");
}
//去除字符串右端的空白字符
String.prototype.rtrim = function(){
	return this.replace(/(\s*$)/g,"");
}
//返回一个匹配字符串开头正则对象
String.prototype.startWith = function(str){
	return new RegExp("^"+str).test(this);	
}
//返回一个匹配字符串结尾正则对象
String.prototype.endWith = function(str){
	return new RegExp(str+"$").test(this);
}
//元素相对于body的offsetTop
function getoffsetTopByBody(elem){
	let offsetTop = 0;
	while(elem && elem.tagName !== "BODY"){
		offsetTop += elem.offsetTop;
		elem = elem.offsetParent; //每个元素都是有一个offsetParent的属性，这个属性就记录了该元素取offsetTop值的相对元素
	}
	return offsetTop;
}
//选择有具体属性的元素进行懒加载
function lazyLoad(dataUrl,cloak){
	function fun(){
		if(arguments.length == 2){
			let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			
			let elems = document.querySelectorAll(`[${arguments[1]}]`);
			if(elems.length != 0){
				for(let elem of elems){
					let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
					let elemTop = getoffsetTopByBody(elem);
					if((elemTop+elemHeight/2)-scrollTop <= winHeight){
						let urlElems = elem.querySelectorAll(`[${arguments[0]}]`);
						for(let elem of urlElems){
							elem.src = elem.dataset.url;
							elem.removeAttribute(arguments[0]);
						}
						elem.removeAttribute(arguments[1]);
					}
				}
			}
			
			elems = document.querySelectorAll(`[${arguments[0]}]`);
			if(elems.length != 0){
				for(let elem of elems){
					let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
					let elemTop = getoffsetTopByBody(elem);
					if((elemTop+elemHeight/2)-scrollTop <= winHeight){
						elem.src = elem.dataset.url;
						elem.removeAttribute(arguments[0]);
					}
				}
			}
		}else if(arguments.length == 1){
			let elems = document.querySelectorAll(`[${arguments[0]}]`);
			let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			
			if(elems.lenght != 0){
				for(let elem of elems){
					let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
					let elemTop = getoffsetTopByBody(elem);
					if((elemTop+elemHeight/2)-scrollTop <= winHeight){
						elem.src = elem.dataset.url;
						elem.removeAttribute(arguments[0]);
					}
				}				
			}
		}
	}
	
	let useFun;
	if(cloak == undefined){
		useFun = function(){
			fun(dataUrl);
		}
	}else{
		useFun = function(){
			fun(dataUrl,cloak);
		}
	}
	
	useFun();
	document.addEventListener("scroll",function(){
		useFun();
	});
}
//设置cookie
function setCookie(dataName,value,day){
	let date = new Date();
	date.setDate(date.getDate() + day);
	document.cookie = dataName + "=" + value + ";expires=" + date;
}
//获取cookie
function getCookie(dataName){
    var reg = RegExp(dataName+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
};
//删除cookie
function delCookie(dataName){
    setCookie(dataName,null,-1);
};