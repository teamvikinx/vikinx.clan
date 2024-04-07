interface IContactForm {
  email: string;
  mobile: string;
  name: string;
  subject: string;
  query: string;
  timestamp: any;
  uuid: string;
}

interface INewsletterForm {
  email: string;
  mobile?: string;
  name: string;
  joined_at: string;
  subscribed: boolean;
}

interface GalleryImages {
  src: string;
  height: number;
  width: number;
  assetId: string;
  publicId: string;
}

interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
}

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

interface Announcement {
  title: string;
  message: string;
  announced_at: string;
  announcement_id: string;
  announcement_by: string;
  type: string
}

type RideStatus =
  | "count"
  | "active"
  | "inactive"
  | "ongoing"
  | "completed"
  | "deleted";
