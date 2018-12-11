export default {
	admin: [
		{ 
			title: 'Статистика',
			icon: 'mdi-view-dashboard',
			color: "grey darken-2",
			link: 'home',
			parent: false,
		},
		{ 
			title: 'Главная страница',
			icon: 'mdi-home',
			color: "grey darken-2",
			link: 'home_page',
			parent: false,
		},
		{
			title: 'Продукция',
			icon: 'mdi-pier-crane',
			color: "blue darken-2",
			link: 'products',
			parent: true,
			children: [
				{
					title: 'Категории',
					icon: 'mdi-archive',
					color: "grey",
					link: 'productsCategories'
				},
				{
					title: 'Публикации',
					icon: 'mdi-note-text',
					color: "grey",
					link: 'productsArticles'
				},
				{
					title: 'Инфо-блок',
					icon: 'mdi-information-variant',
					color: "grey",
					link: 'productsInfo'
				},
				{
					title: 'Promo',
					icon: 'mdi-chess-queen',
					color: "dark-grey",
					link: 'productsPromo'
				},
				{
					title: 'SEO',
					icon: 'mdi-search-web',
					color: "grey",
					link: 'productsSeo'
				},
				{
					title: 'Настройки',
					icon: 'mdi-tune-vertical',
					color: "grey",
					link: 'productsSettings'
				}
			]
		},
		{
			title: 'Услуги',
			icon: 'mdi-wrench',
			color: "blue darken-2",
			parent: true,
			children: [
				{
					title: 'Cписок услуг',
					icon: 'mdi-format-list-bulleted',
					color: "grey",
					link: 'servicesList'
				},
				{
					title: 'SEO',
					icon: 'mdi-search-web',
					color: "grey",
					link: 'servicesSeo'
				},
				{
					title: 'Настройки',
					icon: 'mdi-tune-vertical',
					color: "grey",
					link: 'servicesSettings'
				}
			]
		},
		{
			title: 'Карьера',
			icon: 'mdi-wallet-travel',
			color: "blue darken-2",
			parent: true,
			children: [
				{
					title: 'Вакансии',
					icon: 'mdi-account-card-details',
					color: "grey",
					link: 'vacancyList'
				},
				{
					title: 'Инфо-блок',
					icon: 'mdi-information-variant',
					color: "grey",
					link: 'vacancyInfo'
				},
				{
					title: 'SEO',
					icon: 'mdi-search-web',
					color: "grey",
					link: 'vacancySeo'
				},
				{
					title: 'Настройки',
					icon: 'mdi-tune-vertical',
					color: "grey",
					link: 'vacancySettings'
				}
			]
		},
		{
			title: 'Пользователи',
			icon: 'mdi-account-multiple',
			color: "grey darken-2",
			link: 'users',
			parent: false,
		},
		{
			title: 'Настройки',
			icon: 'mdi-settings',
			color: "grey darken-2",
			parent: true,
			children: [
				{
					title: 'Контакты',
					icon: 'mdi-contact-mail',
					color: "grey",
					link: 'settingsPrimary'
				},
				{
					title: 'Почта',
					icon: 'mdi-mail-ru',
					color: "grey",
					link: 'settingsMail'
				}
			]
		}
	],
	moderator: [
			{
				title: 'Продукция',
				icon: 'mdi-pier-crane',
				color: "blue darken-2",
				link: 'products',
				parent: true,
				children: [
					{
						title: 'Публикации',
						icon: 'mdi-note-text',
						color: "grey",
						link: 'productsArticles'
					}
				]
			},
			{
				title: 'Клиенты',
				icon: 'mdi-account-multiple',
				color: "grey darken-2",
				link: 'users',
				parent: false,
			}
	],
	seo: [
			{ 
				title: 'Статистика',
				icon: 'mdi-view-dashboard',
				color: "grey darken-2",
				link: 'home',
				parent: false,
			},
			{
				title: 'Блог',
				icon: 'mdi-pier-crane',
				color: "blue darken-2",
				link: 'products',
				parent: true,
				children: [
					{
						title: 'Категории',
						icon: 'mdi-archive',
						color: "grey",
						link: 'productsCategories'
					},
					{
						title: 'Публикации',
						icon: 'mdi-note-text',
						color: "grey",
						link: 'productsArticles'
					},
					{
						title: 'SEO',
						icon: 'mdi-search-web',
						color: "grey",
						link: 'productsSeo'
					}
				]
			}
	],
	manager: [
			{
				title: 'Клиенты',
				icon: 'mdi-account-multiple',
				color: "grey darken-2",
				link: 'users',
				parent: false,
			}
		]
}