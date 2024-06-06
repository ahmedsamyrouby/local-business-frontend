import { Button } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { businessContent } from "../../services/ConvertStringToFile";
import Swal from "sweetalert2";
import { getLocalStorage } from "../../services/LocalStorageService";

function ReviewBody({
  userName,
  review,
  time,
  reviewId,
  customerId,
  content,
}: {
  userName: string;
  review: string;
  time: string;
  reviewId: string;
  customerId: string;
  content: businessContent;
}) {
  const userToken = getLocalStorage("userToken");
  async function reportReview() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });
    if (text) {
      Swal.fire({
        title: "Done!",
        text: "Your reason has been sent.",
        icon: "success",
      });
    }
    console.log(reviewId);
    console.log(text);
    await axios({
      method: "post",
      url: `${BASE_URL}/report/${reviewId}/${content._id}/${customerId}`,
      headers: { Authorization: `Bearer ${userToken}` },
      data: { reason: text },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <tr>
      <td className="text-white text-left p-2 border-b-2">{userName}</td>
      <td className="text-white text-center p-2 pr-0 border-b-2 ">{review}</td>
      <td className="text-white text-right p-2 pl-0 pr-0 border-b-2">
        {time.slice(0, -8)}
      </td>
      <td className="text-white text-right border-b-2">
        <Button className="h-8 bg-red-700" onClick={reportReview}>
          Report
        </Button>
      </td>
    </tr>
  );
}
export default ReviewBody;
