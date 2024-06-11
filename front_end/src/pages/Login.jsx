import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, formState, handleSubmit } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ email, password }) {
    return dispatch(authActions.login({ email, password }));
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          // setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="w-full">
      <div className="w-full px-10">
        <div className="form-header text-center mt-4 mb-4">
          <Link to={"/register"} className="no-underline text-black">
            <h4 className="text-gray-700 hover:text-black hover:underline">
              Create an account
            </h4>
          </Link>
          <h6>Enter your email to sign in for this app</h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            size="lg"
            className={`mb-2 ${errors.email ? "is-invalid" : ""}`}
            type="email"
            name="email"
            // value={profile.email ? profile.email : ""}
            {...register("email")}
            placeholder="example@gmail.com"
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          <Form.Control
            size="lg"
            type="password"
            name="password"
            className={`${errors.password ? "is-invalid" : ""}`}
            {...register("password")}
            placeholder="Enter Password"
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <Button
            className="bg-black w-full mt-3 hover:bg-gray-600"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Sign in
          </Button>
        </form>
        <div className="flex items-center my-2">
          <div className="h-[1px] flex-1 bg-gray-300"></div>
          <span className="m-3 text-gray-400">or continue with</span>
          <div className="h-[1px] flex-1 bg-gray-300"></div>
        </div>
        <Button
          variant="outline-light"
          className="w-full text-black"
          style={{ backgroundColor: "#dddcdc" }}
          size="lg"
          onClick={googleLogin}
        >
          <div className="flex items-center justify-center">
            <img src="/images/google.png" alt="" />
            <p className="mb-0">Google</p>
          </div>
        </Button>
        <p className="mt-3 text-gray-600 text-center">
          By clicking continue, you agree to our <b>Terms of service</b> <br />
          and <b>Privacy Policy</b>
        </p>
      </div>

      <div className="px-5 py-3" style={{ backgroundColor: "#00274C" }}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-between text-white ">
            <h4>10GB</h4>
            <h6>100 MINUTES</h6>
          </div>
          <div className="flex flex-col items-start justify-between text-white">
            <p>TOTAL</p>
            <h4>€ 53.00 USD</h4>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-between text-white ">
            <span className="mr-5">eSIM</span>
            <img
              src="/images/Vector.png"
              className="rounded-circle mr-3"
              alt=""
            />
          </div>
          <div className="flex flex-col items-start justify-between text-white">
            <h6>UNITED ARAB EMIRATES</h6>
            <p>VALID FOR 30 DAYS</p>
          </div>
        </div>
        <Button variant="outline-light" className="w-full">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Login;
