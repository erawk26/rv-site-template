<template lang="pug">
	.filter-panel
		.input-group(v-for="opt in options")
			input(type="checkbox",
			:value="opt",
			:id="`${machine_readable(opt)}-checkbox`",
			v-model="checkedOptions",
			@change="$emit('input', checkedOptions)",)
			label(:for="`${machine_readable(opt)}-checkbox`") {{ opt.replace(/ Pro/i,"") }}
</template>
<script>
export default {
	name: 'dealer-filter',
	props: ['loc', 'options'],
	data: () => ({ checkedOptions: [] }),
	computed: {},
	methods: {
		machine_readable: str => str
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-'),
		inputChecked: (evt)=> {
			console.log('clicked', evt.target.checked);
			this.$emit('selected', {
				element: this.element,
				newSelection: evt.target.checked
			});
		}
	}
};
</script>
<style lang="scss">
	@import '../../styles/init';

	input[type="checkbox"] {
		display: none;
		& + label {
			font-size: 1.25em;
			@include flex;
			&:before {
				margin-right: .25em;
				border-radius: 5px;
				border: 1px solid #999;
				width: 25px;
				height: 25px;
				position: relative;
				content: ""
			}
		}
		&:checked + label {
			color: $dk-blue-rvt;
			font-weight: bold;
			&:before {
				border: 8px solid #083d8c;
			}
		}
	}

	.filter-panel {
		@include flex($wrap: wrap);
		background: $lt-gray-rvt;
		.input-group {
			display: inline-block;
			padding: 10px;
		}
	}
</style>
