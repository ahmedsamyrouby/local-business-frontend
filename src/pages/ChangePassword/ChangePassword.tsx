import { Title, PasswordInput, Button, rem } from "@mantine/core";
import {
  IconAlertSquare,
  IconLock,
  IconSquareCheck,
} from "@tabler/icons-react";
import AuthenticationLayout from "../Authentication/AuthenticationLayout/AuthenticationLayout";
import signUpArt from "../../assets/images/signup-art.jpg";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  getLocalStorage,
  removeLocalStorage,
} from "../../services/LocalStorageService";
import { BASE_URL } from "../../constants";
import { notifications } from "@mantine/notifications";
function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const userId = getLocalStorage("userId");
  const validationSchema = z
    .object({
      newPassword: z
        .string()
        .min(1, "Password is required")
        .refine(
          (value) => /.{8,}/.test(value),
          "Password must be at least 8 characters long"
        )
        .refine(
          (value) => /(?=.*\d)/.test(value),
          "Password must contain at least one digit"
        )
        .refine(
          (value) => /(?=.*[a-z])/.test(value),
          "Password must contain at least one lowercase letter"
        )
        .refine(
          (value) => /(?=.*[A-Z])/.test(value),
          "Password must contain at least one uppercase letter"
        ),
      confirmPassword: z.string().min(1, "Confirm Password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"], // field which will receive the error message
    });

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: zodResolver(validationSchema),
  });

  type FormValues = typeof form.values;
  async function handelForm(values: FormValues) {
    console.log(values);
    await axios({
      method: "patch",
      url: `${BASE_URL}/auth/changePassword/${userId}`,
      data: {
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
        passwordConfirm: values.confirmPassword,
      },
    })
      .then((res) => {
        console.log(res);
        navigate("/login");
        removeLocalStorage("userId");
        setIsLoading(false);
        notifications.show({
          message: res.data.message,
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      })
      .catch((err) => {
        notifications.show({
          message: err.response.data.message,
          autoClose: 2000,
          icon: <IconAlertSquare />,
          classNames: {
            icon: "bg-transparent text-red-500",
          },
        });
      })
      .finally(() => setIsLoading(false));
  }
  return (
    <AuthenticationLayout img={signUpArt}>
      <div>
        <Title className="text-white">Change Password</Title>
      </div>
      <form
        onSubmit={form.onSubmit((values) => handelForm(values))}
        className=" w-full"
      >
        <div className="flex flex-col gap-y-4">
          <PasswordInput
            className="text-start text-white"
            label="Current Password"
            withAsterisk
            placeholder="Your Current Password"
            leftSection={
              <IconLock style={{ width: rem(18), height: rem(18) }} />
            }
            classNames={{ label: "text-white font-bold" }}
            {...form.getInputProps("currentPassword")}
          />
          <PasswordInput
            className="text-start text-white"
            label="New Password"
            withAsterisk
            placeholder="Your New Password"
            leftSection={
              <IconLock style={{ width: rem(18), height: rem(18) }} />
            }
            classNames={{ label: "text-white font-bold" }}
            {...form.getInputProps("newPassword")}
          />
          <PasswordInput
            className="text-start text-white"
            label="Confirm Password"
            withAsterisk
            placeholder="Your Confirm Password"
            leftSection={
              <IconLock style={{ width: rem(18), height: rem(18) }} />
            }
            classNames={{ label: "text-white font-bold" }}
            {...form.getInputProps("confirmPassword")}
          />
          <Button
            className="bg-primary w-full text-base mt-3 rounded py-1 text-white"
            type="submit"
            loading={isLoading}
          >
            {"submitt".toUpperCase()}
          </Button>
        </div>
      </form>
    </AuthenticationLayout>
  );
}
export default ChangePassword;
