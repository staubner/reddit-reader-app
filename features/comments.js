import { convertEpoch } from "../util/helper-functions.js";


//creates links to individual posts and sets listeners

//post permalink returns array with two elements, [1] contains comments. 
// [1].data.children[0].data.body_html injected by innerHTML?

// console.log(postCommentsHome)


export const generateComments = async (postComments) => {
    postComments.forEach((post) => {
        post.addEventListener('click', async () => {
            let permalink = post.dataset.permalink;
            let postBox = document.querySelector('.post')

            const getComments = async () => {
                const response = await fetch(`https://www.reddit.com${permalink}.json`);
                const json = await response.json();
                return json[1].data.children;
                // console.log(json)
            };

            const commentData = await getComments();

            console.log(commentData)

            const commentsArray = commentData.map(comment => comment.data);

            // const commentsHTML = commentData.map(comment => comment.data.body_html).join('');

            // console.log(commentsHTML)
            // console.log(commentsArray)

            const commentBox = document.createElement('div');
            commentBox.setAttribute('class', 'comment-box');

            commentsArray.forEach((comment) => {


                let comAuthor = document.createElement('span');
                comAuthor.setAttribute('class', 'author');
                comAuthor.innerText = `${comment.author} `;
                commentBox.appendChild(comAuthor);

                let comTime = document.createElement('span');
                comTime.setAttribute('class', 'comment-time');
                comTime.innerText = `${convertEpoch(comment.created)}`;
                commentBox.appendChild(comTime);

                let commentText = document.createElement('div');

                commentText.innerHTML = comment.body_html;

                // console.log(commentList)


            })
            postBox.appendChild(commentBox)
        });
    });
};