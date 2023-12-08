"use client";

import React, { useState, useEffect, FC } from "react";
import { TeacherItem } from "../TeacherItem/TeacherItem";
import { getTeachersData } from "@/services/api";
import { DocumentSnapshot } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { AttentionModal } from "../AttentionModal/AttentionModal";
import { ButtonLoadMore } from "../ButtonLoadMore/ButtonLoadMore";

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
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const searchParamsAttention = useSearchParams();

  const showAttention = searchParamsAttention.get("attention");
  console.log("Consol showAttention:", showAttention);

  const loadMoreTeachers = async () => {
    if (!lastDoc) return;
    const teachersData = await getTeachersData(searchParams, lastDoc);
    setTeachers((prev) => [...prev, ...teachersData.teachers]);
    setLastDoc(teachersData.lastVisible ?? null);
  };

  useEffect(() => {
    const loadTeachers = async () => {
      const teachersData = await getTeachersData(searchParams);
      setTeachers(teachersData.teachers);
      setLastDoc(teachersData.lastVisible ?? null);
    };
    loadTeachers();
  }, [searchParams]);
  return (
    <>
      <ul className="flex flex-col gap-y-8 mt-8">
        {teachers.map((item) => (
          <TeacherItem key={item.id} item={item} status={status} />
        ))}
      </ul>
      {lastDoc && teachers.length % 4 === 0 && (
        <ButtonLoadMore loadMoreTeachers={loadMoreTeachers} status={status} />
      )}
      {showAttention && <AttentionModal status={status} />}
    </>
  );
};
