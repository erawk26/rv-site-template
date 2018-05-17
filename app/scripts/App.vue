<template lang="pug">
	section.content
		.flex-wrapper.filter
			.filter-header
				.filter-info
					| {{ filteredArr.length }} Dealers in {{ location.zipcode }}
				h4
					| Filter Results
					i.ss-navigatedown
			dealer-filter(@input="filterDealers",
			:key="location.zipcode",
			:loc="location",
			:options="certs")
		hr
		.flex-wrapper.list
			ul.dealer-list
				dealer-card(v-for='dealer in filteredArr',
				:id='`item-${dealer.companyID}`',
				:key="dealer.companyID",
				:dealer="dealer")
			modals-container
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
		certs: () => {
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
		filterDealers(checkedCerts) {
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

	.filter-header {
		font-weight: bold;
		@include flex;
		h4 {
			padding: 10px;
			position: relative;
			font-weight: bold;
			margin: 0;

		}
		@media (max-width: $rvt-dealer-bp-max){
			width: 100%;
			h4 {
				padding-right: 60px;
				border: 1px solid $dk-gray-rvt;
				border-bottom: none;
				background: white;
			}
		}
		i:before {
			@media (min-width: $rvt-dealer-bp) {
				display: none
			}
			background: $lt-gray-rvt;
			border-left: 1px solid $dk-gray-rvt;
			@include flex;
			height: 100%;
			width: 40px;
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
		}
	}

	.filter-info {
		color: $md-blue-rvt;
		flex: 1;
	}

	.content {
		@include flex(flex-start,$direction: column);
		flex:1;
		.filter {@include set-max-width;
			@include flex($wrap:wrap);
			background: $lt-gray-rvt;
			@media (max-width: $rvt-dealer-bp-max) {
				max-width:380px;
				@include flex($direction: column);
			}

			padding: 15px;
			width: 100%;
		}
		@media(min-width:350px){hr{display: none}}
		hr{width:100%}
	}

	.dealer-list {
		@include set-max-width;
		// @media (min-width: $rvt-dealer-bp){@include flex(center, stretch, $wrap: wrap);}
		@media (min-width: $rvt-dealer-bp) and (max-width:$bp-md-max){
			@include flex(center, stretch, $wrap: wrap);
			@include flex-grid(2,30px);
		}
		@media (min-width: $bp-md){
			@include flex(center, stretch, $wrap: wrap);
			@include flex-grid(3,20px);
		}
	}

	.flex-wrapper.list {
		@media (min-width: $rvt-dealer-bp) and (max-width: $bp-mw) {
			padding: 30px;
		}
	}
</style>
