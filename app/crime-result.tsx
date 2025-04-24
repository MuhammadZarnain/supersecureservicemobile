import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ProgressBar } from 'react-native-paper';

const CrimeResultScreen = () => {
  const router = useRouter();
  const { area, crimeRate } = useLocalSearchParams();
  const crime = parseFloat(crimeRate as string);
  const secure = 100 - crime;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Super Secure Services</Text>
      <Text style={styles.subHeading}>Report Analysis</Text>

      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={secure}
        tintColor="#1A53C1"
        backgroundColor="#E6ECF3"
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
      >
        {() => <Text style={styles.percentage}>{secure}%</Text>}
      </AnimatedCircularProgress>

      <Text style={styles.secureRateLabel}>Secure Rate</Text>

      <ProgressBar
        progress={secure / 100}
        color="#1A53C1"
        style={styles.progressBar}
      />

      <Text style={styles.resultText}>This Area is {secure.toFixed(1)}% secure</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 30,
  },
  percentage: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A53C1',
  },
  secureRateLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 10,
  },
  progressBar: {
    width: Dimensions.get('window').width * 0.7,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#DDE5ED',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backText: {
    fontSize: 16,
    color: '#0052CC',
  },
});

export default CrimeResultScreen;
