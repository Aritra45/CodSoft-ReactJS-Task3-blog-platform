
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";

const BlogPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (id) {
      const loadPost = async () => {
        try {
          const postRef = doc(firestore, 'posts', id);
          const postSnap = await getDoc(postRef);
          if (postSnap.exists()) {
            const post = postSnap.data();
            setTitle(post.title);
            setContent(post.content);
            setIsEditing(true);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };
      loadPost();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true); 

      if (isEditing) {
        const postRef = doc(firestore, 'posts', id);
        await updateDoc(postRef, { title, content });
      } else {
        await addDoc(collection(firestore, 'posts'), { title, content, createdAt: new Date() });
      }

      navigate(`/`); 
    } catch (error) {
      console.error("Error saving post:", error);
      
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Saving...</p>; 
  }

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleSave} disabled={loading}>{isEditing ? 'Update' : 'Create'}</button>
    </div>
  );
};

export default BlogPostForm;
