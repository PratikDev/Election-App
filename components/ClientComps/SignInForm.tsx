"use client";

// reactjs imports
import { FC, FormEvent, useState } from "react";

// nextjs imports
import Link from "next/link";

// components imports
import Input from "@/components/forms/Input";
import Spinner from "../Spinner";

const validation = (
  form: HTMLFormElement
): {
  status: boolean;
  message: string;
} => {
  const result = {
    status: false,
    message: "",
  };

  const {
    email: { value: email },
    password: { value: password },
  }: {
    [key: string]: { value: string };
  } = form;

  if (!email?.trim() || !password?.trim()) {
    result.message = "All fields are required";

    return result;
  }

  result.status = true;

  return result;
};

const SignInForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.target as HTMLFormElement;

    const { status, message } = validation(form);

    if (!status) {
      message && alert(message);
      return;
    }

    try {
      setIsSubmitting(true);

      const {
        email: { value: email },
        password: { value: password },
      }: {
        [key: string]: { value: string };
      } = form;

      const { account } = await import("@/appwrite/appwrite-config");

      const response = await account.createEmailSession(email, password);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6">
        <Input
          id="email"
          label="Email Address"
          name="email"
          placeholder="john.doe@example.com"
          required
          type="email"
        />

        <Input
          id="password"
          label="Password"
          name="password"
          placeholder="******"
          required
          type="password"
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/signup"
              className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
              Don&apos;t have Account? Sign Up
            </Link>
          </div>

          <button
            type="submit"
            disabled={!!isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            {isSubmitting && (
              <Spinner
                size={4}
                srText="Creating"
                ml
              />
            )}
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
