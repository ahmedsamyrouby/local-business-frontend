import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { IconAlertSquare, IconSquareCheck } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import { DatePickerInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { setLocalStorage } from "../../../services/LocalStorageService";

const SignUp = () => {
  const icon = <IconCalendar className="cursor-pointer" stroke={1.5} />;
  const [activeMale, setActiveMale] = useState(false);
  const [activeFemale, setActiveFemale] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      firstname: "",
      secondname: "",
      email: "",
      password: "",
      confirmPassword: "",
      number: "",
      birthday: "",
      gender: "",
      usertype: "",
    },
    // transformValues: (values) => {
    //   name: `${values.firstname} + ${values.secondname}`;
    // },

    validate: {
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email",

      password: (value) =>
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)
          ? "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long"
          : null,

      confirmPassword: (value, values) =>
        value == values.password ? null : "Password must matching",

      number: (value) => (value.length == 15 ? null : "must 11 Number"),
    },
  });

  type FormValues = typeof form.values;

  const handelForm = async (values: FormValues) => {
    values.name = `${values.firstname} ${values.secondname}`;
    console.log(values);
    setIsLoading(true);
    await axios({
      method: "post",
      url: `${BASE_URL}/auth/signup`,
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        role: values.usertype,
        birthday: values.birthday,
        phone: values.number,
      },
    })
      .then((res) => {
        setLocalStorage("userToken", res.data.token);
        navigate("/homepage");
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

    // setTimeout(() => {
    //   console.log(values);
    //   setIsLoading(false);
    // }, 3000);
  };

  const handelgender = (
    event: React.MouseEvent<HTMLButtonElement>,
    active1: boolean,
    active2: boolean
  ) => {
    form.setFieldValue("gender", event.currentTarget.name);
    setActiveMale(!active1);
    setActiveFemale(!active2);
  };

  return (
    <AuthenticationLayout img={signUpArt}>
      <div>
        <Title className="text-white">SignUp</Title>
        <Text className="text-gray-200">Welcome to Local Business</Text>
      </div>
      <div>
        <form onSubmit={form.onSubmit((values) => handelForm(values))}>
          <div className="grid grid-cols-1 ">
            <TextInput
              required
              withAsterisk
              autoComplete="firstname"
              label="First name"
              className="text-start col-span-1"
              classNames={{
                label: "text-white",
              }}
              {...form.getInputProps("firstname")}
            />

            <TextInput
              required
              withAsterisk
              autoComplete="secondname"
              label="second name"
              className="text-start col-span-1 space-x-2.5"
              classNames={{
                label: "text-white ml-2.5",
              }}
              {...form.getInputProps("secondname")}
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
                label: "text-white mr-21",
              }}
              {...form.getInputProps("password")}
            />

            <PasswordInput
              withAsterisk
              className="col-span-1 space-x-2.5 text-start"
              label="Confirm password"
              placeholder="••••••••"
              classNames={{
                label: "text-white ml-2.5 ",
              }}
              {...form.getInputProps("confirmPassword")}
            />

            <InputBase
              withAsterisk
              label="Your phone"
              className="text-start text-white col-span-1"
              component={IMaskInput}
              mask="+20 00000000000"
              placeholder="Your phone"
              {...form.getInputProps("number")}
            />

            <DatePickerInput
              className="text-start text-white col-span-1 space-x-2.5 cursor-pointer"
              valueFormat="YYYY MMM DD"
              leftSection={icon}
              leftSectionPointerEvents="none"
              label="Birthday :"
              placeholder="Pick date"
              classNames={{
                label: " ml-2.5 ",
              }}
              {...form.getInputProps("birthday")}
            />

            <div className="md:col-span-1 sm:mt-6 ">
              <span className="mr-2 text-white">Gender:</span>
              <Button
                className={`p-2 border-primary text-white hover:bg-primary ${
                  activeMale ? "bg-primary" : ""
                }`}
                variant="outline"
                value="male"
                name="male"
                onClick={(event) => {
                  handelgender(event, false, true);
                }}
              >
                Male
              </Button>
              <Button
                className={`p-1 border-primary text-white hover:bg-primary ${
                  activeFemale ? "bg-primary" : ""
                }`}
                variant="outline"
                type="button"
                value="female"
                name="female"
                onClick={(event) => {
                  handelgender(event, true, false);
                }}
              >
                Female
              </Button>
            </div>
            <div className="col-span-1 ">
              <Select
                required
                withAsterisk
                className="ml-2 text-start text-white"
                label="UserType"
                placeholder="User Type"
                data={["customer", "businessOwner"]}
                // onChange={(e) => UserType(e)}
                {...form.getInputProps("usertype")}
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
