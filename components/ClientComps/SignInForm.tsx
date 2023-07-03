"use client";

// reactjs imports
import { FC, FormEvent, useState } from "react";

// components imports
import Spinner from "@/components/Spinner";

type ValidationType = {
  status: boolean;
  message: string;
};

const validation = async (email: string): Promise<ValidationType> => {
  const result = {
    status: false,
    message: "",
  };

  if (!email?.trim()) {
    result.message = "All fields are required";

    return result;
  }

  const { default: isEmailValidRegex } = await import(
    "@/helpers/emailFormateValidation"
  );

  const valid = isEmailValidRegex(email);

  if (!valid) {
    result.message = "Please enter a valid email address";

    return result;
  }

  result.status = true;

  return result;
};

type SubmissionType = {
  e: FormEvent<HTMLFormElement>;
  isSubmitting: Boolean;
  setIsSubmitting: Function;
  email: string;
};

const handleSubmit = async ({
  e,
  isSubmitting,
  setIsSubmitting,
  email,
}: SubmissionType) => {
  e.preventDefault();

  if (isSubmitting) return;

  const { status, message } = await validation(email);

  if (!status) {
    if (message) {
      const { default: Toast } = await import("@/components/Toast");

      Toast.fire({
        icon: "error",
        title: message,
      });
    }

    return;
  }

  const { default: Toast } = await import("@/components/Toast");

  try {
    setIsSubmitting(true);

    const actionCodeSettings = {
      url: `${window.location.origin}/verify-email`,
      handleCodeInApp: true,
    };

    const { sendSignInLinkToEmail } = await import("firebase/auth");
    const { auth } = await import("@/firebase/firebase-config");

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    window.localStorage.setItem("emailForSignIn", email);

    Toast.fire({
      icon: "success",
      html: "<p><strong>Link Successfully Sent</strong><br/><small>We might fall into the Spam folder:(</small></p>",
    });
  } catch (error) {
    console.log(error);

    Toast.fire({
      icon: "error",
      title: "Something went wrong. Please try again",
    });
  } finally {
    setIsSubmitting(false);
  }
};

const SignInForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <form
        onSubmit={(e) =>
          handleSubmit({ e, isSubmitting, setIsSubmitting, email })
        }
        className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address*
          </label>

          <div className="mt-1">
            <input
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              value={email}
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
            id="submit"
            name="submit"
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
