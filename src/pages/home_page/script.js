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

import cropImage from 'vue-image-crop-upload'

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
	items: '',
	loading: true,
	selectItem: 1,
	dataSelectItem: 1,
	imageUploadWindow: false,
	dataBase_id: null
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
				this.items = response.data.services
				this.dataSelectItem = this.services[this.selectItem - 1]

				for(let item in this.items) {
					let icon = this.items[item].icon
					this.items[item].imgDataUrl = !icon ? false : icon;
					this.items[item].iconNew = false
				}

				this.dataBase_id = response.data.item_id
            }
        });
	},
	setSelectItem (num = 0) {
		this.$log.info('page \'Home Page\' (@/pages/home_page) - method init');
		this.selectItem = num
		this.dataSelectItem = this.services[num - 1]
	},
	/**
	* 	@desc <strong style="color:red; font-size: 18px;">ⓘ</strong> Функция назначения изображения после кропа ([подробнее]}{@link https://github.com/dai-siki/vue-image-crop-upload})
	*	@method cropSuccess
	**/
	cropSuccess(imgDataUrl, field){
		this.$log.info('page \'Home Page\' (@/pages/home_page) - method init');

		this.items[this.selectItem - 1].imgDataUrl = imgDataUrl;
		this.items[this.selectItem - 1].iconNew = 'new';
	},

	saveData () {
		this.$log.info('page \'Settings mail\' (@/pages/settings/mail) - method init');
		var url = !this.step ? this.saveUrl : '/' + this.step + this.saveUrl;

		if(this.access.edit){
			if(this.$refs.form.validate()){
				this.loading = true;

				const data = {data: JSON.stringify(this.items), id: this.dataBase_id}

				return this.axios({
	                method: 'post',
	                url: url,
	                withCredentials: true,
	                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                responseType: 'json',
	                data: this.$root.querystring.stringify(data),
	            }).then((response) => {
	                this.loading = false;

	                if(response.data.status == "ERROR") {
						this.$log.error('page \'Services settings\' (@/pages/services/settings) - AJAX error');
	                    this.$logger('error', 'Произошла ошибка при сохранении изменений услуг на главной странице. Ошибка: ' + response.data.error)
	                	this.$notify.error('Произошла ошибка при сохранении изменений...')
		            	console.log(response.data.error);
	                } else {
						this.$log.debug('page \'Services settings\' (@/pages/services/settings) - AJAX success');
	                    this.$notify.success('Изменения сохранены!');
	                    this.getData();
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

	computed: {
		services (){
			if (!this.items) return false

			let bySort = this.items.slice(0);
			bySort.sort(function(a,b) {
			    return a.sort - b.sort;
			});

			return bySort
		}
	},

	/**
	* This module requires the components:
	*	- [vue-image-crop-upload]{@link https://github.com/dai-siki/vue-image-crop-upload}
	*/
	components: {
		imageCover: cropImage,
	},

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