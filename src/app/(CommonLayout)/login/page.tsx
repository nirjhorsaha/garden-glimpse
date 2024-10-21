/* eslint-disable prettier/prettier */
'use client';

import React, { useEffect } from 'react';
import {
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeOffIcon, Loader, MailIcon } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import loginValidationSchema from '@/src/schemas/login.schema';
import { useForgetPassword, useUserLogin } from '@/src/hooks/auth.hooks';
import { useUser } from '@/src/context/user.provider';
import { variants } from '@/src/constant';

const LoginPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const { setIsLoading: userLoading } = useUser();
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const { mutate: handleForgetPassword } = useForgetPassword();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(loginValidationSchema),
    //! only for development purpose
    defaultValues: {
      email: 'nirjhor.badhan25@gmail.com',
      password: 'nir-password',
    },
  });

  const [redirect, setRedirect] = React.useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    setRedirect(searchParams.get('redirect'));
  }, []);


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push('/');
      }
    }
  }, [isPending, isSuccess]);

  // Create a new form for the modal
  const {
    control: modalControl,
    handleSubmit: handleModalSubmit,
    formState: { errors: modalErrors },
    reset: resetModalForm,
  } = useForm<FieldValues>();

  const handleSendResetInstructions: SubmitHandler<FieldValues> = async (
    data,
  ) => {
    handleForgetPassword({ email: data.resetEmail });

    onOpenChange(); // Close modal after sending
    resetModalForm({ resetEmail: '' }); // Reset input to an empty string
    // toast.success('Reset instructions sent to your email address');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8 pt-12">
      {/* <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center"> */}
      <motion.h3 animate="visible"
        className="my-2 text-3xl font-bold"
        initial="hidden"
        transition={{ duration: 0.5 }}
        variants={variants}
      >Login</motion.h3>
      <motion.p animate="visible"
        className="mb-4"
        initial="hidden"
        transition={{ duration: 0.5, delay: 0.2 }}
        variants={variants}>Welcome Back! Let&lsquo;s Get Started</motion.p>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div animate="visible"
            className="py-3"
            initial="hidden"
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={variants}
          >
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
          </motion.div>
          <motion.div animate="visible"
            className="py-3"
            initial="hidden"
            transition={{ duration: 0.5, delay: 0.6 }}
            variants={variants}>
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
                    label="Password"
                    placeholder=""
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
            />
          </motion.div>
          <motion.div animate="visible"
            className="flex py-2 px-1 justify-between"
            initial="hidden"
            transition={{ duration: 0.5, delay: 0.8 }}
            variants={variants}
          >
            <Checkbox
              classNames={{
                label: 'text-small',
              }}
            >
              Remember me
            </Checkbox>
            <button
              className="text-sm text-blue-500 cursor-pointer hover:underline focus:outline-none"
              type="button"
              onClick={onOpen}
            >
              Forgot password?
            </button>
          </motion.div>

          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.5, delay: 1.0 }}
            variants={variants}>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              isDisabled={isSubmitting || isPending}
              size="lg"
              type="submit"
            >
              {isPending ? (
                <Loader className="animate-spin mr-2 inline-block" />
              ) : null}
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </motion.div>
          <motion.div
            animate="visible"
            initial="hidden"
            transition={{ duration: 0.5, delay: 1.2 }}
            variants={variants}>
            <Button className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg">
              <FcGoogle size={25} />
              Continue with Google
            </Button>
          </motion.div>
        </form>
        <motion.div animate="visible"
          className="text-center"
          initial="hidden"
          transition={{ duration: 0.5, delay: 1.4 }}
          variants={variants}
        >
          Don&lsquo;t have an account?{' '}
          <span className="font-bold bg-gradient-to-r from-sky-500 from-30% to-green-500 to-70% inline-block text-transparent bg-clip-text">
            <Link href={'/signup'}>Register</Link>
          </span>
        </motion.div>
      </div>
      {/* Forgot Password Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(_onClose) => (
            <>
              <ModalHeader>Forgot Password?</ModalHeader>
              <ModalBody>
                <p>Enter your email to receive reset instructions:</p>
                <Controller
                  control={modalControl}
                  name="resetEmail"
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Email"
                      placeholder="you@example.com"
                      type="email"
                      variant="bordered"
                    />
                  )}
                />
                {modalErrors.resetEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {modalErrors.resetEmail.message as string}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button> */}
                <Button
                  color="success"
                  onClick={handleModalSubmit(handleSendResetInstructions)}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginPage;
