"use client";

// reacjs imports
import { FC, useEffect } from "react";

const HomePage: FC = () => {
  useEffect(() => {
    const checkSession = async () => {
      const { pathname } = location;

      const isSignPage = pathname === "/signin";
      const notFoundPage = pathname === "/404";
      const notVerificationPage = pathname === "/verification";

      try {
        const { account } = await import(`@/appwrite/appwrite-config`);
        const response = await account.getSession("current");

        if ((isSignPage || pathname === "/") && response.$id) {
          location.href = "/home";
        }
      } catch (error) {
        if (!isSignPage && !notFoundPage && !notVerificationPage) {
          location.href = "/signin";
        }
      }
    };

    checkSession();
  }, []);

  return <></>;
};

export default HomePage;
