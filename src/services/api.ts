import { auth, db } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import {
  DocumentSnapshot,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface UserData {
  name: string | null;
  email: string | null;
}

export const register = async ({
  name,
  email,
  password,
}: RegisterParams): Promise<UserData | void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    if (user) {
      const typedUser: FirebaseUser = user;

      await updateProfile(typedUser, {
        displayName: name,
      });
      const data = {
        name: user.displayName,
        email: user.email,
      };

      return data;
    }
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
}: LoginParams): Promise<UserData | void> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const data = {
      name: user.displayName,
      email: user.email,
    };

    return data;
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

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: {
    [key: string]: boolean;
  };
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
  favorite: boolean;
}

export const getAllTeachersForFilters = async () => {
  try {
    const teachersCollection = collection(db, "teachers");
    const teachersSnapshot = await getDocs(teachersCollection);

    const teachersData = teachersSnapshot.docs.map((doc) => doc.data());

    const uniqueLanguages = [
      ...new Set(teachersData.flatMap((teacher) => teacher.languages)),
    ];
    const uniqueLevels = [
      ...new Set(
        teachersData.flatMap((teacher) => Object.keys(teacher.levels))
      ),
    ];
    const uniquePrices = [
      ...new Set(teachersData.map((teacher) => teacher.price_per_hour)),
    ];

    return {
      uniqueLanguages,
      uniqueLevels,
      uniquePrices,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

interface SearchParams {
  languages?: string;
  level?: string;
  price?: string;
}

interface Result {
  teachers: Teacher[];
  lastVisible?: DocumentSnapshot;
}

export const getTeachersData = async (
  searchParams: SearchParams = {},
  lastDoc: DocumentSnapshot | null = null
): Promise<Result> => {
  const { languages, level, price } = searchParams;
  const pageSize = 4;
  let q = query(collection(db, "teachers"));

  if (languages && languages !== "---") {
    q = query(q, where("languages", "array-contains", languages));
  }
  if (level && level !== "---") {
    q = query(q, where(`levels.${level}`, "==", true));
  }
  if (price && price !== "---") {
    const priceNumber = parseInt(price);
    if (!isNaN(priceNumber)) {
      q = query(q, where("price_per_hour", "==", priceNumber));
    }
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  try {
    const documentSnapshots = await getDocs(q);
    let favoriteTeacherIds = [];

    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const favoritesSnapshot = await getDocs(
        query(collection(db, "favorites"), where("userId", "==", userId))
      );

      favoriteTeacherIds = favoritesSnapshot.docs.map(
        (doc) => doc.data().teacherId
      );
      console.log(`favoriteTeacherIds:`, favoriteTeacherIds);
    } else {
      console.log("User is not logged in, skipping favorites query.");
    }

    const teachers: Teacher[] = documentSnapshots.docs.map((doc) => {
      const isFavorite = favoriteTeacherIds.includes(doc.id);
      return {
        id: doc.id,
        ...doc.data(),
        favorite: isFavorite,
      } as Teacher;
    });

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    return { teachers, lastVisible };
  } catch (error: any) {
    console.error("Error in getTeachersData:", error);
    throw new Error("Error in getTeachersData: " + error.message);
  }
};

export const getFavorites = async (
  lastDoc: DocumentSnapshot | null = null,
  pageSize: number = 4
) => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("User is not authorized");
  }

  try {
    let q = query(collection(db, "favorites"), where("userId", "==", userId));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc), limit(pageSize));
    } else {
      q = query(q, limit(pageSize));
    }

    const querySnapshot = await getDocs(q);
    const favorites = querySnapshot.docs.map((doc) => doc.data().teacherId);

    const teachers = [];
    for (const teacherId of favorites) {
      const docRef = doc(db, "teachers", teacherId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        teachers.push({
          id: docSnap.id,
          ...docSnap.data(),
          favorite: true,
        });
      }
    }

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { teachers, lastVisible };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getTrialTeacher = async () => {};
