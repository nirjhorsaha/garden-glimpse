/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

import { loginUser, registerUser } from "../services/AuthServices";

// Custom hook for handling user registration.
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("Registration successful.");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Registration failed.! Please check your data and try again.");
    },
  });
};

// Custom hook for handling user login.
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("Login successful.");
    },
    onError: (error) => {
      console.error(error.message)
      toast.error("Login Failed.! Please check your email and password.");
    },
  });
};

