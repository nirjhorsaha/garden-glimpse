/* eslint-disable prettier/prettier */

import { cookies } from 'next/headers';

import envConfig from '@/src/config/envConfig';

export const getMyPosts = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  const res = await fetch(`${envConfig.baseApi}/post/user/my-post`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
};

export const getAuthorPost = async (userId: string) => {
  const res = await fetch(`${envConfig.baseApi}/post/user/${userId}`, {});

  return res.json();
};

export const getMyFavouritePosts = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  console.log(accessToken)

  const res = await fetch(`${envConfig.baseApi}/users/favorite-posts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.json();
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
