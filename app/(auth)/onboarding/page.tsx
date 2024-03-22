import UserAccountProfile from '@/components/forms/UserAccountProfile';
import Header from '@/components/layout/header/Header';
import { fetchUser } from '@/lib/actions/users.action';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

async function fetchUserData() {
    const user = await currentUser();
    let userInfo;

    if (user) {
        userInfo = await fetchUser(user.id);
    }

    const userData = {
        name: userInfo?.name || `${user?.firstName} ${user?.lastName}`,
        aka: userInfo?.aka || '',
        mobile: userInfo?.mobile || '',
        emergency_number: userInfo?.emergency_number || '',
        email: user?.primaryEmailAddressId || userInfo?.email,
        bio: userInfo?.bio || '',
        profile_picture: userInfo?.profile_picture || user?.imageUrl,
        bikes: userInfo?.bikes || [],
        dob: userInfo?.dob || user?.birthday,
        user_id: userInfo?.user_id || user?.id,
        socials: userInfo?.socials || {},
        blood_group:userInfo?.blood_group || '',
        rides_joined: userInfo?.rides_joined || [],
        status: userInfo?.status,
        onboarding: userInfo?.onboarding,
    };

    return userData;
}

const Page = async () => {
    const user = await fetchUserData();

    if (user && user.onboarding) {
        redirect('/');
    }

    return (
        <div className='flex justify-center'>
            <span>
                <Link href={'/'}>
                    <Image
                        src={'/vikinx-logo.png'}
                        width={150}
                        height={200}
                        alt='vikinx-logo'
                    />
                </Link>
                <UserAccountProfile  />
            </span>
        </div>
    );
};

export default Page;
