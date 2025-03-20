"use server";

import jwt from "jsonwebtoken";

async function confirmPassword(enteredPassword){
    if(enteredPassword === process.env.ADMIN_PASSWORD) return true;
    return false;
}

const SECRET_KEY = process.env.JWT_SECRET; 

const createMockJWT = (email, expiresIn = "1h") => {
  return jwt.sign(
    {
      id: "45678",
      name: email.split('@')[0] || test,
      email: email || "test@example.com",
    },
    SECRET_KEY,
    { expiresIn }
  );
};




export {
    confirmPassword,
    createMockJWT,
}