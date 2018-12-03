(function(){
	/*动态HTML加载*/
	/*(async function(){
		let res = await ajax({
			url:"http://localhost:3000/index/",
			type:"get",
			dataType:"json"
		});
		console.log(res);
		let p = res[0];
		let {title,details,pic,price} = p;
		let parent = document.querySelectorAll(".floor_one > div:first-child")[0];
		parent.innerHTML = `
			<div class="text">
				<h1>${title}</h1>
				<p>${details}</p>
				<h2>￥${price}</h2>
				<a href="#" class="view">查看详情</a>
			</div>
			<a href="#">
				<img src="${pic}"/>
			</a>
		`;
	})();*/	
document.addEventListener("DOMContentLoaded",function(){
	
(function(){
	let recommendedOne = {
		template:"#tplRecommendedOne",
		props:["product"] //可被外部访问,并赋值的特殊模型数据,用法和data中的模型变量完全一样		
	}
	let recommendedTwo = {
		template:"#tplRecommendedTwo",
		props:["product"]
	}
	let recommendedThree = {
		template:"#tplRecommendedThree",
		props:["product"]
	}
	let recommendedFour = {
		template:"#tplRecommendedFour",
		props:["product"]
	}
	
	let floorTitel = {
		template:"#tplFloorTitle",
		props:["title","num"]
	}
	
	let floor = {
		template:"#tplFloor",
		props:["products"],
		components:{recommendedOne,recommendedTwo,recommendedThree,recommendedFour}
	}
	
	Vue.component("floor-body",{
		template:"#tplFloorBody", //代替了new Vue中的el:		
		props:["title","num"],
		data:function(){ //代替new Vue中的data:{模型变量}
			//每次都要调用函数,为本次组件创建专属的数据模型
			return{ //创建新对象
				products:[
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null},
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null},
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null},
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null},
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null},
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null},
					{details:null,laptop_id:null,pic:null,seq_recommended:null,price:null,title:null}
				]
			}
		},
		mounted(){
			(async ()=>{
				this.products = (await axios.get("http://localhost:3000/index/",{})).data;
			})()
		},
		components:{ //包含子组件对象,并为子组件起名
			floorTitel, //"floor-titel":floorTitel,可简写为  foolrTitel
			floor
		}
	});
	
	new Vue({
		el:"#container",
		data:{
			floorTitle:{
				"/1F":"最新商品",
				"/2F":"热销商品",
				"/3F":"脱销商品"
			}
		}
	});
})();
		
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
	window.onscroll=function(){
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

window.addEventListener("load",function(){

(function(){
	let elems = document.querySelectorAll("[cloak]");
	let winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	
	for (let elem of elems) {
		let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
		let elemTop = elem.offsetTop;
		
		if((elemTop+elemHeight/2)-scrollTop <= winHeight){
			elem.removeAttribute("cloak");
			
			let img = elem.querySelector("img");
			img.src = img.dataset.url;
		}
	}
	
	document.addEventListener("scroll",function(){
		winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		
		for (let elem of elems) {
			let elemHeight = parseInt(document.defaultView.getComputedStyle(elem).height);
			let elemTop = elem.offsetTop;
			
			if((elemTop+elemHeight/2)-scrollTop <= winHeight){
				elem.removeAttribute("cloak");
				
				let img = elem.querySelector("img");
				img.src = img.dataset.url;
			}			
		}
	});
})();
	
});

})();