/* eslint-disable prettier/prettier */
import { getAllPosts } from "../../../services/PostService";
import { IPost } from "../../../types";
import { PostCard } from "../../UI/Postcard";

export default async function Post() {
    const { data: post } = await getAllPosts();
    const posts = post?.result as IPost[];

    return (
        <section className="py-4">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-8">
                    {posts?.length ? (
                        posts.map((post: IPost) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    ) : (
                        <p>No posts available</p>
                    )}
                </div>
            </div>
        </section>
    );
};

