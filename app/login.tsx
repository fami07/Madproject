import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';

const softBackground = '#fdf5f9';

export default function LoginScreen() {
  const accent = useThemeColor({ light: '#f06292', dark: '#f8a2c1' }, 'tint');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    const safeEmail = email.trim() || 'demo@medexa.com';
    const safePass = password.trim() || 'demo123';
    setError(null);
    try {
      await signIn({ email: safeEmail, password: safePass });
      router.replace('/');
    } catch (e: any) {
      console.warn('Login error', e);
      const msg = e?.message || e?.code || 'Login failed';
      setError(String(msg));
    }
  };

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.bgBlock} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandCard}>
          <View style={styles.brandBadge}>
            <Ionicons name="heart" size={18} color="#fff" />
          </View>
          <ThemedText type="title" style={styles.brandTitle}>
            Medexa
          </ThemedText>
          <ThemedText style={styles.brandSubtitle}>
            Caring partner for your daily meds and reminders.
          </ThemedText>
        </View>

        <ThemedView style={styles.formCard}>
          <ThemedText type="subtitle">Welcome back</ThemedText>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={18} color={accent} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9aa"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color={accent} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9aa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Pressable>
              <ThemedText style={styles.helper}>Forgot?</ThemedText>
            </Pressable>
          </View>

          <Pressable style={[styles.primaryButton, { backgroundColor: accent }]} onPress={handleLogin}>
            <ThemedText style={styles.primaryButtonText}>Log in</ThemedText>
          </Pressable>

          {error ? (
            <ThemedText style={{ color: '#d9534f', marginTop: 8 }}>{error}</ThemedText>
          ) : null}

          <View style={styles.divider}>
            <View style={styles.line} />
            <ThemedText style={styles.helper}>or continue with</ThemedText>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            {['logo-google', 'logo-apple', 'logo-facebook'].map((icon) => (
              <Pressable key={icon} style={styles.socialButton}>
                <Ionicons name={icon as any} size={18} color="#2b3a42" />
              </Pressable>
            ))}
          </View>
        </ThemedView>

        <Pressable onPress={() => router.push('/signup')} style={styles.switchRow}>
          <ThemedText style={styles.helper}>New to Medexa? </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: accent }}>
            Create account
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7fbff',
  },
  bgBlock: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fef6fa',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  brandCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    gap: 10,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  brandBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#f06292',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#2b3a42',
    textAlign: 'center',
  },
  brandSubtitle: {
    color: '#5c706c',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: softBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5dce8',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    color: '#2b3a42',
  },
  helper: {
    color: '#5c706c',
  },
  primaryButton: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#f5dce8',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5dce8',
    backgroundColor: '#fdf5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
});
