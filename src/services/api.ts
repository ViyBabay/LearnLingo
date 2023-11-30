import { auth, db } from "@/firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  Auth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

interface RegisterParams {
  email: string;
  password: string;
}

export const register = async ({
  email,
  password,
}: RegisterParams): Promise<UserCredential | void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({
  email,
  password,
}: LoginParams): Promise<UserCredential | void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTeachers = async () => {
  try {
    const teachersCollection = collection(db, "teachers");
    const teachersSnapshot = await getDocs(teachersCollection);

    const teachersData = teachersSnapshot.docs.map((doc) => doc.data());

    return teachersData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
