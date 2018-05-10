<template lang="pug">
	li.dealer-card(:title="name")
		h2 {{ name }}
		hr
		a.tel(:href="`tel:${phone1}`")
			h3
				span.ss-phone
				| Tap to call
				span.number {{ phone1 }}
		small Can't talk now? Click below to send an email.
		br
		button
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
				li(v-for="cert in certifications")
					i(:class="classKey(machine_readable(cert))")
					span {{ cert }}
</template>
<script>
export default {
	name: 'dealer-card',
	data: a => a.dealer,
	props: ['dealer'],
	computed: {
		hours: function () {
			const days = Object.keys(this.weekHours);
			const arr = days.map(day => this.weekHours[day]).slice(-3);
			// console.log(days, this);
			return arr;
			// array.sort(GetSortOrder("EmployeeName"));
			// .filter(job => job.machine_name === this.active)[0];
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
		})[x])
		// imgRequire: img => require(`../../images/${img}`),
	}
};
</script>
<style lang="scss">
	@import '../../styles/init';

	.dealer-card {
		text-align: center;
		border-radius: 15px;
		background: #fff;
		box-shadow: 0 1px 10px 1px rgba(#000, .5);
		display: inline-block;
	}

	a.tel h3{
		background: $md-blue-rvt;
		color: #fff;
		.ss-phone {
			background: $dk-blue-rvt
		}
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