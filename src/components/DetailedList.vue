<script setup>
	import ListHeader from "./ListHeader.vue";
	import Row from '../lib/row';

	const props = defineProps({
		data: {
			type: Row,
		},
	});
</script>

<template>
	<article class="flex flex-col gap-4">
		<slot name="header">
			<ListHeader :heading="props.data.Name" :value="props.data.Abundance" v-if="props.data"></ListHeader>
		</slot>
		<div class="gap-4 grid grid-cols-3">
			<slot />
		</div>
	</article>
</template>