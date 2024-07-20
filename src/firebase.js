
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAMm-ymghexZio1aYuRszhgYe-Vwq4F1cE",
    authDomain: "codsoft-internship.firebaseapp.com",
    projectId: "codsoft-internship",
    storageBucket: "codsoft-internship.appspot.com",
    messagingSenderId: "228307969855",
    appId: "1:228307969855:web:4b26f57933625527b2958a"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
