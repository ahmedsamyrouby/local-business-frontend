import { Button, InputBase, TextInput, Title, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconAt, IconCalendar } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import AuthenticationLayout from "../Authentication/AuthenticationLayout/AuthenticationLayout";
import signUpArt from "../../assets/images/signup-art.jpg";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useForm } from "@mantine/form";

function SetupOwnerInfo() {
  const validationSchema = z.object({
    firstName: z.string(),
    secondName: z.string(),
    email: z.string().email("Please enter a valid email"),
    number: z.string().length(16, "Please enter a valid phone number"), // +20 000 000 0000
  });
  const form = useForm({
    initialValues: {
      firstName: "",
      secondName: "",
      email: "",
      number: "",
      birthday: "",
    },
    validate: zodResolver(validationSchema),
  });
  type FormValues = typeof form.values;
  function handelForm(values: FormValues) {
    console.log(values);
  }
  return (
    <AuthenticationLayout img={signUpArt}>
      <div>
        <Title className="text-white">Update Informations</Title>
      </div>
      <form
        onSubmit={form.onSubmit((values) => handelForm(values))}
        className=" w-full"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex w-full gap-x-4">
            <TextInput
              className="text-start text-white w-full"
              label="Firts Name"
              placeholder="you Name"
              classNames={{ label: "text-white font-bold" }}
              {...form.getInputProps("firstName")}
            />
            <TextInput
              className="text-start text-white w-full"
              label="Second Name"
              placeholder="you Name"
              classNames={{ label: "text-white font-bold" }}
              {...form.getInputProps("secondName")}
            />
          </div>
          <TextInput
            className="text-start text-white"
            leftSectionPointerEvents="none"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label="E-mail"
            placeholder="Your email"
            classNames={{ label: "text-white font-bold" }}
            {...form.getInputProps("email")}
          />
          <DatePickerInput
            className="text-start text-white col-span-1"
            valueFormat="YYYY MMM DD"
            leftSection={
              <IconCalendar className="cursor-pointer" stroke={1.5} />
            }
            leftSectionPointerEvents="none"
            label="Birthday"
            placeholder="Pick date"
            {...form.getInputProps("birthday")}
          />
          <InputBase
            label="Mobile Number"
            className="text-start text-white col-span-1"
            component={IMaskInput}
            mask="+20 000 000 0000"
            placeholder="+20 XXX XXX XXXX"
            {...form.getInputProps("number")}
          />
          <Button
            className="bg-primary w-full text-base mt-3 rounded py-1 text-white"
            type="submit"
            // loading={isLoading}
          >
            {"submitt".toUpperCase()}
          </Button>
        </div>
      </form>
    </AuthenticationLayout>
  );
}
export default SetupOwnerInfo;
