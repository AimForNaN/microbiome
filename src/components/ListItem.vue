<script setup>
	import Row from '../lib/row';

	const props = defineProps({
		data: {
			type: Row,
			default() {
				return {};
			},
		},
	});
</script>

<template>
	<div class="bg-stone-50 gap-2 grid grid-cols-3 items-baseline p-4 rounded-md transition-colors hover:bg-stone-100">
		<span class="col-span-2 text-stone-500 text-xs">Name</span>
		<span class="text-right text-stone-500 text-xs">Abundance</span>
		<b class="col-span-2 flex-1">{{ props.data.Name }}</b>
		<span class="font-mono text-right">{{ props.data.Abundance }}%</span>
	</div>
</template>