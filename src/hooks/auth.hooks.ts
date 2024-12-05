/* eslint-disable no-console */

import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";

import { forgetPassword, loginUser, registerUser, resetPassword, updateUserProfile } from "../services/AuthServices";

// Hook for handling user registration.
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

// Hook for handling user login.
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

// Hook for updating user profile .
export const useUserProfileUpdate = () => {
  return useMutation < {userData: any
}>({
    mutationKey: ['USER_UPDATE_PROFILE'],
    mutationFn: async(userData) => await updateUserProfile(userData),  
    onSuccess: (data) => {
      console.log('Updated Profile Data:', data);
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || 'Failed to update profile.');
    },
  });
};

// Hook for sending a password reset link.
export const useForgetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGOT_PASSWORD"],
    mutationFn: async (userData) => await forgetPassword(userData),
    onSuccess: () => {
      toast.success("Password reset link has been sent to your email.");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Failed to send password reset link. Please try again.");
    },
  });
};

// Hook for resetting passwords.
export const useResetPassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async (userData) => await resetPassword(userData),
    onSuccess: () => {
      toast.success("Password reset successful. You can now log in with your new password.");
    },
    onError: (error) => {
      console.error(error.message);
      toast.error("Failed to reset password. Please try again.");
    },
  });
};