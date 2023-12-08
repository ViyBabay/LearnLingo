'use client';
import Header from '@/components/Header/Header';
import { TeacherItem } from '@/components/TeacherItem/TeacherItem';
import { auth } from '@/firebase/config';
import { getFavorites } from '@/services/api'; // Используйте getFavorites вместо fetchFavorites
import { statuses } from '@/utils/themaApi';
import { useEffect, useState } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  console.log(`favorites:`, favorites);

  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        getFavorites() // Изменение на getFavorites
          .then(fetchedFavorites => {
            setFavorites(fetchedFavorites.teachers);
            console.log('Favorites loaded:', fetchedFavorites);
          })
          .catch(error => {
            console.error('Error loading favorite teachers:', error);
          });
      } else {
        console.error('User is not authorized');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFavoriteChange = async () => {
    const updatedFavorites = await getFavorites();
    console.log(`updatedFavorites:`, updatedFavorites);
    setFavorites(updatedFavorites.teachers);
  };

  return (
    <>
      <Header />
      <ul className="flex flex-col gap-y-8 mt-8">
        {favorites.map(item => (
          <TeacherItem
            key={item.id}
            item={item}
            status={status}
            onFavoriteChange={handleFavoriteChange}
          />
        ))}
      </ul>
    </>
  );
};

export default FavoritesPage;
