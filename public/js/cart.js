(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	(function(){
		let checkAlls = [];
		let commoditys = [];
		let commodityDesktop;
		let delet;
		let popUpWindow;
		let actionBar;
		
		elem.domLoad=function(){
			let vm = new Vue({
				el:".container",
				data:{
					uid:0,
					gouwuche:{}
				},
				mounted(){
					(async ()=>{
						this.uid = (await axios.get("http://127.0.0.1:5050/user/uname",{})).data.uid;
						let result = (await axios.get("http://127.0.0.1:5050/gouwuche/getgouwuche",{
							params:{
								uid:this.uid
							}
						})).data;
						this.gouwuche = result;
					})();
				}
			});
			
			checkAlls[0] = vm.$refs.checkAll_0;
			checkAlls[1] = vm.$refs.checkAll_1;
			commoditys=vm.$refs.commodityDesktop.children;
			commodityDesktop=vm.$refs.commodityDesktop;
			delet=vm.$refs.delet;
			actionBar=vm.$refs.actionBar;
			popUpWindow=vm.$refs.popUpWindow;
						
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
						(async ()=>{
							priceNum(commodity,1);
							selected();
							let count = e.target.previousElementSibling.value;
							let lid = e.target.parentNode.parentNode.parentNode.children[1].firstElementChild.innerHTML;
							await axios.get("http://127.0.0.1:5050/gouwuche/updateGouwuche",{
								params:{
									count,
									lid,
									uid:vm.uid
								}
							});
						})();
					}
					
					if(parseInt(commodity.children[3].firstElementChild.children[1].value)>1){
						if (e.target===commodity.children[3].firstElementChild.firstElementChild) {
							(async ()=>{
								priceNum(commodity,-1);
								selected();
								let count = e.target.nextElementSibling.value;
								let lid = e.target.parentNode.parentNode.parentNode.children[1].firstElementChild.innerHTML;
								await axios.get("http://127.0.0.1:5050/gouwuche/updateGouwuche",{
									params:{
										count,
										lid,
										uid:vm.uid
									}
								});
							})();
						}
					}
				}
			}
			
			for (let commodity of commoditys) {
				commodity.children[3].firstElementChild.children[1].onblur=function(){
					if(commodity.children[3].firstElementChild.children[1].value=="")
					commodity.children[3].firstElementChild.children[1].value=1;
				}
			}
			
			commodityDesktop.oninput=function(e){
				for (let commodity of commoditys) {
					if(e.target===commodity.children[3].firstElementChild.children[1]){
						let reg = new RegExp(/^[0-9]+$/);
						if(reg.test(commodity.children[3].firstElementChild.children[1].value) && e.target.value){
							(async ()=>{
								let count = e.target.value;
								let lid = e.target.parentNode.parentNode.parentNode.children[1].firstElementChild.innerHTML;
								await axios.get("http://127.0.0.1:5050/gouwuche/updateGouwuche",{
									params:{
										count,
										lid,
										uid:vm.uid
									}
								});
							})();
						}else{
							(async ()=>{
								let count = 1;
								let lid = e.target.parentNode.parentNode.parentNode.children[1].firstElementChild.innerHTML;
								await axios.get("http://127.0.0.1:5050/gouwuche/updateGouwuche",{
									params:{
										count,
										lid,
										uid:vm.uid
									}
								});
								vm.uid = (await axios.get("http://127.0.0.1:5050/user/uname",{})).data.uid;
								let result = (await axios.get("http://127.0.0.1:5050/gouwuche/getgouwuche",{
									params:{
										uid:vm.uid
									}
								})).data;
								vm.gouwuche = result;
							})();
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
						(async ()=>{
							let lid = commodity.children[1].firstElementChild.innerHTML;
							let count = commodity.children[3].firstElementChild.children[1].value;
							if(vm.uid){
								await axios.get("http://127.0.0.1:5050/product/quchugouwuche",{
									params:{
										uid:vm.uid,
										lid,
										count
									}
								});
								location.reload();
							}
						})();
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
