/* eslint-disable prettier/prettier */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export interface IUser {
    userId: string;
    name: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
    favouritePosts: Array<any>;
    followers?: string[];       
    followings?: string[]; 
    profileImage: string;
    phone: string;
    address: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    passwordChangedAt?: string;
}

export interface IComments {
    _id?: string;
    commentatorId: string; // Commentator id
    comment: string;
    isDeleted: boolean;
}

export interface IPost {
    _id: string;
    authorId: {
        _id: string;
        name: string;
    }; // Author's id
    title: string;
    content: string;
    category:
        | "Vegetables"
        | "Flowers"
        | "Landscaping"
        | "Succulents"
        | "Indoor Plants"
        | "Others";
    images: string[];
    updatedAt: string; 
    createdAt: string; 
    isPremium: boolean;
    upVoteCount: number;
    downVoteCount: number;
    isDeleted: boolean;
    comments?: IComments[];
}
