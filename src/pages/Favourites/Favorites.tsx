import { useEffect, useState } from "react";
import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";
import { getLocalStorage } from "../../services/LocalStorageService";
import { transformBusinesses } from "../../utils";
import { Button, Loader, Title, rem } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/AxiosService";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Array<Business>>([]);
  const [loading, setLoading] = useState(true);
  const userId = getLocalStorage("userId");
  const navigate = useNavigate();

  const getFavorites = async () => {
    setLoading(true);
    const res = await axiosInstance.get(`/customer/GetFavorites/${userId}`);
    setFavorites(transformBusinesses(res.data.favoriteBusinesses));
    setLoading(false);
  };

  useEffect(() => {
    getFavorites();
    document.title = "Favorites";
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex-center bg-white">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white px-4 relative">
      <div style={{ height: rem(70), width: "100%" }} />
      {favorites.length === 0 ? (
        <div className="w-full h-screen flex-center flex-col gap-4">
          <h1 className="text-2xl text-gray-900">
            You have no{" "}
            <span className="text-primary font-semibold">Favorites</span> yet...
          </h1>
          <Button onClick={() => navigate("/explore")}>
            Explore Businesses
          </Button>
        </div>
      ) : (
        <div className="w-full p-4 flex justify-around flex-col">
          <Title className="text-primary font-semibold">Favorites</Title>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favorites.map((business) => (
              <BusinessCard
                key={business._id}
                business={{ ...business, country: "Egypt", isFavorite: true }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
