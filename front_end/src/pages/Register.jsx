import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { history } from "../helpers/history";
import { alertActions } from "../store";
import { userActions } from "../store";

const Register = () => {
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState(false);

  const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, formState, handleSubmit } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  async function onSubmit(data) {
    dispatch(alertActions.clear());
    try {
      await dispatch(userActions.register(data)).unwrap();

      // redirect to login page and display success alert
      history.navigate("/login");
      dispatch(
        alertActions.success({
          message: "Registration successful",
          showAfterRedirect: true,
        })
      );
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  return (
    <div className="w-full">
      <div className="w-full px-10">
        <div className="form-header text-center mt-4 mb-4">
          <h3>Register</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Control
            size="lg"
            className={`mb-2 ${errors.firstName ? "is-invalid" : ""}`}
            type="email"
            {...register("email")}
            placeholder="example@gmail.com"
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          <Form.Control
            size="lg"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`${errors.firstName ? "is-invalid" : ""}`}
            placeholder="Enter Password"
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <div className="flex items-center justify-center">
            <input
              id="check"
              size="lg"
              type="checkbox"
              onClick={() => {
                setShowPassword((showPassword) => !showPassword);
              }}
            />
            <label htmlFor="check" className="cursor-pointer ml-1">
              Password Show
            </label>
          </div>

          <Button
            className="bg-black w-full mt-3"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm me-1"></span>
            )}
            Sign up
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

export default Register;
