import { Business } from "../components/BusinessCard/BusinessCard";

export const getInitials = (name: string) => {
  const names = name.split(" ");
  return names
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
};

export const transformBusinesses = (businesses: any[]): Array<Business> => {
  return businesses.map((business) => {
    return {
      _id: business.businessId || business._id,
      businessName: business.businessName,
      category: business.category,
      country: business.Country || business.country,
      logo: business.logo[0] || business.logo,
      rate: business.totalRate,
      description: business.description,
    };
  });
};
