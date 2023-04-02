import React from "react";
import "./style/signup.scss";
import { Link } from "react-router-dom";
type Props = {};
type Hello = {
  message: string;
  error: boolean;
};
type userData = {
  email: string;
  password: string | number;
};
const Signup = (props: Props) => {
  const [success, setSuccess] = React.useState<Hello>({
    message: "",
    error: false,
  });

  const submitFunc = (e: any) => {
    e.preventDefault();
    let userData;
    if (e.target[1].value === e.target[2].value) {
      userData = {
        email: "eve.holt@reqres.in",
        password: e.target[1].value,
      };
    } else {
      setSuccess({
        error: true,
        message: "Parolni qayta terishda hato qildingiz yana urinib ko'ring!!!",
      });
      setTimeout(() => {
        setSuccess({
          error: true,
          message: "",
        });
      }, 4000);
    }

    fetch("https://reqres.in/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.error
          ? setSuccess({
              error: true,
              message: data.error,
            })
          : localStorage.setItem("userLogin", JSON.stringify(data)),
          (window.location.href = window.location.origin);

        setTimeout(() => {
          setSuccess({
            error: true,
            message: "",
          });
        }, 4000);
        console.log(data);
      });
  };

  return (
    <div className="signup">
      {success.message.length > 0 ? (
        success.error ? (
          <div className="error_alert">{success.message}</div>
        ) : (
          <div className="success_alert">{success.message}</div>
        )
      ) : (
        ""
      )}

      <div className="signup__container container">
        <Link to="/" className="signup__logo">
          <img
            src="https://cdn.weatherapi.com/weather/64x64/day/116.png"
            alt="logo"
          />
        </Link>
        <h2 className="signup__title">SignUp to Weather</h2>
        <p className="signup__text">Enter your email and password</p>
        <form onSubmit={(e) => submitFunc(e)} className="signup__form">
          <input required type="email" placeholder="Enter email address" />
          <input required type="password" placeholder="Enter password" />
          <input required type="password" placeholder="Re-enter password" />
          <button type="submit">Sign Up</button>
        </form>
        <p style={{ marginTop: "30px" }}>
          Do you have an account?
          <Link
            to="/login"
            style={{ textDecoration: "underline", color: "#000" }}
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
