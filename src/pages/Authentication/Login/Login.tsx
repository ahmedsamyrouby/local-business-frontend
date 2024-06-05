import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import axios from "axios";
import { setLocalStorage } from "../../../services/LocalStorageService";
import { notifications } from "@mantine/notifications";
import { IconAlertSquare, IconSquareCheck } from "@tabler/icons-react";
import { useState } from "react";
import { BASE_URL } from "../../../constants";

const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
    },
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  type FormValues = typeof form.values;

  const handleLogin = (values: FormValues) => {
    setIsLoading(true);
    axios
      .post(BASE_URL + "/auth/login", values)
      .then((res) => {
        setLocalStorage("userToken", res.data.token);
        setLocalStorage("userId", res.data.data._id);
        setLocalStorage("role", res.data.data.role);
        setLocalStorage("name", res.data.data.name);
        setLocalStorage("email", res.data.data.email);
        setLocalStorage("phone", res.data.data.phone);
        res.data.data.role === "businessOwner"
          ? navigate("/ownerprofile")
          : navigate("/");
        setIsLoading(false);
        notifications.show({
          message: "Login Successful",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500",
          },
        });
      })
      .catch((err) => {
        notifications.show({
          message:
            err.response.data.message ||
            err.response.data.errors[0].msg ||
            "Something went wrong",
          color: "red",
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
    <AuthenticationLayout>
      <div>
        <Title className="text-black">Login</Title>
        <Text className="text-gray-700">
          Sign in to discover amazing local businesses near you.
        </Text>
      </div>
      <div className="w-full">
        <form
          className="space-y-4 md:space-y-8"
          onSubmit={form.onSubmit((values) => handleLogin(values))}
        >
          <TextInput
            withAsterisk
            autoComplete="email"
            label="Email"
            placeholder="your@email.com"
            className="text-start"
            classNames={{
              label: "text-black",
            }}
            {...form.getInputProps("email")}
          />
          <div className="space-y-2">
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="••••••••"
              className="text-start"
              classNames={{
                label: "text-black",
              }}
              {...form.getInputProps("password")}
            />

            <Link
              className="text-primary block w-full text-start"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="space-y-2">
            <Button
              className="bg-primary w-full text-base"
              type="submit"
              loading={isLoading}
            >
              {"Login".toUpperCase()}
            </Button>
            <Link
              className="text-primary block w-full text-center text-base"
              to="/signup"
            >
              {"Signup".toUpperCase()}
            </Link>
          </div>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default Login;
