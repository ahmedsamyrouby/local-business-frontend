import { Button, PasswordInput, Title, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import forgotPasswordArt from "../../../assets/images/forgot-password-art.jpg";

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
  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(validationSchema),
    validateInputOnBlur: true,
  });

  return (
    <AuthenticationLayout img={forgotPasswordArt}>
      <div className="mb-8">
        <Title className="text-white">Reset password</Title>
        <Text className="text-gray-200">
          Enter your new password and confirm it to reset your password.
        </Text>
      </div>

      <div className="w-full">
        <form
          className="h-full flex flex-col gap-4 md:gap-8"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <PasswordInput
            placeholder="Enter new password"
            type="password"
            className="text-start"
            classNames={{
              label: "text-white",
            }}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            placeholder="Confirm password"
            type="password"
            className="text-start"
            classNames={{
              label: "text-white",
            }}
            {...form.getInputProps("confirmPassword")}
          />
          <Button className="bg-primary w-full text-base" type="submit">
            {"Reset password".toUpperCase()}
          </Button>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default ResetPassword;
