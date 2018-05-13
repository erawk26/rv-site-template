<template lang="pug">
	.email-dealer-modal.flex-wrapper
		.form-header
			h5.email Email
			h2.name {{ dealer.name }}
			.close(@click="$emit('close')")
				i.ss-delete
				span.screen-reader hide modal
		.form-container
			p Fill out the form below and {{ dealer.name }} will get in touch.
			ul.is-danger(v-if="showErrors")
				li.error-item(v-for="error in errors.items")
					p.is-danger.help {{ error.msg }}
			form(:id="`contact-${dealer.machine_name}`")
				.input-group.name
					label First and last name
					input(type="text",
					name="name",
					id="customer-name",
					v-validate="'required:true'",
					v-model="customer.name")
					.helper
						img.valid(src="../../images/checkmark-circle.png",
						v-if="fields.name && fields.name.valid")
						img.invalid(src="../../images/circle-form.png",
						v-else)
				.input-group.phone
					label Phone number
					input(type="phone",
					id="customer-phone",
					name="phone",
					v-validate="{ required: true, regex: /^(?:1|1 )*(\\([2-9]{1}\\d{2}\\)|[2-9]{1}\\d{2})[- ]*(\\d{3})[- ]*(\\d{4})$/ }",
					v-model="customer.phone1")
					.helper
						img.invalid(src="../../images/circle-form.png",
						v-if="fields.phone && fields.phone.invalid")
						img.valid(src="../../images/checkmark-circle.png",
						v-else)
				.input-group.email
					label Email address
					input(type="email",
					id="customer-email",
					name="email",
					formnovalidate="true",
					v-validate="'required|email'",
					v-model="customer.email")
					.helper
						img.valid(src="../../images/checkmark-circle.png",
						v-if="fields.email && fields.email.valid")
						img.invalid(src="../../images/circle-form.png",
						v-else)
				.input-group.message
					label Comments or questions
					textarea(id="customer-message",
					name="customer-message",
					v-model="customer.message")
					.helper
						small Optional
				.input-group.radios
					strong Do you currently own a pool or spa?
					input(type="radio",
					id="poolorspatrue",
					value='true',
					v-model="customer.poolorspa")
					label(for='poolorspatrue') Yes
					input(type="radio",
					id="poolorspafalse",
					value='false',
					v-model="customer.poolorspa")
					label(for='poolorspafalse') No
					.helper
						small Optional
				hr
				a.submit(@click="validateForm")
					span Send my email
					i.ss-navigateright
		.form-footer
			small.disclaimer
				| *Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque doloremque ex facere id maxime modi nisi. Aliquam consequuntur cupiditate est, ex fugiat laudantium nemo odit recusandae, repellendus rerum vero.
</template>

<script>

export default {
	name: 'email-dealer',
	props: ['dealer'],
	data: () => ({
		customer: {},
		showErrors: false
	}),
	methods: {
		validateForm(e) {
			this.$validator.validateAll().then((result) => {
				if (result) {
					// eslint-disable-next-line
						console.log('Form Submitted!');
				} else {
					this.showErrors = true;
					console.log('Please correct any errors listed at the top of the form!',this);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	@import '../../styles/init';

	.close {
		cursor: pointer;
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.form-header {
		@include flex(flex-end, flex-start, $direction: column);
		@include marding(0, 27px 20px);
		background: $dk-blue-rvt;
		color: white;
		position: relative;
		width: 100%;
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

	.form-footer {
		@include flex(flex-end, flex-start, $direction: column);
		@include marding(0, 20px);
		background: $lt-gray-rvt;
	}

	form {
		padding: 15px;
		background: $lt-gray-rvt;
		width: 100%;
	}

	.is-danger {
		$red:red;
		border: 1px solid $red;
		border-radius: 4px;
		&.help {
			border: none;
			color: $red;
		}
	}
	.error-item{margin:0 10px;
	>p:before{content:'*';position:relative;padding-right: .25em}}
	label {
		font-weight: bold;
		display: inline-block;
		margin-bottom: 5px;
	}

	input, textarea, select {
		width: 100%;
		margin: 0;
		padding: 8px;
	}

	input[type="phone"] {
		display: block;
		margin-right: auto
	}

	input[type="radio"] {
		display: none;
		+ label {
			/*font-weight: bold;*/
			border: 0.5px solid #333;
			margin: 5px 10px 5px 0;
			padding: 3px 20px;
			border-radius: 5px;
		}
		&:checked + label {
			color: white;
			background: $aqua-rvt;

			/*font-weight: bold;*/
		}
	}

	.email-dealer-modal {
		flex-wrap: wrap;
		width: 100%;
		@include marding;
	}

	.input-group {
		position: relative;
		width: auto;
		padding: 10px 0;
		&:not(.radios) {
			label {
				font-size: .85em;
			}
		}
		&.radios {
			strong {
				font-size: .85em;
				display: block;
				width: 100%;
				margin-bottom: 5px;
			}
		}
		&.phone{max-width:250px;@include mobile{max-width: 100%;}}
	}

	.submit {
		display: block;
		cursor:pointer;
		width: 100%;
		text-align: center;
		padding: 30px;
		span{font-weight:bold}
		i{color:$aqua-rvt;&:before{padding-left:.25em;}}
	}

	.helper {
		@include flex(flex-end);
		position: absolute;
		text-align: right;
		height: 20px;
		min-width: 20px;
		overflow: visible;
		top: 10px;
		right: 1px;
		img {
			width: 20px;
			height: 20px;
		}
	}
</style>
