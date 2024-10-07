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
        };
    }

    return decodedToken;
};
