export default {
	path: '/',
	name: 'layout',
	component: () => import('@/layout/Index.vue'),
	meta: {},
	children: [
		{
			path: '/',
			name: 'homePage',
			component: () => import('@/views/home/Index.vue'),
			meta: {},
			children: []
		},
		{
			path: '/play',
			name: 'playPage',
			component: () => import('@/views/play/Index.vue'),
			meta: {},
			children: []
		},
		{
			path: '/nftMarket',
			name: 'marketPage',
			component: () => import('@/views/market/Index.vue'),
			meta: {},
			children: []
		},
		{
			path: '/miniGames',
			name: 'miniGamesPage',
			component: () => import('@/views/miniGames/Index.vue'),
			meta: {},
			children: []
		}
	]
};
