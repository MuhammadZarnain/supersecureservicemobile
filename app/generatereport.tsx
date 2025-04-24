import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const SecureServicesScreen: React.FC = () => {
    const router = useRouter();
  const handleGenerateReport = () => {
    router.push("/chatbot")
  };

  return (
    <View style={styles.container}>
      {/* Shield Logo */}
      <Image resizeMode="contain" source={require('../assets/images/Super-secure-services_logo-removebg-preview.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.titleText}>Super Secure Services</Text>

      {/* Circular Generate Report Button */}
      <TouchableOpacity style={styles.circleButton} onPress={handleGenerateReport}>
        <Text style={styles.buttonText}>Generate Report</Text>
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push('/report-list')}>
          <FontAwesome name="file-text" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="user" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecureServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },
  circleButton: {
    backgroundColor: "#184FA0",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
  },
  navButton: {
    padding: 10,
  },
});
