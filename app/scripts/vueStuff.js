import Vue from 'vue';
import App from './App.vue';
// Vue.component('dealer-card', function (resolve) { // async loading
// 	require(['./components/Card.vue'], resolve);
// });
new Vue({
	render: h => h(App)
}).$mount('#vueApp');
