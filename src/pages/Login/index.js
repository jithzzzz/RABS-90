import React, { useState } from "react";
import { logInAction } from "../../redux/actions/LoginComponentActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as rejex from "../../components/commons/CommonRegex/CommonRegex";
import SmallLoader from "../../components/commons/SmallLoader/SmallLoader";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onUserNameHandler = (e) => {
    setUserName(e.target.value);
    loginFailed(false);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
    loginFailed(false);
  };
  const onSubmit = (data) => {
    setSpinner(true);
    dispatch(
      logInAction(data, (res) => {
        if (res.status) {
          setSpinner(false);
          history.push("/dashboard");
        } else {
          setLoginFailed(true);
        }
      })
    );
  };
  // function Move() {
  //window.open("..dashboard")

  //}

  return (
    <div className="row d-flex m-0 position-relative">
      <div className="col-9 p-0">
        <img src="/images/note.jpg"
        alt=""
        style={{height:"100%",width:"100%"}}/>
      </div>
      <div className="col-3 p-0">
        <div className="login-div">
          <div className="log">
            <div className="d-flex" style={{height:"160px",width:"100%",justifyContent:"center"}}>

            <img
              src="/images/steth.gif"
              alt=""
              style={{ height: "100%", width: "160px" }}
            />
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ padding: "10px 30px" }}
            >
              <input
                type="text"
                className="usn"
                placeholder="Enter Username"
                onChange={(e) => onUserNameHandler(e)}
                {...register("UserName", {
                  required: true,
                  minLength: 1,
                  maxLength: 64,
                })}
              />
              <div className="d-flex" style={{ height: "16px" }}>
                {errors.UserName && (
                  <span className="valid-alert-span">*Enter username.</span>
                )}
              </div>
              <input
                type="password"
                className="pw"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => onPasswordHandler(e)}
                {...register("Password", {
                  required: true,
                  minLength: 1,
                  maxLength: 64,
                  pattern: {
                    value: /^[A-Z0-9._%+-]/i,
                  },
                })}
              />
              <div className="d-flex" style={{ height: "16px" }}>
                {loginFailed ? (
                  <span className="valid-alert-span">
                    *Wrong usename or password
                  </span>
                ) : null}
                {errors.Password && (
                  <span className="valid-alert-span">*Enter password</span>
                )}
              </div>
              <button type="submit" className="login">
                Login {spinner && <SmallLoader />}
              </button>{" "}
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
