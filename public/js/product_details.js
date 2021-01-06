(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	window.addEventListener("load",function(){elem.winLoad();});
	
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
		
		elem.domLoad = function(){
			let vm = new Vue({
				el:".container",
				data:{
					product:{},
					pics:[],
					pic:{md:"",lg:""},
					specs:[],
					uid:0
				},
				methods:{
					picFun(e){
						this.pic.md = e.target.dataset.md;
						this.pic.lg = e.target.dataset.lg;
					},
					getLid(){
						return parseInt(location.search.split("=")[1]);
					}
				},
				mounted(){
					(async	()=>{
						this.uid = (await axios.get("http://127.0.0.1:5050/user/uname",{})).data.uid;
						let result = (await axios.get("http://127.0.0.1:5050/product/details",{ 
							params:{
								lid:this.getLid()
							}
						})).data;
						this.product = result.product;
						this.pics = result.pics;
						this.specs = result.specs;
						this.pic.md = this.pics[0].md;
						this.pic.lg = this.pics[0].lg;
						this.product.details = JSON.parse(this.product.details);
					})();
				}
			});
			
			productModels=document.querySelector(".container > div > div:nth-child(2) > form:last-child > div:nth-child(5) > div:nth-child(2)").children;
			buyArea=vm.$refs.buyArea;
			iconBox=document.querySelector(".container > div > div:nth-child(2) > div:first-child > div:nth-child(2)");
			recommendList.box=document.querySelector(".container > div > div:nth-child(3) > div:nth-child(2) > ul");
			right_side.list=document.querySelector(".container > div > div:nth-child(4) > form:nth-child(2) > div");
			product_details=document.querySelector(".container > div > div:nth-child(4) > div:first-child");
			preview=document.querySelector(".container > div > div:nth-child(2) > div:first-child > div:first-child");
			
			buyArea.onclick=function(e){
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
				if(e.target.value == "加入购物车"){
					(async ()=>{
						if(vm.uid){
							let uid = vm.uid;
							let lid = location.search.split("=")[1];
							let count = buyArea.children[5].children[2].value;
							await axios.get("http://127.0.0.1:5050/product/jiarugouwuche",{
								params:{
									uid,
									lid,
									count
								}
							});							
						}
					})();
				}
				if(e.target.value == "收藏"){
					(async ()=>{
						let uid = vm.uid;
						let lid = location.search.split("=")[1];
						let count = buyArea.children[5].children[2].value;
						await axios.get("http://127.0.0.1:5050/product/collect",{
							params:{
								uid,
								lid,
								count
							}
						});
					})();
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
			
			preview.children[1].onmouseenter=function(){
				preview.parentNode.children[2].firstElementChild.src=preview.dataset.lg;
				preview.parentNode.children[2].style.display="block";
			}
			
			preview.children[1].onmouseleave=function(){
				preview.parentNode.children[2].style.display="none";
			}
			
		}
	
		elem.winLoad = function(){
			iconBox.firstElementChild.children[0].setAttribute("data-focus","");
			if(iconBox.children[0].children.length<=5){
				iconBox.children[1].setAttribute("seal","");
				iconBox.children[2].setAttribute("seal","");
			}
			for (let productModel of productModels) {
				if(productModel.dataset.lid == location.search.split("=")[1]){
					productModel.setAttribute("data-focus","");
					break;
				}
			}
			
			lazyLoad("data-url","cloak");
		}
	})();

})();
