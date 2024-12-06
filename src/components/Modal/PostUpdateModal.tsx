import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Textarea,
  Select,
  SelectItem,
  Tooltip,
} from '@nextui-org/react';
import { Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { IPost } from '@/src/types';
import { useUpdatePost } from '@/src/hooks/post.hooks';

const categories = [
  { value: 'Vegetables', label: 'Vegetables' },
  { value: 'Flowers', label: 'Flowers' },
  { value: 'Landscaping', label: 'Landscaping' },
  { value: 'Succulents', label: 'Succulents' },
  { value: 'Indoor Plants', label: 'Indoor Plants' },
  { value: 'Others', label: 'Others' },
];

interface PostCreateModalProps {
  post?: IPost;
  // onSubmit?: (data: IPost) => Promise<void>;
}

export default function PostUpdateModal({ post }: PostCreateModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: updatePost } = useUpdatePost();


  const handleOpen = () => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        category: post.category,
        images: post.images,
        premium: post.isPremium,
      });
    }
    onOpen();
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    const file = (data.image as FileList)?.[0];

    const postData: Partial<IPost> = {
      title: data.title,
      content: data.content,
      category: data.category,
      images: file ? [URL.createObjectURL(file)] : post?.images, // handling image upload
      isPremium: data.premium || false,
    };

    try {
      updatePost({
        postId: post?._id!,
        postData: postData as IPost,
      });
      // toast.success('Post Updated successfully');
    } catch (error) {
      // console.error('Error updating post:', error);
      toast.error('Failed to update post');
    }

    onClose();
  };

  return (
    <>
      <Tooltip color='primary' content='Edit Post'>
        <Edit className='text-blue-500 cursor-pointer' size={23} onClick={handleOpen} />
      </Tooltip>
      <Modal
        aria-labelledby="create-post-modal"
        isOpen={isOpen}
        placement="top-center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader
                className="flex flex-col gap-1 p-4"
                id="create-post-modal"
              >
                {post ? 'Edit Post' : 'Create a Post'}
              </ModalHeader>
              <ModalBody className="p-4">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <Input
                    aria-required="true"
                    className="mb-4"
                    label="Title"
                    placeholder="Enter post title"
                    variant="bordered"
                    {...register('title', { required: true })}
                  />
                  <Textarea
                    aria-required="true"
                    className="mb-4"
                    label="Content"
                    placeholder="Enter post content"
                    rows={4}
                    variant="bordered"
                    {...register('content', { required: true })}
                  />

                  <Select
                    aria-required="true"
                    className="mb-4"
                    label="Category"
                    variant="bordered"
                    {...register('category', { required: true })}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    accept="image/*"
                    className="mb-4"
                    label="Upload Image"
                    type="file"
                    variant="bordered"
                    {...register('image')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      register('image').onChange(e);
                    }}
                  />
                  <Checkbox className="text-small" {...register('premium')}>
                    Mark as Premium
                  </Checkbox>
                </form>
              </ModalBody>
              <ModalFooter className="flex justify-end p-4">
                <Button
                  aria-label="Close Modal"
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  className="ml-2"
                  color="primary"
                  type="button"
                  onClick={handleSubmit(handleFormSubmit)}
                >
                  {post ? 'Update Post' : 'Create Post'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
