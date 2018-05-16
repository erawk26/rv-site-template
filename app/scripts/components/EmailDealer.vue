<template lang="pug">
	.email-dealer-modal.flex-wrapper
		.form-header
			h5.email Email
			h2.name {{ dealer.name }}
			.close(@click="$emit('close')")
				i.ss-delete
				span.screen-reader hide modal
		.form-container
			ul.is-danger(v-if="showErrors")
				li.error-item(v-for="error in errors.items")
					p.is-danger.help {{ error.msg }}
			p Fill out the form below and {{ dealer.name }} will get in touch.
			form(:id="`contact-${dealer.machine_name}`")
				.input-group.name
					label First and last name
					input(type="text",
					name="name",
					id="customer-name",
					:class="{'invalid': fields.name && showErrors && fields.name.invalid}"
					v-validate="{ required: true, regex: /^[a-z,.'-]+\\s?[a-z,.'-]+$/i }",
					v-model="customer.name")
					.helper
						img.valid(src="../../images/checkmark-circle.png",
						v-if="fields.name && fields.name.valid")
						img.invalid(src="../../images/circle-form.png",
						v-else)
				.input-group.phone
					label Phone number
					input(type="phone",
					name="phone",
					id="customer-phone",
					:class="{'invalid': fields.phone && showErrors && fields.phone.invalid}"
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
					name="email",
					id="customer-email",
					:class="{'invalid': fields.email && showErrors && fields.email.invalid}"
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
						small optional
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
						small optional
				hr
				a.submit(@click="validateForm")
					span Send
						span.hide  my email
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
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	@import '../../styles/init';

	.close {
		font-size:25px;
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
		@include marding(0, 20px);
		min-height: 30vh;
	}

	.form-footer {
		@media (max-width: $rvt-dealer-bp-max){display: none;}
		@include flex(flex-end, flex-start, $direction: column);
		@include marding(0, 20px);
		background: $lt-gray-rvt;
	}

	form {
		width: 100%;
		@media (min-width: $rvt-dealer-bp){
			padding: 15px;
			background: $lt-gray-rvt;
		}
	}

	.is-danger {
		border: 1px solid $formRed;
		border-radius: 4px;
		&.help {
			border: none;
			color: $formRed;
		}
	}

	.error-item {
		margin: 0 10px;
		p {
			margin: 5px 0;
		}
	;
		> p:before {
			content: '*';
			position: relative;
			padding-right: .25em
		}
	}

	label {
		font-weight: bold;
		display: inline-block;
		margin-bottom: 5px;
	}

	input, textarea, select {
		width: 100%;
		margin: 0;
		padding: 8px;
		&.invalid {
			background: rgba($formRed, .15)
		}
	}

	input[type="phone"] {
		display: block;
		margin-right: auto
	}

	input[type="radio"] {
		+ label{
		}
		@media (max-width: $rvt-dealer-bp-max) {
			display: none;
			+ label {
				font-size: .95em;
				margin: 0 15px 15px 0;
				@include flex($display:inline-flex);
				&:before {
					margin-right: .35em;
					border-radius: 2px;
					border: 1px solid $dk-gray-rvt;
					background: $md-gray-rvt;
					width: 18px;
					height: 18px;
					position: relative;
					content: ""
				}
			}
			&:checked + label {
				font-weight: bold;
				&:before {
					background: #fff;
					border: 6px solid $md-blue-rvt;
				}
			}
		}
		@media (min-width: $rvt-dealer-bp) {
			display: none;
			+ label {
				display:inline-block;
				border: 0.5px solid #333;
				margin: 5px 10px 5px 0;
				padding: 3px 20px;
				border-radius: 5px;
			}
			&:checked + label {
				color: white;
				background: $aqua-rvt;
			}
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
				padding-right:45px;
			}
		}
		&.radios {
			@media (max-width: $rvt-dealer-bp-max){@include flex(flex-start,stretch,$wrap:wrap);}
			> strong {
				font-size: .85em;
				display: block;
				width: 100%;
				margin-bottom: 20px;
				padding-right:45px;
			}
		}
		&.phone {
			max-width: 250px;
			@media (max-width: $rvt-dealer-bp-max) {
				max-width: 100%;
			}
		}
	}

	.submit {
		display: block;
		cursor: pointer;
		width: 100%;
		text-align: center;
		padding: 30px;
		@media (max-width: $rvt-dealer-bp-max) {
			text-align: right;
			padding: 5px 5px 0 0;
			.ss-navigateright {
				display: none
			}
			.hide {
				display: none
			}
			span {font-size: 1.15em;
				color: $aqua-rvt;
			}
		}
		span {
			font-weight: bold;
		}
		i {
			color: $aqua-rvt;
			&:before {
				padding-left: .25em;
			}
		}
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
		small{font-style: italic;color:#999}
		img {
			width: 20px;
			height: 20px;
		}
	}
</style>
