/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button } from '@nextui-org/react';
import { MailIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useResetPassword } from '@/src/hooks/auth.hooks';

const ResetPasswordPage = () => {
  const router = useRouter(); // Initialize useRouter
  const { mutate: handleResetPassword, isPending, isSuccess, isError } = useResetPassword();

  // const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);

  //   setEmail(searchParams.get('email') || '');
  //   setToken(searchParams.get('token') || '');
  // }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetModalForm, // Get the reset function from useForm
  } = useForm<FieldValues>({
    defaultValues: { email: '' }, // Pre-fill email
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');

    setToken(tokenParam || '');

    // Reset the form to include the email
    if (emailParam) {
      resetModalForm({ email: emailParam, password: '' });
    }
  }, [resetModalForm]);


  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false); // Loading state

  const toggleVisibility = () => setIsVisible(!isVisible);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // setLoading(true); // Set loading to true
    setError(''); // Reset any previous error


    try {
      const response = await handleResetPassword({
        userEmail: data.email,
        newPassword: data.password,
        accessToken: token,
      });

      // Clear form fields
      resetModalForm({ email: '', password: '' });

      console.log('Reset Data:', response);

    } catch (err) {
      setError('Failed to reset password. Please try again.'); // Set error message on failure
      console.error('Error resetting password:', err);
    } finally {
      // setLoading(false); // Reset loading state
    }
  };

  // Redirect to login page after success
  if (!isPending && isSuccess) {
    router.push('/login');
  }

  return (
    <div className="flex w-full flex-col items-center justify-center h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8 pt-12">
      <h1 className="text-2xl">Reset Your Password</h1>
      <div className="w-full max-w-md p-8 rounded shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <p aria-live="assertive" className="text-red-500 mb-4">
              {error}
            </p>
          )}
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
                    type="email"
                    value={field.value || ''}
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
                    type={isVisible ? 'text' : 'password'}
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
          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            color="primary"
            disabled={isPending || isError} // Disable button while loading
            type="submit"
          >
            {isPending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
