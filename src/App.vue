<script setup>
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useMicrobiomeStore } from './stores/microbiome';

	const isHome = computed(() => route.name == 'welcome');
	const isSearch = computed(() => route.name == 'search');
	const store = useMicrobiomeStore();
	const route = useRoute();
</script>

<template>
	<header class="flex gap-8 px-8">
		<nav class="flex items-center">
			<a class="font-bold uppercase" href="/">Aim for NaN</a>
		</nav>
		<input class="bg-stone-200 cursor-pointer flex-1 px-4 py-2 rounded-md text-left transition-colors hover:bg-opacity-70" placeholder="Search" type="text" />
		<button class="bg-transparent mdi mdi-close-thick" @click="store.clear" v-show="isSearch"></button>
	</header>
	<RouterView></RouterView>
</template>
