/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

"use client";

import React, { useEffect } from "react";
import { Checkbox, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FieldValues, SubmitHandler } from "react-hook-form";

import loginValidationSchema from "@/src/schemas/login.schema";
import { EyeIcon, EyeOffIcon, Loader, MailIcon } from "lucide-react";
import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/src/context/user.provider";


const LoginPage = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(loginValidationSchema),
    //! only for development purpose
    defaultValues: {
      email: "nirjhor.badhan25@gmail.com",
      password: "test-password",

    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    handleUserLogin(data);
    userLoading(true)
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div className="flex w-full flex-col items-center justify-center h-[calc(100vh-200px)] px-4 sm:px-6 lg:px-8 pt-12">
      {/* <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center"> */}
      <h3 className="my-2 text-3xl font-bold">Login</h3>
      <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
            <Link className="text-sm" color="primary" href="/auth/forget-password">
              Forgot password?
            </Link>
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            isDisabled={isSubmitting || isPending}
            size="lg"
            type="submit"
          >
            {isPending ? (
              <Loader className="animate-spin mr-2 inline-block" />
            ) : null}
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="text-center">
          Don&lsquo;t have an account? <span className="font-bold bg-gradient-to-r from-sky-500 from-30% to-green-500 to-70% inline-block text-transparent bg-clip-text"><Link href={"/signup"}>Register</Link></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
