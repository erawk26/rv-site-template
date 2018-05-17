<template lang="pug">
	.filter-panel
		.input-group(v-for="opt in options")
			input(type="checkbox",
			:value="opt",
			:id="`${machine_readable(opt)}-checkbox`",
			v-model="checkedOptions",
			@change="$emit('input', checkedOptions)",)
			label(:for="`${machine_readable(opt)}-checkbox`") {{ opt.replace(/ Pro/i,"") }}
		a.help.center(href="#")
			img(width='23' height="23" src='../../images/tool-tip-icon-filtering.png')
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
			.replace(/ +/g, '-')
	}
};
</script>
<style lang="scss" scoped>
	@import '../../styles/init';

	.filter-panel {
		@include flex();
		background: $lt-gray-rvt;
		position: relative;
		@media (max-width: $rvt-dealer-bp-max) {
			background: #fff;
			border: 1px solid $dk-gray-rvt;
			width: 100%;
			align-items: flex-start;
			flex-direction: column;
			.help {
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
		.input-group {
			font-size: .8em;
			padding: 10px;
		}
		.help{
			padding: 10px;
		}
	}

	$bdr-transition: .25s ease-in-out;
	%bdr-transition {
		transition: border-bottom-color $bdr-transition,
		border-left-color $bdr-transition,
		border-right-color $bdr-transition,
		border-top-color $bdr-transition,
		background-color $bdr-transition;
	}
	input[type="checkbox"] {
		display: none;
		& + label {cursor: pointer;
			font-size: 1.15em;
			font-weight: bold;
			@include flex;
			&:before {
				@extend %bdr-transition;
				margin-right: .45em;
				border-radius: 4px;
				border: 1px solid #999;
				width: 23px;
				height: 23px;
				position: relative;
				content: ""
			}
		}
		&:checked + label {
			//color: $dk-blue-rvt;
			&:before {
				border: 7.5px solid $md-blue-rvt;
			}
		}
	}
</style>
