import React from "react";
// import useAuth from "../../Hooks/useAuth";
import { Container } from "react-bootstrap";
// import { useLocation, useHistory } from "react-router-dom";
import "./login.css";

const Login = () => {
  //   const { signInUsingGoogle } = useAuth();
  //   const location = useLocation();
  //   const history = useHistory();
  //   const redirect_uri = location.state?.from || "/home";

  const handleGoogleLogin = () => {
    console.log("hello");
    // signInUsingGoogle().then((res) => {
    //   history.push(redirect_uri);
    // });
  };

  return (
    <div className="bg-login">
      <Container className="text-center">
        <h1 className="display-6 text-capitalize">
          Please Login to book tours.
        </h1>
        <button onClick={handleGoogleLogin} className="btn btn-dark mt-3">
          <img
            src="https://img.icons8.com/fluency/50/000000/google-logo.png"
            alt=""
            className="google-icon"
          />
          <span className="ms-2">Sign In with Google</span>
        </button>
      </Container>
    </div>
  );
};

export default Login;
