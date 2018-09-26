import titles from '@/static/translate/titles'
import dictionary from '@/static/translate/dictionary'


export default {
	// ---------------------
	// ADMIN PANEL
	// ---------------------
	logo: {
		// Ссылка на лого
		src: '/_admin/themes/default/images/logo.png',
		// Альт лого
		alt: 'Lauer.agency admin cms'
	},
	// Заголовки страниц
    titles: titles,
	// ---------------------
	// LANGUAGES
	// ---------------------
	language: {
		// Язык по умолчанию
		default: 'ru',
		// Статус мультиязычности приложения
		multilang: false,
		// Массив используемых языков в админ панеле
		lng: [
			{
				name: 'English',
				code: 'en',
				status: true
			},
			{
				name: 'Русский',
				code: 'ru',
				status: true
			},
			{
				name: 'Українська',
				code: 'ua',
				status: true
			},
			{
				name: 'Deutsch',
				code: 'de',
				status: false
			}
		],
		
	},
	// Параметры языка на основном сайте
	site_language: {
		// Язык по умолчанию
		default: 'ru',
		// Статус мультиязычности основного сайта
		siteML: true,
	},
	dictionary: dictionary,
	// ---------------------
	// DEVELOPER
	// ---------------------
	developer: {
		// Лог всех событий в консоли
		logStatus: true,
		// Ссылка для отправки событий в лог на сервер
		logWriteLink: '/admin_logger/write'
	}
}

console.log('%c   LAUER.AGENCY   ',
			'background: #293f44; color: #fff; font-weight: bold; line-height: 32px; font-size: 20.5px;',);
console.log('%c  dev. Paul Uhrynovych (Lauer) ',
			'background: #293f44; color: #fff; line-height: 24px;');