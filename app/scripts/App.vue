<template lang="pug">
	section.content
		.flex-wrapper.filter
			dealer-filter(@input="filterDealers",
			:key="location.zipcode",
			:loc="location",
			:options="certs")
		.flex-wrapper
			ul.dealer-list
				dealer-card(v-for='dealer in filteredArr',
				:id='`item-${dealer.companyID}`',
				:key="dealer.companyID",
				:dealer="dealer")
</template>

<script>
import Dealers from './dealers';
import DealerCard from './components/Card.vue';
import DealerFilter from './components/Filter.vue';
const dealers = Dealers.dealers.map(d => d.data);
export default {
	name: 'App',
	components: { DealerFilter, DealerCard },
	data: () => ({
		message: 'You loaded this page on ' + new Date().toLocaleString(),
		location: Dealers.current_location,
		filteredArr: dealers
	}),
	computed: {
		certs: ()=> {
			let certArr = [];
			dealers.forEach(dlr => {
				dlr.certifications
					.forEach(crt => {
						if (!certArr.includes(crt)) certArr.push(crt);
					});
			});
			return certArr;
		}
	},
	methods: {
		filterDealers: function(checkedCerts) {
			const areTheyQualified = dealer => checkedCerts // check the array of certificates
				.every(cert => dealer // make sure the dealer
					.certifications.includes(cert)); // has every cert that is enabled
			this.filteredArr = dealers // return the dealer array...
				.filter(dealer => areTheyQualified(dealer)); // ... with dealers who are qualified
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
		@media (max-width: 650px) {
			@include flex-grid(1, 5px);
		}
	}
</style>
