"use client";

import FullScreenLoader from "@/components/FullScreenLoader";
import { auth } from "@/firebase/firebase-config";
import { isSignInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();

  if (!isSignInWithEmailLink(auth, window.location.href)) {
    router.push("/signin");

    return <FullScreenLoader />;
  }

  async function signin() {
    const emailFromStorage =
      window.localStorage.getItem("emailForSignIn") || "";

    const { signInWithEmailLink } = await import("firebase/auth");

    if (!emailFromStorage) {
      const { default: Swal } = await import("sweetalert2");

      const { default: isEmailValidRegex } = await import(
        "@/helpers/emailFormateValidation"
      );

      Swal.fire({
        title: "Type your email",
        input: "email",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Sign in",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: (email) => {
          const validate = isEmailValidRegex(email);

          if (!validate) return false;

          return signInWithEmailLink(auth, email, window.location.href)
            .then(() => {
              window.localStorage.removeItem("emailForSignIn");
            })
            .catch(() => {
              Swal.showValidationMessage(`Something went wrong`);

              router.push("/signin");
            });
        },
      });

      return <FullScreenLoader />;
    }

    try {
      await signInWithEmailLink(auth, emailFromStorage, window.location.href);
    } catch (error) {
      const { default: Toast } = await import("@/components/Toast");

      await Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });

      router.push("/signin");
    }
  }

  signin();

  return <FullScreenLoader />;
}
