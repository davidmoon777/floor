const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const DATA_FILE = "./posts.json";

// 초기 데이터 불러오기
let posts = [];
if (fs.existsSync(DATA_FILE)) {
  posts = JSON.parse(fs.readFileSync(DATA_FILE));
}

// 게시글 목록 가져오기
app.get("/posts", (req, res) => {
  res.json(posts);
});

// 게시글 생성
app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    comments: []
  };
  posts.push(newPost);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.json(newPost);
});

// 특정 게시글 가져오기
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

// 댓글 추가
app.post("/posts/:id/comments", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Not found" });

  const { comment } = req.body;
  post.comments.push(comment);
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
  res.json(post);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
