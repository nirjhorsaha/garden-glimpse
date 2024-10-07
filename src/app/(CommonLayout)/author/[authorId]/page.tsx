/* eslint-disable prettier/prettier */
import { AuthorDetails } from "@/src/components/UI/AuthorDetails";
import { getSingleUser } from "@/src/services/PostService/getMyPost";
import { IUser } from "@/src/types";

interface IProps {
  params: {
    authorId: string;
  };
}

export default async function page({ params: { authorId } }: IProps) {
  const { data: author }: { data: IUser } = await getSingleUser(authorId);

  console.log(author)

  return (
    <div>
      <AuthorDetails key={author.userId} author={author} />
    </div>
  );
};
