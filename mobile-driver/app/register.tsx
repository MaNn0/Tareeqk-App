import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "driver", // Default role for driver app
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "driver",
      });

      //   console.log("Registration success:", response.data);
      router.push("/login");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Registration</Text>

      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
        placeholder="Full name"
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        placeholder="Password"
        secureTextEntry
      />

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registering..." : "Register"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.registerLink}>Login</Text>{" "}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#ffa401",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ffda96ff",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
  },
  registerLink: {
    color: "#ffa401",
    fontWeight: "600",
  },
});
