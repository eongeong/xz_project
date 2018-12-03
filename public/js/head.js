(function(){
document.addEventListener("DOMContentLoaded",function(){
	let searchClass=document.querySelector(".search>div>div");
	let classMenu=document.querySelector(".search>div>div>div");
	let menus=document.querySelectorAll(".search>div>div>div>p");
	let triangle=document.querySelector(".search>div>div>span>img");
	let avatar = document.querySelector(".rightHead>div:nth-child(6)");
	let quit = document.getElementsByClassName("quit")[0];
	
	
	avatar.onclick = function(){
		quit.style.height=35+"px";
		quit.style.border = `1px solid black`;
	}
	
	searchClass.onclick=function(e){
		if(!triangle.hasAttribute("style")){
			classMenu.style.height=(menus.length)*22+"px";
			triangle.style.transform="rotate(180deg)";
		}else{
			if(e.target.nodeName==="P"){
				let searchTitle=searchClass.querySelector(".search>div>div>span>p");
			 	searchTitle.innerHTML=e.target.innerHTML;
			 }
			classMenu.removeAttribute("style");
			triangle.removeAttribute("style");
		}
	}
});
})();