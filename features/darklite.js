const styleBtn = document.getElementById('dark-lite');
const body = document.querySelector('body');
const nav = document.getElementById('button-box')
const a = document.querySelector('a');

const isLite = () => {
    const mode = localStorage.getItem('mode');
    return mode;
};

const liteMode = () => {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    nav.style.backgroundColor = 'white';
    a.style.color = 'black';
    styleBtn.innerText = 'Dark Mode';
    localStorage.setItem('mode', 'lite');
};

const darkMode = () => {
    body.style.backgroundColor = '#333';
    body.style.color = 'whitesmoke';
    nav.style.backgroundColor = '#333';
    a.style.color = 'white';
    styleBtn.innerText = 'Light Mode'
    localStorage.setItem('mode', 'dark');
};

if (isLite() === 'dark') {
    body.style.backgroundColor = '#333';
    body.style.color = 'whitesmoke';
    styleBtn.dataset.style = 'dark';
    nav.style.backgroundColor = '#333';
    a.style.color = 'white';
    styleBtn.innerText = 'Light Mode'
}
// else {
//     body.style.backgroundColor = 'white';
//     body.style.color = 'black';
//     styleBtn.dataset.style = 'lite'
//     nav.style.backgroundColor = 'white';
//     a.style.color = 'black';
//     styleBtn.innerText = 'Dark Mode';
// }

styleBtn.addEventListener('click', () => {
    if (isLite() === 'dark') {
        liteMode();
    } else if (isLite() === 'lite') {
        darkMode();
    }
});