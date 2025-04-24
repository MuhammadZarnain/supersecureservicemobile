import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/LoginScreen");
    }, 3000); // 3 seconds splash

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Super-secure-services_logo-removebg-preview.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Super Secure Services</Text>
      <Text style={styles.versionText}>Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
  },
  image: { width: 200, height: 100, resizeMode: 'contain' },
  text: { fontSize: 24, fontWeight: '500', marginTop: 20 },
  versionText: { marginTop: 60, fontSize: 16 },
});
