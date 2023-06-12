"use client";

// reactjs imports
import { FC, FormEvent, useState } from "react";

// appwrite imports
import { AppwriteException } from "appwrite";

// components imports
import Spinner from "@/components/Spinner";

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
  }: {
    [key: string]: { value: string };
  } = form;

  if (!email?.trim()) {
    result.message = "All fields are required";

    return result;
  }

  result.status = true;

  return result;
};

const handleSubmit = async ({
  e,
  isSubmitting,
  setIsSubmitting,
}: {
  e: FormEvent<HTMLFormElement>;
  isSubmitting: Boolean;
  setIsSubmitting: Function;
}) => {
  e.preventDefault();

  if (isSubmitting) return;

  const form = e.target as HTMLFormElement;

  const { status, message } = validation(form);

  if (!status) {
    message && alert(message);
    return;
  }

  function isAppwriteException(error: unknown): error is AppwriteException {
    return error instanceof AppwriteException;
  }

  try {
    setIsSubmitting(true);

    const {
      email: { value: email },
    }: {
      [key: string]: { value: string };
    } = form;

    const { account } = await import("@/appwrite/appwrite-config");
    const { ID } = await import("appwrite");

    const origin = location.origin;

    await account.createMagicURLSession(
      ID.unique(),
      email,
      `${origin}/verification`
    );

    alert("A magic link has been sent to your email. Please check your inbox.");
  } catch (error) {
    if (isAppwriteException(error)) {
      // The error is of type AppwriteException
      alert(error.message);
    } else {
      // The error is of a different type
      console.log(error);
    }
  } finally {
    setIsSubmitting(false);
  }
};

const SignInForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit({ e, isSubmitting, setIsSubmitting })}
        className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address*
          </label>

          <div className="mt-1">
            <input
              id="email"
              name="email"
              autoComplete="email"
              placeholder="john.doe@example.com"
              required
              type="email"
              className="appearance-none block w-full px-4 py-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700/50 dark:text-white"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={!!isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            {isSubmitting && (
              <Spinner
                size={4}
                srText="Creating"
                ml
              />
            )}
            Sign In
          </button>

          <small className="text-xs text-gray-400 dark:text-gray-500">
            A magic link will be sent to your Email for you to login
          </small>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
