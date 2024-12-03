import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type ColumnKey = 'name' | 'role' | 'status' | 'actions' | 'email';

export interface NavItem {
  label: string;
  href: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'foreground';
}

export interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  userId: string;
  iat?: number;
  exp?: number;
  favouritePosts: Array<any>;
  followers: string[];
  followings: string[];
  profileImage: string;
  phone: string;
  address: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  profileVerified?: boolean;
  passwordChangedAt?: string;
}

export interface IComments {
  _id: string;
  commentatorId: Record<string, any> | null;
  createdAt: Date;
  updatedAt?: Date;
  comment: string;
  isDeleted: boolean;
}

export interface IPost {
  _id?: string;
  authorId?: IUser;
  title: string;
  content: string;
  category:
    | 'Vegetables'
    | 'Flowers'
    | 'Landscaping'
    | 'Succulents'
    | 'Indoor Plants'
    | 'Others';
  images: string[];
  updatedAt?: string;
  createdAt: string;
  isPremium: boolean;
  upVoteCount: number;
  downVoteCount: number;
  isDeleted: boolean;
  comments?: IComments[];
}
