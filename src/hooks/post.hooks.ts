/* eslint-disable prettier/prettier */
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IPost } from '../types';
import { updatePost } from '../services/PostService';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

    return useMutation({
      mutationKey: ['Posts'],
      mutationFn: ({ postId, postData }: { postId: string; postData: IPost }) =>
        updatePost(postId, postData),
      onSuccess: (_, { postId }) => {
        // Correct way to invalidate specific queries with query keys
        //   queryClient.invalidateQueries(['post', postId]); // Invalidates query with the specific post ID
        //   queryClient.invalidateQueries(['posts']); // Invalidates the list of posts
      },
    });
};
