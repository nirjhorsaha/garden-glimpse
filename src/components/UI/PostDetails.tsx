'use client';

import { Chip, Image, Tooltip, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { ChevronUp, ChevronDown, Reply, SendHorizonal, Share, MessageSquareText, } from 'lucide-react';
import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useDeleteComment, useRemovedPostFromProfile, useSavedPostToProfile, useUpdatePost } from '@/src/hooks/post.hooks';
import { usePostStore, useUserStore } from '@/src/lib/zustand/userStore';
import { addCommentToPost } from '@/src/services/AuthServices';

import { IComments, IPost } from '../../types';
import DeletePostModal from '../Modal/DeletePostModal';
import PostUpdateModal from '../Modal/PostUpdateModal';

interface PostCardProps {
  post: IPost;
}

export const PostDetailsCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  // const { posts, addPost, updatePostDetails } = usePostStore(); 

  // const [updatedContent, setUpdatedContent] = useState<string>(''); 

  const { mutate: savedPost, } = useSavedPostToProfile();
  const { mutate: removedPost, } = useRemovedPostFromProfile();
  const { mutate: updatePost, } = useUpdatePost();
  const { mutate: deleteComment, } = useDeleteComment();

  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null); // Track user's vote
  const [upVoteCount, setUpVoteCount] = useState(post?.upVoteCount || 0);
  const [downVoteCount, setDownVoteCount] = useState(post?.downVoteCount || 0);
  const [newComment, setNewComment] = useState('');
  const [isPostSaved, setIsPostSaved] = useState(false); // Track if the post is saved
  const [isPostRemoved, setIsPostRemoved] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const favoritePostIds = user?.favouritePosts || [];
  const isFavorite = favoritePostIds.includes(post?._id); // Check if the current post is a favorite

  const { toggleFavoritePost } = useUserStore();

  // useEffect(() => {
  //   console.log("Post being added:", post);

  //   addPost(post); 
  // }, [post, addPost]);


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
        // updatePostDetails({
        //   ...post,
        // upVoteCount: newUpVoteCount,
        // downVoteCount: newDownVoteCount,
        // });

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

      const data = {
        commentatorId: commentatorId,
        comment: comment,
      };

      // Add the new comment to the post
      await addCommentToPost(postId, data);

      // Update the comments list by adding the new comment
      const newCommentData = {
        ...data,
        _id: '',
        isDeleted: false,
        commentatorId: user,
        createdAt: new Date(),
      };

      setNewComment(''); // Clear the input field after submitting the comment
      post?.comments && post.comments.push(newCommentData); // Update the comments array with the new comment

      // const updatedComments = [...(post.comments || []), newCommentData];

      // updatePostDetails({
      //   ...post,
      //   comments: updatedComments,
      // });

      // console.log('Updated comments from store:', updatedComments);


    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }, [newComment, post?._id, user?._id]);


  const handleEditComment = (comment: string) => {
    console.log(comment)
  };


  const handleDeleteComment = async (commentId: string) => {
    console.log(commentId)
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
      console.error('Error copying post URL:', error);
    }
  }, [post?._id]);


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
            {/* <button
              aria-label={`View posts by ${post.authorId?.name || 'Unknown Author'}`}
              className="text-gray-800 dark:text-white text-lg mr-2 hover:underline"
              onClick={handleAuthorClick}
            >
              {post.authorId?.name || 'Unknown Author'}
            </button> */}
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
        <div className="mt-8">
          <h5 className="font-medium text-xl leading-8 mb-4">Comments</h5>

          {post?.comments && (
            <div className="space-y-4">
              {post?.comments
                .filter((comment: IComments) => !comment?.isDeleted).slice()
                .reverse().map((comment: IComments) => (
                  <div
                    key={comment?._id}
                    className="flex flex-row gap-x-4 gap-y-4 w-full mb-7 border dark:border-0 rounded-lg p-2"
                  >
                    <Image
                      alt={comment?.commentatorId?.profileImage}
                      className="h-14 w-14 object-cover"
                      src={comment?.commentatorId?.profileImage} />

                    <div className="data w-full">
                      <div className="flex items-center justify-between w-full mb-2">
                        <div>
                          <button
                            aria-label={`View posts by ${comment?.commentatorId?.name}`}
                            className="text-gray-800 dark:text-white font-medium text-xl leading-8 mr-2 hover:underline"
                            onClick={() => router.push(`/author/${comment?.commentatorId?._id}`)}
                          >
                            {comment?.commentatorId?.name}
                          </button>

                          <p className="text-blue-500 text-sm leading-6">
                            {new Intl.DateTimeFormat('en-US', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                            }).format(new Date(comment?.commentatorId?.createdAt!))}
                          </p>
                        </div>
                        <Tooltip color='primary' content='Reply'>
                          <Reply className='cursor-pointer' />
                        </Tooltip>
                      </div>
                      <p className="text-base leading-7 mb-1">
                        {comment?.comment}
                      </p>

                      {comment?.commentatorId?._id === user?._id && (
                        <div className="flex space-x-2">
                          <Chip className='cursor-pointer' color='default'
                            onClick={() => handleEditComment(comment.comment)}>Edit</Chip>
                          <Chip className='cursor-pointer text-red-500' color='default'
                            onClick={() => handleDeleteComment(comment?._id)}>Delete</Chip>
                        </div>
                      )}

                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
