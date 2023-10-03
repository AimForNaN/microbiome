<script setup>
	import { useMicrobiomeStore } from '../stores/microbiome';
	import CompactList from '../components/CompactList.vue';
	import DetailedList from "../components/DetailedList.vue";
	import ListHeader from '../components/ListHeader.vue';
	import ListItem from '../components/ListItem.vue';

	const store = useMicrobiomeStore();
</script>

<template>
	<article class="bg-white flex flex-1 gap-8 p-8 rounded-md">
		<aside class="flex flex-col gap-4">
			<CompactList>
				<ListItem compact :data="row" v-for="row in store.Domain"></ListItem>
			</CompactList>
			<CompactList>
				<ListItem compact :data="store.Akkermansia"></ListItem>
				<ListItem compact :data="store.Alistipes"></ListItem>
				<ListItem compact :data="store.Bifidobacterium"></ListItem>
				<ListItem compact :data="store.Enterococcus"></ListItem>
				<ListItem compact :data="store.Escherichia"></ListItem>
				<ListItem compact :data="store.Faecalibacterium"></ListItem>
				<ListItem compact :data="store.Klebsiella"></ListItem>
				<ListItem compact :data="store.Lactobacillus"></ListItem>
				<ListItem compact :data="store.Methanobacteria"></ListItem>
				<ListItem compact :data="store.Parabacteroides"></ListItem>
				<ListItem compact :data="store.Prevotella"></ListItem>
				<ListItem compact :data="store.Staphylococcus"></ListItem>
				<ListItem compact :data="store.Fungi"></ListItem>
			</CompactList>
		</aside>
		<section class="flex flex-1 flex-col gap-8">
			<DetailedList>
				<template #header>
					<ListHeader heading="Predisposition"></ListHeader>
				</template>
			</DetailedList>
			<DetailedList :data="store.Actinobacteria">
				<ListItem :data="row" v-for="row in store.ActinobacteriaGenus"></ListItem>
			</DetailedList>
			<DetailedList :data="store.Bacteroidetes">
				<ListItem :data="row" v-for="row in store.BacteroidetesGenus"></ListItem>
			</DetailedList>
			<DetailedList :data="store.Firmicutes">
				<ListItem :data="row" v-for="row in store.FirmicutesGenus"></ListItem>
			</DetailedList>
		</section>
	</article>
</template>