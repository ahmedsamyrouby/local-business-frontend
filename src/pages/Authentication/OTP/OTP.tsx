import { PinInput, Title, Text, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import forgotPasswordArt from "../../../assets/images/forgot-password-art.jpg";

const OTP = () => {
  const form = useForm({
    initialValues: { otp: "" },
    validate: {
      otp: (value) => (value.length < 6 ? "Too short" : null),
    },
  });
  return (
    <AuthenticationLayout img={forgotPasswordArt}>
      <div className="mb-8">
        <Title className="text-white">Enter OTP</Title>
        <Text className="text-gray-200">
          Please enter the OTP sent to your email address.
        </Text>
      </div>

      <div className="w-full space-y-8">
        <form
          className="space-y-8 md:space-y-10 flex-center flex-col gap-2.5"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <PinInput
            classNames={{
              root: "gap-2 md:gap-3 flex-wrap items-center justify-center sm:flex-nowrap",
              input:
                "bg-transparent text-white hover:border-primary focus:border-primary text-lg flex flex-col",
            }}
            placeholder=""
            oneTimeCode
            length={6}
            type={"number"}
            size="lg"
            {...form.getInputProps("otp")}
          />

          <Button className="bg-primary w-full text-base" type="submit">
            {"Verify".toUpperCase()}
          </Button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default OTP;
