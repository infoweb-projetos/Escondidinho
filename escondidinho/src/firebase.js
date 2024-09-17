// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDE_ssUi_UrAf0zqLyC65DqPF4E49m69NU",
  authDomain: "escondidinho-6b4dd.firebaseapp.com",
  projectId: "escondidinho-6b4dd",
  storageBucket: "escondidinho-6b4dd.appspot.com",
  messagingSenderId: "921529239055",
  appId: "1:921529239055:web:52b616a034ab747b26857a",
  measurementId: "G-70C587K8NV"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Exportar o auth e o GoogleAuthProvider para uso em outros lugares
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
