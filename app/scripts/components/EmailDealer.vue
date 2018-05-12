<template lang="pug">
	.email-dealer-modal.flex-wrapper
		button(@click="$emit('close')") hide modal
		.form-container
			p {{ dealer }}
</template>

<script>
export default {
	name: 'email-dealer',
	props: ['dealer'],
	methods: {}
};
</script>

<style lang="scss" scoped>
	@import '../../styles/init';
	.form-container {
		width: 100%;
		@include marding(0,15px);
	}
	.email-dealer-modal {
		flex-wrap: wrap;
		width: 100%;
		@include marding(0,12%);
	}
</style>
