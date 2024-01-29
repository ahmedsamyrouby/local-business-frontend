import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import { IconAlertSquare, IconSquareCheck } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import AuthenticationLayout from "../AuthenticationLayout/AuthenticationLayout";
import signUpArt from "../../../assets/images/signup-art.jpg";
import {
  Select,
  Button,
  InputBase,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Radio,
  Group,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = z
    .object({
      password: z
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
      userType: z.string().min(1, "User Type is required"),
      email: z.string().email("Please enter a valid email"),
      number: z.string().length(16, "Please enter a valid phone number"), // +20 000 000 0000
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"], // field which will receive the error message
    });

  const form = useForm({
    initialValues: {
      firstName: "",
      secondName: "",
      email: "",
      password: "",
      confirmPassword: "",
      number: "",
      birthday: "",
      gender: "",
      userType: "",
    },
    validate: zodResolver(validationSchema),
  });

  type FormValues = typeof form.values;

  const handelForm = async (values: FormValues) => {
    const name = `${values.firstName} ${values.secondName}`;
    console.log(values);
    setIsLoading(true);
    await axios({
      method: "post",
      url: `${BASE_URL}/auth/signup`,
      data: {
        name: name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        role: values.userType.toLowerCase(),
        birthday: values.birthday,
        phone: values.number,
      },
    })
      .then(() => {
        navigate("/login");
        setIsLoading(false);
        notifications.show({
          message: "Registration Successful",
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
            "E-mali already Exist",
          color: "red",
          autoClose: 2000,
          icon: <IconAlertSquare />,
          classNames: {
            icon: "bg-transparent text-red-500",
          },
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthenticationLayout img={signUpArt}>
      <div>
        <Title className="text-white">SignUp</Title>
        <Text className="text-gray-200">Welcome to Local Business</Text>
      </div>

      <div className="">
        <form onSubmit={form.onSubmit((values) => handelForm(values))}>
          <div className="md:grid grid-cols-2 gap-1.5">
            <TextInput
              required
              withAsterisk
              autoComplete="firstName"
              label="First Name"
              className="text-start col-span-1"
              classNames={{
                label: "text-white",
              }}
              {...form.getInputProps("firstName")}
            />

            <TextInput
              required
              withAsterisk
              autoComplete="secondName"
              label="Second Name"
              className="text-start col-span-1 "
              classNames={{
                label: "text-white",
              }}
              {...form.getInputProps("secondName")}
            />

            <TextInput
              required
              withAsterisk
              autoComplete="email"
              label="Email"
              placeholder="your@email.com"
              className="text-start col-span-2"
              classNames={{
                label: "text-white",
              }}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              className="col-span-1 text-start"
              label="Password"
              placeholder="••••••••"
              classNames={{
                label: "text-white ",
              }}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              className="col-span-1 text-start"
              label="Confirm Password"
              placeholder="••••••••"
              classNames={{
                label: "text-white ",
              }}
              {...form.getInputProps("confirmPassword")}
            />

            <InputBase
              withAsterisk
              label="Mobile Number"
              className="text-start text-white col-span-1"
              component={IMaskInput}
              mask="+20 000 000 0000"
              placeholder="+20 XXX XXX XXXX"
              {...form.getInputProps("number")}
            />

            <DatePickerInput
              className="text-start text-white col-span-1"
              valueFormat="YYYY MMM DD"
              leftSection={
                <IconCalendar className="cursor-pointer" stroke={1.5} />
              }
              leftSectionPointerEvents="none"
              label="Birthday :"
              placeholder="Pick date"
              {...form.getInputProps("birthday")}
            />

            <div>
              <Radio.Group
                name="favoriteFramework"
                label="Gender: "
                className="text-start text-white"
              >
                <Group mt="xs" className="text-white">
                  <Radio
                    value="male"
                    label="Male"
                    classNames={{ label: "pl-1 " }}
                    onClick={(e) => {
                      form.setFieldValue("gender", e.currentTarget.value);
                    }}
                  />
                  <Radio
                    value="female"
                    label="Female"
                    classNames={{ label: "pl-1" }}
                    onClick={(e) => {
                      form.setFieldValue("gender", e.currentTarget.value);
                    }}
                  />
                </Group>
              </Radio.Group>
            </div>

            <div className="col-span-1 ">
              <Select
                required
                withAsterisk
                className="text-start text-white"
                label="User Type"
                placeholder="Select User Type"
                data={["Customer", "BusinessOwner"]}
                {...form.getInputProps("userType")}
              />
            </div>
          </div>

          <Button
            className="bg-primary w-full text-base mt-3"
            type="submit"
            loading={isLoading}
          >
            {"SignUp".toUpperCase()}
          </Button>

          <Link
            className="text-primary block w-full text-center text-base mt-4"
            to="/login"
          >
            {"Login".toUpperCase()}
          </Link>
        </form>
      </div>
    </AuthenticationLayout>
  );
};

export default SignUp;
