import { Text, Button } from "@mantine/core";
import StaticMap from "../StaticMap/StaticMap";
import axios from "axios";
import { BASE_URL } from "../../constants";
function RequestMap({
  req,
  getRequestsOfServices,
  setShowMap,
  setMap,
}: {
  req: {
    id: string;
    coordinates: never[];
  };
  getRequestsOfServices: () => Promise<void>;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
  setMap: React.Dispatch<
    React.SetStateAction<{
      id: string;
      coordinates: never[];
    }>
  >;
}) {
  async function responseOnRequest(response: string) {
    console.log(req);
    await axios({
      method: "put",
      url: `${BASE_URL}/businessOwner/updateStatus/${req.id}`,
      data: {
        newStatus: response === "Accepte" ? "In Progress" : "Completed",
        approvalStatus: `${response}d`,
      },
    })
      .then(() => {
        getRequestsOfServices();
        setShowMap(false);
        setMap({ id: "", coordinates: [] });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div className="w-full content-center ">
        <div className="flex flex-col text-center mb-32">
          <Text
            className="text-lg font-semibold m-2"
            style={{ color: "#FFFEFA" }}
          >
            Do you want to take this request?
          </Text>
          <div className="flex justify-center gap-x-1">
            <Button
              className="bg-green-600 hover:opacity-80"
              onClick={(event) => {
                responseOnRequest(event.currentTarget.innerText);
              }}
            >
              Accepte
            </Button>
            <Button
              className="bg-red-600 hover:opacity-80"
              onClick={(event) => {
                responseOnRequest(event.currentTarget.innerText);
              }}
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        {" "}
        <StaticMap
          location={{
            lat: req.coordinates[0],
            lng: req.coordinates[1],
          }}
        />
      </div>
    </>
  );
}
export default RequestMap;
