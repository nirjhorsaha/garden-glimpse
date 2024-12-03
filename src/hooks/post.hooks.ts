
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { IPost } from '../types';
import {
  addCommentToPost,
  createPost,
  deleteCommentToPost,
  deletePost,
  removeSavedPost,
  savedPost,
  updateCommentToPost,
  updatePost,
} from '../services/AuthServices';

// Hook for creating a post
export const useCreatePost = () => {
  return useMutation<any, Error, FormData, { toastId: string }>({
    mutationKey: ['posts'],
    mutationFn: async (postData) => await createPost(postData),
    onMutate: () => {
      const toastId = toast.loading('Processing...'); // Start a loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      toast.success('Post created successfully.!');
      toast.dismiss(context.toastId); // Dismiss the loading toast
    },
    onError: (error, variables, context) => {
      toast.error('Oops! Something went wrong while creating the post.!');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};

// Hook for updating an existing post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    { postId: string; postData: IPost; isVoting?: boolean },
    { toastId?: string }
  >({
    mutationKey: ['posts'],
    mutationFn: async ({ postId, postData }) => {
      await updatePost({ postId, postData });
    },
    onMutate: (variables) => {
      // Show loading toast only if it's not a voting action
      if (!variables.isVoting) {
        const toastId = toast.loading('Updating...');

        return { toastId }; // Return the toastId for later use
      }

      return {}; // Return an empty object if it's a voting action
    },
    onSuccess: (data, variables, context) => {

      // Dismiss the loading toast if it was shown
      if (context.toastId) {
        toast.dismiss(context.toastId);
      }

      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      // Do not show any toast for upvote or downvote actions
      if (variables.isVoting) {
        return;
      }

      toast.success('Post updated successfully!');
    },
    onError: (error, variables, context) => {
      // Dismiss the loading toast if it was shown
      if (context?.toastId) {
        toast.dismiss(context?.toastId);
      }
      toast.error('Update failed! Please check your data and try again.');
    },
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: any; data: any }, { toastId: string }>({
    mutationKey: ['posts'],
    mutationFn: async ({ postId, data }) => {
      await addCommentToPost(postId, data);
    },
    onMutate: () => {
      const toastId = toast.loading('Adding comment...'); // Show loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      // toast.success('Comment added successfully!');
      toast.dismiss(context.toastId); // Dismiss the loading toast

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error, variables, context) => {
      toast.error('Failed to add the comment. Please try again.');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    { commentatorId: string; commentId: string; comment: any; postId: string;},
    { toastId?: string }
  >({
    mutationKey: ['posts'],
    mutationFn: async ({ commentatorId, commentId, comment, postId }) => {
      await updateCommentToPost(commentatorId, commentId, comment, postId);
    },
    onMutate: () => {
      const toastId = toast.loading('Updating comment...'); // Show loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      toast.success('Comment updated successfully!');
      toast.dismiss(context?.toastId); // Dismiss the loading toast

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error, variables, context) => {
      toast.error('Failed to update the comment. Please try again.');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};


export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string; commentId: string }, { toastId: string }>({
    mutationKey: ['posts'],
    mutationFn: async ({ postId, commentId }) => {
      await deleteCommentToPost(postId, commentId);
    },
    onMutate: () => {
      const toastId = toast.loading('Deleting comment...'); // Show loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      toast.success('Comment deleted successfully!');
      toast.dismiss(context.toastId); // Dismiss the loading toast

      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error, variables, context) => {
      toast.error('Failed to delete the comment. Please try again.');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};

// Hook for deleting a post
export const useDeletePost = () => {
  return useMutation<any, Error, string, { toastId: string }>({
    mutationKey: ['posts'],
    mutationFn: async (postId) => await deletePost(postId),
    onMutate: () => {
      const toastId = toast.loading('Processing...'); // Start a loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      toast.success('Post deleted successfully.!');
      toast.dismiss(context.toastId); // Dismiss the loading toast
    },
    onError: (error, variables, context) => {
      toast.error('Failed to delete the post! Please try again.');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};

// Hook for saving a post to the profile
export const useSavedPostToProfile = () => {
  return useMutation<any, Error, any, { toastId: string }>({
    mutationKey: ['posts'],
    mutationFn: async (postId) => await savedPost(postId),
    onMutate: () => {
      const toastId = toast.loading('Processing...'); // Start a loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      toast.success('Post saved to your profile successfully.');
      toast.dismiss(context.toastId); // Dismiss the loading toast
    },
    onError: (error, variables, context) => {
      toast.error('Failed to save the post! Please try again.');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};

export const useRemovedPostFromProfile = () => {
  return useMutation<any, Error, any, { toastId: string }>({
    mutationKey: ['posts'],
    mutationFn: async (postId) => await removeSavedPost(postId),
    onMutate: () => {
      const toastId = toast.loading('Removing Post...'); // Start a loading toast

      return { toastId }; // Return the toastId for later use
    },
    onSuccess: (data, variables, context) => {
      toast.success('Post removed to your profile successfully.');
      toast.dismiss(context.toastId); // Dismiss the loading toast
    },
    onError: (error, variables, context) => {
      toast.error('Failed to remove the post! Please try again.');
      toast.dismiss(context?.toastId); // Dismiss the loading toast
    },
  });
};
