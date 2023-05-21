// reactjs imports
import { FC, ReactNode } from "react";

// nextjs imports
import Link from "next/link";

// components imports
import LogOutButton from "./LogOutButton";

interface SideBarProps {
  children: ReactNode;
}

const svgClasses =
  "flex-shrink-0 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition duration-75";

const menuLinks = [
  {
    name: "Home",
    href: "/home",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className={svgClasses}
        fill="currentColor">
        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
      </svg>
    ),
  },
  {
    name: "Elections",
    href: "/elections",
    icon: (
      <svg
        aria-hidden="true"
        className={svgClasses}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
    ),
  },
  {
    name: "Participate",
    href: "/participate",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={svgClasses}>
        <path d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c20.6 0 38.2 13 45 31.2c8.8-9.3 21.2-15.2 35-15.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v48 16 48c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z" />
      </svg>
    ),
  },
  {
    name: "Profile",
    href: "/profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={svgClasses}>
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        className={svgClasses}>
        <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
      </svg>
    ),
  },
];

const MenuItemClasses =
  "flex gap-4 items-center w-full rounded-s-md rounded-e-3xl hover:bg-gray-300 hover:dark:bg-gray-700 focus:outline-none focus:bg-gray-300 focus:dark:bg-gray-700 pl-4 py-2";

const SideBar: FC<SideBarProps> = ({ children }) => {
  return (
    <>
      <header className="fixed top-0 z-10 bg-indigo-600 w-full p-2">
        <div className="relative">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute top-1/2 left-3 -translate-y-1/2 flex-none text-gray-300"
            aria-hidden="true">
            <path d="m19 19-3.5-3.5"></path>
            <circle
              cx="11"
              cy="11"
              r="6"></circle>
          </svg>

          <input
            type="text"
            name="search"
            id="search"
            className="shadow-sm
            tracking-widest
            text-sm
            text-gray-100
            placeholder:text-gray-400
            bg-gray-300/[0.2]
            dark:bg-gray-300/[0.15]
            hover:bg-gray-300/[0.3]
            hover:dark:bg-gray-300/[0.25]
            focus:bg-gray-300/[0.3]
            focus:dark:bg-gray-300/[0.25]
            focus:outline-none
            rounded-md
            w-full
            py-3
            px-10
            pr-16"
            placeholder=" Quick Search..."
          />

          <span className="font-medium text-gray-300 absolute right-4 top-1/2 -translate-y-1/2">
            Ctrl K
          </span>
        </div>
      </header>

      <div className="grid grid-cols-7 h-screen">
        <aside className="col-span-1 mt-14 bg-gray-200 dark:bg-gray-800">
          <div className="p-3 pr-2 pl-1">
            <ul className="font-medium">
              {menuLinks.map(({ name, href, icon }, index) => (
                <li
                  key={index}
                  className="pb-2">
                  <Link
                    href={href}
                    className={MenuItemClasses}>
                    {icon}

                    <span>{name}</span>
                  </Link>
                </li>
              ))}

              <li className="pb-2">
                <LogOutButton
                  MenuItemClasses={MenuItemClasses}
                  svgClasses={svgClasses}
                />
              </li>
            </ul>
          </div>
        </aside>

        <main className="col-start-2 col-span-6 overflow-auto mt-14 p-4">
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
