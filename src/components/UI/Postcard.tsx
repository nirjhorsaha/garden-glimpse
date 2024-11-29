'use client'

import { useState } from "react";
import { Image, Tooltip } from "@nextui-org/react";
import { ChevronUp, ChevronDown, MessageSquareText } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useUserStore } from "@/src/lib/zustand/userStore";

import { IPost } from "../../types";

interface PostCardProps {
    post: IPost;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter(); 
    const user = useUserStore((state) => state.user);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCardClick = () => {
        if (post.isPremium && !user?.profileVerified) {
            // Show toast with a unique id for profile verification
            toast.error('You need to verify your profile to access premium content.', { id: 'verification-error' });
        } else {
            // If the user is logged in and has access
            router.push(`/post/${post._id}`);
        }
    };


    // Limit content to approximately two lines 
    const MAX_CHARACTERS = 100;
    const truncatedContent = post?.content?.length > MAX_CHARACTERS
        ? post.content.slice(0, MAX_CHARACTERS) + "... "
        : post.content;

    return (
        <div
            className="group w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-4 lg:p-6 flex flex-col md:flex-row items-start md:gap-6"
            role="button" // Indicates that this div acts as a button
            tabIndex={0}  // Makes the div focusable and keyboard-navigable
            onClick={handleCardClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                    handleCardClick(); // Trigger click action on Enter or Space
                }
            }}
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

                            <span className="text-blue-500 text-sm">
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
                                {post.content?.length > MAX_CHARACTERS && (
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={handleCardClick}
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

                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <p className="text-left bg-zinc-300 dark:bg-slate-600 px-2 inline-block rounded-full mr-2">
                        {post.category}
                    </p>

                    <Tooltip content="Upvote">
                        <span className="flex items-center text-gray-700">
                            <ChevronUp className="text-blue-500" />
                            <span className="ml-1 dark:text-white font-normal">{post.upVoteCount || 0}</span>
                        </span>
                    </Tooltip>
                    
                    <Tooltip content="Downvote">
                        <span className="flex items-center text-gray-700">
                            <ChevronDown className="text-red-500" />
                            <span className="ml-1 dark:text-white font-normal">{post.downVoteCount || 0}</span>
                        </span>
                    </Tooltip>

                    <Tooltip content="Comments">
                        <span className="flex items-center text-gray-700">
                            <MessageSquareText className="text-blue-500" />
                            <span className="ml-1 dark:text-white font-normal">{post?.comments?.filter(comment => !comment.isDeleted).length || 0}</span>
                        </span>
                    </Tooltip>

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
        </div>
    );
};