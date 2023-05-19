"use client";

// reacjs imports
import { FC, FormEvent, useState } from "react";

// nextjs imports
import Link from "next/link";

// components imports
import Input from "@/components/forms/Input";
import Spinner from "@/components/Spinner";

const validateForm = (
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
    first_name: { value: first_name },
    last_name: { value: last_name },
    email: { value: email },
    password: { value: password },
    confirm_password: { value: confirm_password },
  }: {
    [key: string]: { value: string };
  } = form;

  if (
    !first_name?.trim() ||
    !last_name?.trim() ||
    !email?.trim() ||
    !password?.trim() ||
    !confirm_password?.trim()
  ) {
    result.message = "All fields are required";
    return result;
  }

  if (password !== confirm_password) {
    result.message = "Passwords do not match";
    return result;
  }

  if (password.length < 8) {
    result.message = "Password must be at least 8 characters long";
    return result;
  }

  result.status = true;

  return result;
};

const SignUpForm: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<Boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.target as HTMLFormElement;

    const { status, message } = validateForm(form);

    if (!status) {
      message && alert(message);
      return;
    }

    const {
      first_name: { value: first_name },
      last_name: { value: last_name },
      email: { value: email },
      password: { value: password },
    }: {
      [key: string]: { value: string };
    } = form;

    const user_name = `${first_name} ${last_name}`;

    try {
      setIsSubmitting(true);

      const { account } = await import("@/appwrite/appwrite-config");
      const { ID } = await import("appwrite");

      const response = await account.create(
        ID.unique(),
        email,
        password,
        user_name
      );

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
          id="first_name"
          label="First Name"
          name="first_name"
          placeholder="John"
          required
          type="text"
        />

        <Input
          id="last_name"
          label="Last Name"
          name="last_name"
          placeholder="Doe"
          required
          type="text"
        />

        <Input
          id="email"
          label="Email Address"
          name="email"
          placeholder="john.doe@example.com"
          required
          type="email"
        />

        <Input
          type="password"
          id="password"
          label="Password"
          name="password"
          placeholder="******"
          minLength={8}
          required
        />

        <Input
          type="password"
          id="confirm_password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="******"
          minLength={8}
          required
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <Link
              href="/signin"
              className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
              Already have an Account? Sign In
            </Link>
          </div>

          <button
            type="submit"
            disabled={!!isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
            {isSubmitting ? (
              <Spinner
                size={6}
                srText="Creating"
                trackColor={{
                  dark: `gray-600`,
                  light: `gray-200`,
                }}
                wheelColor={{
                  dark: `gray-300`,
                  light: `gray-600`,
                }}
              />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
