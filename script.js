import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsRef = collection(db, "floors/floor1/posts");
const q = query(postsRef, orderBy("lastActivityAt", "desc"), limit(200));

// 게시글 목록 실시간 불러오기
onSnapshot(q, snapshot => {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const p = docSnap.data();
    const el = document.createElement("div");
    el.className = "post";
    el.innerHTML = `<div class="title">${p.title}</div><div class="nick">${p.nickname}</div>`;
    el.onclick = () => { window.location.href = `post.html?id=${docSnap.id}`; }
    container.appendChild(el);
  });
});

// 글 작성
document.getElementById("submitBtn").onclick = async () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (!title && !content) return;

  const nick = "익명" + Math.floor(Math.random()*10000);
  await addDoc(postsRef, {
    title: title || "(제목 없음)",
    content: content || "(본문 없음)",
    nickname: nick,
    createdAt: serverTimestamp(),
    lastActivityAt: serverTimestamp()
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  closeWriter();
};

// 글쓰기 창 열기/닫기
document.getElementById("writeBtn").onclick = () => { document.getElementById("writer").style.display="flex"; };
document.getElementById("closeBtn").onclick = () => { document.getElementById("writer").style.display="none"; };
function closeWriter() { document.getElementById("writer").style.display="none"; }
