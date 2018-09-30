(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	(function(){
		let productModels;
		let buyArea;
		
		elem.domLoad=function(){
			productModels=document.querySelectorAll(".container > div > div:nth-child(2) > form:last-child > div:nth-child(5) > div:nth-child(2) > a");
			buyArea=document.querySelector(".container > div > div:nth-child(2) > form:last-child");
			
			buyArea.onclick=function(e){
				for (let productModel of productModels) {
					if(e.target===productModel){
						for (let productModel of productModels) {
							productModel.removeAttribute("data-focus");
						}
						productModel.setAttribute("data-focus","");
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
				
				
				
			}
		}
	})();
})();
