import { Button, InputBase, TextInput, Title, rem } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconAt, IconCalendar } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";

function SetupOwnerInfo() {
  return (
    <form className=" w-full">
      <div className="flex flex-col gap-y-4">
        {" "}
        <Title className="text-xl text-center text-white">
          Update Information
        </Title>
        <TextInput
          label="Name"
          placeholder="you Name"
          classNames={{ label: "text-white font-bold" }}
        />
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="E-mail"
          placeholder="Your email"
          classNames={{ label: "text-white font-bold" }}
        />
        <DatePickerInput
          className="text-start text-white col-span-1"
          valueFormat="YYYY MMM DD"
          leftSection={<IconCalendar className="cursor-pointer" stroke={1.5} />}
          leftSectionPointerEvents="none"
          label="Birthday"
          placeholder="Pick date"
        />
        <InputBase
          label="Mobile Number"
          className="text-start text-white col-span-1"
          component={IMaskInput}
          mask="+20 000 000 0000"
          placeholder="+20 XXX XXX XXXX"
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
  );
}
export default SetupOwnerInfo;
