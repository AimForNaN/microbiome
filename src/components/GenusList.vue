<script setup>
	import Row from '../lib/row';

	const props = defineProps({
		data: {
			type: Row,
		},
	});
</script>

<template>
	<article class="flex flex-col gap-4">
		<header class="flex items-baseline mt-8 text-6xl" v-if="props.data">
			<span class="flex-1">{{ props.data.Name }}</span>
			<span class="font-mono text-2xl">{{ props.data.Abundance }}%</span>
		</header>
		<slot />
	</article>
</template>