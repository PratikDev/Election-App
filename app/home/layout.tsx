import SideBar from "@/components/Home/SideBar/SideBar";
import { ReactNode } from "react";

export const metadata = {
  title: "The Election App - Home",
  description: "A simple app to create, host and participate on elections.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SideBar>{children}</SideBar>
}
