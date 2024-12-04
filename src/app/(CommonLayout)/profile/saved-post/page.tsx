'use client'

import PostCardLoadingUI from "@/src/components/UI/Loading/PostCardLoadingUI";
import { PostCard } from "@/src/components/UI/Postcard";
import { useGetMyFavoritePosts } from "@/src/hooks/getPost.hooks";
import { IPost } from "@/src/types";

export default function MyPost() {
  const { data: favoritePost, isLoading, isFetching } = useGetMyFavoritePosts();
  const posts = favoritePost?.data

  return (
    <>
      { isLoading && <PostCardLoadingUI/>}
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-8">
        {posts && posts?.length ? (
          posts.map((post: IPost) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          !isFetching && <p>No saved posts found.!</p>
          // <p>No saved posts found.!</p>
        )}
      </div>
    </>);
};
