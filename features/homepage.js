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

// console.log(rAll)

//handle r/popular data
const redditDataPopular = await redditPopular();

const popular = redditDataPopular.map(obj => obj.data);

const pagePopular = [];

// console.log(popular)

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
    numComments.setAttribute('data-permalink', `${obj.permalink}`)
    numComments.innerText = `${obj.num_comments} comments`;
    post.appendChild(numComments);

    let upvotes = document.createElement('span');
    upvotes.setAttribute('class', 'upvotes');
    upvotes.innerText = ` with ${obj.ups} upvotes`;
    post.appendChild(upvotes);

    pageAll.push(post)

    const postComments = document.querySelectorAll('.num-comments')

// console.log(postComments);

postComments.forEach((post) => {
    post.addEventListener('click', async () => {
        let permalink = post.dataset.permalink;
        let postBox = document.querySelector('.post')

        const getComments = async () => {
            const response = await fetch(`https://www.reddit.com${permalink}.json`);
            const json = await response.json();
            return json[1].data.children;
        };

        const commentData = await getComments();

        const commentsArray = commentData.map(comment => comment.data);

        console.log(commentsArray)


        const commentBox = document.createElement('div');
        commentBox.setAttribute('class', 'comment-box');

        let comAuthor = document.createElement('span');
        comAuthor.setAttribute('class', 'author');
        comAuthor.innerText = `${post.author} `;
        commentBox.appendChild(comAuthor);

        let comTime = document.createElement('span');
        comTime.setAttribute('class', 'comment-time');
        comTime.innerText = `${convertEpoch(post.created)}`;
        commentBox.appendChild(comTime);

        let commentList = document.createElement('div')
        commentList.setAttribute('class', 'comments')

        commentsArray.forEach((comment) => {
            let commentText = document.createElement('div');
            commentText.innerHTML = `${comment.body_html}`
            commentList.appendChild(commentText);
        })

        // console.log(commentList)

        commentBox.appendChild(commentList);

        postBox.appendChild(commentBox)
    });
});
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
    numComments.setAttribute('data-permalink', `${obj.permalink}`)
    numComments.innerText = `${obj.num_comments} comments`;
    post.appendChild(numComments);

    let upvotes = document.createElement('span');
    upvotes.setAttribute('class', 'upvotes');
    upvotes.innerText = ` with ${obj.ups} upvotes`;
    post.appendChild(upvotes);

    pagePopular.push(post)

    const postComments = document.querySelectorAll('.num-comments')

// console.log(postComments);

postComments.forEach((post) => {
    post.addEventListener('click', async () => {
        let permalink = post.dataset.permalink;
        let postBox = document.querySelector('.post')

        const getComments = async () => {
            const response = await fetch(`https://www.reddit.com${permalink}.json`);
            const json = await response.json();
            return json[1].data.children;
        };

        const commentData = await getComments();

        const commentsArray = commentData.map(comment => comment.data);

        console.log(commentsArray)


        const commentBox = document.createElement('div');
        commentBox.setAttribute('class', 'comment-box');

        let comAuthor = document.createElement('span');
        comAuthor.setAttribute('class', 'author');
        comAuthor.innerText = `${post.author} `;
        commentBox.appendChild(comAuthor);

        let comTime = document.createElement('span');
        comTime.setAttribute('class', 'comment-time');
        comTime.innerText = `${convertEpoch(post.created)}`;
        commentBox.appendChild(comTime);

        let commentList = document.createElement('div')
        commentList.setAttribute('class', 'comments')

        commentsArray.forEach((comment) => {
            let commentText = document.createElement('div');
            commentText.innerHTML = `${comment.body_html}`
            commentList.appendChild(commentText);
        })

        // console.log(commentList)

        commentBox.appendChild(commentList);

        postBox.appendChild(commentBox)
    });
});
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
/* const postLinks = document.querySelectorAll('.thumbnail-container')

postLinks.forEach(post => console.log(post.dataset.link))

postLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (link.dataset.link) {
            window.location.href = `${link.dataset.link}`
        };
    })
}) */

// const postComments = document.querySelectorAll('.num-comments')

// // console.log(postComments);

// postComments.forEach((post) => {
//     post.addEventListener('click', async () => {
//         let permalink = post.dataset.permalink;
//         let postBox = document.querySelector('.post')

//         const getComments = async () => {
//             const response = await fetch(`https://www.reddit.com${permalink}.json`);
//             const json = await response.json();
//             return json[1].data.children;
//         };

//         const commentData = await getComments();

//         const commentsArray = commentData.map(comment => comment.data);

//         console.log(commentsArray)


//         const commentBox = document.createElement('div');
//         commentBox.setAttribute('class', 'comment-box');

//         let comAuthor = document.createElement('span');
//         comAuthor.setAttribute('class', 'author');
//         comAuthor.innerText = `${post.author} `;
//         commentBox.appendChild(comAuthor);

//         let comTime = document.createElement('span');
//         comTime.setAttribute('class', 'comment-time');
//         comTime.innerText = `${convertEpoch(post.created)}`;
//         commentBox.appendChild(comTime);

//         let commentList = document.createElement('div')
//         commentList.setAttribute('class', 'comments')

//         commentsArray.forEach((comment) => {
//             let commentText = document.createElement('div');
//             commentText.innerHTML = `${comment.body_html}`
//             commentList.appendChild(commentText);
//         })

//         // console.log(commentList)

//         commentBox.appendChild(commentList);

//         postBox.appendChild(commentBox)
//     });
// });