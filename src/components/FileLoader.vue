<script setup>
    const $emit = defineEmits(['change']);
</script>

<template>
    <label class="bg-white border cursor-pointer flex gap-2 items-center justify-center px-4 py-2 ring-cyan-300 rounded-md transition-shadow hover:ring-2">
		<i class="mdi mdi-file-plus"></i>
        <slot></slot>
        <input class="hidden" type="file" @change="$emit('change', $event)">
    </label>
</template>
