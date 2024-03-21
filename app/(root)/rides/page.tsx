import { fetchUser } from '@/lib/actions/users.action';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

async function fetchUserData() {
    const user = await currentUser();
    let userInfo: IUser | null;

    if (user) {
        userInfo = await fetchUser(user.id);
    } else {
        userInfo = null;
    }

    return userInfo;
}

const Page = async () => {
    const user = await fetchUserData();

    if (user && !user.onboarding) {
        redirect('/onboarding');
    } else {
        redirect('/');
    }

    return <div>Onboarding</div>;
};

export default Page;
