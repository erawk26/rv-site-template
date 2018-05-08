<template lang="pug">
	.filter-panel
		.input-group(v-for="opt in options")
			input(type="checkbox" v-model="checkedOptions" @change="$emit('input', checkedOptions)" :id="`${machine_readable(opt)}-checkbox`" :value="opt")
			label(:for="`${machine_readable(opt)}-checkbox`") {{ opt }}

</template>
<script>
	export default {
		name: 'dealer-filter',
		props: ['loc', 'options'],
		data: ()=>({'checkedOptions':[]}),
		computed: {},
		methods: {
			machine_readable: str => str
				.toLowerCase()
				.replace(/[^\w ]+/g, '')
				.replace(/ +/g, '-'),
			inputChecked: function(evt) {
				console.log('clicked', evt.target.checked)
				this.$emit('selected', {
					element: this.element,
					newSelection: evt.target.checked
				})
			}
		}
	}
</script>
<style lang="scss">
	@import '../../styles/init';

	.filter-panel {
		background: $lt-gray-rvt
	}
</style>