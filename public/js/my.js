let style = document.createElement("style");
style.innerHTML = `
	[cloak]{
		visibility: hidden !important;
	}
	[seal]{
		display: none !important;
	}
`;
document.head.appendChild(style);

function log(content){
	console.log(content);
}

function createXhr(){	//创建异步对象
	if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}else{
		return new ActiveXObject("Microsoft.XMLHttp");
	}
} 

function ajax({url,type,data,dataType}){	//ajax封装函数
	let xhr = createXhr();	//创建xhr对象
	
	xhr.onreadystatechange = function(){	//绑定监听事件
		if(xhr.readyState == 4 && xhr.status == 200){
			if(dataType != undefined && dataType.toLowerCase() == "json"){
				return res = JSON.parse(xhr.responseText);
			}else{
				return res = xhr.responseText;
			}
		}
	}

	if(type.toLowerCase() == "get" && data != undefined){
		url += "?" + data;
	}
	
	xhr.open(type,url,true);	//打开连接	
	if(type.toLowerCase() == "post"){
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlenconded");	//增加:设置请求消息头
	}
	
	if(type.toLowerCase() == "post" && data != undefined){	//发送请求
		xhr.send(data);
	}else{
		xhr.send(null);
	}
}

String.prototype.trim = function(){		//去除字符串两端的空白字符
	return this.replace(/(^\s*)|(\s*$)/g,"");
}

String.prototype.ltrim = function(){	//去除字符串左端的空白字符
	return this.replace(/(^\s*)/g,"");
}

String.prototype.rtrim = function(){	//去除字符串右端的空白字符
	return this.replace(/(\s*$)/g,"");
}

String.prototype.startWith = function(str){	//返回一个匹配字符串开头正则对象
	return new RegExp("^"+str).test(this);	
}

String.prototype.endWith = function(str){	//返回一个匹配字符串结尾正则对象
	return new RegExp(str+"$").test(this);
}

function getoffsetTopByBody(elem){	//元素相对于body的offsetTop
	let offsetTop = 0;
	while(elem && elem.tagName != "BODY"){
		offsetTop += elem.offsetTop;
		elem = elem.offsetParent; 	//每个元素都是有一个offsetParent的属性，这个属性就记录了该元素取offsetTop值的相对元素
	}
	return offsetTop;
}

function lazyLoad(dataUrl,cloak = "cloak"){	//选择有具体属性的元素进行懒加载
	let cloakBool = true,dataUrlBool = true;
	function fun(){
		let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(cloakBool){
			let elems = document.querySelectorAll(`[${cloak}]`);
			if(elems.length){
				for(let elem of elems){
					let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
					let elemTop = getoffsetTopByBody(elem);
					if((elemTop + elemHeight/2) - scrollTop <= winHeight){
						let urlElems = elem.querySelectorAll(`[${dataUrl}]`);
						for(let elem of urlElems){
							elem.src = elem.dataset.url;
							elem.removeAttribute(dataUrl);
						}
						elem.removeAttribute(cloak);
					}
				}
			}else{
				cloakBool = false;
			}
		}
		if(dataUrlBool){
			let elems = document.querySelectorAll(`[${dataUrl}]`);
			if(elems.length){
				for(let elem of elems){
					let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
					let elemTop = getoffsetTopByBody(elem);
					if((elemTop + elemHeight/2) - scrollTop <= winHeight){
						elem.src = elem.dataset.url;
						elem.removeAttribute(dataUrl);
					}
				}
			}else{
				dataUrlBool = false;
			}
		}
	}

	fun(dataUrl,cloak);
	document.addEventListener("scroll",function(){
		if( cloakBool || dataUrlBool) fun(dataUrl,cloak);
	});
}

function setCookie(dataName,value,day){	//设置cookie
	let date = new Date();
	date.setDate(date.getDate() + day);
	document.cookie = dataName + "=" + value + ";expires=" + date;
}

function getCookie(dataName){	//获取cookie
    let reg = RegExp(dataName+'=([^;]+)');
    let arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
};

function delCookie(dataName){	//删除cookie
    setCookie(dataName,null,-1);
};