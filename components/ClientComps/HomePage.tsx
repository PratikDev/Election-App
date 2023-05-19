"use client";

import { FC, useEffect } from "react";

const HomePage: FC = () => {
  useEffect(() => {
    const checkSession = async () => {
      const { pathname } = location;

      const isSignPage = ["/signin", "/signup"].includes(pathname);

      try {
        const { account } = await import(`@/appwrite/appwrite-config`);
        const response = await account.getSession("current");

        if (isSignPage) {
          location.href = "/home";
        }

        console.log(response);
      } catch (error) {
        if (!isSignPage) {
          location.href = "/signin";
        }
      }
    };

    checkSession();
  }, []);

  return <></>;
};

export default HomePage;
