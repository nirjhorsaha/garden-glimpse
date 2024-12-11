'use client';

import { Image, Tooltip, Popover, PopoverTrigger, PopoverContent, Button, Avatar } from '@nextui-org/react';
import { ChevronUp, ChevronDown, Reply, SendHorizonal, Share, MessageSquareText, } from 'lucide-react';
import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

import { useUserStore } from '@/src/lib/zustand/userStore';
import { useAddComment, useDeleteComment, useRemovedPostFromProfile, useSavedPostToProfile, useUpdateComment, useUpdatePost } from '@/src/hooks/post.hooks';

import { IComments, IPost } from '../../types';
import DeletePostModal from '../Modal/DeletePostModal';
import PostUpdateModal from '../Modal/PostUpdateModal';

interface PostCardProps {
  post: IPost;
}

export const PostDetailsCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const { mutate: savedPost, } = useSavedPostToProfile();
  const { mutate: removedPost, } = useRemovedPostFromProfile();
  const { mutate: updatePost, } = useUpdatePost();
  const { mutate: addComment, } = useAddComment();
  const { mutate: deleteComment, } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();


  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null); // Track user's vote
  const [upVoteCount, setUpVoteCount] = useState(post?.upVoteCount || 0);
  const [downVoteCount, setDownVoteCount] = useState(post?.downVoteCount || 0);
  const [newComment, setNewComment] = useState('');
  const [isPostSaved, setIsPostSaved] = useState(false); // Track if the post is saved
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [updatedCommentText, setUpdatedCommentText] = useState<string>('');

  const favoritePostIds = user?.favouritePosts || [];
  const isFavorite = favoritePostIds.includes(post?._id); // Check if the current post is a favorite

  const { toggleFavoritePost } = useUserStore();


  const handleAuthorClick = useCallback(() => {
    if (user) {
      const route = post?.authorId?._id === user?.userId ? '/profile' : `/author/${post.authorId?._id}`;

      router.push(route);
    }
  }, [user, post?.authorId?._id, router]);


  const handleVote = useCallback(
    async (type: 'up' | 'down') => {
      try {
        let newUpVoteCount = upVoteCount;
        let newDownVoteCount = downVoteCount;

        if (type === 'up') {
          if (hasVoted === 'up') {
            newUpVoteCount -= 1;
            setHasVoted(null);
          } else {
            newUpVoteCount += 1;
            if (hasVoted === 'down') {
              newDownVoteCount -= 1;
            }
            setHasVoted('up');
          }
        } else {
          if (hasVoted === 'down') {
            newDownVoteCount -= 1;
            setHasVoted(null);
          } else {
            newDownVoteCount += 1;
            if (hasVoted === 'up') {
              newUpVoteCount -= 1;
            }
            setHasVoted('down');
          }
        }

        await updatePost({
          postId: post?._id!,
          postData: {
            ...post,
            upVoteCount: newUpVoteCount,
            downVoteCount: newDownVoteCount,
          },
          isVoting: true,
        });

        setUpVoteCount(newUpVoteCount);
        setDownVoteCount(newDownVoteCount);
      } catch (error) {
        console.error('Error updating vote:', error);
      }
    },
    [hasVoted, upVoteCount, downVoteCount, post, updatePost]
  );


  const handleAddComment = useCallback(async () => {
    if (!newComment.trim()) return;
    try {
      const postId = post?._id;
      const commentatorId = user?._id;
      const comment = newComment.trim();

      const data = { commentatorId, comment };

      await addComment({ postId, data });

      // Update the comments list by adding the new comment
      const newCommentData = {
        ...data,
        _id: '',
        isDeleted: false,
        commentatorId: user,
        createdAt: new Date(),
      };

      post?.comments && post.comments.push(newCommentData); // Update the comments array with the new comment
      setNewComment(''); // Clear the input field after submitting the comment

    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }, [newComment, post?._id, user?._id]);


  const handleDeleteComment = async (commentId: string) => {
    const postId = post?._id;

    if (!postId) {
      console.error("Post ID is undefined");

      return; // Exit early if postId is undefined
    }

    try {
      await deleteComment({ postId, commentId });
      setNewComment("");

      // Update the post's comments list locally
      const updatedComments = post?.comments?.filter((comment: IComments) => comment._id !== commentId);

      post.comments = updatedComments;

    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };


  const handleSharePost = useCallback(async () => {
    try {
      const postUrl = `${window.location.origin}/post/${post._id}`;

      await navigator.clipboard.writeText(postUrl);
      setIsPopoverOpen(true);
      setTimeout(() => setIsPopoverOpen(false), 2000);
    } catch (error) {
      toast.error('Error copying post URL');
    }
  }, [post?._id]);



  // Handle Edit button click
  const handleEditCommentClick = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setUpdatedCommentText(currentText);
  };

  // Save the updated comment
  const handleSaveEditedComment = async (commentId: string) => {
    try {
      if (!updatedCommentText.trim()) return;

      const postId = post?._id;

      if (!postId) return;

      const comment = updatedCommentText.trim();
      const commentatorId = user?._id

      updateComment({ postId, commentId, commentatorId, comment })

    
      setEditingCommentId(null); // Reset editing state
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };


  const handleClick = useCallback((postId: string) => {
    toggleFavoritePost(postId);
    const data = { postId };

    if (isFavorite || isPostSaved) {
      removedPost(data);
      setIsPostSaved(false);
      setIsPostRemoved(true);
    } else {
      savedPost(data);
      setIsPostSaved(true);
      setIsPostRemoved(false);
    }
  }, [isFavorite, isPostSaved, removedPost, savedPost, toggleFavoritePost]);

  return (
    <div className="group max-w-5xl mx-auto mt-10 border border-gray-300 dark:border-gray-700 rounded-2xl">
      <div className="flex items-center justify-center p-4 rounded-lg">
        <Image
          alt={post?.title || 'Post Image'}
          className="rounded-t-2xl object-cover w-full"
          src={post?.images?.[0] || '/fallback-image.jpg'}
        />
      </div>
      <div className="p-4 sm:p-6 transition-all duration-300 rounded-b-2xl">
        <div className="flex flex-row items-start sm:items-center justify-between mb-3">
          <div className="flex items-center mb-2 sm:mb-0">
            {user ? (
              <div
                className="text-gray-800 dark:text-white text-lg mr-2 hover:underline"
                role="button"
                tabIndex={0}
                onClick={handleAuthorClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleAuthorClick();
                  }
                }}
              >
                {post.authorId?.name || 'Unknown Author'}
              </div>
            ) : (
              <Popover color="foreground" placement="top" showArrow={true}>
                <Tooltip color="foreground" content="Share Post">
                  <PopoverTrigger
                    className="text-gray-800 dark:text-white text-lg mr-2 hover:underline"
                    onClick={handleAuthorClick}
                  >
                    {post?.authorId?.name || 'Unknown Author'}
                  </PopoverTrigger>
                </Tooltip>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-small font-bold">Please log in to view profile!</div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
            {/* <span className="text-blue-500 text-sm">
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }).format(new Date(post?.createdAt))}
            </span> */}
            <span className="text-blue-500 text-sm">
              {(() => {
                const date = new Date(post?.createdAt);

                return `${date.toLocaleString('en-US', { month: 'short' })} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
              })()}
            </span>
          </div>

          <div className='flex gap-2 justify-center items-center'>
            {post?.authorId?._id === user?._id ? (
              <>
                <PostUpdateModal
                  post={post}
                />
                <DeletePostModal
                  postId={post?._id!}
                />
              </>
            ) : (
              user && (
                <Tooltip color="foreground" content={isPostSaved ? 'Unsave Post' : 'Save Post'}>
                  <button
                    aria-label="Save post"
                    onClick={() => handleClick(post?._id!)}
                  >
                    {isPostRemoved ? (
                      // Show empty heart icon if the post is removed
                      <MdFavoriteBorder size={25} />
                    ) : isFavorite || isPostSaved ? (
                      // Show filled heart icon if the post is a favorite or saved
                      <MdOutlineFavorite size={25} />
                    ) : (
                      // Show empty heart icon if the post is neither saved nor a favorite
                      <MdFavoriteBorder size={25} />
                    )}
                  </button>
                </Tooltip>
              )
            )}
            <Popover color='foreground' placement="top" showArrow={true} >
              <Tooltip color='foreground' content='Share Post'>
                <PopoverTrigger>
                  <Share className='cursor-pointer' onClick={handleSharePost} />
                </PopoverTrigger>
              </Tooltip>
              {isPopoverOpen && (
                <PopoverContent>
                  <p>
                    Link copied!
                  </p>
                </PopoverContent>
              )}
            </Popover>
          </div>
        </div>

        <h4 className="text-2xl text-gray-900 dark:text-white font-medium leading-8 mb-3 sm:mb-5 text-left">
          <p>{post?.title}</p>
        </h4>

        <div className="text-gray-500 dark:text-gray-400 leading-6 mb-5 sm:mb-10 text-left">
          <p>{post?.content || 'Content not available.'}</p>
        </div>

        <div className="flex items-center space-x-2">
          {post?.isPremium && (
            <span className="bg-yellow-500 text-white font-medium text-sm px-2.5 py-0.5 rounded-full">
              Premium
            </span>
          )}
          <p className="text-left bg-zinc-300 dark:bg-slate-600 ont-medium text-sm px-2.5 py-0.5 rounded-full">
            {post?.category}
          </p>
          <Tooltip color='foreground' content='Upvote'>
            <button
              className={`flex items-center text-gray-700 cursor-pointer ${hasVoted === 'up' ? 'text-blue-600' : ''
                } ${!user ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={!user} // Disable button if no user
              onClick={() => handleVote('up')}// Prevent onClick if no user
            >
              <ChevronUp className={`${user ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="ml-1 dark:text-white font-normal">{upVoteCount}</span>
            </button>
          </Tooltip>

          <Tooltip color='foreground' content='Downvote'>
            <button
              className={`flex items-center text-gray-700 cursor-pointer ${hasVoted === 'down' ? 'text-red-600' : ''}
              ${!user ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={!user} // Disable button if no user
              onClick={() => handleVote('down')}
            >
              <ChevronDown className="text-red-500" />
              <span className="ml-1 dark:text-white font-normal mr-1">{downVoteCount}</span>
            </button>
          </Tooltip>

          <Tooltip color='foreground' content="Comments">
            <span className="flex items-center text-gray-700">
              <MessageSquareText className="text-blue-500" />
              <span className="ml-1 dark:text-white font-normal">{post?.comments?.filter(comment => !comment.isDeleted).length || 0}</span>
            </span>
          </Tooltip>
        </div>

        {/* Add New Comment Section */}
        {user ? (
          <div className="mt-6">
            <h5 className="text-lg text-gray-900 dark:text-white font-medium leading-8 mb-2">
              Leave a Comment
            </h5>

            <div className='flex justify-center items-center gap-2'>
              <textarea
                className="w-full white:border bg-gray-50 dark:bg-slate-800 rounded-lg p-4"
                placeholder={`Comment as ${user?.name}`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevents adding a new line
                    handleAddComment(); // Submits the comment
                  }
                }}
              />
              <Tooltip color='primary' content='Comment'>
                <SendHorizonal className='cursor-pointer' onClick={handleAddComment} />
              </Tooltip>
            </div>

          </div>) : (
          <div className="mt-6 text-center">
            <h5 className="text-lg text-gray-900 dark:text-white font-medium leading-8">
              Please log in to leave a comment.
            </h5>
          </div>
        )}

        {/* Comments List */}
        {post?.comments && post.comments.length >= 1 && (
          <div className="mt-8">
            <h5 className="font-medium text-xl leading-8 mb-4">Comments</h5>
            <div className="space-y-4">
              {post?.comments?.
                filter((comment: IComments) => !comment?.isDeleted).slice()
                .reverse().map((comment) => (
                  <div key={comment._id} className="border-b pb-4 flex items-start space-x-4 relative border dark:border-0 rounded-lg p-2">
                    <Avatar
                      // alt="Commentator" 
                      showFallback
                      className="h-14 w-14 object-cover border" 
                      radius="lg"
                      src={comment.commentatorId?.profileImage || 'https://i.ibb.co.com/zrTFyr2/demo-user.jpg'} // Fallback to default image
                    />

                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">
                        <div className='flex flex-row justify-between'>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                            <button
                              aria-label={`View posts by ${comment?.commentatorId?.name}`}
                              className="text-gray-800 dark:text-white font-medium text-xl leading-8 hover:underline text-left"
                              onClick={() => router.push(`/author/${comment?.commentatorId?._id}`)}
                            >
                              {comment?.commentatorId?.name}
                            </button>

                            <span className="text-blue-500 text-sm sm:mt-0 mt-1">
                              {new Date(comment?.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <Tooltip className=" " color="primary" content="Reply">
                            <Reply className="cursor-pointer dark:text-white"/>
                          </Tooltip>
                        </div>
                      </div>


                      {/* Editable Comment Section */}
                      {editingCommentId === comment._id ? (
                        <div>
                          <textarea
                            className="w-full bg-gray-50 dark:bg-slate-800 rounded-lg p-2"
                            value={updatedCommentText}
                            onChange={(e) => setUpdatedCommentText(e.target.value)}
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <Button
                              color='success'
                              size='sm'
                              onClick={() => handleSaveEditedComment(comment._id)}
                            >
                              Save
                            </Button>
                            <Button
                              color='danger'
                              size='sm'
                              onClick={() => setEditingCommentId(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-base leading-7 mb-1">{comment?.comment}</p>

                          {/* Actions */}
                          {comment.commentatorId?._id === user?._id && (
                            <div className="flex space-x-4">
                              <button
                                className="text-blue-500 text-sm hover:underline"
                                onClick={() => handleEditCommentClick(comment._id, comment.comment)}
                              >
                                Edit
                              </button>
                              <button
                                className="text-red-500 text-sm hover:underline"
                                onClick={() => handleDeleteComment(comment?._id)}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
