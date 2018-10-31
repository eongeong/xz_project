(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	(function(){
		let checkAlls;
		let commoditys;
		let commodityDesktop;
		let delet;
		let popUpWindow;
		let actionBar;
		
		elem.domLoad=function(){
			checkAlls=document.querySelectorAll(".container > div > form > div> div >input");
			commoditys=document.querySelectorAll(".container > div > form > div:nth-child(2) > div");
			commodityDesktop=document.querySelector(".container > div > form > div:nth-child(2)");
			delet=document.querySelector(".container > div > form > div:last-child > div:nth-child(2) > button");
			actionBar=document.querySelector(".container > div > form > div:last-child");
			popUpWindow=document.querySelector(".popUpWindow");
						
			let checkAll=function(a,b){
				a.onclick=function(){
					if (a.checked) {
						for (let commodity of commoditys) {
							if(!commodity.firstElementChild.firstElementChild.checked){
								commodity.firstElementChild.firstElementChild.checked=true;
							}
						}
						b.checked=true;
						selected();
					} else{
						for (let commodity of commoditys) {
							if(commodity.firstElementChild.firstElementChild.checked){
								commodity.firstElementChild.firstElementChild.checked=false;
							}
						}
						b.checked=false;
						selected();
					}
				}
			}
			
			let priceNum=function(commodity,num){
				let price=parseInt(commodity.children[2].firstElementChild.innerHTML.replace(/￥/ig,""));
				commodity.children[4].firstElementChild.innerHTML=price;
				commodity.children[3].firstElementChild.children[1].value=parseInt(commodity.children[3].firstElementChild.children[1].value)+num;
				commodity.children[4].firstElementChild.innerHTML=`￥${(price*parseFloat(commodity.children[3].firstElementChild.children[1].value)).toFixed(2)}`;
			}
			
			let selected=function(){
				let count=0;
				for (let commodity of commoditys) {
					if(commodity.firstElementChild.firstElementChild.checked){
						count++;
						if(commodity.children[3].firstElementChild.children[1].value>1){
							count+=(commodity.children[3].firstElementChild.children[1].value-1);
						}
					}
				}
				actionBar.children[3].firstElementChild.firstElementChild.innerHTML=count;
			}
			
			checkAll(checkAlls[0],checkAlls[1]);
			checkAll(checkAlls[1],checkAlls[0]);
			
			commodityDesktop.onclick=function(e){
				for(let commodity of commoditys){
					if(e.target===commodity.firstElementChild.firstElementChild){
						for(let commodity of commoditys){
							if(!commodity.firstElementChild.firstElementChild.checked){
								checkAlls[0].checked=false;
								checkAlls[1].checked=false;
								break;
							}else{
								checkAlls[0].checked=true;
								checkAlls[1].checked=true;
							}
						}
						selected();
					}
					
					if(e.target===commodity.children[3].firstElementChild.lastElementChild){
						priceNum(commodity,1);
						selected();
					}
					
					if(parseInt(commodity.children[3].firstElementChild.children[1].value)>1){
						if (e.target===commodity.children[3].firstElementChild.firstElementChild) {
							priceNum(commodity,-1);
							selected();
						}
					}
					
					if (e.target===commodity.children[3].firstElementChild.children[1]) {
						commodity.children[3].firstElementChild.children[1].value="";
					}
				}
			}
			
			for (let commodity of commoditys) {
				commodity.children[3].firstElementChild.children[1].onblur=function(){
					if(commodity.children[3].firstElementChild.children[1].value=="")
					commodity.children[3].firstElementChild.children[1].value=1;
				}
			}
			
			commodityDesktop.onchange=function(e){
				for (let commodity of commoditys) {
					if(e.target===commodity.children[3].firstElementChild.children[1]){
						let reg = new RegExp(/^[0-9]+$/);
						if(reg.test(commodity.children[3].firstElementChild.children[1].value)&&commodity.children[3].firstElementChild.children[1].value>1){
							let price=parseInt(commodity.children[2].firstElementChild.innerHTML.replace(/￥/ig,""));
							commodity.children[4].firstElementChild.innerHTML=price;
							commodity.children[4].firstElementChild.innerHTML=`￥${(price*parseFloat(commodity.children[3].firstElementChild.children[1].value)).toFixed(2)}`;
						
						}else{
							commodity.children[3].firstElementChild.children[1].value=1;
						}
						selected();
					}
				}
			}
			
			delet.onclick=function(){
				for (let commodity of commoditys) {
					if(commodity.firstElementChild.firstElementChild.checked){
						popUpWindow.style.display="flex";
						break;
					}
				}
			}
			
			popUpWindow.children[1].children[0].onclick=function(){
				for (let commodity of commoditys) {
					if(commodity.firstElementChild.firstElementChild.checked){
						commodity.parentNode.removeChild(commodity);	
					}					
				}
				popUpWindow.style="";
				commoditys=document.querySelectorAll(".container > div > form > div:nth-child(2) > div");
				selected();
			}
			
			popUpWindow.children[1].children[1].onclick=function(){
				popUpWindow.style="";
			}
		}
	})();
})();
