// src/firebase.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  confirmPasswordReset,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDE_ssUi_UrAf0zqLyC65DqPF4E49m69NU",
  authDomain: "escondidinho-6b4dd.firebaseapp.com",
  projectId: "escondidinho-6b4dd",
  storageBucket: "escondidinho-6b4dd.appspot.com",
  messagingSenderId: "921529239055",
  appId: "1:921529239055:web:52b616a034ab747b26857a",
  measurementId: "G-70C587K8NV",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Função para redefinir senha
const resetPassword = async (oobCode, newPassword) => {
  try {
    console.log("Código de redefinição:", oobCode);
    await confirmPasswordReset(auth, oobCode, newPassword);
    console.log("Senha redefinida com sucesso!");
  } catch (error) {
    console.error("Erro ao redefinir a senha:", error.code, error.message);
    if (error.code === 'auth/invalid-action-code') {
      console.error("O código de ação é inválido. Verifique se o código foi copiado corretamente ou se não expirou.");
    }
  }
};

// Configuração do Google Auth
const googleProvider = new GoogleAuthProvider();

export { firebaseConfig, auth, googleProvider, signInWithPopup, resetPassword };
