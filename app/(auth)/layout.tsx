import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '900'] });

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} bg-dark-1`}>
          <div className="w-full flex justify-center items-center min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}