<template lang="pug">
	section.content
		.flex-wrapper.filter(v-if='dealerArr.length')
			dealer-filter(@input="filterDealers" :key="location.zipcode" :loc="location" :options="getCerts(dealerArr)")
		.flex-wrapper(v-if='dealerArr.length')
			ul.dealer-list
				dealer-card(v-for='dealer in filteredArr', :id='`item-${dealer.companyID}`' :key="dealer.companyID" :dealer="dealer")
</template>

<script>
	import Dealers from './dealers';
	import DealerCard from "./components/Card.vue";
	import DealerFilter from "./components/Filter.vue";
	let dealers = Dealers.dealers.map(d => d.data);
	export default {
		name: 'App',
		components: {DealerFilter, DealerCard},
		data: () => ({
			message: 'You loaded this page on ' + new Date().toLocaleString(),
			location: Dealers.current_location,
			dealerArr: dealers,
			filteredArr: dealers // setting this value init's the list
		}),
		methods: {
			getCerts: function (data) {
				let certArr = [];
				data.map(dlr => {
					dlr.certifications
						.map(crt => {
							if (certArr.indexOf(crt) === -1) certArr.push(crt);
						})
				});
				return certArr;
			},
			filterDealers: function (certs) {
				const areTheyQualified = (dealer, certArr) => certArr
					.every(cert => dealer.certifications.includes(cert));
				const filterDlrs = (c) => this.dealerArr
					.filter(dealer => areTheyQualified(dealer, c));
				this.filteredArr = filterDlrs(certs);
			}
		}
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