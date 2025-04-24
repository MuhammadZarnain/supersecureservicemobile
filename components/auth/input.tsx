import * as React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { InputFieldProps } from './types';

export const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type,
  showIcon,
  iconSource,
  value,
  onChange,
  testID,
  error
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel} accessibilityRole="text">{label}</Text>
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError
      ]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#697077"
          secureTextEntry={type === 'password' && !isPasswordVisible}
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={label}
          testID={testID}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          keyboardType={type === 'email' ? 'email-address' : type === 'phone' ? 'phone-pad' : 'default'}
          importantForAccessibility="yes"
          accessible={true}
        />
        {showIcon && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityHint="Toggle password visibility"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              resizeMode="contain"
              source={{ uri: iconSource }}
              style={styles.inputIcon}
              accessibilityRole="image"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    marginTop: 16,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  inputLabel: {
    color: '#21272A',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#C1C7CD',
    backgroundColor: '#F2F4F8',
    display: 'flex',
    minHeight: 48,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    flexDirection: 'row',
  },
  inputWrapperFocused: {
    borderColor: '#0F62FE',
    backgroundColor: '#FFFFFF',
  },
  inputWrapperError: {
    borderColor: '#DA1E28',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#21272A',
    padding: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  errorText: {
    color: '#DA1E28',
    fontSize: 12,
    marginTop: 4,
  },
});