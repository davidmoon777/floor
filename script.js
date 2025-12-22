const SERVER = "http://localhost:3000";

async function loadPosts() {
  const res = await fetch(`${SERVER}/posts`);
  const posts = await res.json();

  const list = document.getElementById("postList");
  list.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${p.title}</h3>`;
    div.onclick = () => {
      location.href = `post.html?id=${p.id}`;
    };
    list.appendChild(div);
  });
}

async function submitPost() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  if (!title || !content) return;

  await fetch(`${SERVER}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  closeWriter();
  loadPosts();
}

function openWriter() {
  writer.classList.remove("hidden");
}
function closeWriter() {
  writer.classList.add("hidden");
}

loadPosts();
