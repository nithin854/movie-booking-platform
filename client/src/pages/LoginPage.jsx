import { Flex, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/userServices";
function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loginUser] = useLoginUserMutation();

  const onLoginUserHandler = (val) => {
    loginUser(val).then((res) => {
      console.log(res);
      if (res?.error?.data?.success === false) {
        messageApi.open({
          type: "error",
          content: res?.error?.data?.message,
        });
        return false;
      }
      localStorage.setItem("user-scaler-bookshow", res.data.token);
      navigate("/");
    });
  };

  return (
    <Flex
      className="login-form"
      vertical
      gap={20}
      justify="center"
      align="center"
    >
      {contextHolder}
      <h1>Welcome back! Please login to continue</h1>
      <Form
        name="login-form"
        form={form}
        onFinish={onLoginUserHandler}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => navigate("/register")} type="link">
            Dont have an account yet? Register here
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default LoginPage;
