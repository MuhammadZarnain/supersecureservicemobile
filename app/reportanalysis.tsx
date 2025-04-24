import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function ReportAnalysisScreen() {
  const router = useRouter();
  const secureRate = 0.67; // Example secure rate (67%)

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButtonContainer}>
        <Text style={styles.backButton}>← Back</Text>
      </TouchableOpacity>

      {/* Titles */}
      <Text style={styles.title}>Super Secure Services</Text>
      <Text style={styles.subtitle}>Report Analysis</Text>

      {/* Progress Circle */}
      <View style={styles.progressContainer}>
        <ProgressCircle
          style={styles.progressCircle}
          progress={secureRate}
          progressColor={'#184FA0'}
          backgroundColor={'#E0E0E0'}
          strokeWidth={10}
          startAngle={-Math.PI / 2}
          endAngle={Math.PI / 2}
        />
        <Text style={styles.percentage}>{Math.round(secureRate * 100)}%</Text>
      </View>

      {/* Secure Rate Progress Bar */}
      <Text style={styles.sectionTitle}>Secure Rate</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${secureRate * 100}%` }]} />
      </View>

      {/* Security Text */}
      <Text style={styles.secureText}>This area is {Math.round(secureRate * 100)}% secure.</Text>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="home" size={24} color="#184FA0" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="file-text" size={24} color="#184FA0" />
          <Text style={styles.navText}>Reports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="cog" size={24} color="#184FA0" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="user" size={24} color="#184FA0" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButtonContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButton: {
    color: '#184FA0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },

  /* Center Progress Circle More Prominently */
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    height: 150,
    width: 150,
  },
  percentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#184FA0',
    marginTop: -30, // Adjust positioning over the circle
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },

  /* Adjust Secure Rate Progress Bar Styling */
  progressBarContainer: {
    width: '80%',
    height: 12,              // Increased height
    backgroundColor: '#A8A8A8',
    borderRadius: 6,         // More rounded corners
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#184FA0',
    borderRadius: 6,         // Matches container rounding
  },

  secureText: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#184FA0',
    marginTop: 2,
  },
});
