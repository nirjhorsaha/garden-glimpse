'use server';

import { cookies } from 'next/headers';

import envConfig from '@/src/config/envConfig';
import axiosInstance from '@/src/lib/AxiosInstance';

export const getMyPosts = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  const { data } = await axiosInstance.get(
    `${envConfig.baseApi}/post/user/my-post`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return data;
};

export const getAuthorPost = async (userId: string) => {
  try {
    const res = await axiosInstance.get(
      `${envConfig.baseApi}/post/user/${userId}`,
      {},
    );

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMyFavouritePosts = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  try {
    const res = await axiosInstance.get(
      `${envConfig.baseApi}/users/post/favorite-posts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSingleUser = async (userId: string) => {
  const accessToken = cookies().get('accessToken')?.value;

  const res = await fetch(`${envConfig.baseApi}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
};
