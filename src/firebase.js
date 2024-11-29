// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDoc, doc} from "firebase/firestore";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPmE5CLXnEAjhw9wqER58iEuQ0zG3O95E",
    authDomain: "mediplanner-98f05.firebaseapp.com",
    databaseURL: "https://mediplanner-98f05-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "mediplanner-98f05",
    storageBucket: "mediplanner-98f05.firebasestorage.app",
    messagingSenderId: "745207549127",
    appId: "1:745207549127:web:6a593005b9ee3c0caec2e2",
    measurementId: "G-8TYENKFQLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
export { addDoc, collection , auth, getDoc, doc, db, ref, set, push, get, remove};
