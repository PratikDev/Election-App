export const metadata = {
  title: "The Election App - Sign Up",
  description: "A simple app to create, host and participate on elections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
