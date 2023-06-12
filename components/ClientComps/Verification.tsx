"use client";

// reactjs imports
import { FC, useEffect } from "react";

const Verification: FC = () => {
  useEffect(() => {
    async function verifyEmail() {
      const { searchParams } = new URL(location.href);

      const { userId, secret } = Object.fromEntries(searchParams.entries());

      if (!userId || !secret) {
        location.href = "/signin";
        return;
      }

      const { account } = await import(`@/appwrite/appwrite-config`);

      try {
        await account.updateMagicURLSession(userId, secret);

        location.href = "/home";
      } catch (error) {
        console.log(error);
      }
    }

    verifyEmail();
  }, []);

  return <></>;
};

export default Verification;
