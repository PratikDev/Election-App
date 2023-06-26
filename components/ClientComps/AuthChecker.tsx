"use client";

// reactjs imports
import { useEffect } from "react";

// firebase imports
import { onAuthStateChanged } from "firebase/auth";

// firebase config imports
import { auth } from "@/firebase/firebase-config";

const AuthChecker = () => {
  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.pathname;

    const pathList = ["/signin", "/verify-email"];

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathList.includes(path)) {
          location.href = "/home";
        }
      } else {
        if (!pathList.includes(path)) {
          location.href = "/signin";
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <></>;
};

export default AuthChecker;
