(function(){
	let elem={};
	document.addEventListener("DOMContentLoaded",function(){elem.domload()});
	
	(function(){
		let unameInput;
		let upwdInput;
		let UnameHint;
		let UpwdHint;
		elem.domload=function(){
			unameInput=document.querySelector(".container > div:nth-child(2) form > div:nth-child(2) > input");
			upwdInput=document.querySelector(".container > div:nth-child(2) form > div:nth-child(3) > input");
			UnameHint=document.querySelectorAll(".container > div:nth-child(2) form > div:nth-child(2) > p");
			UpwdHint=document.querySelectorAll(".container > div:nth-child(2) form > div:nth-child(3) > p");
			
			let validate=function(userInput,hint1,hint2,reg){
				if(!userInput.value){
					hint1.style.display="block";					
				}else{
					hint1.style.display="none";
					if(!reg.test(userInput.value)){
						hint2.style.display="block";
					}else{
						hint2.style.display="none";
					}
				}
			}
			
			unameInput.onblur=function(){
				validate(unameInput,UnameHint[0],UnameHint[1],/^[0-9A-Za-z\u4e00-\u9fa5]{6,9}$/);				
			}
			upwdInput.onblur=function(){
				validate(upwdInput,UpwdHint[0],UpwdHint[1],/[0-9a-zA-Z]{6,9}/);
			}
		}
	})();
})();
