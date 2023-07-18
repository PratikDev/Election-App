import { FC } from "react";
import Props from "./interfaces/skeleton-interface";

const Description: FC<Props> = ({ width, additionalClasses }) => {
  return (
    <>
      <div
        className={`${width} h-2.5 my-2 rounded-full bg-gray-500/50 animate-pulse ${
          additionalClasses ?? ""
        }`}
      ></div>
    </>
  );
};

export default Description;
