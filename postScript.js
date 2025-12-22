const SERVER = "http://localhost:3000";
const id = new URLSearchParams(location.search).get("id");

// HTML 요소 선택
const postTitle = document.getElementById("postTitle");
const postContent = document.getElementById("postContent");
const commentsDiv = document.getElementById("comments");
const commentInput = document.getElementById("commentInput");

// 게시글 로드
async function loadPost() {
  const res = await fetch(`${SERVER}/posts/${id}`);
  const post = await res.json();

  postTitle.innerText = post.title;
  postContent.innerText = post.content;

  commentsDiv.innerHTML = "";
  post.comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerText = c;
    commentsDiv.appendChild(div);
  });
}

// 댓글 추가
async function addComment() {
  const text = commentInput.value.trim();
  if (!text) return;

  await fetch(`${SERVER}/posts/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment: text })
  });

  commentInput.value = "";
  loadPost();
}

loadPost();
