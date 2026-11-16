import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import api from "./api";

// Helper: always send a fresh Firebase ID token
async function authHeaders(forceRefresh = false) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated Firebase user found.");
  }

  const token = await user.getIdToken(forceRefresh);

  return { Authorization: `Bearer ${token}` };
}

export const authService = {
  async login(email, password) {
    // 1. Firebase performs the real login in the browser
    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );

    // 2. The backend has no password login. Load the profile with the ID token.
    //    (POST /auth/login always returns 400 by design, so it is not called.)
    const token = await credential.user.getIdToken(true);

    const { data } = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  },

  async registerCompany(payload) {
    const { email, password, ...company } = payload;

    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    );
    const token = await credential.user.getIdToken(true);

    const { data } = await api.post("/auth/register-company", company, {
      headers: { Authorization: `Bearer ${token}` },
    });

    await sendEmailVerification(credential.user);

    return data;
  },

  async forgotPassword(email) {
    return await sendPasswordResetEmail(auth, email.trim());
  },

  async logout() {
    await signOut(auth);
  },

  async profile() {
    const headers = await authHeaders();

    const { data } = await api.get("/auth/me", { headers });

    return data;
  },
};
