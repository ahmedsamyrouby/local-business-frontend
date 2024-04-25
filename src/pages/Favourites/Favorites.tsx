import BusinessCard, {
  Business,
} from "../../components/BusinessCard/BusinessCard";

const mockBusinesses: Business[] = [
  {
    _id: "1",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "2",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "3",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "4",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "5",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "6",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "7",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "8",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
  {
    _id: "9",
    businessName: "Business Name",
    category: "Category",
    Country: "Country",
    logo: "https://via.placeholder.com/150",
  },
];

const Favorites = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 px-4 relative">
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mockBusinesses.map((business) => (
          <BusinessCard key={business._id} business={business} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
