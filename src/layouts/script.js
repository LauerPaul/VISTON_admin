export default {
	data() {
		return {
			locationClass: this.$route.name,
			auth: this.$store.state.Auth.auth
		}
	},

  beforeCreate: function(){
		this.$log.info('Layout \'index\' (@/layouts/index) - beforeCreate hook init');
  },

	created () {
		this.$log.info('Layout \'index\' (@/layouts/index) - created hook init');
     
        this.$Progress.start()
	},

	mounted: function(){
		this.$log.info('Layout \'index\' (@/layouts/index) - mounted hook init');
        
        this.$Progress.finish()
	},
	
	beforeUpdate() {
		this.$log.info('Layout \'index\' (@/layouts/index) - beforeUpdate hook init');
        
        this.$Progress.start()
	},

	updated(){
		this.$log.info('Layout \'index\' (@/layouts/index) - updated hook init');
        
        this.$Progress.finish()
	},

	watch: {
    	'$route' (to, from) {
    		this.locationClass = this.$route.name;
      	},
      	'$store.state.Auth.auth': function (v) {
      		if(this.$store.state.Auth.auth) this.$router.push({name: 'home', params: { lang: this.$store.state.Site.urlPrefix }});
      		else this.$router.push({name: 'login', params: { lang: this.$store.state.Site.urlPrefix }});
      		this.auth = this.$store.state.Auth.auth
      	},
    }
}

