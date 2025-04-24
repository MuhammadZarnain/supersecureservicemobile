import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';
import crimeData from './crimeData.json';
import { useRouter } from 'expo-router';
import { useUser } from '../context/UserContext';


const AREA_OPTIONS = crimeData.map(([area]) => area);

const AddressForm = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [crimeRate, setCrimeRate] = useState<number | null>(null);
  const { user } = useUser();
  const SERVER_IP = 'http://192.168.1.37:5000';
  const handleSubmit = async () => {
    const found = crimeData.find(([entryArea]) => entryArea === area);
    const rate = found ? parseFloat(found[1]) : null;
    if (rate === null || !user?.id) return;
  
    const payload = {
      title: `${area} Crime Report`,
      description: `Crime rate in ${area} is ${rate}%, Province: ${province}, City: ${city}, Postal Code: ${postalCode}`,
      userId: user.id,
    };
  
    try {
     const response = await fetch(`${SERVER_IP}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if(!response.ok) {
        throw new Error('Failed to save report');
      }
      router.push({
        pathname: '/crime-result',
        params: { area, crimeRate: rate.toString() },
      });
    } catch (err) {
      console.error('Failed to save report:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Super Secure Services</Text>

      <Text style={styles.label}>Province</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter province"
        value={province}
        onChangeText={setProvince}
      />

      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>Area</Text>
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={area}
          onValueChange={(value) => setArea(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Area" value="" />
          {AREA_OPTIONS.map((areaOption, idx) => (
            <Picker.Item label={areaOption} value={areaOption} key={idx} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Postal Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter postal code"
        value={postalCode}
        onChangeText={setPostalCode}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Modal for showing crime rate */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crime Rate Estimate</Text>
            {crimeRate !== null ? (
              <>
                <ProgressBar progress={crimeRate / 100} color="#E53935" style={styles.progressBar} />
                <Text style={styles.crimeText}>
                  The estimated crime rate in {area} is approximately {crimeRate}%.
                </Text>
              </>
            ) : (
              <Text style={styles.crimeText}>No data available for this area.</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: '#007BFF',
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F2F5F7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    backgroundColor: '#F2F5F7',
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
    width: '100%',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#0052CC',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  crimeText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#0052CC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 15,
  },
});

export default AddressForm;
