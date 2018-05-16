<template lang="pug">
	li.dealer-card(:title="dealer.name")
		h2.title {{ dealer.name }}
		.tel
			a(:href="`tel:${dealer.phone1}`")
				i.ss-phone
				span.tap Tap to call
				span.number {{ dealer.phone1 }}
		small Can't talk now? Click below to send an email.
		br
		button.contact(@click="showForm(dealer)")
			i.ss-mail
			span Contact this Pro
		h4.biz-hrs Business Hours
		ul.hours
			li
				p Weekdays
					span  {{ hours[0] }}
			li
				p Saturdays
					span  {{ hours[1] }}
			li
				p Sundays
					span  {{ hours[2] }}
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
			const arr = days.map(day => {
				let str = this.dealer.weekHours[day];
				if (str.length === 0) {
					str = '- Closed';
				} else if (str.toLowerCase() === 'on call') {
					str = '- On Call';
				}
				return str;
			}).slice(-3);
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
			let w = window.innerWidth;
			this.$modal.show(
				EmailDealer, // component definition
				{ // component props
					dealer: {
						email: data.email,
						name: data.name,
						machine_name: this.machine_readable(data.name)
					}
				},
				{ // modal parameters
					width: w > 800 ? 768 : '90%',
					dynamic: true,
					// draggable: true, /* for some reason this breaks radio label buttons on mobile */
					height: 'auto',
					scrollable: w < 768, // turn on for mobile widths
					adaptive: true,
					resizable: true
				},
				// { // modal event listeners
				//
				// }
			);
		}
	}
};
</script>
<style lang="scss">
	@import '../../styles/init';

	hr {
		width: 85%;
		margin: auto;
		border: none;
		background: transparent;
		border-top: 1px solid $dk-gray-rvt
	}

	.dealer-card {
		@include flex(flex-start, $direction: column);
		text-align: center;
		box-shadow: 0 1px 10px 0 rgba(#000, .35);
		flex: 1;
		margin: 0 15px 0;
		min-width: 230px;
		max-width: 350px;
		@media (min-width: $rvt-dealer-bp) {
			background: #fff;
			box-shadow: 0 2px 6px 1px rgba(#000, .5);
			min-width: 300px;
			border-radius: 15px;
			margin: 15px;
		}
		> .flex-wrapper {
			width: 100%
		}
		> small {
			font-style: italic;
			text-align: center;
		}
	}

	.title {width:100%;
		min-height:110px;
		font-weight: normal;
		margin:5px 0 0;
		padding: 10px 20px 15px;
		@include flex(center, center);
		@media(min-width: $rvt-dealer-bp) {
			position: relative;
			&:after {
				position: absolute;
				bottom: 0;
				left: 50%;
				right: 0;
				content: "";
				transform: translateX(-50%);
				display: block;
				width: 90%;
				max-width: 350px;
				border-top: 1px solid $md-gray-rvt;
			}
		}
	}

	.number {
		font-weight: bold;
		font-size: 1.2em;
		margin: 0 10px;
	}

	.tel > a{
		@include marding(10px auto, 0);
		@include flex($display: inline-flex);
		background: $md-blue-rvt;
		border-radius: 2px;
		color: #fff;
		font-size: 1em;
		font-weight: bold;
		i {
			@include flex($display: inline-flex);
			width: 26px;
			height: 26px;
			text-align: center;
			margin: 5px;
			padding: 4px 4px 0;
			background: $dk-blue-rvt
		}
		.tap {font-size: x-small;line-height: 1;
		}
		@media(min-width: $rvt-dealer-bp) {
			background: none;
			i {
				width: 24px;
				height: 24px;
				margin: 0;
				//padding: 4px 4px 0;
				border-radius: 50%;
				background: $md-blue-rvt
			}
			.number {
				color: black;
				font-weight: 900;
				font-size: 1.5em;
				margin: 0 0 0 10px;
			}
			.tap {
				display: none
			}
		}
	}

	.contact {
		@include flex($display: inline-flex);
		padding: 8px 14px;
		border-radius: 4px;
		border: 1px solid $aqua-rvt;
		background: transparent;
		cursor: pointer;
		color: $dk-blue-rvt;
		font-weight: bold;
		i:before {
			font-size: 1.2em;
			margin-right: .25em
		}
		transition: background-color .5s ease-in-out, color .25s ease-in-out;
		&:hover,&:active {
			background-color: $md-blue-rvt;
			border-color:transparent;
			color:white;
		}
	}

	.biz-hrs {
		margin: 10px auto 0;
		font-weight: bold;
	}

	.hours {
		flex: 1;
		p {
			margin: 4px;
		}
	}

	.certs {
		@include flex(space-between, stretch, $wrap: wrap);
		@include marding(10px 0 0,20px 20px 16px 40px);
		width: 100%;
		height: 100%;
		text-align: left;
		background: $lt-gray-rvt;
		i:before {
			padding-right: .4em;
			opacity: .25;
		}
		li {
			flex: 1 1 50%;
			max-width: 50%;
			margin-bottom: 10px;
		}
	}
</style>
