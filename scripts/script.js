document.addEventListener('DOMContentLoaded', () => {
let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let airplane = document.getElementById('airplane');

window.addEventListener('scroll', () => {
    console.log('Scrolling...')
    let value = window.scrollY;

    text.style.marginTop = value * 2.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -1.5 + 'px';
    hill1.style.top = value * 1 + 'px';
    airplane.style.left = value * 2.5 + 'px';
});
});
function toggleMenu() {
    var navigation = document.querySelector('.navigation');
    navigation.classList.toggle('active');
}