/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import {  MailIcon,  EyeIcon, EyeOffIcon } from 'lucide-react';
import { FieldValues, SubmitHandler } from "react-hook-form";

const ResetPasswordPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log('Reset Data:', data);
       
    };

    return (
        <div className="flex w-full flex-col items-center justify-center h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8 pt-12">
            <h1 className="text-2xl">Reset Your Password</h1>
            <div className="w-full max-w-md p-8 rounded shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
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
                                        label="Enter Your Email"
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
                            rules={{ required: 'Email is required' }}
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
                                                aria-label="toggle password visibility"
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
                                        label="Enter New Password"
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
                            rules={{ required: 'Password is required' }}
                        />
                    </div>
                    <Button className="my-3 w-full rounded-md bg-default-900 font-semibold text-default" color="primary" type="submit">
                        Reset Password
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
