"use client";

import React, { useState, useEffect, FC } from "react";
import { TeacherItem } from "../TeacherItem/TeacherItem";
import { getTeachersData, getFavorites } from "@/services/api";
import { DocumentSnapshot } from "firebase/firestore";
import { usePathname, useSearchParams } from "next/navigation";
import { AttentionModal } from "../AttentionModal/AttentionModal";
import { ButtonLoadMore } from "../ButtonLoadMore/ButtonLoadMore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

interface TeacherListProps {
  searchParams?: {
    languages?: string;
    level?: string;
    price?: string;
  };
  status: string;
}

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
}

export const TeachersList: FC<TeacherListProps> = ({
  searchParams,
  status,
}) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  console.log(`teachers:`, teachers);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  console.log(`lastDoc:`, lastDoc);
  const searchParamsAttention = useSearchParams();
  const pathname = usePathname();
  console.log(`pathname:`, pathname);

  const showAttention = searchParamsAttention.get("attention");

  const loadMoreTeachers = async () => {
    if (!lastDoc) return;
    const teachersData = await getTeachersData(searchParams, lastDoc);
    console.log(`teachersData:`, teachersData);
    setTeachers((prev) => [...prev, ...teachersData.teachers]);
    setLastDoc(teachersData.lastVisible ?? null);
  };

  const loadMoreFavorites = async () => {
    if (!lastDoc) return;
    const favoritesData = await getFavorites(lastDoc);
    setTeachers((prev) => [...prev, ...favoritesData.teachers]);
    setLastDoc(favoritesData.lastVisible ?? null);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      if (pathname === "/teachers") {
        const teachersData = await getTeachersData(searchParams);
        console.log(`teachersData:`, teachersData);
        setTeachers(teachersData.teachers);
        setLastDoc(teachersData.lastVisible ?? null);
      } else if (pathname === "/favorites") {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              const favoritesData = await getFavorites();
              setTeachers(favoritesData.teachers);
              setLastDoc(favoritesData.lastVisible ?? null);
            } catch (error) {
              console.error("Error loading favorite teachers:", error);
            }
          } else {
            console.error("User is not authorized");
          }
        });
      }
    };
    loadInitialData();
  }, [pathname, searchParams]);

  const handleFavoriteChange = (teacherId) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
  };

  return (
    <>
      <ul className="flex flex-col gap-y-8 mt-8">
        {teachers.length === 0 ? (
          <p>There is no teachers added yet</p>
        ) : (
          teachers.map((item) => (
            <TeacherItem
              onFavoriteChange={() => handleFavoriteChange(item.id)}
              key={`${item.id}-${status}`}
              item={item}
              status={status}
            />
          ))
        )}
      </ul>

      {lastDoc && teachers.length % 4 === 0 && (
        <ButtonLoadMore
          loadMoreTeachers={
            pathname === "/teachers" ? loadMoreTeachers : loadMoreFavorites
          }
          status={status}
        />
      )}
      {showAttention && <AttentionModal status={status} />}
    </>
  );
};
