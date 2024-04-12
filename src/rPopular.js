import { convertEpoch } from "./util/helper-functions.js";
import { generateComments } from "./comments.js";
import { pageRender } from "./pageRender.js";

//handle r/popular data
document.getElementById('popular-button').addEventListener('click', async () => {

    const contentBox = document.getElementById('content');
    contentBox.innerHTML = '<br>Loading...'

    const redditPopular = async () => {
        try {
            const response = await fetch(`https://www.reddit.com/r/popular.json?limit=25`);
            const json = await response.json();
            return json.data.children;
        } catch {
            contentBox.style.color = 'red'
            contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
        }
    };

    const redditDataPopular = await redditPopular();

    const rPopular = redditDataPopular.map(obj => obj.data);

    const page = [];

    rPopular.forEach((obj) => {
        const post = pageRender(obj, convertEpoch, generateComments);
        page.push(post);
    });

    contentBox.innerText = '';

    document.getElementById('content-header').innerText = 'r/popular';
    document.getElementById('all-button').style.backgroundColor = '';
    document.getElementById('all-button').style.border = '';
    document.getElementById('popular-button').style.backgroundColor = 'gray';
    document.getElementById('popular-button').style.border = 'gray';

    contentBox.append(...page);
});