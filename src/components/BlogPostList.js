
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const postRef = doc(firestore, 'posts', id);
      await deleteDoc(postRef);
      setPosts(posts.filter(post => post.id !== id)); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <Link to="/create" className="create-post-button">Create New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <Link to={`/edit/${post.id}`}>Edit</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostList;
