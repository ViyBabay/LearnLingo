import { FC } from 'react';

import { BookForm } from '../BookForm/BookForm';
import { BookTrialHead } from '../BookTrialHead/BookTrialHead';

import { TeacherAvatarProps } from '@/utils/definitions';

export const BookTrial: FC<TeacherAvatarProps> = ({ name, avatarUrl, surname }) => {
  return (
    <div className="flex flex-col gap-10 md:p-6">
      <BookTrialHead name={name} avatarUrl={avatarUrl} surname={surname} />
      <BookForm />
    </div>
  );
};
