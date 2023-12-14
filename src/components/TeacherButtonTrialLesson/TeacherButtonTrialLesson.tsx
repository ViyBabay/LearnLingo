"use client";

import { useSearchParams } from "next/navigation";
import { BookTrial } from "../BookTrial/BookTrial";
import Modal from "../Modal/Modal";

interface TeacherButtonTrialLessonProps {
  handleAuthCheck: () => void;
  name: string;
  surname: string;
  avatarUrl: string;
}

export const TeacherButtonTrialLesson = ({
  name,
  surname,
  avatarUrl,
  handleAuthCheck,
}: TeacherButtonTrialLessonProps) => {
  const searchParams = useSearchParams();

  const showBookTrial = searchParams.get("trial");

  return (
    <>
      <button
        type="button"
        className="md:w-max py-3 px-6 md:py-4 md:px-12 rounded-xl bg-orange mt-8 text-lg font-bold"
        onClick={handleAuthCheck}
      >
        Book trial lesson
      </button>
      {showBookTrial && (
        <Modal variant="trial">
          <BookTrial name={name} surname={surname} avatarUrl={avatarUrl} />
        </Modal>
      )}
    </>
  );
};
