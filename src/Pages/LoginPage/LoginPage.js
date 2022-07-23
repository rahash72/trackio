import React, { useContext } from "react";
import GoogleLogin from "react-google-login";
import toast from "react-hot-toast";
import { UserContext } from "../../Contexts/UserContext";
import "./LoginPage.css";
const LoginPage = () => {
  const [loginData, setLoginData] = useContext(UserContext);

  const handleFailure = (result) => {
    toast.error("Error");
  };

  const handleLogin = async (googleData) => {
    const res = await fetch(
      "https://trackio-backend.herokuapp.com/api/google-login",
      {
        method: "POST",
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    toast.success("Logged In Successfully");
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  return (
    <>
      <div className="all">
        <h1 className="heading">Trackio</h1>
        <div className="login">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
