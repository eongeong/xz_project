(function(){
	let elem={};
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	(function(){
		let managementBar;
		let managementButtons;
		let commoditys;
		let collectDesk;
		let popUpWindw;
		
		elem.domLoad=function(){
			let vm = new Vue({
				el:".container",
				data:{
					uid:0,
					collects:{}
				},
				methods:{
					
				},
				mounted(){
					(async ()=>{
						this.uid = (await axios.get("http://127.0.0.1:5050/user/uname",{})).data.uid;
						this.collects = (await axios.get("http://127.0.0.1:5050/product/getcollect",{
							params:{
								uid:this.uid
							}
						})).data;
					})();
				}
			});
			
			managementBar=vm.$refs.managementBar;
			managementButtons=managementBar.children;
			commoditys=vm.$refs.commoditys.children;
			collectDesk=vm.$refs.commoditys;
			popUpWindw=document.getElementsByClassName("popUpWindow")[0];
			
			window.onscroll=function(){
				scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
				if(scrollTop>=200){
					managementBar.classList.add("managementBarfixed");					
				}else{
					managementBar.className = managementBar.className.replace(/managementBarfixed/ig,"");
				}
			}
			
			collectDesk.onclick = function(e){
				for(let pro of collectDesk.children){
					if(e.target == pro.firstElementChild){
						if(pro.firstElementChild.firstElementChild.checked){
							pro.firstElementChild.firstElementChild.checked = false;
							
						}else{
							pro.firstElementChild.firstElementChild.checked = true;							
						}
					}
				}
			}
			
			for (let commodity of commoditys) {
				commodity.firstElementChild.firstElementChild.onclick=function(e){
					e.stopPropagation();
				}
				commodity.firstElementChild.onclick=function(){
					if (!this.firstElementChild.checked) {
						this.firstElementChild.checked=true;
					} else{
						this.firstElementChild.checked=false;
					}
					
					for (let commodity of commoditys) {
						if(!commodity.firstElementChild.firstElementChild.checked){
							managementButtons[1].innerHTML="全选";
							managementButtons[1].style="";
							break;
						}else{
							managementButtons[1].innerHTML="取消全选";
							managementButtons[1].style.backgroundColor="red";
						}
					}
				}
			}
			
			managementBar.onclick=function(e){
				if(e.target.innerHTML==="管理收藏夹"){
					if (e.target.style!=="") {
						e.target.style.backgroundColor="red";
						for (let i=1;i<managementButtons.length;i++) {
							managementButtons[i].classList.add("show");
						}
						for (let commodity of commoditys) {
							commodity.firstElementChild.style.display="block";
						}
					}
					e.target.innerHTML="完成管理";
				}else if(e.target.innerHTML==="完成管理"){
					e.target.style="";
					e.target.innerHTML="管理收藏夹";
					
					for (let i=1;i<managementButtons.length;i++) {
						managementButtons[i].className="";
						managementButtons[i].classList.add("unshow");						
					}
					
					for (let commodity of commoditys) {
						commodity.firstElementChild.style="";
					}
				}
				
				
				if (e.target.innerHTML==="全选") {
					for (let commodity of commoditys) {
						if(!commodity.firstElementChild.firstElementChild.checked){
							commodity.firstElementChild.firstElementChild.checked=true;
						}
					}
					e.target.innerHTML="取消全选";
					e.target.style.backgroundColor="red";
				}else if(e.target.innerHTML==="取消全选"){
					for (let commodity of commoditys) {
						if(commodity.firstElementChild.firstElementChild.checked){
							commodity.firstElementChild.firstElementChild.checked=false;
						}
					}
					
					e.target.innerHTML="全选";
					e.target.removeAttribute("style");
				}
				if (e.target.innerHTML==="删除"){
					commoditys=document.querySelectorAll(".container > div > form:nth-child(3) > div:last-child > div");										
					
					for(let commodity of commoditys){
						if(commodity.firstElementChild.firstElementChild.checked){
							popUpWindw.style.display="flex";
						}
					}
					
					popUpWindw.lastElementChild.firstElementChild.onclick=function(){
						for(let commodity of commoditys){
							if(commodity.firstElementChild.firstElementChild.checked){
								if(vm.uid){
									(async ()=>{
										let uid = vm.uid;
										let lid = commodity.children[1].href.split("=")[1];
										await axios.get("http://127.0.0.1:5050/product/deletecollect",{
											params:{
												uid,
												lid
											}
										});
										location.reload();
									})();
								}
								
								popUpWindw.style="";
								managementButtons[1].innerHTML="全选";
								managementButtons[1].style="";					
							}
						}
					}
					
					popUpWindw.lastElementChild.lastElementChild.onclick=function(){
						popUpWindw.style="";
					}
					
				}
				
				if(e.target.innerHTML == "加入购物车"){
					for(let pro of collectDesk.children){
						if(pro.firstElementChild.firstElementChild.checked){
							(async ()=>{
								if(vm.uid){
									let lid = pro.children[1].href.split("=")[1];
									await axios.get("http://127.0.0.1:5050/product/jiarugouwuche",{
										params:{
											uid:vm.uid,
											lid,
											count:1
										}
									});
									pro.firstElementChild.firstElementChild.checked = false;
								}
							})();
						}
					}
					alert("已加入购物车！");
				}
								
			}
			
		}
	})();
})();
