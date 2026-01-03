import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function AddHealthLog() {
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Health Log</Text>

      <TextInput
        placeholder="Log Type (BP, Glucose)"
        style={styles.input}
        value={type}
        onChangeText={setType}
      />

      <TextInput
        placeholder="Value"
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />

      <TextInput
        placeholder="Notes"
        style={styles.note}
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Save Log</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
  note: {
    borderWidth: 1,
    borderColor: "#b99da4ff",
    padding: 90,
    borderRadius: 6,
    marginBottom: 35,
  },
  
  button: {
    backgroundColor: '#f06292',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
