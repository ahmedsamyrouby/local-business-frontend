import { Title, Text, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import forgotPasswordArt from "../../../assets/images/forgot-password-art.jpg";
import { BASE_URL } from "../../../constants";
import axios from "axios";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconAlertSquare, IconSquareCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../../services/LocalStorageService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  type FormValues = typeof form.values;

  const handleSendOTP = (values: FormValues) => {
    setIsLoading(true);
    axios
      .post(BASE_URL + "/auth/forgotPassword", values)
      .then((res) => {
        setLocalStorage("email", values.email);
        navigate("/otp");
        setIsLoading(false);
        notifications.show({
          message: "OTP sent successfully, please check your email",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      })
      .catch((err) => {
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

  return (
    <AuthenticationLayout img={forgotPasswordArt}>
      <div className="mb-8">
        <Title className="text-white">Forgot your password?</Title>
        <Text className="text-gray-200">
          Enter you email address and we'll send you an OTP to reset your
          password.
        </Text>
      </div>

      <div className="w-full">
        <form
          className="space-y-8 md:space-y-10 h-full flex flex-col"
          onSubmit={form.onSubmit((values) => handleSendOTP(values))}
        >
          <TextInput
            autoComplete="email"
            placeholder="Enter Email"
            className="text-start"
            classNames={{
              label: "text-white",
            }}
            {...form.getInputProps("email")}
          />
          <Button
            className="bg-primary w-full text-base"
            type="submit"
            loading={isLoading}
          >
            {"Send OTP".toUpperCase()}
          </Button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default ForgotPassword;
