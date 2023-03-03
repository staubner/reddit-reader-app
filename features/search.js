import { convertEpoch } from "../util/helper-functions.js";

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    //send search results
    const getSearch = async () => {
        const response = await fetch(`https://www.reddit.com/search.json?q=${event.target[0].value}`);
        const json = await response.json();
        return json.data.children;
    }

    /* try {
        const test = await getSearch();
    } catch (error) {
        alert(`${error.name}: ${error.message}`)
    } */

    const searchResults = await getSearch();

    const searchData = searchResults.map(obj => obj.data);

    const contentBox = document.getElementById('content');

    console.log(searchData)

    const pageSearch = [];

    searchData.forEach((obj) => {

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

        pageSearch.push(post);
    })

    while (contentBox.firstChild) {
        contentBox.removeChild(contentBox.firstChild)
    }

    contentBox.append(...pageSearch);

    document.getElementById('content-header').innerText = `Search Results for "${event.target[0].value}"`

    document.getElementById('search-text').value = '';
});