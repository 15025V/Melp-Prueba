export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  contact?: {
    site?: string;
    email?: string;
    phone?: string;
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    location?: {
      lat: number;
      lng: number;
    };
  };
  distance?: number; // Distance in meters
};
