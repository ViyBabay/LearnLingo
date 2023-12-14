"use client";

import { auth, db } from "@/firebase/config";
import { User } from "firebase/auth";
import { deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { VscHeartFilled } from "react-icons/vsc";
import { VscHeart } from "react-icons/vsc";

interface TeacherLikeProps {
  id: string;
  handleAuthCheck: (() => void) | null;
  isUser: User | null;
}

export const TeacherLike = ({
  id,
  isUser,
  handleAuthCheck,
  onFavoriteChange,
}: TeacherLikeProps) => {
  const [like, setLike] = useState(false);
  const userId = auth.currentUser?.uid;
  const favoritesDocRef = doc(db, "favorites", `${userId}_${id}`);
  const pathname = usePathname();

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(favoritesDocRef, (doc) => {
      setLike(doc.exists());
    });
    return () => unsubscribe();
  }, [favoritesDocRef, id, userId]);

  const handleToggle = async (id: string) => {
    if (handleAuthCheck) handleAuthCheck();
    if (!userId) return;
    try {
      if (like && pathname === "/favorites") {
        await deleteDoc(favoritesDocRef);
        if (onFavoriteChange) onFavoriteChange();
      } else {
        setLike((pre) => !pre);
        if (like) {
          await deleteDoc(favoritesDocRef);
        } else {
          await setDoc(favoritesDocRef, { teacherId: id, userId });
        }
      }
    } catch (error) {
      console.error("error ", error);
    }
  };

  return (
    <button
      type="button"
      className="absolute top-5 right-5 cursor-pointer"
      onClick={() => handleToggle(id)}
    >
      {!like || !isUser ? (
        <VscHeart size={26} />
      ) : (
        <VscHeartFilled size={26} className="fill-orange" />
      )}
    </button>
  );
};
