
import { firestore } from '../firebase'; 
import { addDoc, collection } from 'firebase/firestore';

const savePost = async (userEmail, postContent) => {
  try {
    const postsRef = collection(firestore, 'posts');
    const newPostRef = await addDoc(postsRef, {
      userEmail: userEmail,
      content: postContent,
      createdAt: new Date()
    });
    console.log("Post added with ID: ", newPostRef.id);
    return newPostRef.id; 
  } catch (error) {
    console.error("Error adding post: ", error);
    throw error; 
  }
};

export { savePost };
