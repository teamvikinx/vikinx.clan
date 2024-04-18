import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { dark } from "@clerk/themes";
import "../globals.css";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "900"] });

export const metadata = {
  title: "VikinX",
  description: "VikinX | Others",
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
        </body>
      </html>
    </ClerkProvider>
  );
}