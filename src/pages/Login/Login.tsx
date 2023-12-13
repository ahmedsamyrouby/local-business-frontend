import { Button, Form, Input, Typography } from "antd";
import { PushpinTwoTone } from "@ant-design/icons";

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {

  const onFinish = (values: FieldType) => { 
    console.log(values);
  }

  return (
    <Form
      onFinish={onFinish}
      className="sm:min-w-[600px] min-w-full h-full sm:h-fit bg-white p-6 sm:p-14 sm:shadow-base sm:rounded-md flex flex-col justify-center"
    >
      <Typography.Title
        level={2}
        className="text-center mb-8 font-normal flex gap-2 justify-center items-center"
      >
        <PushpinTwoTone style={{ fontSize: "36px" }} twoToneColor="#3498DB" />{" "}
        Local Business
      </Typography.Title>
      <Form.Item<FieldType>
        name="email"
        className="[&_.ant-row]:flex [&_.ant-row]:items-center [&_.ant-row]:gap-x-6"
        label={"Email"}
        required
      >
        <Input
          className="rounded-sm"
          placeholder="example@gmail.com"
          size="large"
          type="email"
        />
      </Form.Item>
      <Form.Item<FieldType>
        name="password"
        className="[&_.ant-row]:flex [&_.ant-row]:items-center mb-2"
        label={"Password"}
        required
      >
        <Input.Password
          className="rounded-sm"
          placeholder="••••••••"
          size="large"
        />
      </Form.Item>
      {/* <Link className="text-primary" to={""}>Forgot Password?</Link> */}
      <Typography.Link className="text-primary w-full text-end mb-6">
        Forgot Password?
      </Typography.Link>
      <Form.Item className="mb-2">
        <Button
          className="rounded-sm bg-primary hover:bg-primary-active w-full sm:w-fit"
          type="primary"
          size="large"
          htmlType="submit"
        >
          Login
        </Button>
      </Form.Item>
      <Typography.Text>
        Don't have an account?{" "}
        <Typography.Link className="text-primary">Sign Up</Typography.Link>
      </Typography.Text>
    </Form>
  );
};
export default Login;
