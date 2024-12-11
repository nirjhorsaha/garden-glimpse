'use client';

import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/react'; 
import { useState } from 'react'; 

import { IUser } from '@/src/types';

interface PostCardProps {
  author: IUser;
}

export const AuthorDetails: React.FC<PostCardProps> = ({ author }) => {
  const [isFollowing, setIsFollowing] = useState(false); 
  const [followersCount, setFollowersCount] = useState( author?.followers?.length || 0 ); 

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);

    if (isFollowing) {
      setFollowersCount((prev) => prev - 1); 
    } else {
      setFollowersCount((prev) => prev + 1); 
    }

    // console.log(`Toggled follow state for user ID: ${author._id}`);
  };

  return (
    <div className="rounded-lg max-w-sm bg-slate-100 dark:bg-gray-700 mt-10 p-4">
      <div className="relative w-full rounded-lg overflow-hidden mb-4 flex justify-center items-center">
        <Image
          alt="profile"
          className="w-full object-cover h-64 "
          src={author?.profileImage as string}
        />
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold">{author?.name}</h1>
        <p className=" text-sm">{author?.email}</p>
      </div>

      <div className="flex justify-around my-3 flex-col md:flex-row items-center">
        <div className="flex items-center">
          <span className="font-medium ">
            {followersCount} Followers
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-medium ">
            {author?.followings?.length || 0} Followings
          </span>
        </div>
      </div>

      <Button
        className="w-full mt-4"
        color={isFollowing ? 'success' : 'primary'} 
        size="lg"
        onClick={handleFollowToggle} 
      >
        {isFollowing ? 'Unfollow' : 'Follow'}{' '}
      </Button>
    </div>
  );
};
