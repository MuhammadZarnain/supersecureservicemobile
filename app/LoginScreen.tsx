import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/Super-secure-services_logo-removebg-preview.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>Super Secure Services</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/loginemail')}
      >
        <Ionicons name="mail-outline" size={20} color="#184FA0" />
        <Text style={styles.buttonText}>Log in with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/loginphone')}
      >
        <Ionicons name="call-outline" size={20} color="#184FA0" />
        <Text style={styles.buttonText}>Log in with Phone Number</Text>
      </TouchableOpacity>

      <Text style={styles.link}>
        New User?{' '}
        <Text style={styles.linkHighlight} onPress={() => router.push('/Register')}>
          Get Started
        </Text>
      </Text>

      <Text style={styles.version}>Version 1.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#184FA0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '90%',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#184FA0',
    fontWeight: '500',
  },
  link: {
    marginTop: 20,
    fontSize: 14,
    color: '#444',
  },
  linkHighlight: {
    fontWeight: 'bold',
    color: '#184FA0',
  },
  version: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#888',
  },
});
