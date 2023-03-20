import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB_q3hIYn78NnmNblVj3JPRDALTRuSCqTs",
	authDomain: "entertainment-web-app-e5ad0.firebaseapp.com",
	databaseURL:
		"https://entertainment-web-app-e5ad0-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "entertainment-web-app-e5ad0",
	storageBucket: "entertainment-web-app-e5ad0.appspot.com",
	messagingSenderId: "803798143684",
	appId: "1:803798143684:web:3929ad0020ed8ce3d7ef91",
};

const app =!getApps().length ? initializeApp(firebaseConfig) :getApp()

export const auth = getAuth(app);
export const db = getDatabase(app)
export default app