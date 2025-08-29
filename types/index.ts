export interface User {
  id: string;
  email?: string;
  phoneNumber?: string;
  fullName?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'non-binary' | 'other';
  pronouns?: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
    state?: string;
  };
  photos?: string[];
  bio?: string;
  interests?: string[];
  preferences?: {
    ageRange: [number, number];
    maxDistance: number;
    dealBreakers?: string[];
  };
  isVerified?: boolean;
  isProfileComplete?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  gradient: string[];
}

export type Theme = {
  colors: ThemeColors;
  isDark: boolean;
};