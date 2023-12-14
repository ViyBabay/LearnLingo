'use client';
import Header from '@/components/Header/Header';
import { TeacherItem } from '@/components/TeacherItem/TeacherItem';
import { TeachersList } from '@/components/TeachersList/TeachersList';
import { statuses } from '@/utils/themaApi';
import clsx from 'clsx';


const FavoritesPage = () => {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];  

  return (
    <>
      <Header status={status} />
      <main
        className={clsx('flex min-h-screen max-w-[1440px] mx-auto flex-col items-center px-5', {
          'bg-lightOrange': status === 'themaA',
          'bg-lightGreen': status === 'themaB',
          'bg-lightBlue': status === 'themaC',
          'bg-lightRose': status === 'themaD',
          'bg-lightPeach': status === 'themaF',
        })}
      >
        <section className="py-6 px-4 xl:px-[108px] w-full">
          <TeachersList status={status} />
        </section>
      </main>
    </>
  );
};

export default FavoritesPage;
