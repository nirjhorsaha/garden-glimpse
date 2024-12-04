// This page component fetches a single post based on the provided postId parameter
// and renders the PostDetailsCard component with the fetched post data.

'use client'

import Loading from "@/src/components/UI/Loading/Loading";
import { PostDetailsCard } from "@/src/components/UI/PostDetails";
import { useGetSinglePost } from "@/src/hooks/getPost.hooks";

interface IProps {
    params: {
        postId: string;
    };
}

export default function Page({ params: { postId } }: IProps) {

    const { data: postData, isLoading, isFetching } = useGetSinglePost(postId);
    const post = postData?.data

    if (isLoading && isFetching) {
        return (
            <Loading />
        );
    }

    return (
        <div>
            {isFetching && <Loading />}
            <PostDetailsCard key={post?._id} post={post} />
        </div>
    );
};

// import { PostDetailsCard } from "@/src/components/UI/PostDetails";
// import { getSinglePost } from "@/src/services/PostService";
// import { IPost } from "@/src/types";

// interface IProps {
//     params: {
//         postId: string;
//     };
// }

// export default async function page({ params: { postId } }: IProps) {

//     const { data: post }: { data: IPost } = await getSinglePost(postId);

//     return (
//         <div>
//             <PostDetailsCard key={post?._id} post={post} />
//         </div>
//     );
// };

