"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import { LuEyeOff, LuEye } from "react-icons/lu";

interface Values {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = { name: "", email: "", password: "" };

  const handleSubmit = (
    values: Values,
    { resetForm }: { resetForm: () => void }
  ) => {
    // console.log(values);
    resetForm();
  };

  return (
    <div className="flex flex-col p-10 max-w-[566px] h-[600px] border border-black">
      <h1
        style={{ fontSize: "40px" }}
        className="mb-5 font-semibold leading-tight tracking-tight text-gray-900 font-roboto"
      >
        Registration
      </h1>
      <p className="mb-10">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className="flex flex-col items-center gap-y-4">
          <Field
            type="text"
            name="Name"
            placeholder="Name"
            className="text-base pl-4 py-4 border border-gray-300 rounded-xl placeholder-black min-w-190 max-w-440 w-full
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <Field
            type="email"
            name="Email"
            placeholder="Email"
            className="text-base pl-4 py-4 border border-gray-300 rounded-xl placeholder-black min-w-190 max-w-440 w-full
    focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="relative w-full">
            <Field
              type={showPassword ? "text" : "password"}
              name="Password"
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
          </div>
          <Link
            href="/teachers"
            className="text-base text-center font-bold mt-10 p-4 bg-orange rounded-xl min-w-190 max-w-440 w-full hover:scale-105 transition-transform"
          >
            Sign Up
          </Link>
        </Form>
      </Formik>
    </div>
  );
};
