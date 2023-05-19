import Image from "next/image";
import { FC } from "react";

interface ScreenProviderProps {
  children: React.ReactNode;
}

const ScreenProvider: FC<ScreenProviderProps> = ({ children }) => {
  return (
    <div className="h-screen flex gap-4 items-center justify-around px-4">
      <div className="hidden md:block relative w-1/2 h-[700px] min-w-[450px]">
        <Image
          src={`/election.svg`}
          alt="Election App - Sign In"
          fill
          priority
        />
      </div>

      {children}
    </div>
  );
};

export default ScreenProvider;
