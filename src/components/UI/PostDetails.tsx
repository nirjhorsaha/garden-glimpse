'use client';

import { Chip, Image, Tooltip, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { ChevronUp, ChevronDown, Reply, SendHorizonal, Share, } from 'lucide-react';
import { MdOutlineFavorite, MdFavoriteBorder } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useRemovedPostFromProfile, useSavedPostToProfile, useUpdatePost } from '@/src/hooks/post.hooks';
import { useUserStore } from '@/src/lib/zustand/userStore';

import { IComments, IPost } from '../../types';
import DeletePostModal from '../Modal/DeletePostModal';

import PostUpdateModal from './PostUpdateModal';

interface PostCardProps {
  post: IPost;
}

export const PostDetailsCard: React.FC<PostCardProps> = ({ post }) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { mutate: savedPost, } = useSavedPostToProfile();
  const { mutate: removedPost, } = useRemovedPostFromProfile();
  const { mutate: updatePost, } = useUpdatePost();

  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null); // Track user's vote
  const [upVoteCount, setUpVoteCount] = useState(post.upVoteCount || 0);
  const [downVoteCount, setDownVoteCount] = useState(post.downVoteCount || 0);
  const [newComment, setNewComment] = useState('');
  const [isPostSaved, setIsPostSaved] = useState(false); // Track if the post is saved
  const [isPostRemoved, setIsPostRemoved] = useState(false);


  const favoritePostIds = user?.favouritePosts || [];
  const isFavorite = favoritePostIds.includes(post?._id); // Check if the current post is a favorite

  const { toggleFavoritePost } = useUserStore();
  

  const handleAuthorClick = () => {
    if (post.authorId?._id === user?.userId) {
      router.push('/profile');
    } else {
      router.push(`/author/${post.authorId?._id}`);
    }
  };


  const handleUpVote = async () => {
    try {
      let newUpVoteCount = upVoteCount;
      let newDownVoteCount = downVoteCount;

      if (hasVoted === 'up') {
        // If the user has already upvoted, undo the upvote
        newUpVoteCount -= 1;
        setHasVoted(null);
      } else {
        // If the user is downvoting or has not voted
        newUpVoteCount += 1;
        if (hasVoted === 'down') {
          newDownVoteCount -= 1; // Remove the downvote
        }
        setHasVoted('up');
      }

      await updatePost({
        postId: post?._id!, // Pass the post ID
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
      console.error('Error updating upvote:', error);
    }
  };

  const handleDownVote = async () => {
    try {
      let newDownVoteCount = downVoteCount;
      let newUpVoteCount = upVoteCount;

      if (hasVoted === 'down') {
        // If the user has already downvoted, undo the downvote
        newDownVoteCount -= 1;
        setHasVoted(null);
      } else {
        // If the user is upvoting or has not voted
        newDownVoteCount += 1;
        if (hasVoted === 'up') {
          newUpVoteCount -= 1; // Remove the upvote
        }
        setHasVoted('down');
      }

      await updatePost({
        postId: post?._id!, // Pass the post ID
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
      console.error('Error updating downvote:', error);
    }
  };


  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const postId = post?._id;
      const commentatorId = user?._id;
      const comment = newComment.trim();

      console.log('Post ID:', postId);
      console.log('Commentator ID:', commentatorId);
      console.log('Comment:', comment);

      // const response = await addComment(post._id, newComment);

      // setComments([...comments, response]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = (comment: string) => {
    console.log(comment)
  };


  const handleDeleteComment = async (commentId: string) => {
    console.log(commentId)
  };


  const handleSharePost = async () => {
    try {
      const postUrl = `${window.location.origin}/post/${post._id}`;

      await navigator.clipboard.writeText(postUrl);
      // alert('Post URL copied to clipboard!');
    } catch (error) {
      console.error('Error copying post URL:', error);
    }
  };

  console.log({ isFavorite }, { isPostSaved }, { isPostRemoved })


  const handleClick = (postId: string) => {
    toggleFavoritePost(postId); // Update the state in Zustand

    const data = {
      postId: postId,
    }
    // console.log(`Post clicked: ${postId}`);
    console.log(isFavorite, isPostSaved, isPostRemoved)

    if (isFavorite || isPostSaved) {
      // handleRemovedPost(postId); // Remove post if already saved
      removedPost(data);
      setIsPostSaved(false)
      setIsPostRemoved(true)
      console.log(isFavorite, isPostSaved, isPostRemoved)

    } else {
      // handleSavePost(postId); // Save post if not saved
      savedPost(data);
      setIsPostSaved(true)
      setIsPostRemoved(false)
      console.log(isFavorite, isPostSaved, isPostRemoved)
    }
  };


  return (
    <div className="group max-w-5xl mx-auto mt-10 border border-gray-300 dark:border-gray-700 rounded-2xl">
      <div className="flex items-center justify-center p-4 rounded-lg">
        <Image
          alt={post.title || 'Post Image'}
          className="rounded-t-2xl object-cover w-full"
          src={post.images?.[0] || '/fallback-image.jpg'}
        />
      </div>
      <div className="p-4 sm:p-6 transition-all duration-300 rounded-b-2xl">
        <div className="flex flex-row items-start sm:items-center justify-between mb-3">
          <div className="flex items-center mb-2 sm:mb-0">
            <button
              aria-label={`View posts by ${post.authorId?.name || 'Unknown Author'}`}
              className="text-gray-800 dark:text-white text-lg mr-2 hover:underline"
              onClick={handleAuthorClick}
            >
              {post.authorId?.name || 'Unknown Author'}
            </button>
            <span className="text-blue-500 text-sm">
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              }).format(new Date(post?.createdAt))}
            </span>
          </div>

          <div className='flex gap-2 justify-center items-center'>
            {post.authorId?._id === user?._id ? (
              <>
                <PostUpdateModal
                  post={post}
                // onSubmit={handleEditSubmit}
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
            <Popover color='foreground' placement="top" showArrow={true}>
              <Tooltip color='foreground' content='Share Post'>
                <PopoverTrigger>
                  <Share className='cursor-pointer' onClick={handleSharePost} />
                </PopoverTrigger>
              </Tooltip>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Post Copied</div>
                  {/* <div className="text-tiny">This is the popover content</div> */}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <h4 className="text-2xl text-gray-900 dark:text-white font-medium leading-8 mb-3 sm:mb-5 text-left">
          <p>{post.title}</p>
        </h4>

        <div className="text-gray-500 dark:text-gray-400 leading-6 mb-5 sm:mb-10 text-left">
          <p>{post.content || 'Content not available.'}</p>
        </div>

        <div className="flex items-center space-x-2">
          {post.isPremium && (
            <span className="bg-yellow-500 text-white font-medium text-sm px-2.5 py-0.5 rounded-full">
              Premium
            </span>
          )}
          <p className="text-left bg-zinc-300 dark:bg-slate-600 ont-medium text-sm px-2.5 py-0.5 rounded-full">
            {post.category}
          </p>
          <Tooltip content='Upvote'>
            <button
              className={`flex items-center text-gray-700 cursor-pointer ${hasVoted === 'up' ? 'text-blue-600' : ''
                } ${!user ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={!user} // Disable button if no user
              onClick={user ? handleUpVote : undefined} // Prevent onClick if no user
            >
              <ChevronUp className={`${user ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="ml-1 dark:text-white font-normal">{upVoteCount}</span>
            </button>
          </Tooltip>

          <Tooltip content='Downvote'>
            <button
              className={`flex items-center text-gray-700 cursor-pointer ${hasVoted === 'down' ? 'text-red-600' : ''}
              ${!user ? 'cursor-not-allowed text-gray-400' : ''}`}
              disabled={!user} // Disable button if no user
              onClick={handleDownVote}
            >
              <ChevronDown className="text-red-500" />
              <span className="ml-1 dark:text-white font-normal">{downVoteCount}</span>
            </button>
          </Tooltip>

        </div>

        <div className="mt-8">
          {/* Comments List */}
          <h5 className="font-medium text-xl leading-8 mb-4">Comments</h5>

          {post?.comments && (
            <div className="space-y-4">
              {post?.comments.map((comment: IComments) => (
                <div
                  key={comment?._id}
                  className="flex flex-col sm:flex-row gap-x-4 gap-y-4 w-full mb-7 border dark:border-0 rounded-lg p-2"
                >
                  <Image
                    alt={comment?.commentatorId?.profileImage}
                    className="h-14 w-14 object-cover"
                    src={comment?.commentatorId?.profileImage} />

                  <div className="data w-full">
                    <div className="flex items-center justify-between w-full mb-5">
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
                          }).format(new Date(comment?.commentatorId?.updatedAt!))}
                        </p>
                      </div>
                      <Tooltip color='primary' content='Reply'>
                        <Reply />
                      </Tooltip>
                      {/* <Button color='primary'> <Reply/> Reply</Button> */}
                    </div>
                    <p className="text-base leading-7">
                      {comment?.comment}
                    </p>


                    {comment?.commentatorId?._id === user?.userId && (
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

          {/* Add New Comment Section */}
          {
            user ? (
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
                  />
                  <Tooltip color='primary' content='Comment'>
                    <SendHorizonal className='cursor-pointer' onClick={handleAddComment} />
                  </Tooltip>
                </div>

                {/* <Button color='primary'
              // className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={handleAddComment}
            >
              Submit
            </Button> */}
              </div>) : (
              <div className="mt-6 text-center">
                <h5 className="text-lg text-gray-900 dark:text-white font-medium leading-8">
                  Please log in to leave a comment.
                </h5>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
