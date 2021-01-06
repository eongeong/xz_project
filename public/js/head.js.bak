(function(){
	let searchClass;
	let classMenu;
	let menus;
	let triangle;
	let rightHead;
	let register_login;
	let avatar;
	let quit;
document.addEventListener("DOMContentLoaded",function(){
	searchClass = document.querySelector(".search>div>div");
	classMenu = document.querySelector(".search>div>div>div");
	menus = document.querySelectorAll(".search>div>div>div>p");
	triangle = document.querySelector(".search>div>div>span>img");
	rightHead = document.querySelector(".rightHead");
	register_login = document.querySelectorAll(".rightHead>div:nth-child(4),.rightHead>div:nth-child(5)");
	avatar = document.querySelector(".rightHead>div:nth-child(6)");
	
	let vm = new Vue({
		el:".head",
		data:{
			isLogin:false,
			quitStyle:{},
			uname:"",
			classSearch:"分类搜索",
			keywork:"",
			productTitle:[],
			menuStyle:{},
			triangleStyle:{},
			searchResultStyle:{},
			headStyle:{},
			url:""
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
			search(){
				open(`products.html?keywork=${this.keywork}`,"_blank");
			}
		},
		watch:{
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
		mounted(){
			(async ()=>{
				this.isLogin = (await axios.get("http://127.0.0.1:5050/user/isLogin",{})).data;
			})();
			(async ()=>{
				this.uname = (await axios.get("http://127.0.0.1:5050/user/uname",{})).data;
			})();
		}
	});
});
/*window.addEventListener("load",function(){
	searchClass.addEventListener("click",function(e){
		if(!triangle.hasAttribute("style")){
			classMenu.style.height = (menus.length)*22+"px";
			triangle.style.transform = "rotate(180deg)";
		}else{
			if(e.target.nodeName === "P"){
				let searchTitle = searchClass.querySelector(".search>div>div>span>p");
			 	searchTitle.innerHTML = e.target.innerHTML;
			 }
			classMenu.removeAttribute("style");
			triangle.removeAttribute("style");
		}		
	});
});*/
})();