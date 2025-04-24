import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { InputField } from '../components/auth/input';
import { FontAwesome } from '@expo/vector-icons';

export const LocationForm: React.FC = () => {
  const [formData, setFormData] = React.useState({
    province: '',
    city: '',
    area: '',
    postalCode: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.title}>Super Secure Services</Text>
          
          <InputField label="Province" placeholder="Enter Province" value={formData.province} onChange={(value) => setFormData({ ...formData, province: value })} />
          <InputField label="City" placeholder="Enter City" value={formData.city} onChange={(value) => setFormData({ ...formData, city: value })} />
          <InputField label="Area" placeholder="Enter Area" value={formData.area} onChange={(value) => setFormData({ ...formData, area: value })} />
          <InputField label="Postal Code" placeholder="Enter Postal Code" value={formData.postalCode} onChange={(value) => setFormData({ ...formData, postalCode: value })} />
          
          <TouchableOpacity style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]} disabled={isSubmitting}>
            <Text style={styles.submitButtonText}>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="file-text" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="cog" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="user" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LocationForm;

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  scrollViewContent: { flexGrow: 1 },
  container: { flex: 1, maxWidth: 480, width: '100%', paddingHorizontal: 40, paddingTop: 37, alignItems: 'stretch', backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, fontWeight: '500', alignSelf: 'center', marginTop: 28, marginBottom: 20 },
  submitButton: { justifyContent: 'center', alignItems: 'center', borderRadius: 40, borderWidth: 2, borderColor: '#0F62FE', backgroundColor: '#184FA0', marginTop: 20, minHeight: 48 },
  submitButtonDisabled: { opacity: 0.7, backgroundColor: '#A8A8A8' },
  submitButtonText: { fontSize: 16, color: '#FFFFFF', fontWeight: '500' },
  
  /* Bottom Navigation Bar Styles */
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
