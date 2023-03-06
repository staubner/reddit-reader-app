import { convertEpoch } from "../util/helper-functions.js";

//creates links to individual posts and sets listeners

//post permalink returns array with two elements, [1] contains comments. 
// [1].data.children[0].data.body_html injected by innerHTML?

let numComments = document.createElement('span');
numComments.setAttribute('class', 'num-comments');
numComments.setAttribute('data-permalink', `${obj.permalink}`)
numComments.innerText = `${obj.num_comments} comments`;
post.appendChild(numComments);

let upvotes = document.createElement('span');
upvotes.setAttribute('class', 'upvotes');
upvotes.innerText = ` with ${obj.ups} upvotes`;
post.appendChild(upvotes);

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
