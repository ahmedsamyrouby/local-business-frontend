import { Avatar, Group, Spoiler, Text } from "@mantine/core";
import dayjs from "dayjs";
import { getInitials } from "./../../utils/index";

export type Review = {
  _id: string;
  userName: string;
  timestamp: string;
  content: string;
};

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="py-5">
      <Group>
        <Avatar alt={review.userName} radius="xl" color="cyan">
          {getInitials(review.userName)}
        </Avatar>
        <div>
          <Text className="font-semibold">{review.userName}</Text>
          <Text size="sm" c="dimmed">
            {dayjs(review.timestamp).format("MMMM DD, YYYY")}
          </Text>
        </div>
      </Group>
      <Spoiler
        classNames={{
          control: "pl-[54px]",
        }}
        pl={54}
        pt="xs"
        maxHeight={50}
        showLabel={"show more"}
        hideLabel={"show less"}
        transitionDuration={0}
      >
        {review.content}
      </Spoiler>
    </div>
  );
};

export default ReviewCard;
