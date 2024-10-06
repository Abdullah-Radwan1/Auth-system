export type UserData = {
 email: string;
 name: string;
 password: string;
};

// Define the store state and actions
export type AuthState = {
 user: UserData | null;
 isAuthenticated: boolean;
 error: string | null;
 isLoading: boolean;
 isChecking: boolean;
 signup: (email: string, name: string, password: string) => Promise<void>;
};
