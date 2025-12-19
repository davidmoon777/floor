import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// URL에서 postId 가져오기
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
if (!postId) { alert("게시글이 없습니다"); location.href="index.html"; }

// 게시글 불러오기
const postRef = doc(db, "floors/floor1/posts", postId);
getDoc(postRef).then(docSnap => {
  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("postTitle").textContent = data.title;
    document.getElementById("postContent").textContent = data.content;
    document.getElementById("postNick").textContent = data.nickname;
  } else { alert("글을 찾을 수 없습니다"); }
});

// 댓글 컬렉션
const commentsRef = collection(db, `floors/floor1/posts/${postId}/comments`);
const q = query(commentsRef, orderBy("createdAt", "asc"));

onSnapshot(q, snapshot => {
  const container = document.getElementById("comments");
  container.innerHTML = "";
  snapshot.forEach(docSnap => {
    const c = docSnap.data();
    const el = document.createElement("div");
    el.className = "comment";
    el.textContent = `${c.nickname}: ${c.content}`;
    container.appendChild(el);
  });
});

// 댓글 작성
document.getElementById("commentBtn").onclick = async () => {
  const content = document.getElementById("commentContent").value.trim();
  if (!content) return;
  const nick = "익명" + Math.floor(Math.random()*10000);
  await addDoc(commentsRef, {
    nickname: nick,
    content: content,
    createdAt: serverTimestamp()
  });
  document.getElementById("commentContent").value = "";
};
