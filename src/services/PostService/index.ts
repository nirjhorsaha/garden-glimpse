/* eslint-disable prettier/prettier */

import { getCookies } from "cookies-next";

import envConfig from "@/src/config/envConfig";
import { IPost, IUser } from "@/src/types";

export const getAllPosts = async () => {
    const fetchOption = {
        next: {
            tags: ["posts"],
        },
    };

    const res = await fetch(`${envConfig.baseApi}/post`, fetchOption);

    return res.json();
};

export const getSinglePost = async (postId: string) => {
    let fetchOptions = {};

    fetchOptions = {
        cache: "no-store",
    };

    const res = await fetch(
        `${envConfig.baseApi}/post/${postId}`,
        fetchOptions,
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
};


export const updatePost = async (postId: string, postData: IPost) => {
    const cookies = getCookies(); // Retrieve cookies using getCookies

    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.accessToken}`, // Use the access token from cookies
        },
        body: JSON.stringify(postData),
    };

    const res = await fetch(`${envConfig.baseApi}/post/${postId}`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to update post");
    }

    return res.json();
};


export const updateUserProfile = async (data: IUser) => {
    const cookies = getCookies(); // Retrieve cookies using getCookies

    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.accessToken}`, // Use the access token from cookies
        },
        body: JSON.stringify(data),
    };

    const res = await fetch(`${envConfig.baseApi}/users/update-profile`, fetchOptions);

    if (!res.ok) {
        throw new Error("Failed to update profile.!");
    }

    return res.json();
};

