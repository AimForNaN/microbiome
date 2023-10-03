<script setup>
	const props = defineProps({
		heading: String,
		value: [Number,String],
	});
</script>

<template>
	<header class="flex items-baseline mt-8 text-6xl">
		<span class="flex-1" v-if="props.heading">{{ props.heading }}</span>
		<span class="font-mono text-2xl" v-if="props.value">{{ props.value }}%</span>
	</header>
</template>