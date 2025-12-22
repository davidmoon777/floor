const SERVER = "http://localhost:3000";

// HTML 요소 선택
const mainScreen = document.getElementById("mainScreen");
const postList = document.getElementById("postList");
const writer = document.getElementById("writer");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const writeBtn = document.getElementById("writeBtn");

// 1층 입장
function enterFloor() {
  mainScreen.classList.add("hidden");      // 메인 화면 숨김
  postList.classList.remove("hidden");     // 게시글 목록 표시
  writeBtn.classList.remove("hidden");     // 글쓰기 버튼 표시
  loadPosts();                              // 게시글 불러오기
}

// 게시글 목록 로딩
async function loadPosts() {
  const res = await fetch(`${SERVER}/posts`);
  const posts = await res.json();

  postList.innerHTML = "";

  posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<h3>${p.title}</h3>`;
    div.onclick = () => location.href = `post.html?id=${p.id}`;
    postList.appendChild(div);
  });
}

// 글쓰기 모달 열기/닫기
function openWriter() { writer.classList.remove("hidden"); }
function closeWriter() { writer.classList.add("hidden"); }

// 글쓰기 제출
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
