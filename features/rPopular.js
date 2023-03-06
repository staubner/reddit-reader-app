import { convertEpoch } from "../util/helper-functions.js";

//handle r/popular data
document.getElementById('popular-button').addEventListener('click', async () => {

    const redditPopular = async () => {
        const response = await fetch(`https://www.reddit.com/r/popular.json?limit=25`);
        const json = await response.json();
        return json.data.children;
    };

    const contentBox = document.getElementById('content');
    
    // handle r/all data
    const redditDataPopular = await redditPopular();

    const rPopular = redditDataPopular.map(obj => obj.data);

    const pagePopular = [];

    rPopular.forEach((obj) => {

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
            let thumbnailImg = document.createElement('img');
            thumbnailImg.setAttribute('class', 'thumbnail');
            thumbnailImg.setAttribute('src', '../src/icons8-no-image-100.png')
            thumbnailContainer.appendChild(thumbnailImg);
            post.appendChild(thumbnailContainer);
        } else if (obj.thumbnail === 'self' && obj.url.includes('reddit') || obj.thumbnail === 'nsfw') {
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
        } else if (obj.thumbnail === 'default' || obj.thumbnail === 'spoiler') {
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

        pagePopular.push(post)
    });


    while (contentBox.firstChild) {
        contentBox.removeChild(contentBox.firstChild);
    };

    contentBox.append(...pagePopular);
});