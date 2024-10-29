import React from "react";
import { auth, db, GoogleAuthProvider, signInWithPopup, doc, setDoc } from "./firebase";

const LoginWithGoogle = () => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Dados do usuário
      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
      };

      // Salvar ou atualizar o documento do usuário no Firestore
      await setDoc(doc(db, "users", user.uid), userData);

      console.log("Usuário salvo no Firestore:", userData);
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>Login com Google</button>
  );
};

export default LoginWithGoogle;
