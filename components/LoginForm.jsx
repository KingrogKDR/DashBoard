"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { confirmPassword, createMockJWT } from "../app/services";
import { redirect, useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwt_token"));
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !validateEmail(formData.email) ? "Please enter a valid email" : "",
      password: !validatePassword(formData.password)
        ? "Password must be at least 6 characters"
        : "",
      confirm:
        confirmPassword(formData.password) &&
        formData.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
          ? ""
          : "Either your email/password is incorrect",
    };

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password && !newErrors.confirm) {
      setIsLoggedIn(true);
      const token = createMockJWT(formData.email);
      localStorage.setItem("jwt_token", token);
      router.push("/");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-background rounded-lg shadow-xl">
      {isLoggedIn ? (
        <div className="text-center py-4">
          <div className="text-green-600 text-xl mb-2">Login Successful!</div>
          <p className="text-foreground">Welcome back, {formData.email}</p>
          <Button>Go to Dashboard</Button>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
            Login
          </h2>
          <div className="w-full text-red-400 text-center py-3 my-4">
            {errors.confirm}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-foreground text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-background text-foreground ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-foreground text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 bg-background text-foreground ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
