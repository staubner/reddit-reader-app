const styleBtn = document.getElementById('dark-lite');
const body = document.querySelector('body');

const isLite = () => {
    return styleBtn.dataset.style;
};

const liteMode = () => {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
    styleBtn.dataset.style = 'lite'
    styleBtn.innerText = 'Dark Mode';
};

const darkMode = () => {
    body.style.backgroundColor = '#333';
    body.style.color = 'whitesmoke';
    styleBtn.dataset.style = 'dark';
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