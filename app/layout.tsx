// style imports
import "@/styles/globals.css";

// nextjs imports
import { cookies } from "next/headers";

// auth checker component import
import AuthChecker from "@/components/ClientComps/AuthChecker";

export const metadata = {
  title: "The Election App",
  description: "A simple app to create, host and participate on elections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = cookies().get("theme");

  return (
    <html lang="en" className={theme?.value ?? `dark`}>
      <body>
        <AuthChecker />

        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
