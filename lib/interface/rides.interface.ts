interface IRide {
  title: string;
  description: string;
  start_date: string;
  route: string;
  thumbnail: string;
  average_kilometers: number;
  is_published: boolean;
  status?: RideStatus;
  users_joined: { joined_at: any; user_id: string }[];
  uuid: string;
  createdAt: Date | string;
  createdBy: string;
  updatedAt: Date | string;
  updatedBy: string;
  images: string[];
  summary: string;
  is_feature: boolean;
}

type RideStatus =
  | "count"
  | "active"
  | "inactive"
  | "ongoing"
  | "completed"
  | "deleted";
