import { convertEpoch } from "../util/helper-functions.js";
import { generateComments } from "./comments.js";
import { pageRender } from "./pageRender.js";

//loading reddit/r/all on page load
console.log('Hi, this is a student project. Feel free to look around.')

const contentBox = document.getElementById('content');

let redditDataAll;
try {
    const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
    const json = await response.json();
    redditDataAll = json.data.children;
}
catch {
    contentBox.innerText = 'There seems to be a problem with Reddit, please try again later.'
};

// handle r/all data
const rAll = redditDataAll.map(obj => obj.data);

const page = [];

rAll.forEach((obj) => {
    const post = pageRender(obj, convertEpoch, generateComments);
    page.push(post);
});

document.getElementById('all-button').style.backgroundColor = 'gray'

contentBox.innerText = '';

contentBox.append(...page);