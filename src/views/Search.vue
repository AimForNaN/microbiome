<script setup>
	import { useMicrobiomeStore } from '../stores/microbiome';

	const store = useMicrobiomeStore();
</script>

<template>
	<article class="bg-white flex flex-1 flex-col gap-8 p-8 rounded-md">
		<input autofocus class="bg-stone-100 px-4 py-2" placeholder="Search" type="text" />
		<!-- <Microbe :data="row" v-for="row in categorized" :key="row"></Microbe> -->
	</article>
</template>