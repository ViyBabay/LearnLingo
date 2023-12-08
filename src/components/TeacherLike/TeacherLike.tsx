'use client';

import { auth, db } from '@/firebase/config';
import { deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { VscHeartFilled } from 'react-icons/vsc';
import { VscHeart } from 'react-icons/vsc';

interface TeacherLikeProps {
  id: string;
  handleAuthCheck: () => void;
}

export const TeacherLike = ({ id, handleAuthCheck, onFavoriteChange }: TeacherLikeProps) => {
  const [like, setLike] = useState(false);
  const userId = auth.currentUser?.uid;
  const favoritesDocRef = doc(db, 'favorites', `${userId}_${id}`);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(favoritesDocRef, doc => {
      setLike(doc.exists());
    });
    return () => unsubscribe();
  }, [favoritesDocRef, id, userId]);

  const handleToggle = async (id: string) => {
    handleAuthCheck();
    if (!userId) return;
    try {
      setLike(!like);
      if (like) {
        await deleteDoc(favoritesDocRef);
      } else {
        await setDoc(favoritesDocRef, { teacherId: id, userId });
      }
      onFavoriteChange();
    } catch (error) {
      console.error('error ', error);
    }
  };

  return (
    <button
      type="button"
      className="absolute top-5 right-5 cursor-pointer"
      onClick={() => handleToggle(id)}
    >
      {!like ? <VscHeart size={26} /> : <VscHeartFilled size={26} className="fill-orange" />}
    </button>
  );
};
