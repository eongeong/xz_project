(function(){
	let elem={};
	document.addEventListener("DOMContentLoaded",function(){elem.domload()});
	
	(function(){
		let unameInput;
		let upwdInput;
		let UnameHint;
		let UpwdHint;
		let submitBtn;
		let form;
		
		elem.domload=function(){
			
			unameInput=document.querySelector(".container > div:nth-child(2) form > div:nth-child(2) > input");
			upwdInput=document.querySelector(".container > div:nth-child(2) form > div:nth-child(3) > input");
			UnameHint=document.querySelectorAll(".container > div:nth-child(2) form > div:nth-child(2) > p");
			UpwdHint=document.querySelectorAll(".container > div:nth-child(2) form > div:nth-child(3) > p");
			submitBtn = document.querySelector(".container > div:nth-child(2) form > input");
			form = document.forms[0];
			
			//页面初始化时，如果帐号密码cookie存在则填充
			if(getCookie('uname') && getCookie('upwd')){
			  unameInput.value = getCookie('uname');
			  upwdInput.value = getCookie('upwd');
			  form.rememberMe.checked = true;
			}
			//复选框勾选状态发生改变时，如果未勾选则清除cookie
		    form.rememberMe.onchange = function(){
		      if(!this.checked){
		        delCookie('uname');
		        delCookie('upwd');
		      }
		    };
			
			let validate=function(userInput,hint1,hint2,reg){
				if(!userInput.value){
					hint1.style.display="block";
					hint2.style.display="none";
				}else{
					hint1.style.display="none";
					if(!reg.test(userInput.value)){
						hint2.style.display="block";
					}else{
						hint2.style.display="none";
						return true;
					}
				}
			}
			
			unameInput.oninput=function(){
				validate(unameInput,UnameHint[0],UnameHint[1],/^[0-9A-Za-z\u4e00-\u9fa5]{2,9}$/);
			}
			upwdInput.oninput=function(){
				validate(upwdInput,UpwdHint[0],UpwdHint[1],/^[0-9a-zA-Z]{6,12}$/);
			}
			
			submitBtn.onclick = function(){
				if(validate(unameInput,UnameHint[0],UnameHint[1],/^[0-9A-Za-z\u4e00-\u9fa5]{2,9}$/)&&validate(upwdInput,UpwdHint[0],UpwdHint[1],/^[0-9a-zA-Z]{6,12}$/)){
					
				let xhr = createXhr();
				xhr.onreadystatechange = function(){
					if(xhr.readyState == 4 && xhr.status == 200){
						let result = xhr.responseText;
						if(parseInt(result)){
							alert("登录成功");
							if(form.rememberMe.checked){ 
							    setCookie('uname',unameInput.value,7); //设置帐号到cookie，有效期7天
							    setCookie('upwd',upwdInput.value,7); //设置密码到cookie，有效期7天
						    }
							location.assign("index.html");
						}else{
							alert("用户名或密码错误,登录失败");
						}
					}
				}
				xhr.open("post","http://127.0.0.1:5050/user/login",true);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xhr.send(`uname=${unameInput.value}&upwd=${upwdInput.value}`);	
				}
			}
		}
	})();
})();
