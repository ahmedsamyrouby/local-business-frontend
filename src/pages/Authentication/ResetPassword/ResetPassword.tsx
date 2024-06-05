import { Button, PasswordInput, Title, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { notifications } from "@mantine/notifications";
import { IconSquareCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = z
  .object({
    password: z.string().min(1, "Required"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // field which will receive the error message
  });

const ResetPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  type FormValues = typeof form.values;

  const handleResetPassword = (values: FormValues) => {
    setIsLoading(true);
    axios
      .put(BASE_URL + "/auth/resetPassword", {
        email: localStorage.getItem("email"),
        newPassword: values.password,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
        notifications.show({
          message: "Password reset successfully",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Reset Password - Local Linker";
  }, []);

  return (
    <AuthenticationLayout>
      <div className="mb-8">
        <Title className="text-black">Reset password</Title>
        <Text className="text-gray-700">
          Enter your new password and confirm it to reset your password.
        </Text>
      </div>

      <div className="w-full">
        <form
          className="h-full flex flex-col gap-4 md:gap-8"
          onSubmit={form.onSubmit((values) => handleResetPassword(values))}
        >
          <PasswordInput
            placeholder="Enter new password"
            type="password"
            className="text-start"
            classNames={{
              label: "text-black",
            }}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            placeholder="Confirm password"
            type="password"
            className="text-start"
            classNames={{
              label: "text-black",
            }}
            {...form.getInputProps("confirmPassword")}
          />
          <Button
            className="bg-primary w-full text-base"
            type="submit"
            loading={isLoading}
          >
            {"Reset password".toUpperCase()}
          </Button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default ResetPassword;
