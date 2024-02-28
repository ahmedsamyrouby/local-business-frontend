export function convertStringToImageFile(stringData: string): File {
  const blob = new Blob([stringData], { type: "jpg" });
  const file = new File([blob], "foo.txt", { type: "image/jpg" });
  return file;
}
export interface businessContent {
  station: {
    type: "Point";
    coordinates: [];
  };
  businessName: string;
  Country: string;
  category: string;
  status: string;
  userId: string;
  media: [];
  description: string;
  address: string;
  workTime: {
    startTime: string | undefined;
    endTime: string | undefined;
  };
  _id: string;
  messages: [];
  reviews: [];
}
