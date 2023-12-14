"use client";

import { login } from "@/services/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuEyeOff, LuEye } from "react-icons/lu";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface Values {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { email: "", password: "" };
  const router = useRouter();
  const pathName = usePathname();

  const handleSubmit = async (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    document.body.style.overflow = "auto";
    try {
      console.log(values);
      await login(values);
      resetForm();
      router.replace(pathName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <h1
        style={{ fontSize: "40px" }}
        className="mb-5 font-semibold leading-tight tracking-tight text-gray-900 font-roboto"
      >
        Log In
      </h1>
      <p className="mb-10">
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col items-center gap-y-5">
          <div className="relative w-full">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="text-base pl-4 py-4 border border-gray-300 rounded-xl placeholder-black min-w-190 max-w-440 w-full
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-0 absolute top-full left-4"
            />
          </div>

          <div className="relative w-full">
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="text-base pl-4 py-4 border border-gray-300 rounded-xl placeholder-black min-w-190 max-w-440 w-full
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-0 absolute top-full left-4"
            />
          </div>
          <button
            type="submit"
            className="text-base text-center font-bold mt-10 p-4 bg-orange rounded-xl min-w-190 max-w-440 w-full hover:scale-105 transition-transform"
          >
            Log In
          </button>
        </Form>
      </Formik>
    </div>
  );
};
