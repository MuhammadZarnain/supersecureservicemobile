import * as React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Super Secure Services</Text>
      <Text style={styles.heading}>Settings</Text>
      
      <Text style={styles.sectionTitle}>Account Settings</Text>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.itemText}>Edit profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.itemText}>Change password</Text>
      </TouchableOpacity>
      
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Push notifications</Text>
        <Switch value={pushNotifications} onValueChange={setPushNotifications} thumbColor="#fff" trackColor={{ true: '#184FA0', false: '#A8A8A8' }} />
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Dark mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} thumbColor="#fff" trackColor={{ true: '#184FA0', false: '#A8A8A8' }} />
      </View>
      
      <Text style={styles.sectionTitle}>More</Text>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.itemText}>About us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.itemText}>Privacy policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.itemText}>Terms and conditions</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '500', marginBottom: 10 },
  heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '500', color: '#A8A8A8', marginTop: 20, marginBottom: 10 },
  item: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  itemText: { fontSize: 16, color: '#000' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
});
