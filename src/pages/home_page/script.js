/**
* @vuedoc
* @module pages/home_page
* @see @/pages/home_page
*
* @version 1.0
* @desc Главная страница сайта
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	*
	*/
	access: {
		edit: false
	},
	getUrl: '/home/',
	saveUrl: '/home/save/',
	step: 'ru',
	services: '',
	loading: true,
}

const methods = {
	getData (lng = false){
		this.$log.info('page \'Home Page\' (@/pages/home_page) - method init');
		var url = !lng ? this.getUrl : '/' + lng + this.getUrl;
		
		return this.axios({
            method: 'get',
            url: url,
            withCredentials: true,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            responseType: 'json',
            data: '',
        }).then((response) => {
            this.loading = false;

            if(response.data.status == "ERROR") {
				this.$log.error('page \'Home Page\' (@/pages/home_page) - AJAX error (GET)');
                this.$logger('error', 'Произошла ошибка при загрузке настроек услуги. Ошибка: ' + response.data.error)
            	this.$notify.error('Произошла ошибка при загрузке основных настроек...')
            }
            else {
				this.$log.debug('page \'Home Page\' (@/pages/home_page) - AJAX success');

				this.services = response.data.services
				console.log(this.services);
            }
        });
	},
}


/** Export component */
export default {
	// Data
	data: function(){ return data },

	// Method
	methods: methods,

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/home_page~Page <strong>Home Page</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Home Page\' (@/pages/home_page) - mounted hook init');
		this.access.edit  = this.$access('edit', true);
		this.getData(this.step);
	}
}