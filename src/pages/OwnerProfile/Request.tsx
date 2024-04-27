import { Title, ScrollArea, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import RequestCard from "../../components/OwnerComponents/RequestCard";
import RequestMap from "../../components/OwnerComponents/RequestMap";
import { requestBody } from "../../services/ConvertStringToFile";

function Requests() {
  const [data, setData] = useState([]);
  const locationData = useLocation();
  const [showMap, setShowMap] = useState(false);
  const [map, setMap] = useState({ id: "", coordinates: [] });
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
    <div className="flex w-full h-full">
      <div className="flex flex-col w-7/12 h-screen bg-black rounded-l-lg">
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white mt-4 ml-4 cursor-pointer hover:opacity-80"
          onClick={() => navigate("/ownerprofile")}
        >
          <path
            d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
        <Title className="text-center text-white m-4">Requests</Title>
        <ScrollArea className="w-full h-full">
          <div className="flex flex-col gap-y-0.5 m-1">
            {data.map(
              (req: requestBody) =>
                req.approvalStatus === "Pending" ? (
                  <div
                    onClick={() => {
                      setMap({ id: req._id, coordinates: req.coordinates });
                      console.log(map);
                      setShowMap(false);
                      setTimeout(() => {
                        setShowMap(true);
                      }, 1000);
                    }}
                  >
                    <RequestCard
                      key={req._id}
                      // id={req._id}
                      data={req}
                      businessName={comingData.businessName}
                    />
                  </div>
                ) : null
              // ) : (
              //   <div className="flex justify-center text-white">
              //     <Text>Empty of Requests</Text>
              //   </div>
              // )
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="backGround flex w-full h-screen  ">
        {showMap ? (
          <RequestMap
            req={map}
            getRequestsOfServices={getRequestsOfServices}
            setShowMap={setShowMap}
            setMap={setMap}
          />
        ) : null}
      </div>
    </div>
  );
}
export default Requests;
