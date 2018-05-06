<template lang="pug">
	.filter-panel

</template>
<script>
	export default {
		name: 'dealer-filter',
		props: ['loc', 'dlrs'],
		data: function (data) {
			return data;
		},
		computed: {
			// getCerts: function () {
			// 	let certArr = [];
			// 	dealers.map(dlr => {
			// 		dlr.certs
			// 			.map(crt => {
			// 				if (certArr.indexOf(crt) == -1) certArr.push(crt);
			// 			})
			// 	});
			// 	return certArr;
			// }
		},
		methods: {}
	}
</script>
<style lang="scss">
	@import '../../styles/init';

	.filter-panel {
		background: $lt-gray-rvt
	}
</style>