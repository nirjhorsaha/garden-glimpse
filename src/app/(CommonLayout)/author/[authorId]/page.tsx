import { AuthorDetails } from '@/src/components/UI/AuthorDetails';
import { PostCard } from '@/src/components/UI/Postcard';
import {
  getAuthorPost,
  getSingleUser,
} from '@/src/services/PostService/getMyPost';
import { IPost, IUser } from '@/src/types';

interface IProps {
  params: {
    authorId: string;
  };
}

export default async function page({ params: { authorId } }: IProps) {
  const { data: author }: { data: IUser } = await getSingleUser(authorId);

  const { data: authorPosts } = await getAuthorPost(authorId);

  return (
    <div className="my-3 flex flex-col  md:flex-row w-full gap-12">
      <div className="w-full md:w-2/5">
        <AuthorDetails key={author?.userId} author={author} />
      </div>
      <h1 className="w-4/5 mt-10">
        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 lg:grid-cols-1 lg:gap-x-8">
          {authorPosts?.length ? (
            authorPosts.map((authorPosts: IPost) => (
              <PostCard key={authorPosts?._id} post={authorPosts} />
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>{' '}
      </h1>
    </div>
  );
}
