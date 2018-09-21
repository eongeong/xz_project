(function(){
	let elem={};//定义一个保存元素操作方法的对象
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});//dom加载后执行
	
	(function(){
		let uname,uname_vali_info=[];
		let upwd,upwd_vali_info=[];
		let upwdConfirm,upwdConfirm_vali_info=[];
		let email,email_vali_info=[];
		let phone,phone_vali_info=[];
		
		elem.domLoad=function(){
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
			
			uname.onblur=function(){
				validate(/^[0-9A-Za-z\u4e00-\u9fa5]{6,9}$/,uname,uname_vali_info);
			}
			upwd.onblur=function(){
				validate(/^[0-9A-Za-z]{6,12}$/,upwd,upwd_vali_info);
			}
			upwdConfirm.onblur=function(){
				if(upwdConfirm.value.length<6){ upwdConfirm.value="";}
				let reg=new RegExp(upwd.value);
				validate(reg,upwdConfirm,upwdConfirm_vali_info);
			}
			email.onblur=function(){
				validate(/[^.@]+@[^.@]+\.(com|cn|net)(\.cn)?/,email,email_vali_info);
			}
			phone.onblur=function(){
				validate(/(\+86|0086)?\s*1[3-8]\d{9}/,phone,phone_vali_info);
			}
		}
	})();
	
	
})();


