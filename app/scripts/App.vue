<template lang="pug">
	section.content
		.flex-wrapper.filter(v-if='dealers.length')
			dealer-filter(functional :key="location.zipcode" :loc="location" :dlrs="dealers")
		.flex-wrapper(v-if='dealers.length')
			ul.dealer-list
				dealer-card.dealer(v-for='dealer in dealers', :id='`item-${dealer.companyID}`' :key="dealer.companyID" :dealer="dealer")
</template>

<script>
	import Dealers from './dealers';
	import DealerFilter from "./components/Filter.vue";

	export default {
		name: 'App',
		components: {DealerFilter},
		data: () => ({
			message: 'You loaded this page on ' + new Date().toLocaleString(),
			location: Dealers.current_location,
			dealers: Dealers.dealers.map(obj => obj.data)
		}),
		methods: {}
	};
</script>

<style lang="scss" scoped>
	@import '../styles/init';

	.content {
		@include flex($direction: column);
		.filter {
			width: 100%;
		}
	}

	.dealer-list {
		@include set-max-width;
		@include flex(center, stretch, $wrap: wrap);
		@include flex-grid(3, 25px);
		@media (max-width: $desktop-breakpoint) {
			@include flex-grid(2, 25px);
		}
		@include mobile {
			@include flex-grid(1, 5px);
		}
	}
</style>