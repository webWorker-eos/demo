export default {
	path: '/',
	name: 'home',
	component: () => import('@/views/home/Index.vue'),
	meta: {},
	children: [
		{
			path: '/demo',
			name: 'demo',
			component: () => import('@/views/home/Index.vue'),
			meta: {}
		}
	]
};
