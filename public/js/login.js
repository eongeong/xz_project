(function(){
	let elem={};
	document.addEventListener("DOMContentLoaded",function(){elem.domload()});
	
	(function(){
		let unameInput;
		let upwdInput;
		let UnameHint;
		let UpwdHint;
		let submitBtn;
		
		elem.domload=function(){
			
			unameInput=document.querySelector(".container > div:nth-child(2) form > div:nth-child(2) > input");
			upwdInput=document.querySelector(".container > div:nth-child(2) form > div:nth-child(3) > input");
			UnameHint=document.querySelectorAll(".container > div:nth-child(2) form > div:nth-child(2) > p");
			UpwdHint=document.querySelectorAll(".container > div:nth-child(2) form > div:nth-child(3) > p");
			submitBtn = document.querySelector(".container > div:nth-child(2) form > input");
			
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
							location.assign("/index.html");
							
						}else{
							alert("用户名或密码错误,登录失败");
							location.assign("/login.html");
						}
					}
				}
				xhr.open("post","http://localhost:3000/user/login",true);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				xhr.send(`uname=${unameInput.value}&upwd=${upwdInput.value}`);	
				}
			}			
		}
	})();
})();
