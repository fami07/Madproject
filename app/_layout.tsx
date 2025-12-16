import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Slot, useRootNavigationState, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import 'react-native-reanimated';

import Sidebar from '@/components/sidebar';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthGate>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              {sidebarOpen && (
                <View style={styles.sidebarWrapper}>
                  <Sidebar onClose={() => setSidebarOpen(false)} />
                </View>
              )}

              <View style={styles.content}>
                <View style={styles.topBar}>
                  <Pressable onPress={() => setSidebarOpen((s) => !s)} style={styles.menuButton}>
                    <Ionicons name="menu" size={22} color="#222" />
                  </Pressable>
                  <Text style={styles.appTitle}>Medexa</Text>
                </View>

                <Slot />
              </View>
            </View>
          </SafeAreaView>
        </AuthGate>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const isReady = navigationState?.key != null;
  const inAuthStack = segments?.[0] === 'login' || segments?.[0] === 'signup';

  // Wait until router is ready, then conditionally redirect using the
  // <Redirect /> component instead of calling router.replace from an effect.
  if (!isReady) return <>{children}</>;

  if (!user && !inAuthStack) {
    return <Redirect href="/login" />;
  }

  if (user && inAuthStack) {
    return <Redirect href="/" />;
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row' },
  sidebarWrapper: { width: 260, backgroundColor: '#fff', elevation: 2 },
  content: { flex: 1 },
  topBar: { height: 56, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 12, gap: 12 },
  menuButton: { padding: 8 },
  appTitle: { fontSize: 18, fontWeight: '700' },
});
