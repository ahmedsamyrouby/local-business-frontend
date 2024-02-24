import {
  FileInput,
  Group,
  Radio,
  Select,
  TextInput,
  Textarea,
  Title,
  rem,
  Text,
  Button,
  InputLabel,
} from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import { FaFileImage } from "react-icons/fa6";
import Map from "../../../components/Map/Map";
import { LatLngExpression } from "leaflet";
function BusinessForm({ onClose }: { onClose: () => void }) {
  const options = useMemo(() => countryList().getData(), []);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<LatLngExpression>();

  const businessForm = useForm({
    initialValues: {
      businessName: "",
      country: "Egypt",
      timeActive: "",
      activeFrom: "",
      activeTo: "",
      // location: [],
      businessPhoto: "",
      businessLicense: "",
    },
  });

  type FormValues = typeof businessForm.values;

  const handelBusinessForm = (values: FormValues) => {
    console.log(values);
    console.log(location);
    setIsLoading(true);
    setIsSubmit(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 6000);
  };

  const handelRadio = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    businessForm.setFieldValue("timeActive", e.currentTarget.value);
  };

  if (isSubmit) {
    return <Text>Waiting for an email with response...</Text>;
  } else {
    return (
      <form
        onSubmit={businessForm.onSubmit((values) => handelBusinessForm(values))}
      >
        <div className="text-center mb-4">
          <Title className="text-xl">Business Informations</Title>
        </div>
        <div className="flex-1 justify-center">
          <TextInput
            required
            withAsterisk
            label="Business name"
            placeholder="Your business name"
            className="text-start pb-2"
            {...businessForm.getInputProps("businessName")}
          />
          <Select
            data={options}
            label="Country"
            placeholder="Your business name"
            className="text-start pb-2"
            {...businessForm.getInputProps("country")}
          />
          <Radio.Group withAsterisk required label="Active" className="pb-3">
            <Group mt="xs">
              <Radio
                required
                label="24 Hours"
                value="24hour"
                color="#99896B"
                size="xs"
                onClick={(e) => {
                  handelRadio(e);
                }}
              />
              <Radio
                required
                label="specific time"
                value="specifictime"
                color="#99896B"
                size="xs"
                onClick={(e) => {
                  handelRadio(e);
                }}
              />
            </Group>
          </Radio.Group>

          {/* if specific time is selected */}

          {businessForm.values.timeActive == "specifictime" ? (
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              <TimeInput
                required
                label="Active From"
                className="col-span-1"
                leftSection={
                  <IconClock
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                {...businessForm.getInputProps("activeFrom")}
              />
              <TimeInput
                required
                label="Active To"
                className="col-span-1"
                leftSection={
                  <IconClock
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                {...businessForm.getInputProps("activeTo")}
              />
            </div>
          ) : null}
          {/* if specific time is selected */}

          {/* <TextInput
          label="Buisness's location"
          description="click on the button to get the current location"
          placeholder="Your business location"
          className="flex-initial"
          {...businessForm.getInputProps("location")}
        />
        <button className="bg-primary rounded text-white py-1 px-3 my-1 text-sm">
          {"Get Location"}
        </button> */}
          <FileInput
            rightSection={
              <FaFileImage
                style={{ width: rem(18), height: rem(18), color: "#99896B" }}
                stroke="1.5"
              />
            }
            label="Business's Photo"
            placeholder="Your business's Photo"
            className="pb-2"
            {...businessForm.getInputProps("businessPhoto")}
          />
          <FileInput
            rightSection={
              <FaFileImage
                style={{ width: rem(18), height: rem(18), color: "#99896B" }}
                stroke="1.5"
              />
            }
            required
            description="only one license"
            label="Business's license"
            placeholder="Your business's license"
            className="pb-2"
            {...businessForm.getInputProps("businessLicense")}
          />
          <Textarea
            size="vertical"
            label="Discription"
            placeholder="Your discription about your business"
          />

          <div className="mt-3">
            <InputLabel>Business Location</InputLabel>
            <Map setLocation={setLocation} location={location!} />
          </div>

          <Button
            className="bg-primary w-full text-base mt-3 rounded py-1 text-white"
            type="submit"
            loading={isLoading}
          >
            {"submitt".toUpperCase()}
          </Button>
        </div>
      </form>
    );
  }
}
export default BusinessForm;
