/* eslint-disable prettier/prettier */
"use client"; 
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react"; // Import Next UI Button
import { useState } from "react"; // Import useState for managing follow state

import { IUser } from "@/src/types";

interface PostCardProps {
    author: IUser;
}

export const AuthorDetails: React.FC<PostCardProps> = ({ author }) => {
    console.log(author)
    const [isFollowing, setIsFollowing] = useState(false); // State to track follow status

    const handleFollowToggle = () => {
        setIsFollowing((prev) => !prev); // Toggle follow state
        // Here, you can add logic to handle the actual follow/unfollow action, e.g., API calls
    };

    return (
        <div className="rounded-lg max-w-sm bg-white shadow-md mt-10 p-4" >
            <div className="relative w-full rounded-lg overflow-hidden mb-4 flex justify-center items-center">
                <Image
                    alt="profile"
                    className="w-full object-cover h-48 "
                    src={author?.profileImage as string}
                />
            </div>
            <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800">{author?.name}</h1>
                <p className="text-gray-600 text-sm">{author?.email}</p>
            </div>

            <div className="flex justify-around my-3 flex-col md:flex-row items-center">
                <div className="flex items-center">
                    <span className="font-medium text-gray-700">
                        {author?.followers?.length || 0} Followers
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="font-medium text-gray-700">
                        {author?.followings?.length || 0} Followings
                    </span>
                </div>
            </div>

            <Button
                className="w-full mt-4"
                color={isFollowing ? 'success' : 'primary'} // Change color based on follow state
                size="lg"
                onClick={handleFollowToggle} // Call the toggle function on click 
            >
                {isFollowing ? 'Unfollow' : 'Follow'} {/* Change button text based on follow state */}
            </Button>
        </div>
    );
};
