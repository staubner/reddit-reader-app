import { convertEpoch } from "../util/helper-functions.js";

//loading reddit/r/all, the default page

const redditAll = async () => {
    const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
    const json = await response.json();
    // console.log(json)
    return json.data.children;
};

try {
    const test = await redditAll();
} catch (error) {
    alert(`${error.name}: ${error.message}`)
};

//loading reddit/r/popular
const redditPopular = async () => {
    const response = await fetch(`https://www.reddit.com/r/popular.json?limit=25`);
    const json = await response.json();
    // console.log(json)
    return json.data.children;
};

const contentBox = document.getElementById('content');
// handle r/all data
const redditDataAll = await redditAll();

const rAll = redditDataAll.map(obj => obj.data);

const pageAll = [];

console.log(rAll)

//handle r/popular data
const redditDataPopular = await redditPopular();

const popular = redditDataPopular.map(obj => obj.data);

const pagePopular = [];

rAll.forEach((obj) => {

    let post = document.createElement('div');
    post.setAttribute('class', 'post');

    // let hr = document.createElement('hr');
    // post.appendChild(hr);

    let postTitle = document.createElement('h3');
    postTitle.setAttribute('class', 'post-title');
    postTitle.innerText = `${obj.title}`;
    post.appendChild(postTitle);

    let postTime = document.createElement('span');
    postTime.setAttribute('class', 'post-time');
    postTime.innerText = `Posted ${convertEpoch(obj.created)} `;
    post.appendChild(postTime);

    let postAuthor = document.createElement('span');
    postAuthor.setAttribute('class', 'post-author');
    postAuthor.innerText = `by ${obj.author} `;
    post.appendChild(postAuthor);

    let subreddit = document.createElement('span');
    subreddit.setAttribute('class', 'subreddit');
    subreddit.innerText = `on ${obj.subreddit_name_prefixed} `;
    post.appendChild(subreddit);

    let thumbnailContainer = document.createElement('div')
    thumbnailContainer.setAttribute('class', 'thumbnail-container');
    let thumbnailImg = document.createElement('img');
    thumbnailImg.setAttribute('class', 'thumbnail');

    if (obj.thumbnail !== "self" && !obj.media) {
        thumbnailContainer.setAttribute('data-link', `${obj.url}`)
    };

    if (obj.thumbnail.length < 8) {
        thumbnailImg.setAttribute('src', '../src/icons8-no-image-100.png');
    } else {
        thumbnailImg.setAttribute('src', `${obj.thumbnail}`);
    }
    thumbnailContainer.appendChild(thumbnailImg);
    post.appendChild(thumbnailContainer);

    let numComments = document.createElement('span');
    numComments.setAttribute('class', 'num-comments');
    numComments.setAttribute('data-permalink', `${obj.permalink}`)
    numComments.innerText = `${obj.num_comments} comments`;
    post.appendChild(numComments);

    let upvotes = document.createElement('span');
    upvotes.setAttribute('class', 'upvotes');
    upvotes.innerText = ` with ${obj.ups} upvotes`;
    post.appendChild(upvotes);

    pageAll.push(post)
});

contentBox.append(...pageAll);

popular.forEach((obj) => {

    let post = document.createElement('div');
    post.setAttribute('class', 'post');

    // let hr = document.createElement('hr');
    // post.appendChild(hr);

    let postTitle = document.createElement('h3');
    postTitle.setAttribute('class', 'post-title');
    postTitle.innerText = `${obj.title}`;
    post.appendChild(postTitle);

    let postTime = document.createElement('span');
    postTime.setAttribute('class', 'post-time');
    postTime.innerText = `Posted ${convertEpoch(obj.created)} `;
    post.appendChild(postTime);

    let postAuthor = document.createElement('span');
    postAuthor.setAttribute('class', 'post-author');
    postAuthor.innerText = `by ${obj.author} `;
    post.appendChild(postAuthor);

    let subreddit = document.createElement('span');
    subreddit.setAttribute('class', 'subreddit');
    subreddit.innerText = `on ${obj.subreddit_name_prefixed} `;
    post.appendChild(subreddit);

    let thumbnailContainer = document.createElement('div')
    thumbnailContainer.setAttribute('id', 'thumbnail-container');
    let thumbnailImg = document.createElement('img');
    thumbnailImg.setAttribute('class', 'thumbnail');

    if (obj.thumbnail !== "self" && !obj.media) {
        thumbnailContainer.setAttribute('data-link', `${obj.url}`)
    };

    if (obj.thumbnail.length < 8) {
        thumbnailImg.setAttribute('src', '../src/icons8-no-image-100.png');
    } else {
        thumbnailImg.setAttribute('src', `${obj.thumbnail}`);
    }
    thumbnailContainer.appendChild(thumbnailImg);
    post.appendChild(thumbnailContainer);

    let numComments = document.createElement('span');
    numComments.setAttribute('class', 'num-comments');
    numComments.setAttribute('data-permalink', `${obj.permalink}`)
    numComments.innerText = `${obj.num_comments} comments`;
    post.appendChild(numComments);

    let upvotes = document.createElement('span');
    upvotes.setAttribute('class', 'upvotes');
    upvotes.innerText = ` with ${obj.ups} upvotes`;
    post.appendChild(upvotes);

    pagePopular.push(post)
});

//event listeners for r/all and r/popular buttons
const btnAll = document.getElementById('all-button')
const btnPop = document.getElementById('popular-button')

const contentHeader = document.getElementById('content-header')

btnPop.addEventListener('click', () => {
    while (contentBox.firstChild) {
        contentBox.removeChild(contentBox.firstChild)
    }

    contentBox.append(...pagePopular);
    contentHeader.innerText = 'r/popular'
});

btnAll.addEventListener('click', () => {
    while (contentBox.firstChild) {
        contentBox.removeChild(contentBox.firstChild)
    }

    contentBox.append(...pageAll);
    contentHeader.innerText = 'r/all'
});

//event listener for post URL
const postLinks = document.querySelectorAll('.thumbnail-container')

postLinks.forEach(post => console.log(post.dataset.link))

postLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (link.dataset.link) {
            window.location.href = `${link.dataset.link}`
        };
    })
})

//get array of post title nodes for comments

export const postComments = document.querySelectorAll('.num-comments')