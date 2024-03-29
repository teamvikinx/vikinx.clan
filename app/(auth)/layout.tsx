import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { dark } from "@clerk/themes";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "900"] });

export const metadata = {
  title: "VikinX",
  description: "VikinX | Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${poppins.className}`}>
          <main className="container w-full flex justify-center items-center min-h-screen">
            {children}
          </main>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
