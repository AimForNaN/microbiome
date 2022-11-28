<script setup>
    const $emit = defineEmits(['change']);
</script>

<template>
    <label class="file">
        <slot>
            <span>Load full microbiome community file.</span>
            <i class="mdi mdi-file-plus"></i>
        </slot>
        <input type="file" @change="$emit('change', $event)">
    </label>
</template>

<style lang="less">
    .file {
        @apply border border-gray-300 cursor-pointer px-3 py-2 rounded space-x-2 transition hover:ring-2;

        input {
            @apply hidden;
        }
    }
</style>
