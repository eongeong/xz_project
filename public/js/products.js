(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	(function(){
		let head;
		let right;
		let commodityDesktop;
		let commoditys;
		let pages;
		
		elem.domLoad=function(){
			head=document.getElementsByClassName("head")[0];
			right=document.querySelector("body .container > div:nth-child(7) > div > div:last-child");
			commodityDesktop=document.querySelector("body .container > div:nth-child(7) > div > form:first-child");
			commoditys=document.querySelectorAll("body .container > div:nth-child(7) > div > form:first-child > div:first-child > div");
			pages=document.querySelectorAll("body .container > div:nth-child(7) .page button");
			
			let inputEmpty=function(commodity,e,val){
				if(e.target===commodity.lastElementChild.lastElementChild.children[1]){
					commodity.lastElementChild.lastElementChild.children[1].value=val;
				}
			}
			
			window.onscroll=function(){
				scorllTop=document.body.scorllTop||document.documentElement.scrollTop;
				
				if(scorllTop>50){
					head.classList.add("headFixedTop");
				}else{
					head.className=head.className.replace(/headFixedTop/,"");
				}
				
				if(scorllTop>380){
					right.firstElementChild.setAttribute("data-a","");
					right.lastElementChild.setAttribute("data-a","");
					right.lastElementChild.setAttribute("data-b","");
				}else{
					right.firstElementChild.removeAttribute("data-a");
					right.lastElementChild.removeAttribute("data-a");
					right.lastElementChild.removeAttribute("data-b");
				}
			}
			
			commodityDesktop.onclick=function(e){
				for (let commodity of commoditys) {
					if(e.target===commodity.lastElementChild.lastElementChild.children[2]){
						commodity.lastElementChild.lastElementChild.children[1].value=parseInt(commodity.lastElementChild.lastElementChild.children[1].value)+1;
					}
					
					
					if(commodity.lastElementChild.lastElementChild.children[1].value>1){
						if(e.target===commodity.lastElementChild.lastElementChild.children[0]){
								commodity.lastElementChild.lastElementChild.children[1].value=parseInt(commodity.lastElementChild.lastElementChild.children[1].value)-1;							
						}
					}
					
					inputEmpty(commodity,e,"");
					
				}
				
				for (let i=1;i<pages.length-1;i++) {
					if(e.target===pages[i]){
						for (let page of pages) {
							page.removeAttribute("data-pageShow");
						}
						pages[i].setAttribute("data-pageShow","");
					}
				}
				
				if(e.target===pages[0]){
					for (let i=2;i<pages.length-1;i++) {
						if (pages[i].hasAttribute("data-pageShow")) {
							pages[i].removeAttribute("data-pageShow");
							pages[i-1].setAttribute("data-pageShow","");
							break;
						}
					}
				}
				
				if (e.target===pages[pages.length-1]) {
					for (let i=1;i<pages.length-2;i++) {
						if (pages[i].hasAttribute("data-pageShow")) {
							pages[i].removeAttribute("data-pageShow");
							pages[i+1].setAttribute("data-pageShow","");
							break;
						}
					}
				}
				
			}
			
			for (let commodity of commoditys) {
				commodity.lastElementChild.lastElementChild.children[1].onblur=function(e){
					if (commodity.lastElementChild.lastElementChild.children[1].value=="") {
						inputEmpty(commodity,e,1);						
					}
				}
			}
			
			commodityDesktop.onchange=function(e){
				for (let commodity of commoditys) {
					if(e.target===commodity.lastElementChild.lastElementChild.children[1]){
						let reg=new RegExp(/^[0-9]+$/);
						if (!reg.test(commodity.lastElementChild.lastElementChild.children[1].value)||(parseInt(commodity.lastElementChild.lastElementChild.children[1].value))<1) {
							commodity.lastElementChild.lastElementChild.children[1].value=1;
						}
					}
				}
			}
			
			
			
			
		}
		
	})();
})();
