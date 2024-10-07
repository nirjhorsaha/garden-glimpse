/* eslint-disable prettier/prettier */

import { PostCard } from "@/src/components/UI/Postcard";
import { getMyPosts } from "@/src/services/PostService/getMyPost";
import { IPost } from "@/src/types";

export default async function MyPostPage() {
  const { data: post } = await getMyPosts();

  return (
    <>
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-8">
        {post?.length ? (
          post.map((post: IPost) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

