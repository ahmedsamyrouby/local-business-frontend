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
  attachment: string;
  description: string;
  address: string;
  logo: string;
  workTime: {
    startTime: string | undefined;
    endTime: string | undefined;
  };
  _id: string;
  messages: [];
  days: [];
  reviews: [
    {
      userName: string;
      content: string;
      timestamp: string;
      customerId: string;
      _id: string;
    }
  ];
}
