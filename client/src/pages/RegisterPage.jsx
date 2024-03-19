import { Flex, Form, Input, Button, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/userServices";
function RegisterPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [registerUser] = useRegisterUserMutation();

  const onRegisterUserHandler = (values) => {
    registerUser(values).then((res) => {
      console.log(res);
    });
  };
  const onRegisterUserFailHandler = (err) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };
  return (
    <Flex
      className="register-form"
      vertical
      gap={20}
      justify="center"
      align="center"
    >
      {contextHolder}
      <h1>Register Yourself</h1>
      <Form
        name="login-form"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={onRegisterUserHandler}
        onFinishFailed={onRegisterUserFailHandler}
        validateTrigger
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
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="userName"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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

        <Form.Item name="role" label="Role">
          <Select
            initialValues="user"
            onChange={null}
            options={[
              { value: "user", label: "User" },
              { value: "admin", label: "Admin" },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button onClick={() => navigate("/login")} type="link">
            Already a registered user? Login here
          </Button>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default RegisterPage;
