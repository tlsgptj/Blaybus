// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiOQOwLapepWd8qQEe8aEZM48h9VbvC9c",
  authDomain: "blaybus-10c93.firebaseapp.com",
  projectId: "blaybus-10c93",
  storageBucket: "blaybus-10c93.appspot.com", // 'firebasestorage.app' -> 'appspot.com'으로 수정
  messagingSenderId: "391720257981",
  appId: "1:391720257981:web:89820ba83d0ba14486ead4",
  measurementId: "G-79K92P0RJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app); // Analytics를 사용하지 않을 경우 이 라인을 삭제해도 무방합니다.

// Export the initialized Firebase app
export default app;
