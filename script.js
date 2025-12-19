import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, updateDoc, doc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// --- Firebase 설정 ---
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postsRef = collection(db, "floors/floor1/posts");

// --- 실시간 게시글 불러오기 ---
const q = query(postsRef, orderBy("lastActivityAt", "desc"), limit(200));
onSnapshot(q, snapshot => {
  const container = document.getElementById("posts");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    if (data.fogged) return;

    const el = document.createElement("div");
    el.className = "post";
    el.innerHTML = `<div class="nick">${data.nickname}</div><div class="content">${data.content}</div>`;

    // 댓글 표시
    if (data.comments && data.comments.length) {
      data.comments.forEach(c => {
        const cEl = document.createElement("div");
        cEl.className = "comment";
        cEl.textContent = `${c.nickname}: ${c.content}`;
        el.appendChild(cEl);
      });
    }

    container.appendChild(el);
  });
});

// --- 글 작성 ---
const submitBtn = document.getElementById("submitBtn");
const closeBtn = document.getElementById("closeBtn");
submitBtn.onclick = async () => {
  const text = document.getElementById("content").value.trim();
  const commentText = document.getElementById("commentContent").value.trim();
  if (!text && !commentText) return;

  const nick = "익명" + Math.floor(Math.random()*10000);

  const docRef = await addDoc(postsRef, {
    content: text || "(댓글만 작성됨)",
    nickname: nick,
    createdAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
    comments: [],
    fogged: false
  });

  if (commentText) {
    await updateDoc(doc(db, "floors/floor1/posts", docRef.id), {
      comments: arrayUnion({nickname: nick, content: commentText, createdAt: serverTimestamp()}),
      lastActivityAt: serverTimestamp()
    });
  }

  document.getElementById("content").value = "";
  document.getElementById("commentContent").value = "";
  closeWriter();
};

// 글쓰기 창 열기/닫기
const writeBtn = document.getElementById("writeBtn");
writeBtn.onclick = () => { document.getElementById("writer").style.display = "flex"; };
closeBtn.onclick = () => { document.getElementById("writer").style.display = "none"; };

function closeWriter() { document.getElementById("writer").style.display = "none"; }
