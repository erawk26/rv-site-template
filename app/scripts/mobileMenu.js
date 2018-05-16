// RESPONSIVE MOBILE MENU
const container = document.getElementById('mobile-menu');
const ham = document.getElementById('hamburger');
const collapse = document.getElementsByClassName('collapse').item(0);
ham.onclick = () => {
	container.classList.toggle('opened');
};
collapse.onclick = ()=> { // close the menu if click happens
	container.classList.toggle('opened');
};
