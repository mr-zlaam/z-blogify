"use client";
import ButtonLoader from "@/_subComponents/buttonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/hooks/useLoading";
import { useMessage } from "@/hooks/useMessage";
import { cn } from "@/lib/utils";
import type { UserLoginTypes } from "@/types";
import { loginSchema } from "@/validation/Schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { errorMessage, successMessage } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginTypes>({ resolver: zodResolver(loginSchema) });
  const handleLoginSubmit = async (data: UserLoginTypes) => {
    const { email, password } = data;

    try {
      startLoading();
      const response = await axios.post(
        // `${process.env.BACKEND_URI}/users/login`,
        `http://localhost:5173/api/users/login`,

        {
          email,
          password,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      stopLoading();
    } catch (error: any) {
      stopLoading();
      return errorMessage(
        (error.response.data.status >= 400 &&
          error.response.data.status < 500 &&
          error.response.data.message) ||
          "Failed to Login due to network problem"
      );
      return;
    }
  };

  return (
    <>
      <section className="relative top-24">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="sm:w-full bg-background rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-foreground md:text-2xl">
                  Sign in
                </h1>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    type="email"
                    id="email"
                    placeholder="john@mail.com"
                  />
                  {errors.email && (
                    <p className="text-xs select-none text-red-500  text-balance ml-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5 relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className="pr-14"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                  />
                  <span className="absolute right-8 top-7">
                    {showPassword ? (
                      <EyeOpenIcon onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeClosedIcon onClick={() => setShowPassword(true)} />
                    )}
                  </span>
                  {errors.password && (
                    <p className="text-xs select-none text-red-500  text-balance ml-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <p className="text-center text-sm ">
                  Don&apos;t have an Account ?
                  <Link
                    href="/user-auth/sign-up"
                    className="text-blue-500 hover:underline"
                  >
                    &nbsp; Register
                  </Link>
                </p>

                <Button
                  disabled={isLoading}
                  className={cn(
                    "text-white w-full bg-blue-500 duration-200 transition-all hover:bg-blue-700",
                    isLoading &&
                      "cursor-not-allowed bg-blue-800/50 hover:bg-blue-800/50"
                  )}
                >
                  {isLoading ? <ButtonLoader /> : <span>Sign in</span>}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
