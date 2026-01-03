import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

type User = { uid: string; email: string | null; name?: string | null };

type AuthContextValue = {
  user: User | null;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signUp: (params: { email: string; password: string; name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Simple in-memory storage for mock users. Backed by AsyncStorage so accounts
// survive app reloads in development.
const STORAGE_USERS_KEY = 'medexa:mockUsers';
const STORAGE_CURRENT_USER = 'medexa:currentUser';

const mockUsers: Map<string, { email: string; password: string; name?: string; uid: string }> = new Map();

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  // Load persisted users and current session on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_USERS_KEY);
        if (raw) {
          const parsed: { email: string; password: string; name?: string; uid: string }[] = JSON.parse(raw);
          parsed.forEach((u) => mockUsers.set(u.email.toLowerCase(), u));
        }
        const cur = await AsyncStorage.getItem(STORAGE_CURRENT_USER);
        if (cur) {
          const curObj = JSON.parse(cur);
          setUser(curObj);
        }
      } catch (e) {
        console.warn('Failed to load persisted auth data', e);
      }
    })();
  }, []);

  // Using simple in-memory mock auth (no external connections)

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    // In-memory mock: validate credentials against stored users
    const stored = mockUsers.get(email.toLowerCase());
    if (!stored || stored.password !== password) {
      const err: any = new Error('Invalid email or password');
      err.code = 'auth/invalid-credential';
      throw err;
    }
    const newUser = { uid: stored.uid, email: stored.email, name: stored.name ?? null };
    setUser(newUser);
    try {
      await AsyncStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
    } catch (e) {
      console.warn('Failed to persist current user', e);
    }
  };

  const signUp = async ({ email, password, name }: { email: string; password: string; name?: string }) => {
    // In-memory mock: check for duplicate email
    if (mockUsers.has(email.toLowerCase())) {
      const err: any = new Error('Email already in use');
      err.code = 'auth/email-already-in-use';
      throw err;
    }
    // Create new user in memory
    const uid = `user_${Date.now()}`;
    mockUsers.set(email.toLowerCase(), { email, password, name, uid });
    const newUser = { uid, email, name: name ?? null };
    setUser(newUser);
    try {
      const arr = Array.from(mockUsers.values());
      await AsyncStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(arr));
      await AsyncStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
    } catch (e) {
      console.warn('Failed to persist new user', e);
    }
    console.log('[use-auth] User registered:', { email, name });
  };

  const signOut = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(STORAGE_CURRENT_USER);
    } catch (e) {
      console.warn('Failed to clear current user', e);
    }
  };

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx) return ctx;

  // Fallback when no AuthProvider is mounted — provide a minimal local-only
  // implementation so pages/components that call `useAuth()` won't crash.
  return {
    user: null,
    signIn: async ({ email, password }: { email: string; password: string }) => {
      const stored = mockUsers.get(email.toLowerCase());
      if (!stored || stored.password !== password) {
        const err: any = new Error('Invalid email or password');
        err.code = 'auth/invalid-credential';
        throw err;
      }
      const newUser = { uid: stored.uid, email: stored.email, name: stored.name ?? null };
      try {
        await AsyncStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
      } catch (e) {
        console.warn('Failed to persist current user', e);
      }
    },
    signUp: async ({ email, password, name }: { email: string; password: string; name?: string }) => {
      if (mockUsers.has(email.toLowerCase())) {
        const err: any = new Error('Email already in use');
        err.code = 'auth/email-already-in-use';
        throw err;
      }
      const uid = `user_${Date.now()}`;
      mockUsers.set(email.toLowerCase(), { email, password, name, uid });
      const newUser = { uid, email, name: name ?? null };
      try {
        const arr = Array.from(mockUsers.values());
        await AsyncStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(arr));
        await AsyncStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(newUser));
      } catch (e) {
        console.warn('Failed to persist new user', e);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem(STORAGE_CURRENT_USER);
      } catch (e) {
        console.warn('Failed to clear current user', e);
      }
    },
  } as AuthContextValue;
}
