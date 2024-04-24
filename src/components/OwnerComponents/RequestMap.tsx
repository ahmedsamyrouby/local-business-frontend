import { Text, Button } from "@mantine/core";
import StaticMap from "../StaticMap/StaticMap";
function RequestMap({ coordinates }: { coordinates: never[] }) {
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
            <Button className="bg-green-600 hover:opacity-80">Accepte</Button>
            <Button className="bg-red-600 hover:opacity-80">Reject</Button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        {" "}
        <StaticMap
          location={{
            lat: coordinates[0],
            lng: coordinates[1],
          }}
        />
      </div>
    </>
  );
}
export default RequestMap;
