import Image from "next/image";

interface TeacherAvatarProps {
  name: string;
  surname: string;
  avatarUrl: string;
}

export const TeacherAvatar = ({
  name,
  avatarUrl,
  surname,
}: TeacherAvatarProps) => {
  return (
    <div className="relative flex-shrink-0 mx-auto md:mx-0 p-3 mb-4 rounded-full border-[3px] border-banana">
      <Image
        src={avatarUrl}
        width={96}
        height={96}
        alt={`${name} ${surname}`}
        className="rounded-full"
      />
      <span className="block absolute top-4 right-6 w-3 h-3 rounded-full bg-green border-[3px] border-white"></span>
    </div>
  );
};
