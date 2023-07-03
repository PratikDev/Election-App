// style imports
import "@/styles/globals.css";

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
  return (
    <html lang="en">
      <body>
        <AuthChecker />
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
