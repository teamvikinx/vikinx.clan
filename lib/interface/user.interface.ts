interface IUser {
    name: string;
    mobile: string;
    emergency_number: string;
    email: string;
    bio: string;
    profile_picture: any;
    bikes: { name: string; pet_name: string }[];
    joined_at: string | Date;
    dob: string | Date;
    is_active: boolean;
    user_id: string;
    socials: { [key: string]: string };
    blood_group: string;
    rides_joined: { joined_at: any; ride_id: string }[];
    status: boolean;
    onboarding: boolean;
    last_login: any;
}
