import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const constants = {
    navLinks: [
        {
            title: 'Home',
            path: '/',
            smHidden: false,
            icon: '/assets/house-solid.svg',
        },
        { title: 'About', path: '/about', smHidden: true, icon: null },
        {
            title: 'Articles',
            path: '/articles',
            smHidden: false,
            icon: '/assets/newspaper-solid.svg',
        },
        {
            title: 'Contact',
            path: '/contact',
            smHidden: false,
            icon: '/assets/headset-solid.svg',
        },
        {
            title: 'Rides',
            path: '/rides',
            smHidden: false,
            icon: '/assets/flag-solid.svg',
        },
    ],
    tables: {
      users: 'vikinx_users'
    }
};
