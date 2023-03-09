import { convertEpoch } from "../util/helper-functions.js";

export const generateComments = async (permalink) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const json = await response.json();
    const commentsData = json[1].data.children.map(comment => comment.data);

    commentsData.pop();

    const commentsArray = commentsData.map((comment) => {
        let template = document.createElement('template');
        template.innerHTML = comment.body_html;
        let commentBody = template.content.lastChild.data;

        return `<div class="comment-info"><span class="com-author">By ${comment.author} </span><span class="com-time">at ${convertEpoch(comment.created)}</span></div>${commentBody}`;
    }).join('');

    return commentsArray;
};