const endpoints = {
    posts: "http://localhost:3030/jsonstore/collections/myboard/posts",
    comments: "http://localhost:3030/jsonstore/collections/myboard/comments"
}

const mainRef = document.querySelector('main');
const themeContentRef = document.querySelector("div.theme-content");
const themeTitleRef = document.querySelector("div.theme-title");
const commentsRef = document.querySelector("div.comment");
const commentFormSectionRef = document.querySelector("div.answer");


let postId = null;
export async function showDetails(e) {
    mainRef.replaceChildren(themeContentRef);
    commentFormSectionRef?.querySelector('form').addEventListener("submit", onCreateComment);
    postId = e.currentTarget.dataset.id;

    const response = await fetch(endpoints.posts + "/" + id);
    const post = await response.json();
    const title = createPostTitle(post);
    const details = createPostDetails(post);
    const comments = await getComments();
    

    themeTitleRef.replaceChildren(title);
    commentsRef.replaceChildren(details);

    showComments(postId, Object.values(comments));

}

function showComments(postId, data) {
    const container = document.createElement('div');
    container.id = "user-comment";
    data.filter(x => x.postId === postId).forEach(x => {
        const comment = createComment(x)
        container.appendChild(comment)
    });
    commentsRef.appendChild(container);
}

function createComment(comment) {
    const container = document.createElement("div");
    container.classList.add('topic-name-wrapper');
    container.innerHTML = `
      <div class="topic-name">
        <p><strong>${comment.username}</strong> commented on <time>${comment.date}</time>
        </p>
        <div class="post-content">
          <p>${comment.postText}</p>
        </div>
      </div>`
      return container;

}

async function getComments() {
    const response = await fetch(endpoints.comments);
    const data = await response.json();
    return data;
}

function createPostTitle(post) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('theme-name-wrapper');
    divContainer.innerHTML = `
            <div class="theme-name">
                <h2>${post.title}</h2>
            </div>
            `

    return divContainer;
}

function createPostDetails(post) {
    const divContainer = document.createElement('div');
    divContainer.classList.add('header');
    divContainer.innerHTML = `
        <img src="./static/profile.png" alt="avatar">
        <p><span>${post.title}</span> posted on <time>${post.date}</time></p>
        <p class="post-content">${post.postText}</p>`

    return divContainer;
}
function onCreateComment(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const commentText = formData.get("postText");
    const username = formData.get("username");

    if (!commentText || !username) {
        return;
    }

    saveComment({ commentText, username,date: new Date, postId });
}
async function saveComment(data) {
    const option = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(endpoints.comments, option);
}
