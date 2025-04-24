import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView, ScrollView, TextInput } from "react-native";
import { InputField } from "../components/auth/input";
import { useRouter } from "expo-router";
import { useUser } from "../context/UserContext";

export const AuthScreen: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [userPhone, setUserPhone] = useState(""); // Save phone from login API for OTP
  const SERVER_IP = "http://192.168.1.37:5000";
  const router = useRouter();
  const { setUser } = useUser();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function sendCode(phoneNumber: string) {
    try {
      const response = await fetch(SERVER_IP + "/api/send-code", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });
      if (response.ok) {
        Alert.alert("Success", "Verification code sent successfully");
        setCodeSent(true);
      } else {
        Alert.alert("Error", "Could not send verification code");
      }
    } catch (error) {
      Alert.alert("Error", "Network error while sending code");
    }
  }

  async function loginUser() {
    try {
      const response = await fetch(`${SERVER_IP}/api/user`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ Email: formData.email, Password: formData.password }),
      });

      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Login Failed", data.error || "User not found");
        return null;
      }
      return data.user;
    } catch (error: any) {
      Alert.alert("Error", error.message || "Login request failed");
      return null;
    }
  }

  async function verifyCode() {
    try {
      const response = await fetch(SERVER_IP + "/api/verify-code", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: userPhone, code }),
      });

      if (response.ok) {
        Alert.alert("Success", "Number verified successfully", [
          { text: "OK", onPress: () => router.push("/generatereport") },
        ]);
      } else {
        Alert.alert("Error", "Verification failed");
      }
    } catch (error) {
      Alert.alert("Error", "Network error while verifying code");
    }
  }

  const handleLogin = async () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    const user = await loginUser();
    if (user?.Phone) {
      setUser(user);
      setUserPhone(user.Phone); // Save for OTP use
      Alert.alert("Success", "Number verified successfully", [
        { text: "OK", onPress: () => router.push("/generatereport") },
      ]);
     /*  await sendCode(user.Phone); */
    } else {
      Alert.alert("Error", "Phone number not found for OTP");
    }
    setIsSubmitting(false);
  };

  return !codeSent ? (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image resizeMode="contain" source={require('../assets/images/Super-secure-services_logo-removebg-preview.png')} style={styles.logo} />
          <Text style={styles.title}>Super Secure Services</Text>

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
          />

          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            error={errors.password}
          />

          <Text style={styles.title}>New User? Get Started</Text>
          <TouchableOpacity style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} onPress={handleLogin} disabled={isSubmitting}>
            <Text style={styles.submitButtonText}>{isSubmitting ? "Logging in..." : "Log In"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.otpContainer}>
      <Image resizeMode="contain" source={require('../assets/images/Super-secure-services_logo-removebg-preview.png')} style={styles.logo} />
      <Text style={styles.otpTitle}>OTP Verification</Text>
      <TextInput
        style={styles.otpInput}
        placeholder="Enter OTP code"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={code}
        onChangeText={(text) => setCode(text)}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={verifyCode}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  scrollViewContent: { flexGrow: 1 },
  container: { flex: 1, maxWidth: 480, width: "100%", paddingHorizontal: 40, paddingTop: 37, alignItems: "stretch", backgroundColor: "#FFFFFF" },
  logo: { alignSelf: "center", width: 215, aspectRatio: 1.26 },
  title: { fontSize: 24, fontWeight: "500", alignSelf: "center", marginTop: 28, marginBottom: 20 },
  submitButton: { justifyContent: "center", alignItems: "center", borderRadius: 40, borderWidth: 2, borderColor: "#0F62FE", backgroundColor: "#184FA0", marginTop: 30, minHeight: 48 },
  submitButtonDisabled: { opacity: 0.7, backgroundColor: "#A8A8A8", borderColor: "#A8A8A8" },
  submitButtonText: { fontSize: 16, color: "#FFFFFF", fontWeight: "500", textAlign: "center" },
  otpContainer: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', padding: 30 },
  otpTitle: { fontSize: 24, fontWeight: '600', color: '#184FA0', marginBottom: 20 },
  otpInput: { width: '100%', height: 50, borderColor: '#184FA0', borderWidth: 2, borderRadius: 10, paddingHorizontal: 16, fontSize: 16, color: '#000', marginBottom: 25 },
  verifyButton: { width: '100%', height: 50, backgroundColor: '#184FA0', borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  verifyButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});
