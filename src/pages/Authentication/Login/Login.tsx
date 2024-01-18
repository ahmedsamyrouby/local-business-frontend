import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import loginArt from "../../../assets/images/login-art.jpg";
import axios from "axios";
import { setLocalStorage } from "../../../services/LocalStorageService";
import { notifications } from "@mantine/notifications";
import {
  IconAlertSquare,
  IconSquareCheck,
} from "@tabler/icons-react";
import { useState } from "react";

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
      .post("http://localhost:3011/auth/login", values)
      .then((res) => {
        setLocalStorage("user", res.data.token);
        navigate("/homepage");
        setIsLoading(false);
        notifications.show({
          message: "Login Successful",
          autoClose: 2000,
          icon: <IconSquareCheck />,
          classNames: {
            icon: "bg-transparent text-green-500"
          }
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
            icon: "bg-transparent text-red-500"
          }
        });
        setIsLoading(false);
      });
  };

  return (
    <AuthenticationLayout img={loginArt}>
      <div>
        <Title className="text-white">Login</Title>
        <Text className="text-gray-200">
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
              label: "text-white",
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
                label: "text-white",
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
