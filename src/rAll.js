import { convertEpoch } from "./util/helper-functions.js";
import { generateComments } from "./comments.js";
import { pageRender } from "./pageRender.js";

//handle r/all data
document.getElementById('all-button').addEventListener('click', async () => {

    const contentBox = document.getElementById('content');
    contentBox.innerHTML = '<br>Loading...'

    const redditAll = async () => {
        try {
            const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
            const json = await response.json();
            return json.data.children;
        } catch {
            contentBox.style.color = 'red'
            contentBox.innerHTML = '<br>There seems to be a problem with Reddit, please try again later.'
        }
    };

    const redditDataAll = await redditAll();

    const rAll = redditDataAll.map(obj => obj.data);

    const page = [];

    rAll.forEach((obj) => {
        const post = pageRender(obj, convertEpoch, generateComments);
        page.push(post);
    });

    contentBox.innerText = '';

    document.getElementById('content-header').innerText = 'r/all';
    document.getElementById('all-button').style.backgroundColor = 'gray';
    document.getElementById('all-button').style.border = 'gray';
    document.getElementById('popular-button').style.backgroundColor = '';
    document.getElementById('popular-button').style.border = '';

    contentBox.append(...page);
});