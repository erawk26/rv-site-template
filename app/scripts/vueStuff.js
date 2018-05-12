import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';

Vue
	.use(VModal, { dynamic: true });
// .component('email-dealer', EmailDealer);
new Vue({
	render: h => h(App)
})
	.$mount('#vueApp');
