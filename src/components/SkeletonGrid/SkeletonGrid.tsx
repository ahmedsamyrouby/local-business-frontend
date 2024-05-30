import { BusinessCardSkeleton } from "../BusinessCard/BusinessCard";

const SkeletonGrid = ({ cardsCount }: { cardsCount: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(cardsCount)].map((_, idx) => (
        <BusinessCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
