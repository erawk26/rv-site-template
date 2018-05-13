import Vue from 'vue';
import VModal from 'vue-js-modal';
import VeeValidate from 'vee-validate';
import App from './App.vue';
Vue
	.use(VeeValidate)
	.use(VModal, { dynamic: true });
// .component('email-dealer', EmailDealer);
new Vue({
	render: h => h(App)
})
	.$mount('#vueApp');
