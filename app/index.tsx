import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const quickActions = [
  { label: 'Add Medication', helper: 'Create a schedule', icon: 'medkit-outline', target: '/add-medicine' },
  { label: 'Add Reminder', helper: 'Dose + refill', icon: 'notifications-outline', target: '/add-reminder' },
 { label: 'Health Log', helper: 'BP / glucose / weight', icon: 'pulse-outline', target: '/health-logs' },
{ label: 'Appointment', helper: 'Doctor / lab visit', icon: 'calendar-outline', target: '/appointments' },

];

export default function HomeScreen() {
  const accent = useThemeColor({ light: '#f06292', dark: '#f8a2c1' }, 'tint');
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <ThemedView style={styles.card}>
        <View style={styles.profileRow}>
          <View style={[styles.avatar, { backgroundColor: `${accent}20` }]}>
            <Ionicons name="person-outline" size={18} color={accent} />
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText type="defaultSemiBold" style={styles.title}>
              Hi, Medexa User
            </ThemedText>
            <ThemedText style={styles.helper}>Age 35 • Swipe to edit profile</ThemedText>
          </View>
        </View>

        <Pressable
          style={[styles.primaryButton, { backgroundColor: accent }]}
          onPress={() => router.push('/add-reminder')}>
          <ThemedText style={styles.primaryButtonText}>Add Reminder</ThemedText>
          <Ionicons name="arrow-forward" size={16} color="#fff" />
        </Pressable>

        <View style={styles.badges}>
          <View style={[styles.badge, { backgroundColor: '#fef0f5' }]}>
            <Ionicons name="heart-outline" size={16} color={accent} />
            <ThemedText style={styles.badgeText}>86% adherence</ThemedText>
          </View>
          <View style={[styles.badge, { backgroundColor: '#eef7ff' }]}>
            <Ionicons name="time-outline" size={16} color="#69addb" />
            <ThemedText style={styles.badgeText}>3 due today</ThemedText>
          </View>
          <View style={[styles.badge, { backgroundColor: '#fff4e5' }]}>
            <Ionicons name="calendar-outline" size={16} color="#f06292" />
            <ThemedText style={styles.badgeText}>Next visit Mar 5</ThemedText>
          </View>
        </View>
      </ThemedView>

      <View style={styles.list}>
        {quickActions.map((action) => (
          <Pressable
            key={action.label}
            style={[styles.listItem, { backgroundColor: action.label === 'Add Reminder' ? '#fde7ef' : '#fff' }]}
            onPress={action.target ? () => router.push(action.target as any) : undefined}>
            <View style={[styles.iconBox, { backgroundColor: `${accent}14` }]}>
              <Ionicons name={action.icon as any} size={18} color={accent} />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
                {action.label}
              </ThemedText>
              <ThemedText style={styles.helper}>{action.helper}</ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={16} color={accent} />
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  helper: {
    color: '#5c706c',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  badgeText: {
    color: '#2b3a42',
  },
  list: {
    gap: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#f5dce8',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
  },
});
