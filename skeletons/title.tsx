import { FC } from "react";
import Props from "./interfaces/skeleton-interface";

const Title: FC<Props> = ({ width, additionalClasses }) => {
  return (
    <>
      <div
        className={`${width} rounded-full h-4 my-2 bg-gray-500/50 animate-pulse ${
          additionalClasses ?? ""
        }`}
      ></div>
    </>
  );
};

export default Title;
