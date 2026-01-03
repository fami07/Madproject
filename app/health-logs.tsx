import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Alert } from "react-native";

export default function HealthLogs() {
  //  dummy data 
  const [logs, setLogs] = useState([
    {
      id: "1",
      type: "Blood Pressure",
      value: "120/80 mmHg",
      date: "2024-11-01",
    },
    {
      id: "2",
      type: "Glucose (Fasting)",
      value: "95 mg/dL",
      date: "2024-11-02",
    },
    { id: "3", type: "Weight", value: "68 kg", date: "2024-11-03" },
    { id: "4", type: "Heart Rate", value: "72 bpm", date: "2024-11-04" },
    { id: "5", type: "Body Temperature", value: "98.6 °F", date: "2024-11-05" },
    {
      id: "6",
      type: "Blood Pressure",
      value: "118/76 mmHg",
      date: "2024-11-06",
    },
    {
      id: "7",
      type: "Glucose (Post-Meal)",
      value: "140 mg/dL",
      date: "2024-11-07",
    },
    { id: "8", type: "Oxygen Saturation", value: "98%", date: "2024-11-08" },
    { id: "9", type: "Weight", value: "67.8 kg", date: "2024-11-09" },
    { id: "10", type: "Sleep Duration", value: "7.5 hrs", date: "2024-11-10" },
  ]);

  // Left border color logic
  const getLogColor = (type) => {
    if (type.includes("Blood")) return "#e53935";
    if (type.includes("Glucose")) return "#fb8c00";
    if (type.includes("Weight")) return "#43a047";
    if (type.includes("Heart")) return "#1e88e5";
    if (type.includes("Sleep")) return "#6a1b9a";
    if (type.includes("Oxygen")) return "#00897b";
    return "#757575";
  };

  // : Icon selector logic
  const renderIcon = (type) => {
    if (type.includes("Heart")) {
      return <FontAwesome name="heartbeat" size={18} color="black" />;
    }
    if (type.includes("Blood")) {
      return <Feather name="activity" size={18} color="black" />;
    }
    if (type.includes("Glucose")) {
      return <Feather name="droplet" size={18} color="black" />;
    }
    if (type.includes("Weight")) {
      return <Feather name="bar-chart-2" size={18} color="black" />;
    }
    if (type.includes("Sleep")) {
      return <Feather name="moon" size={18} color="black" />;
    }
    return <Feather name="file-text" size={18} color="black" />;
  };
  const getLatestValue = (logType) => {
    const filtered = logs.filter((l) => l.type.includes(logType));
    return filtered.length ? filtered[filtered.length - 1].value : "--";
  };
  //  Delete log function
  const handleDelete = (id) => {
    Alert.alert("Delete Log", "Are you sure you want to delete this log?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
        },
      },
    ]);
  };

  //  Edit log function (placeholder)
  const handleEdit = (item) => {
    Alert.alert("Edit Log", `Edit ${item.type} (${item.value})`, [
      { text: "OK" },
    ]);

    //  Later we will navigate it like:
    // router.push(`/edit-health-log?id=${item.id}`);
  };
  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={{
          backgroundColor: "#e53935",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          marginBottom: 12,
          borderRadius: 12,
        }}
      >
        <Feather name="trash-2" size={22} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 12, marginTop: 4 }}>
          Delete
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Page Title */}
      <Text style={styles.title}>Health Logs</Text>

      {/*  Health Summary Dashboard */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Blood Pressure</Text>
          <Text style={styles.summaryValue}>{getLatestValue("Blood")}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Glucose</Text>
          <Text style={styles.summaryValue}>{getLatestValue("Glucose")}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Weight</Text>
          <Text style={styles.summaryValue}>{getLatestValue("Weight")}</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Logs</Text>
          <Text style={styles.summaryValue}>{logs.length}</Text>
        </View>
      </View>

      {/* Add Log Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-health-log")}
      >
        <Text style={styles.addButtonText}>+ Add Health Log</Text>
      </TouchableOpacity>

      {/* Logs List */}
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // 👈 ADDED
        renderItem={({ item }) => (
          <View
            style={[styles.card, { borderLeftColor: getLogColor(item.type) }]}
          >
            {/* Top row: Icon + Title + Actions */}
            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <View style={styles.iconBox}>{renderIcon(item.type)}</View>
                <Text style={styles.logType}>{item.type}</Text>
              </View>

              {/*  Edit & Delete icons */}
              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Feather name="edit-2" size={18} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Feather name="trash-2" size={18} color="#e53935" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.meta}>Value: {item.value}</Text>
            <Text style={styles.meta}>Date: {item.date}</Text>
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
  //  Summary dashboard styles
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 11,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: "#c9bdc4ff",
    padding: 9,
    borderRadius: 14,
    marginBottom: 9,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 13,
    color: "#ee0c7dff",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 2,
  },

  //  Layout helpers
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  actionRow: {
    flexDirection: "row",
    gap: 14,
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
    marginBottom: 6,
  },
  iconBox: {
    marginRight: 10,
  },
  logType: {
    fontWeight: "bold",
    fontSize: 16,
  },
  meta: {
    color: "#555",
    marginTop: 2,
  },
});
