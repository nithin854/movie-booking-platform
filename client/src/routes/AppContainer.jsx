import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Flex, Button, Dropdown } from "antd";
import { useEffect } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IconBxMoviePlay } from "../icons";
import { setUser, resetUser } from "../store/slices/userSlice";

const { Header, Content } = Layout;

const AppContainer = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("dasdas");
    const token = localStorage.getItem("user-scaler-bookshow");
    if (token) {
      const decode = jwtDecode(token);
      dispatch(setUser(decode));
    }
  }, [location.pathname]);
  const items = [
    {
      key: "profile",
      label: (
        <Link to={user?.role === "user" ? "/profile" : "/admin"}>
          {user?.role === "user" ? "View Profile" : "View Admin Panel"}
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Button
          onClick={() => {
            localStorage.removeItem("user-scaler-bookshow");
            dispatch(resetUser());
            navigate("/login");
          }}
          color="danger"
          type="link"
        >
          Logout
        </Button>
      ),
    },
  ];
  return (
    <Layout>
      <Header className="primary__header">
        <Flex
          gap={2}
          align="center"
          className="primary__page__link"
          onClick={() => navigate("/")}
        >
          <IconBxMoviePlay color="red" width="2rem" height="2rem" />
          <h4 className="primary__title">Scaler Book Show</h4>
        </Flex>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <Button
            size="large"
            type="text"
            shape="circle"
            icon={
              <SmileOutlined style={{ color: "white", fontSize: "1.5rem" }} />
            }
          />
        </Dropdown>
      </Header>
      <Content className="primary__content__area">{children}</Content>
    </Layout>
  );
};

AppContainer.propTypes = {
  children: React.Children,
};
export default AppContainer;
