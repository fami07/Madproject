import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type User = { uid: string; email: string | null; name?: string | null };

type AuthContextValue = {
  user: User | null;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signUp: (params: { email: string; password: string; name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Simple in-memory storage for mock users (not persisted)
const mockUsers: Map<string, { email: string; password: string; name?: string; uid: string }> = new Map();

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    // In-memory mock: validate credentials against stored users
    const stored = mockUsers.get(email.toLowerCase());
    if (!stored || stored.password !== password) {
      const err: any = new Error('Invalid email or password');
      err.code = 'auth/invalid-credential';
      throw err;
    }
    setUser({ uid: stored.uid, email: stored.email, name: stored.name ?? null });
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
    setUser({ uid, email, name: name ?? null });
    console.log('[use-auth] User registered:', { email, name });
  };

  const signOut = async () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
