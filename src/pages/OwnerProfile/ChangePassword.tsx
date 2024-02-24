import { Title, PasswordInput, Button, rem } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
function ChangePassword() {
  return (
    <form onSubmit={() => console.log("Done")} className=" w-full">
      <div className="flex flex-col gap-y-4">
        {" "}
        <Title className="text-xl text-center text-white">
          Change Password
        </Title>
        <PasswordInput
          className="shadow-2xl"
          label="Current Password"
          withAsterisk
          placeholder="Your Current Password"
          leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} />}
          classNames={{ label: "text-white font-bold" }}
        />
        <PasswordInput
          label="New Password"
          withAsterisk
          placeholder="Your New Password"
          leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} />}
          classNames={{ label: "text-white font-bold" }}
        />
        <PasswordInput
          label="Confirm Password"
          withAsterisk
          placeholder="Your Confirm Password"
          leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} />}
          classNames={{ label: "text-white font-bold" }}
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
export default ChangePassword;
