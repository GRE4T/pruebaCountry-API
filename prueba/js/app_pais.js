Vue.filter('poner-coma',function(valor){
    
});

const appPais= new Vue({
	el:'#app_pais',
	data:{
		datosPais:[],
		paisesFronterizos:[],
		mode:''
	},
	created(){
		this.getPais();
		this.consultarModo();
	},
	computed:{
		modeDark(){
			if(this.mode){
				return 'active-mode'
			}else{
				return ''
			}
		}
	},
	methods:{
		getPais(){
            let uri = window.location.href.split('?');
            if (uri.length == 2) {
                let vars = uri[1].split('&');
                let getVars = {};
                let tmp = '';
                vars.forEach(function(v){
                    tmp = v.split('=');
                    if (tmp.length == 2) {
                        getVars[tmp[0]] = tmp[1];
                    }
                });
                let itemId = getVars
                this.$http.get('https://restcountries.eu/rest/v2/name/'+itemId.pais )
                .then(res =>{
                    this.datosPais = res.data[0];
                }).then(()=>{
                     let codes= this.datosPais.borders.toString();
                     if(codes!=""){
	                     codes= codes.replaceAll(',',';');
	                     console.log('https://restcountries.eu/rest/v2/alpha?codes='+codes);
	                     this.$http.get('https://restcountries.eu/rest/v2/alpha?codes='+codes)
	                     	.then(res=>{
	                     		this.paisesFronterizos= res.data;
	                     	
	                     	});
                     }

                });
            }			
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