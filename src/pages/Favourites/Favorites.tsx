import { useEffect, useState } from "react";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { getLocalStorage } from "../../services/LocalStorageService";
import { transformBusinesses } from "../../utils";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Array<Business>>([]);
  const userId = getLocalStorage("userId");
  const navigate = useNavigate();

  const getFavorites = async () => {
    const res = await axios.get(`${BASE_URL}/customer/GetFavorites/${userId}`);
    setFavorites(transformBusinesses(res.data));
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 relative">
      {favorites.length === 0 ? (
        <div className="w-full h-screen flex-center flex-col gap-4">
          <h1 className="text-2xl text-white">No favorites yet</h1>
          <Button onClick={() => navigate("/explore")}>
            Explore Businesses
          </Button>
        </div>
      ) : (
        <div className="w-full p-4 flex justify-around">
          <h1 className="text-2xl text-white">Favorites</h1>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((business) => (
              <BusinessCard key={business._id} business={business} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
