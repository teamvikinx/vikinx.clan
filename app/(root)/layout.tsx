import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "900"] });

export const metadata: Metadata = {
  title: "VikinX",
  description:
    "We're a visionary startup on a mission to create a digital haven for motorcycle enthusiasts. Our goal is to forge a community where passion for motorcycling meets the ease of connectivity.",
  openGraph: {
    title: "VikinX",
    siteName: "VikinX",
    url: "https://vikinx.in",
    type: "website",
    description:
      "We're a visionary startup on a mission to create a digital haven for motorcycle enthusiasts. Our goal is to forge a community where passion for motorcycling meets the ease of connectivity.",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VikinX",
    description:
      "We're a visionary startup on a mission to create a digital haven for motorcycle enthusiasts. Our goal is to forge a community where passion for motorcycling meets the ease of connectivity.",
    images: [
      {
        url: "https://res.cloudinary.com/dtijjnwyx/image/upload/v1710770646/vikinx-logo-zoomed_ambrrp.png",
        alt: "VikinX logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <Header />
          <Toaster position="top-right" reverseOrder={false} />
          <main className="container mx-auto px-4 md:px-6 lg:px-8 ">
            {children}
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
