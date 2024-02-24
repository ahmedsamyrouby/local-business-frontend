import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
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
  Modal,
  ScrollArea,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import BusinessForm from "./BusinessForm";
import { useDisclosure } from "@mantine/hooks";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
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
      birthday: null,
      gender: "",
      userType: "",
    },
    validate: zodResolver(validationSchema),
  });

  type FormValues = typeof form.values;

  function handelModal() {
    if (form.values.userType.toLowerCase() == "businessowner") open();
  }

  const handelForm = async (values: FormValues) => {
    handelModal();
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
    <>
      <Modal
        opened={opened}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        // closeOnClickOutside={false}
        // closeOnEscape={false}
        // withCloseButton={false}
        centered={true}
      >
        <BusinessForm onClose={close} />
      </Modal>
      <AuthenticationLayout img={signUpArt}>
        <div>
          <Title className="text-white">Sign Up</Title>
          <Text className="text-gray-200">
            Please fill in the form below to create your account.
          </Text>
        </div>

        <div className="w-full">
          <form
            className=""
            onSubmit={form.onSubmit((values) => handelForm(values))}
          >
            <div className="md:grid grid-cols-2 gap-1.5">
              <TextInput
                required
                withAsterisk
                autoComplete="firstName"
                label="First Name"
                className="text-start col-span-1 mt-3 md:mt-1"
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
                className="text-start col-span-1 mt-3 md:mt-1"
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
                className="text-start col-span-2 mt-3 md:mt-1"
                classNames={{
                  label: "text-white",
                }}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                withAsterisk
                className="col-span-1 text-start mt-3 md:mt-1"
                label="Password"
                placeholder="••••••••"
                classNames={{
                  label: "text-white ",
                }}
                {...form.getInputProps("password")}
              />

              <PasswordInput
                withAsterisk
                className="col-span-1 text-start mt-3 md:mt-1"
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
                className="text-start text-white col-span-1 mt-3 md:mt-1"
                component={IMaskInput}
                mask="+20 000 000 0000"
                placeholder="+20 XXX XXX XXXX"
                {...form.getInputProps("number")}
              />

              <DatePickerInput
                className="text-start text-white col-span-1 mt-3 md:mt-1"
                classNames={{
                  day: "hover:bg-gray-200 [&[data-selected]]:bg-primary [&[data-selected]]:text-white [&:disabled]:hover:bg-transparent",
                }}
                valueFormat="DD MMM YYYY"
                leftSection={
                  <IconCalendar className="cursor-pointer" stroke={1.5} />
                }
                leftSectionPointerEvents="none"
                label="Birthday :"
                placeholder="Pick date"
                maxDate={new Date()}
                {...form.getInputProps("birthday")}
              />

              <div>
                <Radio.Group
                  name="favoriteFramework"
                  label="Gender: "
                  className="text-start text-white  mt-3 md:mt-1"
                >
                  <Group
                    mt="xs"
                    className="text-white flex-col md:flex-row items-start"
                  >
                    <Radio
                      value="male"
                      label="Male"
                      className=""
                      color="#99896B"
                      classNames={{ label: "pl-1 " }}
                      onClick={(e) => {
                        form.setFieldValue("gender", e.currentTarget.value);
                      }}
                    />
                    <Radio
                      value="female"
                      label="Female"
                      color="#99896B"
                      classNames={{ label: "pl-1" }}
                      onClick={(e) => {
                        form.setFieldValue("gender", e.currentTarget.value);
                      }}
                    />
                  </Group>
                </Radio.Group>
              </div>

              <div className="col-span-1  mt-3 md:mt-1">
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
              className="bg-primary w-full text-base mt-12 md:mt-3"
              type="submit"
              loading={isLoading}
              // onClick={handelModal}
            >
              {"SignUp".toUpperCase()}
            </Button>

            <p className="text-white w-full text-start text-base mt-1">
              Already have an account?{" "}
              <Link className="text-primary" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthenticationLayout>
    </>
  );
};
export default SignUp;
