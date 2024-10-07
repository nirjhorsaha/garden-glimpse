/* eslint-disable prettier/prettier */
import { PostDetailsCard } from "@/src/components/UI/PostDetails";
import { getSinglePost } from "@/src/services/PostService";
import { IPost } from "@/src/types";

interface IProps {
    params: {
        postId: string;
    };
}

export default async function page({ params: { postId } }: IProps) {

    const { data: post }: { data: IPost } = await getSinglePost(postId);

    return (
        <div>
            <PostDetailsCard key={post?._id} post={post} />
        </div>
    );
};

