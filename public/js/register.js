(function(){
	let elem={};//定义一个保存元素操作方法的对象
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});//dom加载后执行
	
	(function(){
		let uname,uname_vali_info=[];
		let upwd,upwd_vali_info=[];
		let upwdConfirm,upwdConfirm_vali_info=[];
		let email,email_vali_info=[];
		let phone,phone_vali_info=[];
		let submitBtn;  
		let success_info;
		let submitBool;
		let form;
		
		elem.domLoad=function(){
			form = document.querySelector(".container > div:nth-child(2) form");
			
			uname=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div input ")[0];
			uname_vali_info[0]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:nth-child(3)")[0];
			uname_vali_info[1]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:last-child")[0];
			
			upwd=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div input ")[1];
			upwd_vali_info[0]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:nth-child(3)")[1];
			upwd_vali_info[1]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:last-child")[1];
			
			upwdConfirm=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div input ")[2];
			upwdConfirm_vali_info[0]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:nth-child(3)")[2];
			upwdConfirm_vali_info[1]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:last-child")[2];
			
			email=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div input ")[3];
			email_vali_info[0]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:nth-child(3)")[3];
			email_vali_info[1]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:last-child")[3];
			
			phone=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div input ")[4];
			phone_vali_info[0]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:nth-child(3)")[4];
			phone_vali_info[1]=document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div p:last-child")[4];
			
			submitBtn = document.querySelector(".container > div:nth-child(2) form > div:last-child > input");
			success_info = document.querySelectorAll(".container > div:nth-child(2) form > div:first-child ~ div:not(:last-child) p:last-child");
						
			let validate=function(reg,user_info,vali_info){
				if(user_info.value&&reg.test(user_info.value)){
					vali_info[0].style.display="none";
					vali_info[1].style.display="block";
					vali_info[1].className='vali_success';
				}else{
					vali_info[1].style.display="none";
					vali_info[0].style.display="block";
					vali_info[0].className='vali_fail';					
				}
			}
			
			let isSubmit = function(){
				let submitBool = false;
				for(let p of success_info){
					if(getComputedStyle(p).display == "block"){
						submitBool = true;
					}else{
						submitBool = false;
						break;
					}
				}
				if(submitBool){
					submitBtn.type = "submit";					
				}else{
					submitBtn.type = "button";
				}
			}
			
			let oninputEven = function(e){
				
				if(e.target == uname){
					let xhr = createXhr();
					xhr.onreadystatechange = function(){
						if(xhr.readyState == 4 && xhr.status == 200){
							let result = xhr.responseText;
							
							if(!/^[0-9A-Za-z\u4e00-\u9fa5]{2,9}$/.test(uname.value)){
								uname_vali_info[0].innerHTML="&nbsp;&nbsp;用户名长度在2~9位的数字字母汉字";
								uname_vali_info[1].style.display = "none";
								uname_vali_info[0].style.display = "block";
								uname_vali_info[0].className = "vali_fail";
							}else if(/^[0-9A-Za-z\u4e00-\u9fa5]{2,9}$/.test(uname.value) && JSON.parse(result).length == 0){
								uname_vali_info[1].innerHTML="&nbsp;&nbsp;输入正确，名字可使用";
								uname_vali_info[0].style.display = "none";
								uname_vali_info[1].style.display = "block";
								uname_vali_info[1].className = "vali_success";							
							}else{
								uname_vali_info[0].innerHTML="&nbsp;&nbsp;名字已被占用";
								uname_vali_info[1].style.display = "none";
								uname_vali_info[0].style.display = "block";
								uname_vali_info[0].className = "vali_fail";
							}
							
							isSubmit();
						}
					}
					xhr.open("get",`http://localhost:3000/user/uname_verify?uname=${uname.value}`,true);
					xhr.send(null);					
					
				};
				
				if(e.target == upwd){
					upwdConfirm.value = "";
					validate(/^[0-9A-Za-z]{6,12}$/,upwd,upwd_vali_info);
					let reg=new RegExp(upwd.value);
					validate(reg,upwdConfirm,upwdConfirm_vali_info);
				};
				
				
				if(e.target == upwdConfirm){
					let reg=new RegExp(upwd.value);
					validate(reg,upwdConfirm,upwdConfirm_vali_info);					
				}
				
				if(e.target == email){
					validate(/[^.@]+@[^.@]+\.(com|cn|net)(\.cn)?/,email,email_vali_info);					
				}
				
				if(e.target == phone){
					validate(/(\+86|0086)?\s*1[3-8]\d{9}/,phone,phone_vali_info);					
				}
				
				isSubmit();
			}
			
			form.onclick = function(){
				isSubmit();
			}
			
			form.addEventListener("input",function(e){
				oninputEven(e);
			});
						
			submitBtn.onclick = function(){
				if(submitBtn.type == "submit"){
					alert("注册成功");
				}
			}
			
		}
	})();
	
	
})();


