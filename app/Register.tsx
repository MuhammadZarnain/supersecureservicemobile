import * as React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { InputField } from '../components/auth/input';
import { FormData, ValidationErrors } from '../components/auth/types';
import { VALIDATION_MESSAGES, REGEX } from '../components/auth/constants';
import { useRouter } from "expo-router";

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Validate the form fields.
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
  
    if (!formData.fullName.trim()) {
      newErrors.fullName = VALIDATION_MESSAGES.REQUIRED;
    }
  
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = VALIDATION_MESSAGES.REQUIRED;
    } else if (!formData.phoneNumber.startsWith('+92')) {
      newErrors.phoneNumber = 'Phone number must start with +92';
    } else if (!/^\+92\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format (e.g. +923001234567)';
    }
  
    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.REQUIRED;
    } else if (!REGEX.EMAIL.test(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
    }
  
    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.REQUIRED;
    } else if (formData.password.length < 8) {
      newErrors.password = VALIDATION_MESSAGES.PASSWORD_LENGTH;
    }
  
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.REQUIRED;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = VALIDATION_MESSAGES.PASSWORD_MISMATCH;
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    const isValid = validateForm();
  
    if (isValid) {
      try {
        const response = await fetch('http://192.168.1.24:5000/api/newusers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Name: formData.fullName,
            Email: formData.email,
            Phone: formData.phoneNumber,
            Password: formData.password,
          }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          Alert.alert('Error', data.error || 'An error occurred during sign up');
        } else {
          Alert.alert('Success', 'Signup successful!', [
            {
              text: 'OK',
              onPress: () => router.push("/generatereport"),
            },
          ]);
        }
      } catch (error: any) {
        Alert.alert('Error', error.message || 'An unexpected error occurred');
      }
    } else {
      const errorMessages = Object.values(errors).filter(Boolean).join('\n');
      Alert.alert('Validation Error', errorMessages || 'Please fix the errors in the form');
    }
  
    setIsSubmitting(false);
  };
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoidingView}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/Super-secure-services_logo-removebg-preview.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Super Secure Services</Text>

          <InputField
            label="Full Name"
            value={formData.fullName}
            onChange={(value) => setFormData({ ...formData, fullName: value })}
            error={errors.fullName}
          />
          <InputField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(value) => setFormData({ ...formData, phoneNumber: value })}
            error={errors.phoneNumber}
          />
          <InputField
            label="Email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
          />
          <InputField
            label="Password"
            value={formData.password}
            onChange={(value) => setFormData({ ...formData, password: value })}
            error={errors.password}
            type="password"
          />
          <InputField
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
            error={errors.confirmPassword}
            type="password"
          />

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            disabled={isSubmitting}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>{isSubmitting ? 'Submitting...' : 'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  keyboardAvoidingView: { flex: 1 },
  scrollViewContent: { flexGrow: 1 },
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#FFFFFF' },
  logo: { width: 200, height: 100, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  submitButton: { backgroundColor: '#184FA0', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
