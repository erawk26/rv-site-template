<template lang="pug">
	li.dealer-card(:title="dealer.name")
		h2 {{ dealer.name }}
		hr
		a.tel(:href="`tel:${dealer.phone1}`")
			h3
				span.ss-phone
				small Tap to call
				span.number {{ dealer.phone1 }}
		small Can't talk now? Click below to send an email.
		br
		button(@click="showForm(dealer)")
			i.ss-mail
			span Contact this Pro
		h4 Business Hours
		ul.hours
			li
				p Weekdays
					span(v-if="hours[0].length") {{ hours[0] }}
					span(v-else) Closed
			li
				p Saturday
					span(v-if="hours[1].length") {{ hours[1] }}
					span(v-else) Closed
			li
				p Sunday
					span(v-if="hours[2].length") {{ hours[2] }}
					span(v-else) Closed
		.flex-wrapper
			ul.certs
				li(v-for="cert in dealer.certifications")
					i(:class="classKey(machine_readable(cert))")
					span {{ cert }}
</template>
<script>
import EmailDealer from './EmailDealer.vue';

export default {
	name: 'dealer-card',
	props: ['dealer'],
	computed: {
		hours() {
			const days = Object.keys(this.dealer.weekHours);
			const arr = days.map(day => this.dealer.weekHours[day]).slice(-3);
			return arr;
		}
	},
	methods: {
		machine_readable: str => str
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-'),
		dayKey: n => (({
			mon: 'Monday',
			tue: 'Tuesday',
			wed: 'Wednesday',
			thu: 'Thursday',
			fri: 'Friday',
			sat: 'Saturday',
			sun: 'Sunday'
		})[n]),
		classKey: x => (({
			'installation-pro': 'ss-star',
			'commercial-pro': 'ss-users',
			'residential-pro': 'ss-home',
			'service-pro': 'ss-settings'
		})[x]),
		showForm(data) {
			this.$modal.show(
				EmailDealer, {
					dealer: {
						email: data.email,
						name: data.name,
						machine_name: this.machine_readable(data.name)
					}
				},
				{
					width: '90%',
					dynamic: true,
					// draggable: true, // for some reason this breaks radio buttons on mobile
					height: 'auto',
					scrollable: true,
					adaptive: true,
					resizable: true
				}
			);
		}
	}
};
</script>
<style lang="scss">
	@import '../../styles/init';

	.dealer-card {
		@include flex($direction:column);
		text-align: center;
		border-radius: 15px;
		background: #fff;
		box-shadow: 0 1px 10px 1px rgba(#000, .5);
		flex: 1;
		margin: 30px 30px 0;
		min-width: 280px;
		max-width: 100%;
		@include not-mobile {
			flex: 1 0 350px;
			min-width: 320px;
			max-width: 350px;
			margin: 15px;
		}
		> .flex-wrapper{flex:1;width:100%}
		> small {
			text-align: center;
		}
	}

	a.tel h3 {
		@include marding(0 auto, 0);
		display: inline-block;
		background: $md-blue-rvt;
		color: #fff;
		.ss-phone {
			@include flex($display: inline-flex);
			text-align: center;
			width: 32px;
			height: 32px;
			margin: 7px;
			padding: 4px 4px 0;
			background: $dk-blue-rvt
		}
		small {
			font-weight: bold;
		}
	}

	.number {
		font-weight: bold;
		font-size: 1.2em;
		margin: 0 10px;
	}

	.certs {
		@include flex(space-between, stretch, $wrap: wrap);
		width: 100%;
		height: 100%;
		padding: 30px 20px 10px 40px;
		text-align: left;
		background: $lt-gray-rvt;
		li {
			flex: 1 1 50%;
			max-width: 50%;
			margin-bottom: 20px;
		}
		i {
			&:before {
				padding-right: .4em;
				opacity: .25
			}
		}
	}
</style>
