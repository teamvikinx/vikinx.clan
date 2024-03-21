import { constants } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { CircleUser, RadioTower, User2 } from 'lucide-react';

const Header = () => {
    return (
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
            <header className='flex h-20 w-full shrink-0 justify-between items-center px-4 md:px-6'>
                <Link href={'/'}>
                    <Image
                        src={'/vikinx-logo.svg'}
                        width={150}
                        height={200}
                        alt='vikinx-logo'
                    />
                </Link>
                <div className='flex items-center'>
                    {constants.navLinks.map((item) => (
                        <Link
                            key={item.title}
                            className='navlink'
                            href={item.path}
                        >
                            {item.title}
                        </Link>
                    ))}
                    {true ? (
                        <span className='ml-6 space-x-4'>
                            <Link href={'/sign-up'}>
                                <Button className='justify-self-end px-2 py-1 text-xs'>
                                    Sign Up
                                </Button>
                            </Link>
                        </span>
                    ) : (
                        <span className='ml-6 space-x-4'>
                            <Link href={'/announcements'}>
                                <Button
                                    size={'sm'}
                                    variant={'link'}
                                    className='text-gray-400 bg-gray-900 rounded-full py-5'
                                >
                                    <RadioTower size={18} />
                                </Button>
                            </Link>
                            <Link href={'/my-profile'}>
                                <Button
                                    size={'sm'}
                                    variant={'link'}
                                    className='text-gray-400 bg-gray-900 rounded-full py-5'
                                >
                                    <CircleUser size={18} />
                                </Button>
                            </Link>
                        </span>
                    )}
                </div>
            </header>
        </div>
    );
};

export default Header;
