import {
  query,
  orderBy,
  limit,
  where,
  QueryDocumentSnapshot,
  startAfter,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

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

    const user = auth.currentUser;

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
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export const getTeachers = async () => {
  try {
    const teachersCollection = collection(db, "teachers");
    const teachersSnapshot = await getDocs(query(teachersCollection, limit(4)));

    const teachersData = teachersSnapshot.docs.map(
      (doc) => doc.data() as Teacher
    );

    return teachersData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

interface FilteredData {
  teachers: Teacher[];
}

interface Teacher {
  id: string;
  name: string;
  languages: string[];
  levels: string[];
  price_per_hour: number;
}

interface TeachersData {
  teachers: Teacher[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | undefined;
}

export const getTeachersData = async (
  searchParams: { languages?: string; level?: string; price?: string } = {},
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<TeachersData | undefined> => {
  const { languages, level, price } = searchParams;
  const pageSize = 4;

  console.log(languages);
  console.log(level);
  console.log(price);

  let q = query(collection(db, "teachers"));

  // Створюємо масив для фільтрів
  const filters: any[] = [];

  if (languages && languages !== "---") {
    filters.push({ field: "languages", value: languages });
  }
  if (level && level !== "---") {
    filters.push({ field: "levels", value: level });
  }
  if (price && price !== "---") {
    const priceNumber = Number(price);
    if (!isNaN(priceNumber)) {
      filters.push({ field: "price_per_hour", value: priceNumber });
    }
  }

  // Додаємо фільтри до запиту
  if (filters.length > 0) {
    q = query(q, where("filters", "array-contains-any", filters));
  }

  if (lastDoc) {
    q = query(q, startAfter(lastDoc), limit(pageSize));
  } else {
    q = query(q, limit(pageSize));
  }

  try {
    const documentSnapshots = await getDocs(q);

    const teachers = documentSnapshots.docs.map<Teacher>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    console.log("this is teachers:", teachers);
    return { teachers, lastVisible };
  } catch (error: any) {
    console.error("Error in getTeachersData:", error);
  }
};

// Функция для получения всех учителей для фильтров
export const getAllTeachersForFilters = async () => {
  try {
    const teachersCollection = collection(db, "teachers");
    const teachersSnapshot = await getDocs(teachersCollection);

    const teachersData = teachersSnapshot.docs.map((doc) => doc.data());

    const uniqueLanguages = [
      ...new Set(teachersData.flatMap((teacher) => teacher.languages)),
    ];
    const uniqueLevels = [
      ...new Set(teachersData.flatMap((teacher) => teacher.levels)),
    ];
    const uniquePrices = [
      ...new Set(teachersData.flatMap((teacher) => teacher.price_per_hour)),
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
