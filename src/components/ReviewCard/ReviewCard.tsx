import { Rating } from "@mantine/core";
import dayjs from "dayjs";

export type Review = {
  _id: string;
  userName: string;
  timestamp: string;
  starRating: number;
  content: string;
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="p-6 bg-gray-500 min-h-20">
      <h3 className="text-white text-lg font-bold">{review.userName}</h3>
      <p className="text-sm text-white/80">
        {dayjs(review.timestamp).format("MMMM DD, YYYY")}
      </p>
      {review.starRating && (
        <Rating value={review.starRating} size={"md"} readOnly />
      )}
      <p className="text-white">{review.content}</p>
    </div>
  );
};

export default ReviewCard;
