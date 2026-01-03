import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/use-auth';
import { useThemeColor } from '@/hooks/use-theme-color';

const softBackground = '#fdf5f9';

export default function SignupScreen() {
  const accent = useThemeColor({ light: '#f06292', dark: '#f8a2c1' }, 'tint');
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { signUp } = useAuth();

  const handleSignup = async () => {
    const safeEmail = email.trim() || 'demo@medexa.com';
    const safePass = password.trim() || 'demo123';
    const safeName = fullName.trim() || 'Medexa User';
    await signUp({ email: safeEmail, password: safePass, name: safeName });
    router.replace('/');
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandCard}>
          <View style={styles.brandBadge}>
            <Ionicons name="sparkles" size={18} color="#fff" />
          </View>
          <ThemedText type="title" style={styles.brandTitle}>
            Join Medexa
          </ThemedText>
          <ThemedText style={styles.brandSubtitle}>
            Set reminders, track doses, and keep your care on schedule.
          </ThemedText>
        </View>

        <ThemedView style={styles.formCard}>
          <ThemedText type="subtitle">Create account</ThemedText>

          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={18} color={accent} />
            <TextInput
              style={styles.input}
              placeholder="Full name"
              placeholderTextColor="#9aa"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="checkmark-done-outline" size={18} color={accent} />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#9aa"
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
            />
          </View>

          <Pressable style={[styles.primaryButton, { backgroundColor: accent }]} onPress={handleSignup}>
            <ThemedText style={styles.primaryButtonText}>Create account</ThemedText>
          </Pressable>

          <View style={styles.helperRow}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#5c706c" />
            <ThemedText style={styles.helper}>
              By continuing you agree to our Terms and Privacy Policy.
            </ThemedText>
          </View>
        </ThemedView>

        <Pressable onPress={() => router.push('/login')} style={styles.switchRow}>
          <ThemedText style={styles.helper}>Already have an account? </ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: accent }}>
            Log in
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
  },
  brandSubtitle: {
    color: '#5c706c',
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
  helperRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingTop: 4,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
  },
});
