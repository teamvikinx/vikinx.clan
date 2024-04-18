interface IUser {
  name: string;
  aka: string;
  mobile: string;
  emergency_number: string;
  email: string;
  bio: string;
  profile_picture: any;
  bikes: [] | { name: string; pet_name?: string }[] | undefined;
  joined_at: string | Date;
  dob: string | Date;
  is_active: boolean;
  user_id: string;
  socials: { instagram: string; facebook: string; twitter: string };
  blood_group: string;
  state: string;
  rides_joined: { joined_at: any; ride_id: string }[];
  status: boolean;
  onboarding: boolean;
  last_login: any;
  hide_details?: boolean
  is_original: boolean
}
