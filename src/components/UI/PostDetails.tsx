/* eslint-disable prettier/prettier */
"use client";
import { Image } from "@nextui-org/react";
import { ChevronUp, ChevronDown, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { IPost } from "../../types";

import { updatePost, getComments, addComment, updateComment, deleteComment } from "@/src/services/PostService";

interface PostCardProps {
    post: IPost;
}

export const PostDetailsCard: React.FC<PostCardProps> = ({ post }) => {
    const router = useRouter(); // Initialize router
    const [upVoteCount, setUpVoteCount] = useState(post.upVoteCount || 0);
    const [downVoteCount, setDownVoteCount] = useState(post.downVoteCount || 0);
    const [hasVoted, setHasVoted] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editingComment, setEditingComment] = useState(null);
    const [editedComment, setEditedComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await getComments(post._id);
                setComments(response);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [post._id]);

    const handleAuthorClick = () => {
        router.push(`/author/${post.authorId?._id}`);
    };

    const handleUpVote = async () => {
        if (hasVoted) return;
        try {
            await updatePost(post?._id, { ...post, upVoteCount: upVoteCount + 1 });
            setUpVoteCount(upVoteCount + 1);
            setHasVoted(true);
        } catch (error) {
            console.error("Error updating upvote:", error);
        }
    };

    const handleDownVote = async () => {
        if (hasVoted) return;
        try {
            await updatePost(post?._id, { ...post, downVoteCount: downVoteCount - 1 });
            setDownVoteCount(downVoteCount - 1);
            setHasVoted(true);
        } catch (error) {
            console.error("Error updating downvote:", error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await addComment(post._id, newComment);
            // setComments([...comments, response]);
            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleEditComment = (comment) => {
        setEditingComment(comment);
        setEditedComment(comment.content);
    };

    const handleUpdateComment = async () => {
        if (!editedComment.trim()) return;

        try {
            // await updateComment(post._id, editingComment._id, editedComment);
            // setComments(
            //     comments.map((comment) =>
            //         comment._id === editingComment._id ? { ...comment, content: editedComment } : comment
            //     )
            // );
            setEditingComment(null);
            setEditedComment("");
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(post._id, commentId);
            setComments(comments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="group max-w-5xl mx-auto mt-10 border border-gray-300 dark:border-gray-700 rounded-2xl">
            <div className="flex items-center justify-center p-4 rounded-lg">
                <Image
                    alt={post.title || "Post Image"}
                    className="rounded-t-2xl object-cover w-full"
                    src={post.images?.[0] || "/fallback-image.jpg"}
                />
            </div>
            <div className="p-4 sm:p-6 transition-all duration-300 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                    <div className="flex items-center mb-2 sm:mb-0">
                        <button
                            aria-label={`View posts by ${post.authorId?.name || "Unknown Author"}`}
                            className="text-gray-800 dark:text-white text-lg mr-2 hover:underline"
                            onClick={handleAuthorClick}
                        >
                            {post.authorId?.name || "Unknown Author"}
                        </button>
                        <span className="text-indigo-600 font-medium">
                            {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }).format(new Date(post?.createdAt))}
                        </span>
                    </div>
                    {post.isPremium && (
                        <span className="bg-yellow-500 text-white font-medium text-xs px-2.5 py-0.5 rounded-full">
                            Premium
                        </span>
                    )}
                </div>
                <h4 className="text-xl text-gray-900 dark:text-white font-medium leading-8 mb-3 sm:mb-5 text-left">
                    <p>{post.title}</p>
                </h4>
                <div className="text-gray-500 dark:text-gray-400 leading-6 mb-5 sm:mb-10 text-left">
                    <p>{post.content || "Content not available."}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-left bg-zinc-300 dark:bg-slate-600 px-2 inline-block rounded-full">
                        {post.category}
                    </p>
                    <button
                        className={`flex items-center text-gray-700 cursor-pointer ${
                            hasVoted ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handleUpVote}
                        disabled={hasVoted}
                    >
                        <ChevronUp className="text-blue-500" />
                        <span className="ml-1 dark:text-white font-normal">{upVoteCount}</span>
                    </button>
                    <button
                        className={`flex items-center text-gray-700 cursor-pointer ${
                            hasVoted ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handleDownVote}
                        disabled={hasVoted}
                    >
                        <ChevronDown className="text-red-500" />
                        <span className="ml-1 dark:text-white font-normal">{downVoteCount}</span>
                    </button>
                </div>
                <div className="mt-8">
                    <h5 className="text-lg text-gray-900 dark:text-white font-medium leading-8 mb-4">Comments</h5>
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="flex items-start justify-between bg-gray-100 dark:bg-slate-700 p-4 rounded-lg"
                            >
                                <p className="text-gray-800 dark:text-white">{comment.content}</p>
                                <div className="flex space-x-2">
                                    <button
                                        aria-label="Edit comment"
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                        onClick={() => handleEditComment(comment)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        aria-label="Delete comment"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteComment(comment._id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {editingComment ? (
                        <div className="mt-4">
                            <textarea
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-2"
                            />
                            <button
                                onClick={handleUpdateComment}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                            >
                                Update Comment
                            </button>
                            <button
                                onClick={() => setEditingComment(null)}
                                className="ml-2 bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-2"
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                            >
                                Add Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
