<script setup>
	import { storeToRefs } from 'pinia';
	import { watch } from 'vue';
	import { useRouter } from "vue-router";
	import { useMicrobiomeStore } from '../stores/microbiome';
    import FileLoader from '../components/FileLoader.vue';

	const router = useRouter();
	const store = useMicrobiomeStore();
	const storeRefs = storeToRefs(store);

	function gotoSummary() {
		router.push({
			name: 'summary',
		});
	}
    function onFileChangeThorne(e) {
        var input = e.target;
        store.parseCsv(input.files[0], 'thorne').then(gotoSummary);
    }

	watch(storeRefs.length, (v) => {
		if (v) {
			gotoSummary();
		}
	}, {
		immediate: true,
	});
</script>

<template>
    <div class="bg-white flex flex-1 items-center justify-center" v-if="!store.length">
        <FileLoader @change="onFileChangeThorne">
			<span>Load CSV file.</span>
		</FileLoader>
    </div>
</template>