
export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  location?: string;
  isVerified: boolean;
}

export interface Worker extends UserProfile {
  profession: string;
  rating: number;
  reviewCount: number;
  experience: number;
  hourlyRate: number;
  bio: string;
  portfolio: string[];
  skills: string[];
  availability: 'free' | 'busy' | 'away';
  completionRate: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Order {
  id: string;
  clientId: string;
  workerId: string;
  category: string;
  status: 'pending' | 'accepted' | 'on_way' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  priceEstimate: number;
  address: string;
}
