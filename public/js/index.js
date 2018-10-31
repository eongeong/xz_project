(function(){
document.addEventListener("DOMContentLoaded",function(){
(function(){
	let scroll=document.getElementById("scroll");
	let carousel=document.getElementsByClassName("carousel")[0];
	let leftMove=document.getElementsByClassName("arrow-right")[0];
	let rightMove=document.getElementsByClassName("arrow-left")[0];
	let dot=document.getElementsByClassName("dot")[0];
	
	scroll.appendChild(scroll.children[0].cloneNode(true));
	
	let locate=0;
	
	dot.children[0].style.borderColor="rgb(0,127,255)";
	
	let move=function(){
		if(locate==-4000){
			locate=0;
			scroll.style.left=0+"px";
		}
		locate-=1000;
		let timer=setInterval(function(){
			scroll.style.left=scroll.offsetLeft-40+"px";
			if(scroll.offsetLeft<locate){
				clearInterval(timer);
				timer=null;
				scroll.style.left=locate+"px";
				for(let i=0;i<dot.children.length;i++){
						dot.children[i].style.borderColor="";
				}
				switch(locate){
					case -4000:
						dot.children[0].style.borderColor="rgb(0,127,255)";
						break;
					case -1000:
						dot.children[1].style.borderColor="rgb(0,127,255)";
						break;
					case -2000:
						dot.children[2].style.borderColor="rgb(0,127,255)";
						break;
					case -3000:
						dot.children[3].style.borderColor="rgb(0,127,255)";
				}
					
			}
		},15);
	}
	
	let timer=setInterval(move,2000);
	
	carousel.onmouseover=function(){
		clearInterval(timer);
		timer=null;
	}
	carousel.onmouseout=function(){
		clearInterval(timer);
		timer=setInterval(move,2000)
	}
	
	rightMove.onclick=function(){
		if(locate==0){
			locate=-4000;
			scroll.style.left=-4000+"px";
		}
		locate+=1000;
		let timer=setInterval(function(){
			scroll.style.left=scroll.offsetLeft+40+"px";
			if(scroll.offsetLeft>locate){
				clearInterval(timer);
				timer=null;
				scroll.style.left=locate+"px";
				for(let i=0;i<dot.children.length;i++){
						dot.children[i].style.borderColor="";
				}
				switch(locate){
					case 0:
						dot.children[0].style.borderColor="rgb(0,127,255)";
						break;
					case -3000:
						dot.children[3].style.borderColor="rgb(0,127,255)";
						break;
					case -2000:
						dot.children[2].style.borderColor="rgb(0,127,255)";
						break;
					case -1000:
						dot.children[1].style.borderColor="rgb(0,127,255)";
				}
			}
		},15);
	}
	
	leftMove.onclick=function(){
		if(locate==-4000){
			locate=0;
			scroll.style.left=0+"px";
		}
		locate-=1000;
		let timer=setInterval(function(){
			scroll.style.left=scroll.offsetLeft-40+"px";
			if(scroll.offsetLeft<locate){
				clearInterval(timer);
				timer=null;
				scroll.style.left=locate+"px";
				for(let i=0;i<dot.children.length;i++){
						dot.children[i].style.borderColor="";
				}
				switch(locate){
					case -4000:
						dot.children[0].style.borderColor="rgb(0,127,255)";
						break;
					case -1000:
						dot.children[1].style.borderColor="rgb(0,127,255)";
						break;
					case -2000:
						dot.children[2].style.borderColor="rgb(0,127,255)";
						break;
					case -3000:
						dot.children[3].style.borderColor="rgb(0,127,255)";
				}
			}
		},15);
	}
	
	
	dot.children[0].onmouseover=function(){
		for(let i=0;i<dot.children.length;i++){
			dot.children[i].style.borderColor="";
		}
		dot.children[0].style.borderColor="rgb(0,127,255)";
		if(locate==-4000){
			locate=0;
			scroll.style.left=0+"px";
		}else if(scroll.offsetLeft>-3000){
			locate=0;
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft+40+"px";
				if(scroll.offsetLeft>locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=0+"px";
				}
			},15);
		}else{
			locate=-4000;
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft-40+"px";
				if(scroll.offsetLeft<locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=-4000+"px";
				}
			},15);
		}
	}
	dot.children[1].onmouseover=function(){
		if(scroll.offsetLeft==-4000){
			scroll.style.left=0+"px";
		}
		for(let i=0;i<dot.children.length;i++){
			dot.children[i].style.borderColor="";
		}
		dot.children[1].style.borderColor="rgb(0,127,255)";
		locate=-1000;
		if(scroll.offsetLeft<-1000){
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft+40+"px";
				if(scroll.offsetLeft>locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=locate+"px";
				}
			},15);
		}else{
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft-40+"px";
				if(scroll.offsetLeft<locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=locate+"px";
				}
			},15);
		}
	}
	dot.children[2].onmouseover=function(){
		locate=-2000;
		for(let i=0;i<dot.children.length;i++){
			dot.children[i].style.borderColor="";
		}
		dot.children[2].style.borderColor="rgb(0,127,255)";
		if(scroll.offsetLeft<-2000){
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft+40+"px";
				if(scroll.offsetLeft>locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=locate+"px";
				}
			},15);
		}else{
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft-40+"px";
				if(scroll.offsetLeft<locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=locate+"px";
				}
			},15);
		}
	}
	dot.children[3].onmouseover=function(){
		if(scroll.offsetLeft==0){
			scroll.style.left=-4000+"px";
		}
		locate=-3000;
		for(let i=0;i<dot.children.length;i++){
			dot.children[i].style.borderColor="";
		}
		dot.children[3].style.borderColor="rgb(0,127,255)";
		if(scroll.offsetLeft>-3000){
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft-40+"px";
				if(scroll.offsetLeft<locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=locate+"px";
				}
			},15);
		}else{
			let timer=setInterval(function(){
				scroll.style.left=scroll.offsetLeft+40+"px";
				if(scroll.offsetLeft>locate){
					clearInterval(timer);
					timer=null;
					scroll.style.left=locate+"px";
				}
			},15);
		}
	}
})();

(function(){
	let topSearch=document.getElementById("topSearch");
	let scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	
	if(scrollTop>400)
		topSearch.style.top=0;
	else
		topSearch.style.top=-50+"px";
	onscroll=function(){
		scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		if(scrollTop>400)
			topSearch.style.top=0;
		else
			topSearch.style.top=-50+"px";
	}
	
	let classSearch=topSearch.querySelector(".topSearch .box > .searchBorder div");
	let classMenu=classSearch.querySelector(".topSearch .box > .searchBorder div > .menu");
	let triangle=classSearch.querySelector(".topSearch .box > .searchBorder div img ");
	classSearch.onclick=function(e){
		if(!classMenu.hasAttribute("style")){
			triangle.style.transform="rotate(180deg)";
			let classMenus=classSearch.querySelectorAll(".topSearch .box > .searchBorder div > .menu > p");
			classMenu.style.height=`${classMenus.length*20}px`;
		}else{
			if(e.target.nodeName==="P"){
				let searchTitle=classSearch.querySelector(".topSearch .box > .searchBorder div p ");
				searchTitle.innerHTML=e.target.innerHTML;
			}
			classMenu.removeAttribute("style");
			triangle.removeAttribute("style");
		}
	}
})();


});
})();