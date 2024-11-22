/* eslint-disable no-console */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { FieldValues, SubmitHandler, useForm, Controller, } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { useUser } from '@/src/context/user.provider';
// import { updateUserProfile } from '@/src/services/AuthServices';
// import { useQueryClient } from '@tanstack/react-query';
import { useUserProfileUpdate } from '@/src/hooks/auth.hooks';
import { useUserStore } from '@/src/lib/zustand/userStore';

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditNameModal: React.FC<EditNameModalProps> = ({ isOpen, onClose }) => {
  const { user: userData } = useUser();
  const user = (userData as any)?.data;
  
  const [imageURL, setImageURL] = useState<string | null>(null);
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateUserState = useUserStore((state) => state.updateUserProfile);
  const { mutate } = useUserProfileUpdate();
  
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    profileImage: string | null;
  }>({
    defaultValues: {
      name: user?.name || '',
      profileImage: user?.profileImage || null,
    },
  });
  
  useEffect(() => {
    setValue('name', user?.name || ''); // Type-safe due to explicit typing
    setImageURL(user?.profileImage || null);
  }, [user?.name, user?.profileImage, setValue]);
  

  // Handle image upload
  const handleImageChange =
    (onChange: (file: File | null) => void) =>
      async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
          const formData = new FormData();

          formData.append('image', file);

          try {
            const response = await axios.post(
              `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
              formData,
            );

            if (response.data.success) {
              const uploadedImageUrl = response.data.data.url;

              setImageURL(uploadedImageUrl);
              onChange(file); // Update the form value
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image. Please try again.');
          }
        } else {
          setImageURL(null);
          onChange(null); // Set the form value to null if no image is selected
        }
      };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedProfile = {
      ...data,
      profileImage: imageURL || user?.profileImage ,
    };    

    try {
      mutate(updatedProfile as any); 

      updateUserState(data); 

      onClose(); // Close modal after success
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Profile
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  {...register('name')}
                  variant="bordered"
                />

                {/* Image Upload with Controller */}
                <div className="py-3">
                  <label
                    className="block mb-1 font-semibold"
                    htmlFor="profileImage"
                  >
                    Profile Picture
                  </label>
                  <Controller
                    control={control}
                    name="profileImage"
                    render={({ field: { onChange, onBlur } }) => (
                      <>
                        <input
                          // ref={fileInputRef}
                          accept="image/*"
                          className={`w-full border-2 border-gray-600 rounded-lg p-2 ${errors.profileImage
                            ? 'border-red-500'
                            : 'border-gray-300'
                            }`}
                          id="profileImage"
                          type="file"
                          onBlur={onBlur}
                          onChange={handleImageChange(onChange)} // Use updated handler
                        />
                        {errors.profileImage && (
                          <p className="text-red-500 text-sm mt-1">
                            Please upload a profile image.
                          </p>
                        )}
                      </>
                    )}
                  />
                </div>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditNameModal;
