import { convertEpoch } from "../util/helper-functions.js";
import { generateComments } from "./comments.js";

//loading reddit/r/all on page load
console.log('Hi, this is a student project. Feel free to look around.')

const contentBox = document.getElementById('content');

const redditAll = async () => {
    const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
    const json = await response.json();
    return json.data.children;
};

try {
    const test = await redditAll();
} catch {
    contentBox.innerText = 'There seems to be a problem with Reddit, please try again later.'
};



// handle r/all data
const redditDataAll = await redditAll();

const rAll = redditDataAll.map(obj => obj.data);

const pageAll = [];

rAll.forEach((obj) => {

    let post = document.createElement('div');
    post.setAttribute('class', 'post');

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


    if (obj.media && obj.media.reddit_video) {
        let thumbnailImg = document.createElement('video');
        thumbnailImg.setAttribute('class', 'video');
        thumbnailImg.setAttribute('src', `${obj.media.reddit_video.fallback_url}`);
        thumbnailImg.setAttribute('controls', '')
        thumbnailContainer.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (obj.thumbnail === 'self' && obj.url.includes('reddit') || obj.thumbnail === 'nsfw' || obj.thumbnail === 'spoiler') {
        let thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', '../src/icons8-no-image-100.png')
        thumbnailContainer.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (obj.thumbnail === 'image') {
        let imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${obj.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        let thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', `${obj.url}`)
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (obj.thumbnail === 'default') {
        let imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${obj.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        let thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', '../src/icons8-no-image-100.png')
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (obj.media && obj.media.oembed) {
        let imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${obj.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        let thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', `${obj.thumbnail}`)
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (!obj.media) {
        let imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${obj.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        let thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', `${obj.thumbnail}`)
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    };

    let numComments = document.createElement('span');
    numComments.setAttribute('class', 'num-comments');
    numComments.innerText = `${obj.num_comments} comments`;
    post.appendChild(numComments);

    let upvotes = document.createElement('span');
    upvotes.setAttribute('class', 'upvotes');
    upvotes.innerText = ` with ${obj.ups} upvotes`;
    post.appendChild(upvotes);

    let commentBox = document.createElement('div');
    commentBox.setAttribute('class', 'comment-box');
    post.appendChild(commentBox);


    let permalink = obj.permalink;

    numComments.addEventListener('click', async () => {
        const comments = await generateComments(permalink)
        commentBox.innerHTML = comments;
    });

    pageAll.push(post);
});

document.getElementById('all-button').style.backgroundColor = 'gray'

contentBox.innerText = '';

contentBox.append(...pageAll);