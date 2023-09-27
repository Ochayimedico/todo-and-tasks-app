import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDDUhTMFu2mqqCLVFko1ioam6F0DIrxuEg",
  authDomain: "todos-and-tasks-lists.firebaseapp.com",
  databaseURL: "https://todos-and-tasks-lists-default-rtdb.firebaseio.com",
  projectId: "todos-and-tasks-lists",
  storageBucket: "todos-and-tasks-lists.appspot.com",
  messagingSenderId: "394919320364",
  appId: "1:394919320364:web:61d5e49fd62452af5f6a89",
  measurementId: "G-L2DPYMSDNK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// const analytics = getAnalytics(app);
