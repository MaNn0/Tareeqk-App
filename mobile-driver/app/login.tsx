import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email.trim(),
        password: password,
      });

      const token = response.data.access_token;
      console.log(response.data);

      if (token) {
        await AsyncStorage.setItem("userToken", token);
        console.log("Token stored successfully:", token);
        router.push("/(tabs)/requests");
      } else {
        Alert.alert("Error", "No token received from server");
      }
    } catch (e) {
      console.error("Login error:", e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Driver Login</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoComplete="password"
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
            loading && styles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>
        <Pressable onPress={handleRegister}>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#ffa401",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonPressed: {
    backgroundColor: "#be7e06ff",
  },
  buttonDisabled: {
    backgroundColor: "#ffdea0ff",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  registerText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  registerLink: {
    color: "#ffa401",
    fontWeight: "600",
  },
});
