const styleBtn = document.getElementById('dark-lite');
const body = document.querySelector('body');
const nav = document.getElementById('button-box')
const a = document.querySelector('a');

const isLite = () => {
    return styleBtn.dataset.style;
};

const liteMode = () => {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    styleBtn.dataset.style = 'lite'
    nav.style.backgroundColor = 'white';
    a.style.color = 'black';
    styleBtn.innerText = 'Dark Mode';
};

const darkMode = () => {
    body.style.backgroundColor = '#333';
    body.style.color = 'whitesmoke';
    styleBtn.dataset.style = 'dark';
    nav.style.backgroundColor = '#333';
    a.style.color = 'white';
    styleBtn.innerText = 'Light Mode'
};

styleBtn.addEventListener('click', () => {
    let style = isLite();

    if (style === 'lite') {
        darkMode();
    } else {
        liteMode();
    }
});