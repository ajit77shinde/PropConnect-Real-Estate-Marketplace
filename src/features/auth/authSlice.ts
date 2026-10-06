import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserRole } from '../../types';
import { users, DEMO_CREDENTIALS } from '../../data/mockData';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const stored = localStorage.getItem('propconnect_auth');
const initialState: AuthState = stored
  ? JSON.parse(stored)
  : { user: null, token: null, isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('propconnect_auth', JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('propconnect_auth');
    },
    updateProfile(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('propconnect_auth', JSON.stringify(state));
      }
    },
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;

export function authenticate(
  email: string,
  password: string,
): { user: User; token: string } | null {
  const cred = DEMO_CREDENTIALS.find(
    (c) => c.email === email && c.password === password,
  );
  if (!cred) return null;
  const user = users.find((u) => u.email === email);
  if (!user) return null;
  return { user, token: `demo-token-${user.id}` };
}

export function registerUser(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}): { user: User; token: string } {
  const existing = users.find((u) => u.email === data.email);
  if (existing) throw new Error('Email already registered');
  const user: User = {
    id: `u-${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    role: data.role,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  users.push(user);
  return { user, token: `demo-token-${user.id}` };
}
