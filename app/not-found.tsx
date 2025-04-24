import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ReportAnalysis() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Report Analysis' }} />
      <ThemedText>Report Analysis Page</ThemedText>
      <Link href="/">Go Back Home</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
