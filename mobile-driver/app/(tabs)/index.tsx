import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
// import favicon from "../../assets/images/favicon.png";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={'https://s3.us-west-2.amazonaws.com/royoorders2.0-assets/prods/LTzBW4fQ9xXK2iG1SjWatbp9TWoTtzQNhZzAQkN2.png'}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push("/login")}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    marginBottom: 0,
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 150,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#ffa401",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ffa401",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#ffa401",
  },
});
