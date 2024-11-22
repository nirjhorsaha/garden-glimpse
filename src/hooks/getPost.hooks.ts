import { useQuery } from "@tanstack/react-query";

import { getMyFavouritePosts } from "../services/PostService/getMyPost";
import { getAllPosts } from "../services/PostService";

export const useGetMyFavoritePosts = () => {
    return useQuery({
      queryKey: ['GET_FAVORITE_POSTS'], 
      queryFn: async()=> await getMyFavouritePosts(),      
    });
};
  
export const useGetAllPosts = (category?: string) => {
  return useQuery({
    queryKey: ['GET_ALL_POSTS'], 
    queryFn: async()=> await getAllPosts(), 
  });
};