/* eslint-disable prettier/prettier */
'use client'
import { useState } from "react";
import { Image } from "@nextui-org/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { IPost } from "../../types";

interface PostCardProps {
    post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    // console.log(post)
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter(); // Initialize router


    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCardClick = () => {
        router.push(`/post/${post._id}`);
    };


    // Limit content to approximately two lines 
    const MAX_CHARACTERS = 100;
    const truncatedContent = post.content.length > MAX_CHARACTERS
        ? post.content.slice(0, MAX_CHARACTERS) + "... "
        : post.content;

    return (
        <button
            className="group w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-4 lg:p-6 flex flex-col md:flex-row items-start md:gap-6 cursor-pointer"
            type="button"
            onClick={handleCardClick}

        >
            {/* Left Side Content */}
            <div className="flex-1">
                <div className="mb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className="text-gray-800 dark:text-white text-lg mr-2"
                            >
                                {post?.authorId?.name || "Unknown Author"}
                            </span>
                            {/* {post.upVoteCount >= 1 && (
                                <ShieldCheck className="text-blue-600 mr-4 size-5" />
                            )} */}
                            <span className="text-indigo-600 font-medium">
                                {new Intl.DateTimeFormat('en-US', {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric',
                                }).format(new Date(post?.createdAt))}
                            </span>
                        </div>
                        {post.isPremium && (
                            <span className="bg-yellow-500 text-white font-medium text-xs px-2.5 py-0.5 rounded-full">
                                Premium
                            </span>
                        )}
                    </div>
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-5 text-left">
                    <p>{post.title}</p>
                </h4>
                <div className="text-gray-500 dark:text-gray-400 leading-6 mb-5 text-left">
                    <p>
                        {isExpanded ? (
                            post.content
                        ) : (
                            <>
                                {truncatedContent}
                                {post.content.length > MAX_CHARACTERS && (
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={toggleContent}
                                    >
                                        See more
                                    </button>
                                )}
                            </>
                        )}
                    </p>
                    {isExpanded && (
                        <button
                            className="text-blue-500 hover:underline mt-2"
                            onClick={toggleContent}
                        >
                            See less
                        </button>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <p className="text-left bg-zinc-300 dark:bg-slate-600 px-2 inline-block rounded-full">
                        {post.category}
                    </p>
                    <span className="flex items-center text-gray-700">
                        <ChevronUp className="text-blue-500" />
                        <span className="ml-1 dark:text-white font-normal">{post.upVoteCount || 0}</span>
                    </span>
                    <span className="flex items-center text-gray-700">
                        <ChevronDown className="text-red-500" />
                        <span className="ml-1 dark:text-white font-normal">{post.downVoteCount || 0}</span>
                    </span>
                </div>
            </div>

            {/* Right Side Image */}
            <div className="w-full md:w-1/3">
                <Image
                    alt={post.title || "Post Image"}
                    className="rounded-2xl w-full object-cover"
                    src={post.images?.[0] || "/fallback-image.jpg"}
                />
            </div>
        </button>
    );
};