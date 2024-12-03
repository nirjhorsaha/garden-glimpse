/* eslint-disable no-console */
'use server';

import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { revalidateTag } from 'next/cache';

import axiosInstance from '@/src/lib/AxiosInstance';
import { IPost } from '@/src/types';
import envConfig from '@/src/config/envConfig';

import { getSingleUser } from '../PostService/getMyPost';

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/signup', userData);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken);
      cookies().set('refreshToken', data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', userData);

    console.log('User login data:', data);

    if (data.success) {
      cookies().set('accessToken', data?.data?.accessToken, {
        httpOnly: true, // Ensures it can't be accessed via JavaScript
        secure: true, // Ensures the cookie is sent only over HTTPS
      });
      cookies().set('refreshToken', data?.data?.refreshToken, {
        httpOnly: true,
        secure: true,
      });
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const forgetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      '/auth/forget-password',
      userData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPassword = async (userData: FieldValues) => {
  try {
    // console.log(userData);
    const accessToken = userData.accessToken;

    const { data } = await axiosInstance.post(
      '/auth/reset-password',
      userData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Something went wrong');
  }
};

export const logout = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get('accessToken')?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    const userId = decodedToken.userId;

    const user = await getSingleUser(userId);

    // console.log('get single user',user)
    return user;

    // return {
    //   _id: decodedToken._id,
    //   userId: decodedToken.userId,
    //   name: decodedToken.name,
    //   email: decodedToken.email,
    //   phone: decodedToken.phone,
    //   role: decodedToken.role,
    //   address: decodedToken.address,
    //   profileImage: decodedToken.profileImage,
    //   favouritePosts: decodedToken.favouritePosts,
    //   iat: decodedToken.number,
    //   exp: decodedToken.number,
    //   followers: decodedToken.followers,
    //   followings: decodedToken.followings,
    //   profileVerified: decodedToken.profileVerified,
    // };
  }

  // return null;

  return decodedToken;
};

export const createPost = async (formData: FormData): Promise<any> => {
  console.log(formData);
  const accessToken = cookies().get('accessToken')?.value;

  try {
    const { data } = await axiosInstance.post('/post/create-post', formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create post!');
  }
};

export const updatePost = async ({
  postId,
  postData,
}: {
  postId: string;
  postData: IPost;
}) => {
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify(postData),
  };

  const res = await fetch(`${envConfig.baseApi}/post/${postId}`, fetchOptions);

  revalidateTag('posts');

  if (!res.ok) {
    throw new Error('Failed to update post');
  }

  return res.json();
};

export const deletePost = async (postId: string) => {
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const res = await fetch(`${envConfig.baseApi}/post/${postId}`, fetchOptions);

  revalidateTag('posts'); // Revalidate the cache for posts

  if (!res.ok) {
    throw new Error('Failed to delete post');
  }

  return res.json();
};

export const savedPost = async (postId: any) => {
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    // data: JSON.stringify(postId),
  };

  try {
    const res = await axiosInstance.post(
      `${envConfig.baseApi}/users/post/favorite-post`,
      postId,
      fetchOptions,
    );

    revalidateTag('posts');

    return res.data; // Return the response data
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

export const addCommentToPost = async (postId: any, data: any) => {
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await axiosInstance.post(
      `${envConfig.baseApi}/post/add-comment/${postId}`,
      data,
      fetchOptions,
    );

    revalidateTag('posts');

    return res.data; // Return the response data
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const updateCommentToPost = async (
  commentatorId: any,
  commentId: any,
  comment: any,
  postId: any,
) => {
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const res = await axiosInstance.patch(
      `${envConfig.baseApi}/post/${postId}/comments/${commentId}`,
      { commentId, commentatorId, comment },
      fetchOptions,
    );

    revalidateTag('posts');

    return res.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw new Error('Failed to update comment');
  }
};

export const deleteCommentToPost = async (postId: any, commentId: any) => {
  console.log(postId, commentId);
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: { postId, commentId },
  };

  try {
    const res = await axiosInstance.delete(
      `${envConfig.baseApi}/post/${postId}/comments/${commentId}`,
      fetchOptions,
    );

    revalidateTag('posts');
    console.log(res);

    return res.data; // Return the response data
  } catch (error) {
    console.error('Error Deleting comment:', error);
    throw error;
  }
};

export const removeSavedPost = async (postId: any) => {
  const accessToken = cookies().get('accessToken')?.value;

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: postId, // Send postId in the request body
  };

  try {
    const res = await axiosInstance.delete(
      `${envConfig.baseApi}/users/post/remove-favorite-post`,
      fetchOptions,
    );

    revalidateTag('posts');

    return res.data; // Return the response data
  } catch (error) {
    console.error('Error removing saved post:', error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = cookies().get('refreshToken')?.value;

    const res = await axiosInstance({
      url: '/auth/refresh-token',
      method: 'POST',
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    console.log('Response', res.data);

    return res.data;
  } catch (error) {
    throw new Error('Failed to get new access token');
  }
};

export const updateUserProfile = async (data: any) => {
  try {
    const accessToken = cookies().get('accessToken')?.value;

    // // Call refresh token to get a new access token
    // const newAccessTokenResponse = await refreshAccessToken();
    // const newAccessToken = newAccessTokenResponse.data.accessToken;

    // // Set the new access token in cookies
    // cookies().set('accessToken', newAccessToken, {
    //   httpOnly: true, // Ensures it can't be accessed via JavaScript
    //   secure: true, // Ensures the cookie is sent only over HTTPS
    // });

    // Use the new access token for updating the profile
    const fetchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Use the new access token
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(
      `${envConfig.baseApi}/users/update-profile`,
      fetchOptions,
    );

    if (!res.ok) {
      console.error('Profile update failed: ', res.statusText);
      throw new Error('Failed to update profile');
    }

    // Revalidate the cache for the updated profile
    revalidateTag('userProfile');

    // After updating the profile, return the updated data
    const updatedData = await res.json();
    // console.log('Profile updated successfully:', updatedData);

    // Optionally, you can return the updated profile data here
    return updatedData;
  } catch (error: any) {
    console.error('Error updating profile: ', error);
    throw new Error(error.message || 'Something went wrong');
  }
};
