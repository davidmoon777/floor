const SERVER = "http://localhost:3000";
const id = new URLSearchParams(location.search).get("id");

async function loadPost() {
  const res = await fetch(`${SERVER}/posts/${id}`);
  const post = await res.json();

  postTitle.innerText = post.title;
  postContent.innerText = post.content;

  comments.innerHTML = "";
  post.comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerText = c;
    comments.appendChild(div);
  });
}

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
