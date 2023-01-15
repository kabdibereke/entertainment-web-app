import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLD3w06SEclr_zx34d4DLT2tNsIIaQwb4",
  authDomain: "entertainment-web-app-9348b.firebaseapp.com",
  databaseURL: "https://entertainment-web-app-9348b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "entertainment-web-app-9348b",
  storageBucket: "entertainment-web-app-9348b.appspot.com",
  messagingSenderId: "682711220873",
  appId: "1:682711220873:web:cbb0fd96ec4110ab0a7c58"
};

const app =!getApps().length ? initializeApp(firebaseConfig) :getApp()

export const auth = getAuth(app);
export const db = getDatabase(app)
export default app