import { SparklesCore } from '@/components/ui/Sparkles';
import { Button, Image } from '@nextui-org/react';
import localFonts from 'next/font/local';
import Link from 'next/link';

const NHLDucks = localFonts({ src: '../../app/fonts/NHL Ducks.ttf' });

export default function Home() {
    return (
        <main>
            <div
                className='relative w-full h-screen bg-cover bg-center'
                style={{ backgroundImage: "url('/home-bg.jpg')" }}
            >
                <div className='absolute w-full h-full p-5 text-white bg-black bg-opacity-70 text-xl flex flex-col items-center justify-center overflow-hidden'>
                    {/* <Image
                        src={'/vikinx-logo.png'}
                        className='w-[100px] md:w-[150px] lg:w-[200px]'
                        alt='vikinx-logo'
                    /> */}
                    <div className='space-y-6 text-center'>
                        <h1 className='text-center text-5xl md:text-6xl lg:text-8xl text-white font-semibold'>
                            Join The <span className='text-primary'>Revolution</span>
                        </h1>
                        <h2 className=' text-2xl md:text-3xl text-white relative z-20 flex items-center justify-center gap-4'>
                            Ride{' '}
                            <span
                                className={`${NHLDucks.className}  text-primary`}
                            >
                                X
                            </span>{' '}
                            Tour{' '}
                            <span
                                className={`${NHLDucks.className}  text-primary`}
                            >
                                X
                            </span>{' '}
                            Explore
                        </h2>
                        <Button
                            as={Link}
                            color='primary'
                            href='/sign-up'
                            variant='solid'
                            radius='sm'
                            className='!w-[150px]'
                        >
                            Join Us
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
