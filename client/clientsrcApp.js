import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-backend-url"; // we fix later

function App() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/api/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    const formData = new FormData();
    formData.append("text", text);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await axios.post(`${API_URL}/api/posts`, formData);
    fetchPosts();
  };

  return (
    <div>
      <h1>M.O.G Platform</h1>

      <textarea onChange={(e) => setText(e.target.value)} />
      <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      <button onClick={createPost}>Post</button>

      {posts.map((p) => (
        <div key={p._id}>
          <p>{p.text}</p>
          {p.images.map((img, i) => (
            <img key={i} src={`${API_URL}/${img}`} width="200" alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
