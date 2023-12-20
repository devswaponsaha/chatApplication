import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
const Login = () => {
  const { loginUser, loginInfo, updateLoginInfo, loginError, isLoginLoading } =
    useContext(AuthContext);
  // console.log(loginInfo);
  return (
    <Form onSubmit={loginUser}>
      <Row
        style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2 className="text-light">Login</h2>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => {
                updateLoginInfo({ ...loginInfo, email: e.target.value });
              }}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                updateLoginInfo({ ...loginInfo, password: e.target.value });
              }}
            />
            <Button variant="primary" type="submit">
              {isLoginLoading ? "Loading..." : "Login"}
            </Button>
            {loginError && (
              <Alert variant="danger">
                <p className="m-0">{loginError}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
