import Question from "@/components/Helpers/Question";
import CreateButton from "@/components/Home/Main/CreateButton/CreateButton";
import Image from "next/image";
import { FC } from "react";

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
            font-medium"
            >
              Create a new Election or Use a Template
            </h1>

            <div
              className="flex
            gap-1
            justify-center
            items-center"
            >
              <p
                className="text-gray-400
              dark:text-gray-600
              text-sm
              font-normal"
              >
                You can make your elections private by adding a voters&apos;
                emails list.
              </p>

              <Question
                message={
                  <>
                    You can type out email addresses manually or upload a CSV
                    file and we&apos;ll do the rest
                  </>
                }
              />
            </div>

            <div className="flex items-center justify-center gap-2 mt-4">
              <CreateButton />

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
              hover:bg-gray-400/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  className="w-4 h-4"
                >
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
