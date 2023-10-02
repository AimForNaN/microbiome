import { createRouter, createWebHistory } from 'vue-router';
import Search from '../views/Search.vue';
import Summary from '../views/Summary.vue';
import Welcome from '../views/Welcome.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'welcome',
			path: '/',
			component: Welcome,
			meta: {
				include: false,
			},
		},
		{
			name: 'search',
			path: '/search',
			component: Search,
			meta: {
				include: false,
			},
		},
		{
			name: 'summary',
			path: '/summary',
			component: Summary,
			meta: {
				include: true,
				label: 'Summary',
			},
		},
	],
});