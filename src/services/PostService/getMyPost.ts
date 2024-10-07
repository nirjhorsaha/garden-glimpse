/* eslint-disable prettier/prettier */

import { cookies } from "next/headers";

import envConfig from "@/src/config/envConfig";

export const getMyPosts = async () => {
    const accessToken = cookies().get("accessToken")?.value;

    const res = await fetch(`${envConfig.baseApi}/post/user/my-post`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, 
        },
    });

    return res.json();
};

export const getSingleUser = async (userId: string) => {
    const accessToken = cookies().get("accessToken")?.value;

    const res = await fetch(`${envConfig.baseApi}/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`, 
        },
    });

    return res.json();
};
