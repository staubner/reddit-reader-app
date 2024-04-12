export const pageRender = (pageData, epoch, generateComments) => {
    const post = document.createElement('div');
    post.setAttribute('class', 'post');

    const postTitle = document.createElement('h3');
    postTitle.setAttribute('class', 'post-title');
    postTitle.innerText = `${pageData.title}`;
    post.appendChild(postTitle);

    const postTime = document.createElement('span');
    postTime.setAttribute('class', 'post-time');
    postTime.innerText = `Posted ${epoch(pageData.created)} `;
    post.appendChild(postTime);

    const postAuthor = document.createElement('span');
    postAuthor.setAttribute('class', 'post-author');
    postAuthor.innerText = `by ${pageData.author} `;
    post.appendChild(postAuthor);

    const subreddit = document.createElement('span');
    subreddit.setAttribute('class', 'subreddit');
    subreddit.innerText = `on ${pageData.subreddit_name_prefixed} `;
    post.appendChild(subreddit);

    const thumbnailContainer = document.createElement('div')
    thumbnailContainer.setAttribute('id', 'thumbnail-container');


    if (pageData.media && pageData.media.reddit_video) {
        const thumbnailImg = document.createElement('video');
        //video element
        thumbnailImg.setAttribute('class', 'video');
        thumbnailImg.setAttribute('type', 'video/mp4');
        thumbnailImg.setAttribute('controls', '');
        const vidSource = document.createElement('source');
        const vidUrl = pageData.media.reddit_video.fallback_url.slice(0, 45);
        vidSource.setAttribute('src', `${vidUrl}`)
        thumbnailImg.appendChild(vidSource);
        //audio
        if (pageData.media.reddit_video.has_audio) {
            const audio = document.createElement('audio');
            audio.setAttribute('controls', '');
            audio.setAttribute('type', 'audio/mp4');
            const audioSource = document.createElement('source');
            const audioUrl = pageData.media.reddit_video.fallback_url.slice(0, 36);
            audioSource.setAttribute('src', `${audioUrl}_AUDIO_128.mp4`)
            audio.appendChild(audioSource);
            thumbnailImg.appendChild(audio);
            thumbnailImg.onplay = function () { audio.play() };
            thumbnailImg.onpause = function () { audio.pause() };
            thumbnailImg.onseeking = function () { audio.currentTime = thumbnailImg.currentTime ;}
        }
        thumbnailContainer.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (pageData.thumbnail === 'self' && pageData.url.includes('reddit') || pageData.thumbnail === 'nsfw' || pageData.thumbnail === 'spoiler') {
        const noImage = document.createElement('p');
        noImage.setAttribute('class', 'no-image');
        noImage.innerHTML = 'No image or link  ¯\\_(ツ)_/¯'
        thumbnailContainer.appendChild(noImage);
        post.appendChild(noImage);
    } else if (pageData.thumbnail === 'image') {
        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${pageData.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        const thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', `${pageData.url}`)
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (pageData.thumbnail === 'default') {
        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${pageData.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        const thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', '../assets/icons8-no-image-100.png')
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (pageData.media && pageData.media.oembed) {
        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${pageData.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        const thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', `${pageData.thumbnail}`)
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    } else if (!pageData.media) {
        const imgLink = document.createElement('a');
        imgLink.setAttribute('href', `${pageData.url}`);
        imgLink.setAttribute('target', '_blank')
        imgLink.setAttribute('class', 'link')
        thumbnailContainer.appendChild(imgLink)
        const thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('class', 'thumbnail');
        thumbnailImg.setAttribute('src', `${pageData.thumbnail}`)
        imgLink.appendChild(thumbnailImg);
        post.appendChild(thumbnailContainer);
    };

    const numComments = document.createElement('span');
    numComments.setAttribute('class', 'num-comments');
    numComments.innerText = `${pageData.num_comments} comments`;
    post.appendChild(numComments);

    const upvotes = document.createElement('span');
    upvotes.setAttribute('class', 'upvotes');
    upvotes.innerText = ` with ${pageData.ups} upvotes`;
    post.appendChild(upvotes);

    const commentBox = document.createElement('div');
    commentBox.setAttribute('class', 'comment-box');
    post.appendChild(commentBox);


    const permalink = pageData.permalink;

    numComments.addEventListener('click', async () => {
        if (commentBox.firstChild) {
            commentBox.innerHTML = '';
        } else {
            commentBox.innerHTML = 'Loading...'
            const comments = await generateComments(permalink)
            commentBox.innerHTML = comments;
        }
    });

    return post;
}