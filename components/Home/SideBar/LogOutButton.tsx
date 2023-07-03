"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";

const handleLogout = async ({
  loggingOut,
  setLoggingOut,
}: {
  loggingOut: Boolean;
  setLoggingOut: Dispatch<SetStateAction<Boolean>>;
}) => {
  if (loggingOut) return;

  try {
    setLoggingOut(true);

    const { signOut } = await import("firebase/auth");
    const { auth } = await import("@/firebase/firebase-config");

    await signOut(auth);
  } catch (error) {
    console.log(error);

    const { default: Toast } = await import("@/components/Toast");

    Toast.fire({
      icon: "error",
      title: "Something went wrong",
    });
  } finally {
    setLoggingOut(false);
  }
};

const LogOutButton: FC<{ svgClasses: string; MenuItemClasses: string }> = ({
  svgClasses,
  MenuItemClasses,
}) => {
  const [loggingOut, setLoggingOut] = useState<Boolean>(false);

  return (
    <>
      <button
        onClick={() => handleLogout({ loggingOut, setLoggingOut })}
        disabled={!!loggingOut}
        type="button"
        className={`${MenuItemClasses} disabled:opacity-50`}>
        {loggingOut ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className={`${svgClasses} animate-spin text-gray-200 fill-gray-800 dark:text-gray-600 dark:fill-gray-300`}
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className={svgClasses}>
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        )}

        <span>Logout</span>
      </button>
    </>
  );
};

export default LogOutButton;
