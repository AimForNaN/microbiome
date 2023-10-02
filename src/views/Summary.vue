<script setup>
	import { useMicrobiomeStore } from '../stores/microbiome';
	import GenusList from "../components/GenusList.vue";
	import List from '../components/List.vue';
	import ListItem from '../components/ListItem.vue';
	import Microbe from "../components/Microbe.vue";

	const store = useMicrobiomeStore();
</script>

<template>
	<article class="bg-white flex flex-1 gap-8 p-8 rounded-md">
		<aside>
			<section class="bg-stone-100 flex flex-col gap-2 p-8 rounded-md w-80">
				<div class="flex gap-2" v-for="row in store.Domain">
					<b class="flex-1">{{ row.Name }}</b>
					<span class="font-mono">{{ row.Abundance }}%</span>
				</div>
			</section>
		</aside>
		<section class="flex flex-1 flex-col gap-8">
			<GenusList>
				<List>
					<ListItem :data="store.Akkermansia"></ListItem>
					<ListItem :data="store.Alistipes"></ListItem>
					<ListItem :data="store.Bifidobacterium"></ListItem>
					<ListItem :data="store.Enterococcus"></ListItem>
					<ListItem :data="store.Escherichia"></ListItem>
					<ListItem :data="store.Faecalibacterium"></ListItem>
					<ListItem :data="store.Klebsiella"></ListItem>
					<ListItem :data="store.Lactobacillus"></ListItem>
					<ListItem :data="store.Methanobacteria"></ListItem>
					<ListItem :data="store.Parabacteroides"></ListItem>
					<ListItem :data="store.Prevotella"></ListItem>
					<ListItem :data="store.Staphylococcus"></ListItem>
					<ListItem :data="store.Fungi"></ListItem>
				</List>
			</GenusList>
			<GenusList :data="store.Actinobacteria">
				<List>
					<ListItem :data="row" v-for="row in store.ActinobacteriaGenus"></ListItem>
				</List>
			</GenusList>
			<GenusList :data="store.Bacteroidetes">
				<List>
					<ListItem :data="row" v-for="row in store.BacteroidetesGenus"></ListItem>
				</List>
			</GenusList>
			<article class="flex flex-col">
				<header class="flex py-2 text-2xl">
					<span class="flex-1">Firmicutes</span>
					<span class="font-mono">{{ store.Firmicutes.Abundance }}%</span>
				</header>
				<List>
					<ListItem :data="row" v-for="row in store.FirmicutesGenus"></ListItem>
				</List>
			</article>
		</section>
	</article>
</template>