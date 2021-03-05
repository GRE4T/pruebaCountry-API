
const app= new Vue({
	el:'#app',
	data:{
		buscar:'',
		buscarRegion:'',
		paises:[],
		paisesFilter:[],
		mode:''
	},
	created(){
		this.getPaises();
		this.consultarModo();
		
	},
	computed:{
		filtrarPais(){
			if(this.buscar !="" && this.buscarRegion !=""){
				return this.paises.filter((filtro)=>{
					return filtro.name.toUpperCase().match(this.buscar.toUpperCase()) && filtro.region.toUpperCase().match(this.buscarRegion.toUpperCase());
				});		
			}else if(this.buscarRegion !=""){
				return this.paises.filter((filtro)=>{
					return filtro.region.toUpperCase().match(this.buscarRegion.toUpperCase());
				});	
			}
			else if(this.buscarRegion ==""){
				return this.paises.filter((filtro)=>{
					return filtro.name.toUpperCase().match(this.buscar.toUpperCase());
				});				
			}
		},
		modeDark(){
			if(this.mode){
				return 'active-mode'
			}else{
				return ''
			}
		}
	},
	methods:{
		getPaises(){
			this.$http.get('https://restcountries.eu/rest/v2/all').then(res=>{
				this.paises=res.data;
				this.paisesFilter=res.data;
			});
		},
		consultarModo(){
			var modeLocal= localStorage.getItem('mode');
			if(modeLocal != undefined && modeLocal != ''){
				if(modeLocal == 'true'){
					document.querySelector('#modeBody').classList.add('bg-section-dark');
					document.querySelector('#modeBody').classList.add('text-white');	
					this.mode=true;
				}
			}
			
		},
		modo(){
			localStorage.setItem('mode',this.mode);
			if(this.mode){
				document.querySelector('#modeBody').classList.add('bg-section-dark');
				document.querySelector('#modeBody').classList.add('text-white');			
			}else{
				document.querySelector('#modeBody').classList.remove('bg-section-dark');
				document.querySelector('#modeBody').classList.remove('text-white');	
			}
			
		}
	}
});