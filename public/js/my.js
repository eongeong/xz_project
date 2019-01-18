let style = document.createElement("style");
style.innerHTML = `
	*{
		box-sizing: border-box;
		margin:0;
		padding:0;
	}
	h1,h2,h3,h4,h5,h6{
		font-weight:normal;
	}
	a{
		text-decoration: none;
	}
	ul{
		list-style:none;
	}
	img{
		vertical-align:top;
	}
	input{
		border:none;
		outline: none;
		background-color: transparent;
	}
	button{
		border:none;
		outline: none;
		background-color: transparent;
	}
	[cloak]{
		visibility: hidden !important;
	}
	[seal]{
		display: none !important;
	}
	.flex{
		display:flex !important;
	}
	.flexRowWrap{
		display: flex !important;
		flex-flow:row wrap !important;
	}
	.flexRowStart{
		display: flex !important;
		flex-direction: row !important;
		align-items: flex-start !important;
	}
	.flexRowCenter{
		display:flex !important;
		flex-direction:row !important;
		align-items:center !important;
	}
	.flexRowEnd{
		display: flex !important;
		flex-direction: row !important;
		align-items: flex-end !important;
	}
	.flexColumn{
		display:flex !important;
		flex-direction:column !important;
	}
	.flexColumnStart{
		display: flex !important;
		flex-direction: column !important;
		align-items: flex-start !important;
	}
	.flexColumnCenter{
		display:flex !important;
		flex-direction:column !important;
		align-items:center !important;
	}
	.flexColumnEnd{
		display: flex !important;
		flex-direction: column !important;
		align-items:flex-end !important;
	}
	.justifyCenter{
		justify-content: center !important;
	}
	.justifySpaceBetween{
		justify-content:space-between !important;
	}
	.justitySpaceAround{
		justify-content:space-around !important;
	}
	.alignSelfStart{
		align-self: flex-start !important;
	}
	.alignSelfEnd{
		align-self: flex-end !important;
	}
	.alignSelfCenter{
		align-self:center !important;
	}
	.f-1{flex:1 !important;}
	.f-2{flex:2 !important;}
	.f-3{flex:3 !important;}
	.f-4{flex:4 !important;}
	.f-5{flex:5 !important;}
	.f-6{flex:6 !important;}
	.f-7{flex:7 !important;}
	.f-8{flex:8 !important;}
	.f-9{flex:9 !important;}
	.f-10{flex:10 !important;}
	.f-11{flex:11 !important;}
	.f-12{flex:12 !important;}
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
	return new Promise(function(open,err){
		
		var xhr = createXhr();	//创建xhr对象
		
		xhr.onreadystatechange = function(){	//绑定监听事件
			if(xhr.readyState == 4 && xhr.status == 200){
				if(dataType != undefined && dataType.toLowerCase() == "json"){
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
		
		xhr.open(type,url,true);	//打开连接	
		if(type.toLowerCase() == "post"){
			
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlenconded");	//增加:设置请求消息头
		}
		
		if(type.toLowerCase() == "post" && data != undefined){	//发送请求
			xhr.send(data);
		}else{
			xhr.send(null);
		}
	});
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
	while(elem && elem.tagName !== "BODY"){
		offsetTop += elem.offsetTop;
		elem = elem.offsetParent; 	//每个元素都是有一个offsetParent的属性，这个属性就记录了该元素取offsetTop值的相对元素
	}
	return offsetTop;
}

function lazyLoad(dataUrl,cloak){	//选择有具体属性的元素进行懒加载
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
	if(cloak != undefined){
		useFun = function(){
			fun(dataUrl,cloak);
		}
	}else{
		useFun = function(){
			fun(dataUrl);
		}
	}
	
	useFun();
	document.addEventListener("scroll",function(){
		useFun();
	});
}

function setCookie(dataName,value,day){	//设置cookie
	let date = new Date();
	date.setDate(date.getDate() + day);
	document.cookie = dataName + "=" + value + ";expires=" + date;
}

function getCookie(dataName){	//获取cookie
    var reg = RegExp(dataName+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
};

function delCookie(dataName){	//删除cookie
    setCookie(dataName,null,-1);
};