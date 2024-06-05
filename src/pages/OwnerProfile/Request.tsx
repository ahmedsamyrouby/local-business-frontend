import {
  Text,
  Menu,
  UnstyledButton,
  Table,
  Tabs,
  Modal,
  Title,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { requestBody } from "../../services/ConvertStringToFile";

import { SiGooglemybusiness } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { IoSettings } from "react-icons/io5";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { RxExit } from "react-icons/rx";

import RequestBody from "../../components/OwnerComponents/RequestBody";

function Requests() {
  const [data, setData] = useState([]);
  const locationData = useLocation();
  const comingData = locationData.state;
  async function getRequestsOfServices() {
    if (comingData) {
      await axios
        .get(
          `http://localhost:3011/businessOwner/getAllService/${comingData.id}`
        )
        .then((res) => {
          console.log(res.data);
          setData(res.data.data);
        });
    }
  }

  useEffect(() => {
    getRequestsOfServices();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <nav className="flex justify-between w-full p-2 md:px-10 bg-gradient-to-r from-primary to-bg-white">
        <div className="flex md:gap-x-4 gap-x-1">
          <SiGooglemybusiness className="text-white h-8 w-8" />
          <Text className="text-white font-serif font-bold text-base pt-1 pl-1">
            Local Business
          </Text>
        </div>
        <div className="flex md:gap-x-8 gap-x-2">
          <AiFillMessage
            className="hover:opacity-80 h-8 w-8 text-gray-400"
            onClick={() => {
              navigate("/chat");
            }}
          />

          <Menu
            withArrow
            position="bottom-end"
            shadow="md"
            width={200}
            transitionProps={{
              transition: "scale",
              duration: 150,
            }}
          >
            <Menu.Target>
              <UnstyledButton className="hover:opacity-80">
                <IoSettings className=" h-8 w-8 text-gray-400" />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                onClick={() => navigate("/changePassword")}
                leftSection={<CgArrowsExchangeAlt />}
              >
                Change Password
              </Menu.Item>
              <Menu.Item
                onClick={() => navigate("/setupProfile")}
                leftSection={<MdEdit />}
              >
                Setup profile{" "}
              </Menu.Item>
              <Menu.Item
                // onClick={() => logOut()}
                leftSection={<RxExit />}
                className="text-red-600"
              >
                Log Out{" "}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </nav>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col  w-5/6 h-5/6 bg-gray-100 rounded-lg drop-shadow-lg mb-10">
          <div className="flex justify-center text-primary my-2.5 ">
            {/* <Tabs
              variant="outline"
              radius="md"
              defaultValue={comingData.businessName}
            >
              <Tabs.List>
                <Tabs.Tab value={comingData.businessName}>
                  {comingData.businessName}
                </Tabs.Tab>
              </Tabs.List>
            </Tabs> */}
            <Title>{comingData.businessName}</Title>
          </div>
          <Table.ScrollContainer minWidth={500}>
            <Table
              stickyHeader
              stickyHeaderOffset={0}
              verticalSpacing="xl"
              highlightOnHover
              classNames={{ table: "overflow-hidden" }}
            >
              <Table.Thead className="bg-primary ">
                <Table.Tr>
                  <Table.Th className="text-white font-bold">
                    Business name
                  </Table.Th>
                  <Table.Th className="text-white font-bold">Customer</Table.Th>
                  <Table.Th className="text-white font-bold">Phone</Table.Th>
                  <Table.Th className="text-white font-bold">Details</Table.Th>
                  <Table.Th className="text-white font-bold">Status</Table.Th>
                  <Table.Th className="text-white font-bold">Show Map</Table.Th>
                  <Table.Th className=""></Table.Th>
                  <Table.Th className=""></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className="bg-gray-100">
                {data.map((req: requestBody) => (
                  <RequestBody
                    data={req}
                    businessName={comingData.businessName}
                    requestFunction={getRequestsOfServices}
                    key={req._id}
                  />
                ))}
              </Table.Tbody>
              <Table.Caption className="font-bold">Local Linker</Table.Caption>
            </Table>
          </Table.ScrollContainer>
        </div>
      </div>
    </div>
  );
}
export default Requests;
