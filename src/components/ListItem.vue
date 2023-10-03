<script setup>
	import Row from '../lib/row';

	const props = defineProps({
		compact: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Row,
			default() {
				return {};
			},
		},
	});
</script>

<template>
	<div class="flex gap-2 items-baseline" :class="{ 'bg-stone-50 p-4 rounded-md transition-colors hover:bg-stone-100': !props.compact }">
		<div class="flex flex-1 flex-col gap-2">
			<span class="col-span-2 text-stone-500 text-xs" v-if="!props.compact">Name</span>
			<b class="col-span-2 flex-1">{{ props.data.Name }}</b>
		</div>
		<div class="flex flex-1 flex-col gap-2">
			<span class="text-right text-stone-500 text-xs" v-if="!props.compact">Abundance</span>
			<span class="font-mono text-right">{{ props.data.Abundance }}%</span>
		</div>
	</div>
</template>