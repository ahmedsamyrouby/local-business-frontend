import {
  Button,
  Modal,
  Pill,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { requestBody } from "../../services/ConvertStringToFile";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDisclosure } from "@mantine/hooks";
import StaticMap from "../StaticMap/StaticMap";
import axios from "axios";
import { BASE_URL } from "../../constants";
import clsx from "clsx";

function RequestBody({
  data,
  businessName,
  requestFunction,
}: // id,
{
  data: requestBody;
  businessName: string;
  requestFunction(): Promise<void>;
  // id: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedMap, { open: openMap, close: closeMap }] = useDisclosure(false);
  async function responseOnRequest(status: string, approvalStatus: string) {
    console.log(status);
    await axios({
      method: "put",
      url: `${BASE_URL}/businessOwner/updateStatus/${data._id}`,
      data: {
        newStatus: status,
        approvalStatus: approvalStatus,
      },
    })
      .then((res) => {
        requestFunction();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Description"
        withCloseButton={false}
        className="flex justify-center items-center"
        classNames={{
          header: "flext justify-center ",
          title: "font-bold",
          body: "flex justify-center",
        }}
      >
        <div>
          <p>{data.requestDetails}</p>
        </div>
      </Modal>
      <Modal
        opened={openedMap}
        onClose={closeMap}
        title="Location"
        withCloseButton={false}
        className="flex justify-center items-center"
        classNames={{
          header: "flext justify-center ",
          title: "font-bold",
          body: "flex justify-center",
        }}
      >
        <div>
          <div className="w-full flex justify-center items-center">
            {" "}
            <StaticMap
              location={{
                lat: data.coordinates[0],
                lng: data.coordinates[1],
              }}
            />
          </div>
        </div>
      </Modal>
      <Table.Tr>
        <Table.Td>{businessName}</Table.Td>
        <Table.Td>{data.name}</Table.Td>
        <Table.Td>{data.phone}</Table.Td>
        <Table.Td>
          <p className="truncate max-w-36">{data.requestDetails}</p>
          {data.requestDetails.length >= 23 && (
            <a
              className="text-primary cursor-pointer hover:opacity-80"
              onClick={open}
            >
              see more
            </a>
          )}
        </Table.Td>
        <Table.Td>
          <Pill
            className={clsx({
              "text-white": true,
              "bg-green-500": data.status === "Completed",
              "bg-red-500": data.status === "Declined",
              "bg-gray-400": data.status === "In Progress",
              "bg-sky-500": data.status === "Pending",
            })}
          >
            {data.status}
          </Pill>
        </Table.Td>
        <Table.Td>
          {" "}
          <a
            className="text-primary cursor-pointer hover:opacity-80"
            onClick={openMap}
          >
            Location
          </a>
        </Table.Td>
        <Table.Td>
          <Button
            disabled={
              data.status === "Completed" || data.status === "In Progress"
                ? true
                : false
            }
            className="hover:opacity-80"
            onClick={() => {
              responseOnRequest("In Progress", "Accepted");
            }}
          >
            Accept
          </Button>
        </Table.Td>
        <Table.Td>
          {" "}
          <Button
            className="bg-gray-100 "
            disabled={
              data.status === "Completed" || data.status === "In Progress"
                ? true
                : false
            }
            onClick={() => {
              responseOnRequest("Completed", "Declined");
            }}
          >
            <RiDeleteBin6Line
              className={
                data.status === "Completed" || data.status === "In Progress"
                  ? "w-5 h-5 text-black"
                  : "w-5 h-5 hover:text-red-500 text-black"
              }
            />
          </Button>
        </Table.Td>
      </Table.Tr>
    </>
  );
}

export default RequestBody;
