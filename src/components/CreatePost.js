
import React, { useState, useContext } from 'react';
import { savePost } from '../services/postService'; 
import { AuthContext } from '../context/AuthContext'; 

const CreatePost = () => {
  const [postContent, setPostContent] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      
      const currentUserEmail = currentUser.email; 

      await savePost(currentUserEmail, postContent);
      alert('Post created successfully!');
      setPostContent(''); 
    } catch (error) {
      console.error('Error creating post: ', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <div className="create-post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="Write your post..."
          rows="5"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
