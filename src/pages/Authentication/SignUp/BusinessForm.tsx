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
import { useLocation, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { set } from "zod";
function BusinessForm() {
  const navigate = useNavigate();
  const options = useMemo(() => countryList().getData(), []);
  const locationData = useLocation();
  const comingData = locationData.state;
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LatLngExpression>();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const userId: string | null = getLocalStorage("userId");
  // const Categories: readonly string[] = [
  //   "Restaurants and Cafés",
  //   "Retail Stores",
  //   "Health and Beauty Services",
  //   "Medical and Healthcare Services",
  //   "Tourism and Hospitality",
  //   "Education and Training Centers:",
  //   "Real Estate and Construction",
  //   "Arts and Entertainment",
  //   "Home Services",
  //   "Auto Services",
  //   "Other",
  // ];
  const cities: [] = [
    "Cairo",
    "Alexandria",
    "Luxor",
    "Aswan",
    "Sharm El Sheikh",
    "Hurghada",
    "Giza",
    "Port Said",
    "Suez",
    "Mansoura",
    "Tanta",
    "Fayoum",
    "Zagazig",
    "Ismailia",
    "Minya",
    "Assiut",
    "Beni Suef",
    "Sohag",
    "Qena",
    "Banha",
    "Kafr El Sheikh",
    "Damanhur",
    "Damietta",
    "Shibin El Kom",
    "Matruh",
    "El Arish",
    "Quesna",
    "Mallawi",
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
  const userToken = getLocalStorage("userToken");
  async function getCategories() {
    try {
      const response = await axios.get(`${BASE_URL}/admin/listCategories`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setCategory(
        response.data.categories.map(
          (categoryName, i) => (category[i] = categoryName.name)
        )
      );
      console.log(category);
    } catch (err) {
      console.log(err);
    }
  }
  const getBusinesses = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/businessOwner/getAllUserBusinesses/${userId}`,
        { headers: { Authorization: `Bearer ${userToken}` } }
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
    getCategories();
  }, []);

  useEffect(() => {
    document.title = "Business Form - Local Linker";
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
      headers: { Authorization: `Bearer ${userToken}` },
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
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={businessForm.onSubmit((values) => handelBusinessForm(values))}
      className="p-6 bg-gray-100 flex-center flex-col h-screen md:overflow-hidden md:h-auto md:rounded-lg md:w-[800px] border shadow"
    >
      <Title order={2} className="text-black">
        Business Informations
      </Title>
      <div className="flex flex-col gap-y-2.5 justify-center w-full">
        {comingData === null ? (
          <div>
            <Radio.Group
              name="favoriteFramework"
              label="Type: "
              className="text-start text-black  mt-3 md:mt-1"
              withAsterisk
            >
              <Group
                mt="xs"
                className="text-black flex-col md:flex-row items-start"
              >
                <Radio
                  value="Event"
                  label="Event"
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
              className="text-start text-black  mt-3 md:mt-1"
              withAsterisk
            >
              <Group
                mt="xs"
                className="text-black flex-col md:flex-row items-start"
              >
                <Radio
                  value="Event"
                  label="Event"
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
            className="text-start text-black w-full"
            {...businessForm.getInputProps("businessName")}
          />
          <TextInput
            label="Address"
            placeholder="Business's Address"
            className="text-start text-black w-full"
            {...businessForm.getInputProps("address")}
          />
        </div>
        <div className="flex gap-x-1 w-full">
          {" "}
          <Select
            label="Category"
            placeholder="Business Category"
            data={category}
            maxDropdownHeight={200}
            className="text-start text-black w-full"
            classNames={{
              dropdown: "z-[1200]",
            }}
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
            data={cities}
            label="City"
            placeholder="Your Country"
            className="text-start text-black w-full"
            classNames={{
              dropdown: "z-[1200]",
            }}
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
              style={{ width: rem(18), height: rem(18) }}
              stroke="1.5"
            />
          }
          className="w-full text-start text-black"
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
          <InputLabel className="text-black font-bold">
            Business Location
          </InputLabel>
          <Map setLocation={setLocation} location={location!} />
        </div>{" "}
        <MultiSelect
          className="text-start text-black w-full"
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
            className="text-start text-black w-full"
            classNames={{
              day: "hover:bg-gray-200 [&[data-selected]]:bg-primary [&[data-selected]]:text-black [&:disabled]:hover:bg-transparent",
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
              className="text-start text-black w-full"
              classNames={{
                day: "hover:bg-gray-200 [&[data-selected]]:bg-primary [&[data-selected]]:text-black [&:disabled]:hover:bg-transparent",
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
            className="col-span-1 text-start text-black w-full"
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
            className="col-span-1 text-start text-black w-full"
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
          className="text-black"
          classNames={{
            input: "p-2",
          }}
          rows={6}
          label="Description"
          placeholder="Your description about your business"
          {...businessForm.getInputProps("description")}
        />
        <Button
          className="bg-primary w-full text-base mt-3 rounded py-1"
          type="submit"
          loading={isLoading}
        >
          {"submit".toUpperCase()}
        </Button>
        {comingData === null ? null : (
          <Button
            className="bg-red-500 w-full text-base mt-1 rounded py-1"
            type="submit"
            onClick={() => navigate("/ownerprofile")}
          >
            {"cancel".toUpperCase()}
          </Button>
        )}
      </div>
    </form>
  );
}

export default BusinessForm;
