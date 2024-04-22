import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
function StarRating({ rate }: { rate: number }) {
  return (
    <>
      {[...Array(rate)].map(() => (
        <MdStar className="text-yellow-600" size={22} />
      ))}
      {[...Array(5 - rate)].map(() => (
        <MdStarBorder className="text-yellow-600" size={20} />
      ))}
    </>
  );
}
export default StarRating;
