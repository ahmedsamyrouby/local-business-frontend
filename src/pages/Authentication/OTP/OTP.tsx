import { PinInput, Title, Text, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { IconAlertSquare } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const OTP = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { otp: "" },
    validate: {
      otp: (value) => (value.length < 6 ? "Too short" : null),
    },
  });

  type FormValues = typeof form.values;

  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyOTP = (values: FormValues) => {
    setIsLoading(true);
    axios
      .post(BASE_URL + "/auth/verifyResetCode", {
        email: localStorage.getItem("email"),
        resetCode: values.otp,
      })
      .then((res) => {
        setIsLoading(false);
        navigate("/reset-password");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        notifications.show({
          message: err.response.data.message || "Something went wrong",
          autoClose: 2000,
          icon: <IconAlertSquare />,
          classNames: {
            icon: "bg-transparent text-red-500",
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Enter OTP - Local Linker";
  }, []);

  return (
    <AuthenticationLayout>
      <div className="mb-8">
        <Title className="text-black">Enter OTP</Title>
        <Text className="text-gray-700">
          Please enter the OTP sent to your email address.
        </Text>
      </div>

      <div className="w-full space-y-8">
        <form
          className="space-y-8 md:space-y-10 flex-center flex-col gap-2.5"
          onSubmit={form.onSubmit((values) => handleVerifyOTP(values))}
        >
          <PinInput
            classNames={{
              root: "gap-2 md:gap-3 flex-wrap items-center justify-center sm:flex-nowrap",
              input:
                "bg-transparent text-black hover:border-primary focus:border-primary text-lg flex flex-col",
            }}
            placeholder=""
            oneTimeCode
            length={6}
            type={"number"}
            size="lg"
            {...form.getInputProps("otp")}
          />

          <Button
            className="bg-primary w-full text-base"
            type="submit"
            loading={isLoading}
          >
            {"Verify".toUpperCase()}
          </Button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default OTP;
