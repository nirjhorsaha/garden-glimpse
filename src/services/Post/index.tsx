'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { FieldValues } from 'react-hook-form';

import axiosInstance from '@/src/lib/AxiosInstance';
import { IPost } from '@/src/types';
import envConfig from '@/src/config/envConfig';

// Creates a new post with form data.
export const createPost = async (postData: FieldValues): Promise<any> => {
    // console.log(formData);

    const accessToken = cookies().get('accessToken')?.value;

    try {
        const { data } = await axiosInstance.post('/post/create-post', postData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return data;
    } catch (error) {
        // console.log(error);
        throw new Error('Failed to create post!');
    }
};

// Updates an existing post.
export const updatePost = async ({
    postId,
    postData,
}: { postId: string; postData: IPost }) => {
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

// Deletes a specific post.
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

// Marks a post as saved for the user.
export const savedPost = async (postId: any) => {
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
            `${envConfig.baseApi}/users/post/favorite-post`,
            postId,
            fetchOptions,
        );

        revalidateTag('posts');

        return res.data; // Return the response data
    } catch (error) {
        throw new Error('Error saving post:');
        // console.error('Error saving post:', error);
        // throw error;
    }
};

// Adds a comment to a specific post.
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
        throw new Error('Error adding comment:');
        // console.error('Error adding comment:', error);
        // throw error;
    }
};

// Updates a comment on a post.
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
        // console.error('Error updating comment:', error);
        throw new Error('Failed to update comment');
    }
};

// Deletes a comment from a post.
export const deleteCommentToPost = async (postId: any, commentId: any) => {
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

        return res.data; // Return the response data
    } catch (error) {
        throw new Error('Error deleting comment:');
        // console.error('Error Deleting comment:', error);
        // throw error;
    }
};

// Removes a post from the user's saved list.
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
        throw new Error('Error removing saved post:');
        // console.error('Error removing saved post:', error);
        // throw error;
    }
};