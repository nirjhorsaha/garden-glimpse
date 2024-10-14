/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useRef } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { EyeIcon, EyeOffIcon, MailIcon, User, Phone, MapPin, Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import registerValidationSchema from "@/src/schemas/register.schema";
import envConfig from "@/src/config/envConfig";
import { useUserRegistration } from "@/src/hooks/auth.hooks";

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [imageURL, setImageURL] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for the file input

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerValidationSchema),
    //! only for development purpose
    // defaultValues: {
    //   name: "John Doe",
    //   email: "john.doe@example.com",
    //   password: "password123",
    //   phone: "12345678908",
    //   address: "123 Garden Street, Green City",
    // },
  });

  const handleImageChange = (onChange: (file: File | null) => void) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      onChange(file);

      const formData = new FormData();

      formData.append("image", file);

      axios
        .post(`https://api.imgbb.com/1/upload?key=${envConfig.imgbb_api}`, formData)
        .then((response) => {
          if (response.data.success) {
            setImageURL(response.data.data.url);
          }
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image. Please try again.");
        });
    } else {
      onChange(null);
    }
  };


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      role: "user",
      profileImage: imageURL,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 2 seconds delay
      handleUserRegistration(userData);
      console.log("Register data: ", userData);

      // Reset form fields and related states
      reset({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        profileImage: null,
      });
      setImageURL(null); // Clear image URL

      // Reset the file input field using the ref
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-12">
      {/* <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center"> */}
      <h3 className="my-2 text-3xl font-bold">Register </h3>
      <p className="mb-4 max-w-lg text-center">Discover and share gardening tips with a vibrant community of gardening enthusiasts.</p>
      <div className="w-full max-w-md">

        <form
          onSubmit={handleSubmit(onSubmit)}>

          <div className="py-3">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    endContent={
                      <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Name"
                    placeholder=""
                    type="text"
                    variant="bordered"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message as string}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="py-3">
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    className={`w-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder=""
                    type="email"
                    variant="bordered"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="py-3">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    className={`w-full ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    endContent={
                      <button
                        aria-label={isVisible ? "Hide password" : "Show password"}
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    label="Password"
                    placeholder=""
                    type={isVisible ? "text" : "password"}
                    variant="bordered"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="py-3">
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    className={`w-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    endContent={
                      <Phone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Phone Number"
                    placeholder=""
                    type="Number"
                    variant="bordered"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message as string}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="py-3">
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    className={`w-full ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    endContent={
                      <MapPin className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Address"
                    placeholder=""
                    type="text"
                    variant="bordered"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address.message as string}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="py-3">
            <label className="block mb-1 font-semibold" htmlFor="profileImage">
              Profile Picture
            </label>
            <Controller
              control={control}
              name="profileImage"
              render={({ field: { onChange, onBlur } }) => (
                <>
                  <input
                    ref={fileInputRef}
                    accept="image/*"
                    className={`w-full border-2 border-gray-600 rounded-lg p-2 ${errors.profileImage ? 'border-red-500' : 'border-gray-300'}`}
                    id="profileImage"
                    type="file"
                    onBlur={onBlur}
                    onChange={handleImageChange(onChange)}
                  />
                  {errors.profileImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {'Please upload a profile image. ' as string}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            isDisabled={isSubmitting || isPending}
            size="lg"
            type="submit"
          >
            {isSubmitting ? (
              <Loader className="animate-spin mr-2 inline-block" />
            ) : null}
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

        </form>
        <div className="text-center">
          Already have an account? {" "} <span className="font-bold bg-gradient-to-r from-sky-500 from-30% to-green-500 to-70% inline-block text-transparent bg-clip-text"><Link href={"/login"}>Login</Link></span>
        </div>
      </div>
    </div>
  );
}