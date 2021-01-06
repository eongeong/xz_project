(function(){
	let elem={};
	
	document.addEventListener("DOMContentLoaded",function(){elem.domLoad()});
	
	window.addEventListener("load",function(){ elem.winLoad() });
	
	(function(){
		let head;
		let right;
		let commodityDesktop;
		let commoditys;
		let pages;
		
		elem.domLoad=function(){
			let vm = new Vue({
				el:"#container",
				data:{
					isLogin:false,
					quitStyle:{},
					uname:"",
					uid:0,
					classSearch:"分类搜索",
					keywork:"",
					productTitle:[],
					menuStyle:{},
					triangleStyle:{},
					searchResultStyle:{},
					headStyle:{},
					products:[],
					productView:[],
					pages:1,
					pageStart:0,
					iid:0,
					gouwuche:{},
					redStyle:{}
				},
				methods:{
					signout(){
						(async ()=>{
							await axios.get("http://127.0.0.1:5050/user/outLogin",{});
							this.isLogin = false;
						 	this.quitStyle = {};
						})();
					},
					avatarClick(){
						this.quitStyle = {
							height : "35px",
							border : "1px solid black"
						}
						setTimeout(function(){
							vm.quitStyle = {};
						},1500);
					},
					searchClick(e){
						this.keywork = e.target.innerHTML;
					},
					classMenu(e){
						this.menuStyle = {
							height:"88px"
						}
						this.triangleStyle = {
							transform:"rotate(180deg)"
						}
					},
					menus(e){
						this.classSearch = e.target.innerHTML;
						this.menuStyle = {}
						this.triangleStyle = {}
					},
					gouwucheClick(e){
						(async ()=>{
							let danjia = parseInt(e.target.parentNode.parentNode.firstElementChild.innerHTML.split("￥")[1]);
							let count = parseInt(e.target.parentNode.children[1].value);
							let lid = e.target.parentNode.parentNode.parentNode.firstElementChild.href.split("=")[1];
							if(e.target.value == "取出商品"){
								e.target.parentNode.children[0].style.display = "";
								e.target.parentNode.children[1].style.display = "";
								e.target.parentNode.children[2].style.display = "";
								if(this.uid){
									await axios.get("http://127.0.0.1:5050/product/quchugouwuche",{
										params:{
											uid:this.uid,
											lid,
											count
										}
									});
								}
							}else{
								e.target.parentNode.children[0].style.display = "none";
								e.target.parentNode.children[1].style.display = "none";
								e.target.parentNode.children[2].style.display = "none";
								if(this.uid){
									await axios.get("http://127.0.0.1:5050/product/jiarugouwuche",{
										params:{
											uid:this.uid,
											lid,
											count
										}
									});
								}
							}
						})();
					},
					chaxungouwuche(){
						(async ()=>{
							this.gouwuche = (await axios.get("http://127.0.0.1:5050/gouwuche/",{
								params:{
									uid:this.uid
								}
							})).data;
						})();
					},
					qingkong(){
						(async ()=>{
							await axios.get("http://127.0.0.1:5050/gouwuche/qingkong",{
								params:{
									uid:this.uid
								}
							})
						})();
					},
					tiaozhuangouwuche(){
						location.assign("cart.html");
					},
					search(){
						open(`products.html?keywork=${this.keywork}`,"_blank");
					}
				},
				watch:{
					totalPrice(){
						if(vm.totalPrice > 0){
							this.redStyle = {
								background:"red"
							}
						}else{
							this.redStyle = {}
						}
					},
					keywork(){
						let keywork = this.keywork.trim();
						keywork = keywork.split(/\s+/ig);
						if(this.keywork){
							(async ()=>{
								let result = (await axios.get("http://127.0.0.1:5050/product/search",{
									params:{
										keywork
									}
								})).data;
								this.productTitle = [];
								for(let key in result){
									for(let k in result[key]){
										this.productTitle[this.productTitle.length] = result[key][k]
									}
								}
								if(this.productTitle.length < 8){
									this.headStyle = {
										padding:`0 0 ${this.productTitle.length*35}px 0`
									}
									this.searchResultStyle = {
										height:`${this.productTitle.length*35}px`
									}
								}else{
									this.searchResultStyle = {
										height:"138px"
									}
									this.headStyle = {
										padding:"0 0 100px 0"
									}
								}
							})();
						}else{
							this.productTitle = [];
							this.headStyle = {}
							this.searchResultStyle = {}
						}
					}
				},
				computed:{
					totalPrice(){
						let result = 0;
						if(this.gouwuche.length){
							for(let pro of this.gouwuche){
								let {count,price} = pro;
								result +=  count * price;
							}							
						}
						return result;
					}
				},
				mounted(){
					(async ()=>{
						this.isLogin = (await axios.get("http://127.0.0.1:5050/user/isLogin",{})).data;
					})();
					(async ()=>{
						let result = (await axios.get("http://127.0.0.1:5050/user/uname",{})).data;
						this.uid = result.uid;
						this.uname = result.uname;
					})();
					(async ()=>{
						let keywork = decodeURIComponent(location.search.split("=")[1]);
						let result = (await axios.get("http://127.0.0.1:5050/product/products",{
							params:{
								keywork
							}
						})).data;
						this.products = result;
						this.pages = Math.ceil(this.products.length/9);
						this.productView = this.products.slice(0,9);
					})();
					
					let commodityDesktop = this.$refs.commodityDesktop;
					let commoditys = this.$refs.commoditys.children;
					let pages = this.$refs.pages.children;
					let totalPrice = this.$refs.totalPrice;
					let inputEmpty=function(commodity,e,val){
						if(e.target===commodity.lastElementChild.lastElementChild.children[1]){
							commodity.lastElementChild.lastElementChild.children[1].value=val;
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
							
							if(e.target == commodity.lastElementChild.lastElementChild.lastElementChild){
								if(e.target.value == "加入购物车"){
									e.target.value = "取出商品";						
								}else if(e.target.value == "取出商品"){
									e.target.value = "加入购物车";
								}
							}
						}
						
						function huifumorenanniu(){
							for(let commodity of  commoditys){
								commodity.lastElementChild.lastElementChild.children[0].style.display = "";
								commodity.lastElementChild.lastElementChild.children[1].style.display = "";
								commodity.lastElementChild.lastElementChild.children[2].style.display = "";
								commodity.lastElementChild.lastElementChild.lastElementChild.value="加入购物车";
							}							
						}
						
						for (let i=1;i<pages.length-1;i++) {
							if(e.target===pages[i]){
								for (let page of pages) {
									page.removeAttribute("data-pageShow");
								}
								pages[i].setAttribute("data-pageShow","");
								vm.pageStart = i-1;
								let n = vm.pageStart*9;
								vm.productView = vm.products.slice(n,n+9);
								huifumorenanniu()
							}
						}
						
						if(e.target===pages[0]){
							if(!(vm.pageStart <= 0)){
								vm.pageStart--;
								let n = vm.pageStart*9;
								vm.productView = vm.products.slice(n,n+9);
								huifumorenanniu()
							}
							for (let i=2;i<pages.length-1;i++) {
								if (pages[i].hasAttribute("data-pageShow")) {
									pages[i].removeAttribute("data-pageShow");
									pages[i-1].setAttribute("data-pageShow","");
									break;
								}
							}
						}
						
						if (e.target===pages[pages.length-1]) {
							if(!(vm.pageStart >= vm.pages-1)){
								vm.pageStart++;
								let n = vm.pageStart*9;
								vm.productView = vm.products.slice(n,n+9);
								huifumorenanniu()
							}
							for (let i=1;i<pages.length-2;i++) {
								if (pages[i].hasAttribute("data-pageShow")) {
									pages[i].removeAttribute("data-pageShow");
									pages[i+1].setAttribute("data-pageShow","");
									break;
								}
							}
						}
					}
				},
				updated(){
					this.chaxungouwuche();
				}
				
			});
			
			head=document.getElementsByClassName("head")[0];
			right=document.querySelector("body .container > div:nth-child(7) > div > div:last-child");
			commodityDesktop=document.querySelector("body .container > div:nth-child(7) > div > form:first-child");
			commoditys=document.querySelectorAll("body .container > div:nth-child(7) > div > form:first-child > div:first-child > div");
			pages=document.querySelectorAll("body .container > div:nth-child(7) .page button");
			
			
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
		
		elem.winLoad = function(){
			pages[1].setAttribute("data-pageShow","");
		}
		
	})();
})();
