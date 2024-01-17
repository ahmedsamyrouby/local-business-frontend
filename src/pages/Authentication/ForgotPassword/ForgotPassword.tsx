import { Title, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import forgotPasswordArt from "../../../assets/images/forgot-password-art.jpg";

const ForgotPassword = () => {
  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",
    },
  });
  return (
    <AuthenticationLayout img={forgotPasswordArt}>
      <div>
        <Title className="text-white">Forgot your password?</Title>
      </div>

      <div className="w-full">
        <form
          className="space-y-4 md:space-y-8"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <TextInput
            placeholder="Enter Email"
            className="text-start"
            classNames={{
              label: "text-white",
            }}
            {...form.getInputProps("email")}
          />
          <Button className="bg-primary w-full text-base" type="submit">
            {"Send OTP".toUpperCase()}
          </Button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default ForgotPassword;
