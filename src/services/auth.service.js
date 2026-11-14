import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import api from "./api";

export const authService = {
  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const token = await credential.user.getIdToken(true);

    const { data } = await api.post(
      "/auth/login",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  },

  async registerCompany(payload) {
    const { email, password, ...company } = payload;
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const token = await credential.user.getIdToken(true);

    const { data } = await api.post(
      "/auth/register-company",
      company,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated Firebase user found.");
    }

    const token = await user.getIdToken();

    const { data } = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },
};