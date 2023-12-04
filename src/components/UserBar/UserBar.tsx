import { logout } from "@/services/api";

interface UserBarProps {
  userName: string | null;
}

export const UserBar = ({ userName }: UserBarProps) => {
  const handleLogOut = async () => {
    await logout();
  };

  return (
    <div className="flex items-center gap-x-4">
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
      <p>{userName}</p>
    </div>
  );
};
