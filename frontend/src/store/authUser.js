import axios from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {

            toast.error(error.response.data.message || "Signup Failed");
            set({ isSigningUp: false, user: null });

        }
    },
    login: async (credentials) => {
        try {
            set({ isLoggingIn: true });
            const response = await axios.post('/api/v1/auth/login', credentials);
            set({ user: response.data.user, isLoggingIn: false });
        } catch (error) {
            set({ isLoggingIn: false, user: null });
            toast.error(error.response.data.message || "Login Failed");
        }
    },

    logout: async () => {
        isLoggingOut: true;
        try {
            await axios.post('/api/v1/auth/logout');
            set({ user: null, isLoggingOut: false });
            toast.success("Logout successful");
        } catch (error) {
            set({ isLoggingOut: false });
            toast.error(error.response.data.message || "Logout Failed");
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true })
        try {
            const response = await axios.get('/api/v1/auth/authCheck');
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },


}));