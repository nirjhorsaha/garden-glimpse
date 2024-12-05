import { useQuery } from '@tanstack/react-query';

import { getMyFavouritePosts } from '../services/PostService/getMyPost';
import { getAllPosts, getSinglePost } from '../services/PostService';

export const useGetMyFavoritePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => await getMyFavouritePosts(),
  });
};

export const useGetAllPosts = (_category?: string) => {
  return useQuery({
    // queryKey: ['GET_ALL_POSTS'],
    queryKey: ['posts'],
    queryFn: async () => await getAllPosts(),
  });
};

export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => await getSinglePost(postId),
  });
};
