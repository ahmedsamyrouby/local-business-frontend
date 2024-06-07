import { Button, Modal, Table, Title } from "@mantine/core";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { businessContent } from "../../services/ConvertStringToFile";
import Swal from "sweetalert2";
import { getLocalStorage } from "../../services/LocalStorageService";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
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
      report(text);
      Swal.fire({
        title: "Done!",
        text: "Your reason has been sent.",
        icon: "success",
      });
    }
    console.log(reviewId);
    console.log(text);
  }
  async function report(text: string) {
    await axios({
      method: "post",
      url: `${BASE_URL}/report/${reviewId}/${content.userId}/${customerId}`,
      headers: { Authorization: `Bearer ${userToken}` },
      data: { reason: text },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Review"
        withCloseButton={false}
        className="flex justify-center items-center"
        classNames={{
          header: "flext justify-center ",
          title: "font-bold text-2xl",
          body: "flex justify-center",
        }}
      >
        <div className="w-96 bg-gray-200 rounded-lg p-4 drop-shadow-lg">
          <Title order={5}>{userName}</Title>
          <p className="mx-2 p-2">{review}</p>
        </div>
      </Modal>
      <Table.Tr key={reviewId}>
        <Table.Td>{userName}</Table.Td>
        <Table.Td>
          {" "}
          <p className="truncate max-w-44">{review}</p>
          {review.length >= 29 && (
            <a
              className="text-primary cursor-pointer hover:opacity-80"
              onClick={open}
            >
              see more
            </a>
          )}
        </Table.Td>
        <Table.Td>{time}</Table.Td>
        <Table.Td>
          {" "}
          <Button className="h-8 bg-red-700" onClick={reportReview}>
            Report
          </Button>
        </Table.Td>
      </Table.Tr>
    </>
  );
}
export default ReviewBody;
