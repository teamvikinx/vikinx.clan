import { ClerkProvider } from '@clerk/nextjs';
import { Poppins } from 'next/font/google';
import '../globals.css';
import { dark } from '@clerk/themes';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '900'] });

export const metadata = {
    title: 'VikinX',
    description: 'VikinX | Auth',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang='en'>
                <body className={`${poppins.className}`}>
                    <main className='container mx-auto px-4 md:px-6 lg:px-8'>
                       {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}
