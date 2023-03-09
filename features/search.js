import { convertEpoch } from "../util/helper-functions.js";
import { generateComments } from "./comments.js";

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    //send search terms
    const getSearch = async () => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${event.target[0].value}`);
        const json = await response.json();
        return json.data.children;
    }

    const searchResults = await getSearch();

    const searchData = searchResults.map(obj => obj.data);

    const contentBox = document.getElementById('content');

    const pageSearch = [];

    searchData.forEach((obj) => {

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
            thumbnailImg.setAttribute('type', 'video/mp4');
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
        numComments.setAttribute('data-permalink', `${obj.permalink}`)
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

        pageSearch.push(post);
    })

    while (contentBox.firstChild) {
        contentBox.removeChild(contentBox.firstChild)
    };

    document.getElementById('content-header').innerText = `Search Results for "${event.target[0].value}"`

    document.getElementById('search-text').value = '';

    document.getElementById('all-button').style.backgroundColor = '';
    document.getElementById('popular-button').style.backgroundColor = '';

    contentBox.append(...pageSearch);
});