import Header from "@/components/Header/Header";
import { statuses } from "@/utils/themaApi";

const FavoritesPage = () => {
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  return (
    <>
      <Header status={status} />
      <div>Favorites Page</div>
    </>
  );
};

export default FavoritesPage;
