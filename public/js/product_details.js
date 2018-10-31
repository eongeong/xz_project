function log(i){
	console.log(i);
}
(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	(function(){
		let productModels;
		let buyArea;
		let iconBox;
		let iconBoxMoved=0;
		let recommendList={};
			recommendList.moved=0;
		let right_side={};
		let product_details;
		let preview;
		
		elem.domLoad=function(){
			productModels=document.querySelectorAll(".container > div > div:nth-child(2) > form:last-child > div:nth-child(5) > div:nth-child(2) > a");
			buyArea=document.querySelector(".container > div > div:nth-child(2) > form:last-child");
			iconBox=document.querySelector(".container > div > div:nth-child(2) > div:first-child > div:nth-child(2)");
			recommendList.box=document.querySelector(".container > div > div:nth-child(3) > div:nth-child(2) > ul");
			right_side.list=document.querySelector(".container > div > div:nth-child(4) > form:nth-child(2) > div");
			product_details=document.querySelector(".container > div > div:nth-child(4) > div:first-child");
			preview=document.querySelector(".container > div > div:nth-child(2) > div:first-child > div:first-child");
			
			buyArea.onclick=function(e){
				for (let productModel of productModels) {
					if(e.target===productModel){
						for (let productModel of productModels) {
							productModel.removeAttribute("data-focus");
						}
						productModel.setAttribute("data-focus","");
						break;
					}
				}
				
				if(e.target===buyArea.children[5].children[3]){
					buyArea.children[5].children[2].value=parseInt(buyArea.children[5].children[2].value)+1;
				}
				
				if(buyArea.children[5].children[2].value>1){
					if(e.target===buyArea.children[5].children[1]){
						buyArea.children[5].children[2].value=parseInt(buyArea.children[5].children[2].value)-1;
					}					
				}
				
				if(e.target===buyArea.children[5].children[2]){
					buyArea.children[5].children[2].select();
				}
				
			}
			
			buyArea.children[5].children[2].onblur=function(){
				let reg=new RegExp(/[0-9]+/);
				if(buyArea.children[5].children[2].value<=0||!reg.test(buyArea.children[5].children[2].value)){
					buyArea.children[5].children[2].value=1;
				}
			}
			
			iconBox.onclick=function(e){
				for (let icon of iconBox.firstElementChild.children) {
					if(e.target===icon){
						for (let icon of iconBox.firstElementChild.children) {
							icon.removeAttribute("data-focus");
						}
						icon.setAttribute("data-focus","");
						break;
					}
				}
				
				if (e.target===iconBox.children[1]&&iconBoxMoved<0) {
					iconBoxMoved+=470;
					iconBox.children[0].style.left=iconBoxMoved+"px";
				}
				if(e.target===iconBox.children[2]){
					if(iconBoxMoved>-((iconBox.firstElementChild.children.length*94)-(iconBox.firstElementChild.children.length*94)%470)){
						iconBoxMoved-=470;
						iconBox.children[0].style.left=iconBoxMoved+"px";
					}
				}
			}
			
			recommendList.move=function(){
				recommendList.moved+=2;
				recommendList.box.style.marginLeft=-recommendList.moved+"px";
				let style=getComputedStyle(recommendList.box);
				if(recommendList.moved>parseInt(style.width)/2){
					recommendList.moved=0;
				}
			}
			recommendList.timer=setInterval(recommendList.move,20);
			recommendList.box.onmouseover=function(){
				clearInterval(recommendList.timer);
			}
			recommendList.box.onmouseout=function(){
				recommendList.timer=setInterval(recommendList.move,20);
			}
			
			onscroll=function(){
				right_side.scorllTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				if (right_side.scorllTop>985) {
					right_side.list.dataset.fixed="rightSide";
				}else{
					right_side.list.removeAttribute("data-fixed");
				}
			}
			
			right_side.list.onclick=function(e){
				for (let list of right_side.list.children) {
					if(e.target===list||e.target===list.firstElementChild){
						for(let list of right_side.list.children){
							if(list.dataset.right_side==="blue"){
								list.removeAttribute("data-right_side");
								break;
							}
						}
						list.dataset.right_side="blue";
						break;
					}
				}
			}
			
			preview.children[1].onmousemove=function(e){
				let left=e.offsetX-(parseInt(getComputedStyle(preview.children[2]).width))/2;
				let top=e.offsetY-(parseInt(getComputedStyle(preview.children[2]).height))/2;				
				
				if(left<0){
					left=0;
				}else if(left>(parseInt(getComputedStyle(preview.children[1]).width))/2){
					left=(parseInt(getComputedStyle(preview.children[1]).width))/2;
				}
				
				if(top<0){
					top=0;
				}else if(top>(parseInt(getComputedStyle(preview.children[1]).height))/2){
					top=(parseInt(getComputedStyle(preview.children[1]).height))/2;
				}
				
				preview.children[2].style.left=left+"px";
				preview.children[2].style.top=top+"px";	
				
				preview.parentNode.children[2].firstElementChild.style.left=-left*(80/45)+"px";
				preview.parentNode.children[2].firstElementChild.style.top=-top*(80/45)+"px";
			}
			
			preview.parentNode.onmouseenter=function(){
				preview.parentNode.children[2].firstElementChild.src=preview.dataset.lg;
				log(preview.parentNode.children[2].firstElementChild);
				preview.parentNode.children[2].style.display="block";
			}
			
			preview.parentNode.onmouseleave=function(){
				preview.parentNode.children[2].style.display="none";
			}
			
			
		}
	})();
})();
