export interface InputFieldProps {
    label: string;
    placeholder?: string;
    type?: string;
    showIcon?: boolean;
    iconSource?: string;
    value: string;
    onChange: (value: string) => void;
    testID?: string;
    error?: string;
  }
  
  export interface FormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface ValidationErrors {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }