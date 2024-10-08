export type UserData = {
 email: string;
 name: string;
 password: string;
 isVerified: boolean;
 message: string;
 error: string;
};

// Define the store state and actions
export type AuthState = {
 user: UserData | null;
 isAuthenticated: boolean;
 message: string | null;
 error: string | null;
 isLoading: boolean;
 isChecking: boolean;
 signUp: (name: string, email: string, password: string) => Promise<void>;
 login: (email: string, password: string) => Promise<void>;
 verification: (code: string) => Promise<{ user: UserData }>;
 checkAuth: () => Promise<void>;
 logout: () => Promise<void>;
 forgotPassword: (email: string) => Promise<void>;
};
