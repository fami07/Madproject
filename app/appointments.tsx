import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function Appointments() {
  // 👇 Dummy appointment data (frontend only)
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      doctor: "Dr. A. Rahman",
      specialty: "Cardiologist",
      date: "2024-12-02",
      time: "10:30 AM",
      status: "Upcoming",
    },
    {
      id: "2",
      doctor: "Dr. S. Khan",
      specialty: "Diabetologist",
      date: "2024-12-05",
      time: "02:00 PM",
      status: "Upcoming",
    },
    {
      id: "3",
      doctor: "Dr. M. Islam",
      specialty: "General Physician",
      date: "2024-11-20",
      time: "09:00 AM",
      status: "Completed",
    },
    {
      id: "4",
      doctor: "Dr. T. Ahmed",
      specialty: "Dermatologist",
      date: "2024-11-15",
      time: "11:15 AM",
      status: "Completed",
    },
    {
      id: "5",
      doctor: "Dr. N. Chowdhury",
      specialty: "Orthopedic",
      date: "2024-12-10",
      time: "04:45 PM",
      status: "Upcoming",
    },
  ]);

  // 👇 Color based on appointment status
  const getStatusColor = (status: string) => {
    if (status === "Upcoming") return "#1e88e5";
    if (status === "Completed") return "#43a047";
    return "#757575";
  };

  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>Appointments</Text>

      {/* Add Appointment Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-appointment")}
      >
        <Text style={styles.addButtonText}>+ Book Appointment</Text>
      </TouchableOpacity>

      {/* Appointment List */}
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { borderLeftColor: getStatusColor(item.status) },
            ]}
          >
            {/* Doctor row */}
            <View style={styles.row}>
              <Feather name="user" size={18} color="#000" />
              <Text style={styles.doctorName}>{item.doctor}</Text>
            </View>

            <Text style={styles.meta}>{item.specialty}</Text>

            {/* Date & Time */}
            <View style={styles.row}>
              <Feather name="calendar" size={16} color="#555" />
              <Text style={styles.meta}>
                {item.date} • {item.time}
              </Text>
            </View>

            {/* Status */}
            <View style={styles.statusRow}>
              <Feather name="clock" size={14} color={getStatusColor(item.status)} />
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(item.status) },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3e5edff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#f06292",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  meta: {
    color: "#555",
    marginLeft: 22,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 13,
  },
});
