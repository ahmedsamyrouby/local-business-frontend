import {
  FileInput,
  Select,
  TextInput,
  Textarea,
  Title,
  rem,
  Button,
  InputLabel,
  MultiSelect,
  Radio,
  Group,
} from "@mantine/core";
import {
  IconAlertSquare,
  IconCalendar,
  IconClock,
  IconSquareCheck,
} from "@tabler/icons-react";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useEffect, useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { FaFileImage } from "react-icons/fa6";
import Map from "../../../components/Map/Map";
import { LatLngExpression } from "leaflet";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { getLocalStorage } from "../../../services/LocalStorageService";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import image from "../../../assets/images/forgot-password-art.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
function BusinessForm() {
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const locationData = useLocation();
  const comingData = locationData.state;
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LatLngExpression>();
  const [data, setData] = useState([]);
  const userId: string | null = getLocalStorage("userId");
  const Categories: readonly string[] = [
    "Restaurants and Cafés",
    "Retail Stores",
    "Health and Beauty Services",
    "Medical and Healthcare Services",
    "Tourism and Hospitality",
    "Education and Training Centers:",
    "Real Estate and Construction",
    "Arts and Entertainment",
    "Home Services",
    "Auto Services",
    "Other",
  ];

  const businessForm = useForm({
    initialValues: {
      businessName:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.businessName
            : ""
          : "",
      country:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.country
            : "Egypt"
          : "Egypt",
      category:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.category
            : ""
          : "",
      timeActive: "",
      activeFrom:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.workTime.startTime
            : ""
          : "",
      activeTo:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.workTime.endTime
            : ""
          : "",
      businessPhoto: "",
      businessLicense:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.attachment
            : ""
          : "",
      description:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.description
            : ""
          : "",
      address:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.address
            : ""
          : "",
      days:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.days
            : []
          : [],
      eventOrNot:
        comingData !== null
          ? comingData.operation === "edit"
            ? comingData.data.eventOrNot
            : comingData.type === "events"
            ? "Event"
            : "notEvent"
          : "notEvent",
      expirationDate:
        comingData !== null
          ? comingData.operation === "edit"
            ? new Date(comingData.data.expirationDate)
            : ""
          : "",
    },
  });
  const getBusinesses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/businessOwner/getAllUserBusinesses/${userId}`
      );
      setData(response.data.data.businesses);
      // console.log(data);
      // console.log(comingData.data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };
  useEffect(() => {
    getBusinesses();
  }, []);

  type FormValues = typeof businessForm.values;

  const handelBusinessForm = async (values: FormValues) => {
    const coordinates: [number, number] = Object.values(location);
    if (values.timeActive == "24hour") {
      businessForm.setFieldValue("activeFrom", "24hour");
    }
    console.log(comingData);
    // console.log(coordinates);
    console.log(values);
    setIsLoading(true);
    await axios({
      method: comingData != null ? comingData.method : "put",
      url:
        comingData != null
          ? comingData.api
          : `${BASE_URL}/businessOwner/updateMyBusinessInfo/${data[0]._id}`,
      data: {
        business: {
          type: "Point",
          coordinates: [coordinates[0], coordinates[1]],
        },
        workTime: { startTime: values.activeFrom, endTime: values.activeTo },
        businessName: values.businessName,
        Country: values.country,
        category: values.category,
        description: values.description,
        address: values.address,
        eventOrNot: values.eventOrNot,
        expirationDate: values.expirationDate,
        days: values.days,
        status:
          comingData !== null
            ? comingData.status !== undefined
              ? comingData.status
              : comingData.data.status === "rejected"
              ? "pending"
              : "accepted"
            : "pending",
      },
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        comingData !== null && comingData.method === "post"
          ? updateAttachment(values.businessLicense, res.data.data[0]._id)
          : updateAttachment(values.businessLicense, data[0]._id);
        navigate("/ownerprofile");
        notifications.show({
          message: "Wating for Respnse...",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          message: "Something went wrong",
          color: "red",
          autoClose: 2000,
          icon: <IconAlertSquare />,
          classNames: {
            icon: "bg-transparent text-red-500",
          },
        });
      })
      .finally(() => setIsLoading(false));
  };
  async function updateAttachment(file: string, _id: string) {
    const formData = new FormData();
    formData.append("img", file);
    try {
      await axios.patch(
        `${BASE_URL}/businessOwner/updateMyBusinessAttachment/${_id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthenticationLayout img={image}>
      <form
        onSubmit={businessForm.onSubmit((values) => handelBusinessForm(values))}
        className="w-full"
      >
        <div className="text-center mb-4">
          <Title className="text-xl text-white">Business Informations</Title>
        </div>
        <div className="flex flex-col gap-y-2.5 justify-center">
          {comingData === null ? (
            <div>
              <Radio.Group
                name="favoriteFramework"
                label="Type: "
                className="text-start text-white  mt-3 md:mt-1"
                withAsterisk
              >
                <Group
                  mt="xs"
                  className="text-white flex-col md:flex-row items-start"
                >
                  <Radio
                    value="Event"
                    label="Event"
                    className=""
                    color="#99896B"
                    classNames={{ label: "pl-1 " }}
                    onClick={(e) => {
                      businessForm.setFieldValue(
                        "eventOrNot",
                        e.currentTarget.value
                      );
                    }}
                  />
                  <Radio
                    value="notEvent"
                    label="Service"
                    color="#99896B"
                    classNames={{ label: "pl-1" }}
                    onClick={(e) => {
                      businessForm.setFieldValue(
                        "eventOrNot",
                        e.currentTarget.value
                      );
                    }}
                  />
                </Group>
              </Radio.Group>
            </div>
          ) : comingData.type === "all" ? (
            <div>
              <Radio.Group
                name="favoriteFramework"
                label="Type: "
                className="text-start text-white  mt-3 md:mt-1"
                withAsterisk
              >
                <Group
                  mt="xs"
                  className="text-white flex-col md:flex-row items-start"
                >
                  <Radio
                    value="Event"
                    label="Event"
                    className=""
                    color="#99896B"
                    classNames={{ label: "pl-1 " }}
                    onClick={(e) => {
                      businessForm.setFieldValue(
                        "eventOrNot",
                        e.currentTarget.value
                      );
                    }}
                  />
                  <Radio
                    value="notEvent"
                    label="Service"
                    color="#99896B"
                    classNames={{ label: "pl-1" }}
                    onClick={(e) => {
                      businessForm.setFieldValue(
                        "eventOrNot",
                        e.currentTarget.value
                      );
                    }}
                  />
                </Group>
              </Radio.Group>
            </div>
          ) : null}
          <div className="flex gap-x-1">
            <TextInput
              required={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              withAsterisk={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              label="Business name"
              placeholder="Your business name"
              className="text-start text-white w-full"
              {...businessForm.getInputProps("businessName")}
            />
            <TextInput
              label="Address"
              placeholder="Business's Address"
              className="text-start text-white w-full"
              {...businessForm.getInputProps("address")}
            />
          </div>
          <div className="flex gap-x-1">
            {" "}
            <Select
              label="Category"
              placeholder="Business Category"
              data={Categories}
              maxDropdownHeight={200}
              className="text-start text-white"
              {...businessForm.getInputProps("category")}
              required={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              withAsterisk={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
            />
            <Select
              data={options}
              label="Country"
              placeholder="Your Country"
              className="text-start text-white"
              required={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              withAsterisk={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              {...businessForm.getInputProps("country")}
            />
          </div>
          <FileInput
            rightSection={
              <FaFileImage
                style={{ width: rem(18), height: rem(18), color: "#99896B" }}
                stroke="1.5"
              />
            }
            className="w-full text-start text-white"
            required={
              comingData !== null
                ? comingData.operation === "edit"
                  ? false
                  : true
                : true
            }
            withAsterisk={
              comingData !== null
                ? comingData.operation === "edit"
                  ? false
                  : true
                : true
            }
            description="only one license"
            label="Business's license"
            placeholder="Your business's license"
            {...businessForm.getInputProps("businessLicense")}
          />
          <div className="mt-3">
            <InputLabel className="text-white font-bold">
              Business Location
            </InputLabel>
            <Map setLocation={setLocation} location={location!} />
          </div>{" "}
          <MultiSelect
            className="text-start text-white w-full"
            label="Days"
            placeholder="Pick Your days"
            data={[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ]}
            required={
              comingData !== null
                ? comingData.operation === "edit"
                  ? false
                  : true
                : true
            }
            withAsterisk={
              comingData !== null
                ? comingData.operation === "edit"
                  ? false
                  : true
                : true
            }
            {...businessForm.getInputProps("days")}
          />
          {businessForm.values.eventOrNot === "Event" ? (
            <DatePickerInput
              className="text-start text-white w-full"
              classNames={{
                day: "hover:bg-gray-200 [&[data-selected]]:bg-primary [&[data-selected]]:text-white [&:disabled]:hover:bg-transparent",
              }}
              valueFormat="DD MMM YYYY"
              leftSection={
                <IconCalendar className="cursor-pointer" stroke={1.5} />
              }
              leftSectionPointerEvents="none"
              label="Expire Date"
              placeholder="Pick date"
              required={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              withAsterisk={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              // maxDate={new Date()}
              {...businessForm.getInputProps("expirationDate")}
            />
          ) : comingData !== null ? (
            comingData.type === "events" || comingData.type === "Event" ? (
              <DatePickerInput
                className="text-start text-white w-full"
                classNames={{
                  day: "hover:bg-gray-200 [&[data-selected]]:bg-primary [&[data-selected]]:text-white [&:disabled]:hover:bg-transparent",
                }}
                valueFormat="DD MMM YYYY"
                leftSection={
                  <IconCalendar className="cursor-pointer" stroke={1.5} />
                }
                leftSectionPointerEvents="none"
                label="Expire Date"
                placeholder="Pick date"
                required={
                  comingData !== null
                    ? comingData.operation === "edit"
                      ? false
                      : true
                    : true
                }
                withAsterisk={
                  comingData !== null
                    ? comingData.operation === "edit"
                      ? false
                      : true
                    : true
                }
                // maxDate={new Date()}
                {...businessForm.getInputProps("expirationDate")}
              />
            ) : null
          ) : null}
          <div className="flex gap-x-1.5">
            <TimeInput
              required={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              withAsterisk={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              label="Active From"
              className="col-span-1 text-start text-white w-full"
              leftSection={
                <IconClock
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              {...businessForm.getInputProps("activeFrom")}
            />
            <TimeInput
              required={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              withAsterisk={
                comingData !== null
                  ? comingData.operation === "edit"
                    ? false
                    : true
                  : true
              }
              label="Active To"
              className="col-span-1 text-start text-white w-full"
              leftSection={
                <IconClock
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              }
              {...businessForm.getInputProps("activeTo")}
            />
          </div>
          <Textarea
            className="text-start text-white"
            size="vertical"
            label="Discription"
            placeholder="Your discription about your business"
            {...businessForm.getInputProps("description")}
          />
          <Button
            className="bg-primary w-full text-base mt-3 rounded py-1 text-white"
            type="submit"
            loading={isLoading}
          >
            {"submitt".toUpperCase()}
          </Button>
          {comingData === null ? null : (
            <Button
              className="bg-red-500 w-full text-base mt-1 rounded py-1 text-white"
              type="submit"
              onClick={() => navigate("/ownerprofile")}
            >
              {"cancel".toUpperCase()}
            </Button>
          )}
        </div>
      </form>
    </AuthenticationLayout>
  );
}

export default BusinessForm;
