import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import loginArt from "../../../assets/images/login-art.jpg";

const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
      password: (value) => (value.length < 6 ? "Too short" : null),
    },
  });

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
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <TextInput
            withAsterisk
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
            <Button className="bg-primary w-full text-base" type="submit">
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
