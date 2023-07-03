"use client";

// reactjs imports
import { useEffect } from "react";

// nextjs imports
import { useRouter } from "next/navigation";

// firebase imports
import { onAuthStateChanged } from "firebase/auth";

// firebase config imports
import { auth } from "@/firebase/firebase-config";

const AuthChecker = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const url = new URL(window.location.href);
      const path = url.pathname;

      const pathList = ["/signin", "/verify-email"];

      if (user) {
        if ([...pathList, "/"].includes(path)) {
          router.push("/home");
        }
      } else {
        if (!pathList.includes(path)) {
          router.push("/signin");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  return <></>;
};

export default AuthChecker;
