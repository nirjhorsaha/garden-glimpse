import { create } from 'zustand';

import { IPost } from '@/src/types';

interface UserState {
  user: Record<string, any> | null; 
  setUser: (user: Record<string, any> | null) => void;
  updateUserProfile: (updatedData: Record<string, any>) => void; 
  toggleFavoritePost: (postId: string) => void;
}

interface PostStore {
  posts: IPost[];
  addPost: (newPost: IPost) => void;
  updatePostDetails: (updatedPost: IPost) => void;
  removePost: (postId: string) => void;
  setPosts: (posts: IPost[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  
  updateUserProfile: (updatedData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedData } : null,
    })),
  
  toggleFavoritePost: (postId: string) =>
    set((state) => {
      if (!state.user) return state;

      const isFavorite = state.user.favouritePosts?.includes(postId);

      const updatedFavouritePosts = isFavorite
        ? state.user.favouritePosts.filter((id: string) => id !== postId) 
        : [...(state.user.favouritePosts || []), postId]; 

        const updatedUser = {
          ...state.user,
          favouritePosts: updatedFavouritePosts,
      };
      
      // updated user state
      // console.log("Updated user state:", updatedUser);

      return { user: updatedUser };
    }),
}));

export const usePostStore = create<PostStore>((set) => ({
  posts: [], // Initially empty list of posts

  addPost: (newPost) => set((state) => ({ posts: [...state.posts, newPost] })),

  updatePostDetails: (updatedPost: IPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      ),
    })),

  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postId),
    })),
  
  setPosts: (posts) => set({ posts }),
}));