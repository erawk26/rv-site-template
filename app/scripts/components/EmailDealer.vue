<template lang="pug">
	.email-dealer-modal.flex-wrapper
		.form-header
			h5.email Email
			h2.name {{ dealer.name }}
			button.close(@click="$emit('close')") hide modal
		.form-container
			p  Fill out the form below and {{ dealer.name }} will get in touch.
			form
				.input-group
					label(:for="customer.name") First and last name
					input(type="text", :id="customer.name", v-model="customer.name")
				.input-group
					label(:for="customer.phone1") Phone number
					input(type="phone", :id="customer.phone1", v-model="customer.phone1")
				.input-group
					label(for="customer-email") Email address
					input(type="email", id="customer-email", v-model="customer.email")
				.input-group
					label(for="customer-message") Comments or questions
					textarea(id="customer-message", v-model="customer.message")
				.input-group Do you currently own a pool or spa?
					input(type="radio", id="poolorspatrue" , value='true', v-model="customer.poolorspa")
					label(for='poolorspatrue') Yes
					input(type="radio", id="poolorspafalse" , value='false', v-model="customer.poolorspa")
					label(for='poolorspafalse') No
</template>

<script>
export default {
	name: 'email-dealer',
	props: ['dealer'],
	data: ()=>({ customer: {} }),
	methods: {}
};
</script>

<style lang="scss" scoped>
	@import '../../styles/init';

	.close {
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.form-header {
		background: $dk-blue-rvt;
		color: white;
		position: relative;
		width: 100%;
		@include flex(flex-end, flex-start, $direction: column);
		@include marding(0, 27px 20px);
		.email {
			@include marding();
			text-transform: uppercase
		}
		.name {
			@include marding(8px 0 0, 0);
		}
	}

	.form-container {
		width: 100%;
		@include flex(flex-start, flex-start, $direction: column);
		@include marding(0, 15px);
		min-height: 30vh;
	}

	.email-dealer-modal {
		flex-wrap: wrap;
		width: 100%;
		@include marding;
	}

	form {
		background: $lt-gray-rvt;
		width: 100%;
	}

	.input-group {
		width: 100%;
		input[type="radio"] + label, input, textarea, select {
			width: 100%
		}
	}

	input[type="radio"] {
		display: none;
		&:checked + label {
			font-weight: bold;
		}
	}
</style>
