/* eslint-disable prettier/prettier */
"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/signup", userData);

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/login", userData);
        console.log(data);

        if (data.success) {
            cookies().set("accessToken", data?.data?.accessToken);
            cookies().set("refreshToken", data?.data?.refreshToken);
        }

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};


export const forgetPassword = async (userData: FieldValues) => {
    try {
        const { data } = await axiosInstance.post("/auth/forget-password", userData);

        return data;
    } catch (error: any) {
        throw new Error(error);
    }
};


export const resetPassword = async (userData: FieldValues) => {
  try {
    //   console.log(userData)
      const accessToken = userData.accessToken; 

    // Add the accessToken to the Authorization header
    const { data } = await axiosInstance.post(
      '/auth/reset-password',
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // console.log(data);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};


export const logout = () => {
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    let decodedToken = null;

    if (accessToken) {
        decodedToken = await jwtDecode(accessToken);

        return {
            _id: decodedToken._id,
            userId: decodedToken.userId,
            name: decodedToken.name,
            email: decodedToken.email,
            phone: decodedToken.phone,
            role: decodedToken.role,
            address: decodedToken.address,
            profileImage: decodedToken.profileImage,
            favouritePosts: decodedToken.favouritePosts,
            iat: decodedToken.number,
            exp: decodedToken.number,
            followers: decodedToken.followers,
            followings: decodedToken.followings,
            profileVerified: decodedToken.profileVerified,

        };
    }

    return decodedToken;
};
