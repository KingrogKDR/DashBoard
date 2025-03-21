"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { confirmPassword, createMockJWT } from "../app/services";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const LoginForm = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

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
    <Card className="w-full max-w-md mx-auto shadow-lg">
      {isLoggedIn ? (
        <CardContent className="text-center py-6">
          <div className="text-green-600 dark:text-green-400 text-xl mb-2">
            Login Successful!
          </div>
          <p className="mb-4">Welcome back, {formData.email}</p>
          <Button onClick={() => router.push("/")}>Go to Dashboard</Button>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            {errors.confirm && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errors.confirm}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={
                      errors.email
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.email && (
                    <p className="text-red-500 dark:text-red-400 text-xs">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={
                      errors.password
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.password && (
                    <p className="text-red-500 dark:text-red-400 text-xs">
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full mt-2">
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default LoginForm;
