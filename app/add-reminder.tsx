import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const scheduleBlocks = Array.from({ length: 30 }, (_, i) => i + 1);

export default function AddReminderScreen() {
  const accent = useThemeColor({ light: '#f06292', dark: '#f8a2c1' }, 'tint');
  const soft = '#fdf5f9';
  const highlightDays = useMemo(() => new Set([2, 5, 8, 12, 15, 19, 24, 27]), []);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['7:00 AM', '5:00 PM']);
  const nextTimeLabel = useMemo(() => `${selectedTimes.length + 6}:00 AM`, [selectedTimes.length]);

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]));
  };

  const addTime = () => {
    if (selectedTimes.includes(nextTimeLabel)) return;
    setSelectedTimes((prev) => [...prev, nextTimeLabel]);
  };

  const saveReminder = () => {
    if (!selectedTimes.length) {
      Alert.alert('Add a time', 'Please add at least one reminder time.');
      return;
    }

    Alert.alert('Reminder saved', `Times: ${selectedTimes.join(', ')}`);
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={styles.thumb}>
              <Ionicons name="medkit-outline" size={20} color={accent} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <ThemedText type="defaultSemiBold">Bacteria Drying</ThemedText>
              <ThemedText style={styles.helper}>Stomach Syrup • Next dose 5:00 PM</ThemedText>
            </View>
            <Pressable style={styles.editBtn}>
              <Ionicons name="create-outline" size={16} color={accent} />
              <ThemedText style={[styles.helper, { color: accent }]}>Edit</ThemedText>
            </Pressable>
          </View>
          <View style={styles.chipRow}>
            <View style={[styles.infoChip, { backgroundColor: `${accent}12` }]}>
              <ThemedText style={[styles.infoLabel, { color: accent }]}>Dose</ThemedText>
              <ThemedText type="defaultSemiBold">750 mg</ThemedText>
            </View>
            <View style={[styles.infoChip, { backgroundColor: soft }]}>
              <ThemedText style={styles.infoLabel}>Program</ThemedText>
              <ThemedText type="defaultSemiBold">4 weeks • 2 left</ThemedText>
            </View>
            <View style={[styles.infoChip, { backgroundColor: soft }]}>
              <ThemedText style={styles.infoLabel}>Quantity</ThemedText>
              <ThemedText type="defaultSemiBold">202 total • 180 left</ThemedText>
            </View>
          </View>
        </ThemedView>

        <ThemedView style={styles.card}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle">This month</ThemedText>
            <ThemedText style={styles.helper}>Swipe to reschedule</ThemedText>
          </View>
          <View style={styles.grid}>
            {scheduleBlocks.map((day) => {
              const active = highlightDays.has(day);
              return (
                <View
                  key={day}
                  style={[
                    styles.gridCell,
                    { backgroundColor: active ? accent : '#fff', borderColor: active ? accent : '#e7eef1' },
                  ]}>
                  <ThemedText style={[styles.gridText, active && { color: '#fff', fontWeight: '700' }]}>
                    {day}
                  </ThemedText>
                </View>
              );
            })}
          </View>
          <View style={styles.timeRow}>
            {['7:00 AM', '10:00 AM', '2:00 PM', '8:00 PM'].map((t) => {
              const active = selectedTimes.includes(t);
              return (
                <Pressable
                  key={t}
                  style={[
                    styles.timeChip,
                    { borderColor: active ? accent : '#f5dce8', backgroundColor: active ? `${accent}14` : soft },
                  ]}
                  onPress={() => toggleTime(t)}>
                  <Ionicons name="time-outline" size={14} color={accent} />
                  <ThemedText style={[styles.helper, { color: '#2b3a42' }]}>{t}</ThemedText>
                </Pressable>
              );
            })}
            <Pressable
              style={[styles.timeChip, { borderStyle: 'dashed', borderColor: '#f5dce8' }]}
              onPress={addTime}>
              <Ionicons name="add" size={16} color={accent} />
              <ThemedText style={[styles.helper, { color: accent }]}>Add {nextTimeLabel}</ThemedText>
            </Pressable>
          </View>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle">Notes & food</ThemedText>
          <View style={styles.noteRow}>
            <Ionicons name="restaurant-outline" size={18} color={accent} />
            <ThemedText style={styles.helper}>Take after dinner with a glass of water.</ThemedText>
          </View>
          <View style={styles.noteRow}>
            <Ionicons name="alert-circle-outline" size={18} color={accent} />
            <ThemedText style={styles.helper}>Skip if temperature above 38°C; contact doctor.</ThemedText>
          </View>
        </ThemedView>

        <Pressable style={[styles.primaryButton, { backgroundColor: accent }]} onPress={saveReminder}>
          <ThemedText style={styles.primaryButtonText}>Save reminder</ThemedText>
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
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#f3fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d9e6ec',
    borderRadius: 12,
  },
  helper: {
    color: '#5c706c',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoChip: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f5dce8',
    flex: 1,
    minWidth: '48%',
    gap: 4,
  },
  infoLabel: {
    color: '#4b5d63',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridCell: {
    width: '14.2%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridText: {
    color: '#2b3a42',
  },
  timeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f5fbff',
  },
  noteRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
