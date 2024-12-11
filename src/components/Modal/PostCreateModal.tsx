import { useState } from 'react';
import axios from 'axios';
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
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { IPost } from '@/src/types';
import { useCreatePost } from '@/src/hooks/post.hooks';
import { categories } from '@/src/constant';
import { useUserStore } from '@/src/lib/zustand/userStore';


interface PostCreateModalProps {
  post?: IPost;
}

export default function PostCreateModal({
  post,
}: PostCreateModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { control, handleSubmit, reset,  formState: { errors }  } = useForm();
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const user = useUserStore((state) => state.user);
  
  const { mutate: handleCreatePost } = useCreatePost();

  const handleOpen = () => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        category: post.category,
        images: post.images,
        premium: post.isPremium,
      });
      setImageURLs(post.images || []);
    } else {
      reset(); // Reset the form if creating a new post
      setImageURLs([]); // Clear image URLs
    }
    onOpen();
  };

  const handleImageChange = (onChange: (file: File | null) => void) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();

      formData.append('image', file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
          formData,
        );

        if (response.data.success) {
          const uploadedImageUrl = response.data.data.url;

          setImageURLs((prev) => [...prev, uploadedImageUrl]); // Append new URL
          onChange(file); // Update the form value
        }
      } catch (error) {
        // console.error('Error uploading image:', error);
        toast.error('Error uploading image. Please try again.');
      }
    } else {
      onChange(null); 
    }
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    const postData = {
      authorId: user?._id || '', 
      title: data.title || '', 
      content: data.content || '', 
      category: data.category || '', 
      images: imageURLs.length > 0 ? imageURLs : [],
      isPremium: data.premium || false,
    };

    try {
      handleCreatePost(postData);
      onClose(); // Close modal after successful submission
    } catch (error) {
      throw new Error('Error creating post. Please try again.');
    }
  };

  return (
    <>
      <Button
        aria-label={post ? 'Edit Post' : 'Create Post'}
        className="mt-2 w-full rounded-m"
        color={post ? 'primary' : 'success'}
        onPress={handleOpen}
      >
        <Plus size={16} /> {post ? 'Edit Post' : 'Create Post'}
      </Button>
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
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <>
                        <Input
                          {...field}
                          aria-required="true"
                          className="mb-4"
                          label="Title"
                          placeholder="Enter post title"
                          variant="bordered"
                        />
                        {errors.title && (
                          <div className="text-red-500 text-sm mb-1">Title is required</div>
                        )}
                      </>
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                      <>
                        <Textarea
                          {...field}
                          aria-required="true"
                          className="mb-4"
                          label="Content"
                          placeholder="Enter post content"
                          rows={4}
                          variant="bordered"
                        />
                        {errors.content && (
                          <div className="text-red-500 text-sm mb-1">Content is required</div>
                        )}
                      </>
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <>
                      <Select
                        {...field}
                        aria-required="true"
                        className="mb-4"
                        label="Category"
                        variant="bordered"
                      >
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <div className="text-red-500 text-sm mb-1">Category is required</div>
                      )}
                    </>
                    )}
                    rules={{ required: true }}
                  />
                  <Controller
                    control={control}
                    name="image"
                    render={({ field: { onChange } }) => (
                      <>
                      <Input
                        accept="image/*"
                        className="mb-4"
                        label="Upload Image"
                        type="file"
                        variant="bordered"
                        onChange={handleImageChange(onChange)} // Handle file change
                      />
                      {errors.image && (
                        <div className="text-red-500 text-sm mb-1">Image is required</div> // Error message for image
                      )}
                    </>
                    )}
                    rules={{ required: true }}

                  />
                  <Controller
                    control={control}
                    name="premium"
                    render={({ field }) => (
                      <Checkbox className="text-small" {...field}>
                        Mark as Premium
                      </Checkbox>
                    )}
                  />
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
                  type="submit"
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
