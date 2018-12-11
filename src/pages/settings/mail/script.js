/**
* @vuedoc
* @module pages/settings/mail
* @see @/pages/settings/mail
*
* @version 1.0
* @desc Страница настроек почты
*
* @author Pavel Uhrynovych (Lauer)
* @copyright 2018©lauer.agency
*/

const data = {
	/**
	* @typedef {Object} Data
	*
	*/
	urlGetInputs: '/settings/mail/',
	inputs: null,
	loading: true,
	access: {
		edit: false
	}
}

const methods = {
	getSettings (lng = false){
		this.$log.info('page \'Settings mail\' (@/pages/settings/mail) - method init');
		var url = !lng ? this.urlGetInputs : '/' + lng + this.urlGetInputs;
		
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
				this.$log.error('page \'Settings mail\' (@/pages/settings/mail) - AJAX error (GET)');
                this.$logger('error', 'Произошла ошибка при загрузке настроек услуги. Ошибка: ' + response.data.error)
            	this.$notify.error('Произошла ошибка при загрузке основных настроек...')
            }
            else {
				this.$log.debug('page \'Settings mail\' (@/pages/settings/mail) - AJAX success');

				this.inputs = response.data.inputs
            }
        });
	},
	saveSettings (lng = false) {
		this.$log.info('page \'Settings mail\' (@/pages/settings/mail) - method init');

		if(this.access.edit){
			if(this.$refs.form.validate()){
				this.loading = true;

				const data = this.inputs

				return this.axios({
	                method: 'post',
	                url: this.urlGetInputs + 'save/',
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.loading = false;

	                if(response.data.status == "ERROR") {
						this.$log.error('page \'Services settings\' (@/pages/services/settings) - AJAX error');
	                    this.$logger('error', 'Произошла ошибка при сохранении настроек услуги. Ошибка: ' + response.data.error)
	                	this.$notify.error('Произошла ошибка при сохранении основных настроек...')
		            	console.log(response.data.error);
	                } else {
						this.$log.debug('page \'Services settings\' (@/pages/services/settings) - AJAX success');
	                    this.$notify.success('Настройки сохранены!');
	                    this.getSettings();
	 				}
	            });

			} else {
				this.$store.commit('error', {error: 'Исправьте все ошибки в форме'});
			}
		}
	}
}


/** Export component */
export default {
	// Data
	data: function(){ return data },

	// Method
	methods: methods,

	// Head
	metaInfo: {
		title: 'Админ панель - Настройки почтовых оповищений'
	},

	/**
	* @desc ▶ Hook reporting
	* @event module:pages/settings/mail~Page <strong>Settings mail</strong> mounted
	*/
	mounted(){
		this.$log.info('page \'Settings mail\' (@/pages/settings/mail) - mounted hook init');
		this.access.edit  = this.$access('edit', true);
		this.getSettings();
	},
}