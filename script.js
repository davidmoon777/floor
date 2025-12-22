const SERVER = "http://localhost:3000";

// 화면 전환: 환영 → 게시판
function enterFloor() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("postList").classList.remove("hidden");
  document.getElementById("writeBtn").classList.remove("hidden");
  loadPosts();
}

// 게시글 목록 로딩
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

// 글쓰기
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

// 글쓰기 모달 열기/닫기
function openWriter() {
  writer.classList.remove("hidden");
}
function closeWriter() {
  writer.classList.add("hidden");
}
