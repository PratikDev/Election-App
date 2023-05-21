// reactjs imports
import { FC } from "react";

// nextjs imports
import Image from "next/image";

const Page: FC = () => {
  return (
    <>
      <div className="w-full h-full grid place-items-center">
        <div className="flex flex-col gap-6">
          <div className="flex gap-12">
            <Image
              width={260}
              height={260}
              src={`/home/graph.svg`}
              alt="Election App - Home Page"
            />

            <Image
              width={260}
              height={260}
              src={`/home/plus.svg`}
              alt="Election App - Home Page"
            />
          </div>

          <div>
            <h1
              className="text-gray-800
            dark:text-gray-200
            text-lg
            text-center
            font-medium">
              Create a new Election or Use a Template
            </h1>

            <div
              className="flex
            gap-1
            justify-center
            items-center">
              <p
                className="text-gray-400
              dark:text-gray-600
              text-sm
              font-normal">
                You can make your elections private by adding a voters&apos;
                emails list.
              </p>

              <div
                className="group
              relative
              rounded-full
              bg-gray-400/50
              p-0.5">
                <small
                  aria-hidden
                  className="absolute
                  bottom-5
                  left-2
                  w-40
                  px-2
                  py-1
                  rounded-sm
                  text-xs
                  text-gray-800
                  dark:text-gray-200
                  bg-gray-300
                  dark:bg-gray-600
                  hidden
                  group-hover:block">
                  You can type out email addresses manually or upload a CSV file
                  and we&apos;ll do the rest.
                </small>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                  className="w-3 h-3 text-gray-700 dark:text-gray-300">
                  <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                className="flex
              gap-1
              items-center
              rounded-md
              font-medium
              text-gray-200
              px-3
              py-1.5
              bg-indigo-600
              hover:bg-indigo-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="w-4 h-4">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
                <span>Create Election</span>
              </button>

              <button
                className="flex
              gap-1
              items-center
              rounded-md
              font-medium
              text-gray-700
              dark:text-gray-800
              px-3
              py-1.5
              bg-gray-300
              dark:bg-gray-400
              hover:bg-gray-400/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-4 h-4">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
                <span>Templates</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
