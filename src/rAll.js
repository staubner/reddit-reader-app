import { convertEpoch } from "../util/helper-functions.js";
import { generateComments } from "./comments.js";

//handle r/all data
document.getElementById('all-button').addEventListener('click', async () => {

    const redditAll = async () => {
        const response = await fetch(`https://www.reddit.com/r/all.json?limit=25`);
        const json = await response.json();
        return json.data.children;
    };

    const contentBox = document.getElementById('content');

    // handle r/all data
    const redditDataAll = await redditAll();

    const rAll = redditDataAll.map(obj => obj.data);

    const pageAll = [];

    rAll.forEach((obj) => {

        const post = document.createElement('div');
        post.setAttribute('class', 'post');

        const postTitle = document.createElement('h3');
        postTitle.setAttribute('class', 'post-title');
        postTitle.innerText = `${obj.title}`;
        post.appendChild(postTitle);

        const postTime = document.createElement('span');
        postTime.setAttribute('class', 'post-time');
        postTime.innerText = `Posted ${convertEpoch(obj.created)} `;
        post.appendChild(postTime);

        const postAuthor = document.createElement('span');
        postAuthor.setAttribute('class', 'post-author');
        postAuthor.innerText = `by ${obj.author} `;
        post.appendChild(postAuthor);

        const subreddit = document.createElement('span');
        subreddit.setAttribute('class', 'subreddit');
        subreddit.innerText = `on ${obj.subreddit_name_prefixed} `;
        post.appendChild(subreddit);

        const thumbnailContainer = document.createElement('div')
        thumbnailContainer.setAttribute('id', 'thumbnail-container');


        if (obj.media && obj.media.reddit_video) {
            const thumbnailImg = document.createElement('video');
            thumbnailImg.setAttribute('class', 'video');
            thumbnailImg.setAttribute('type', 'video/mp4');
            thumbnailImg.setAttribute('src', `${obj.media.reddit_video.fallback_url}`);
            thumbnailImg.setAttribute('controls', '')
            thumbnailContainer.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        } else if (obj.thumbnail === 'self' && obj.url.includes('reddit') || obj.thumbnail === 'nsfw' || obj.thumbnail === 'spoiler') {
            const thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'thumbnail');
            thumbnailImg.setAttribute('src', '../assets/icons8-no-image-100.png')
            thumbnailContainer.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        } else if (obj.thumbnail === 'image') {
            const imgLink = document.createElement('a');
            imgLink.setAttribute('href', `${obj.url}`);
            imgLink.setAttribute('target', '_blank')
            imgLink.setAttribute('class', 'link')
            thumbnailContainer.appendChild(imgLink)
            const thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'thumbnail');
            thumbnailImg.setAttribute('src', `${obj.url}`)
            imgLink.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        } else if (obj.thumbnail === 'default') {
            const imgLink = document.createElement('a');
            imgLink.setAttribute('href', `${obj.url}`);
            imgLink.setAttribute('target', '_blank')
            imgLink.setAttribute('class', 'link')
            thumbnailContainer.appendChild(imgLink)
            const thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'thumbnail');
            thumbnailImg.setAttribute('src', '../assets/icons8-no-image-100.png')
            imgLink.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        } else if (obj.media && obj.media.oembed) {
            const imgLink = document.createElement('a');
            imgLink.setAttribute('href', `${obj.url}`);
            imgLink.setAttribute('target', '_blank')
            imgLink.setAttribute('class', 'link')
            thumbnailContainer.appendChild(imgLink)
            const thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'thumbnail');
            thumbnailImg.setAttribute('src', `${obj.thumbnail}`)
            imgLink.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        } else if (!obj.media) {
            const imgLink = document.createElement('a');
            imgLink.setAttribute('href', `${obj.url}`);
            imgLink.setAttribute('target', '_blank')
            imgLink.setAttribute('class', 'link')
            thumbnailContainer.appendChild(imgLink)
            const thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'thumbnail');
            thumbnailImg.setAttribute('src', `${obj.thumbnail}`)
            imgLink.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        };

        const numComments = document.createElement('span');
        numComments.setAttribute('class', 'num-comments');
        numComments.innerText = `${obj.num_comments} comments`;
        post.appendChild(numComments);

        const upvotes = document.createElement('span');
        upvotes.setAttribute('class', 'upvotes');
        upvotes.innerText = ` with ${obj.ups} upvotes`;
        post.appendChild(upvotes);

        const commentBox = document.createElement('div');
        commentBox.setAttribute('class', 'comment-box');
        post.appendChild(commentBox);

        const permalink = obj.permalink;

        numComments.addEventListener('click', async () => {
            if (commentBox.firstChild) {
                commentBox.innerHTML = '';
            } else {
                const comments = await generateComments(permalink)
                commentBox.innerHTML = comments;
            }
        });

        pageAll.push(post)
    });

    contentBox.innerText = '';

    document.getElementById('content-header').innerText = 'r/all';
    document.getElementById('all-button').style.backgroundColor = 'gray';
    document.getElementById('popular-button').style.backgroundColor = '';

    contentBox.append(...pageAll);
});