import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { COLORS, FONTS } from '../../../constants/theme';
import CustomInput from '../../../components/Input/CustomInput';
import { User, Mail, Lock, Phone } from 'lucide-react-native';
import { userRegisterSchema, type UserRegisterFormData, validateUserRegisterForm, validateUserRegisterField } from '../../../utils/validation/userRegisterValidation';
import { userRegisterStyles } from './styles';
import { userRegister } from '../../../services/auth';
import { ApiError } from '../../../services/api';

type UserRegisterScreenProps = StackScreenProps<RootStackParamList, 'UserRegister'>;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const UserRegister = ({ navigation }: UserRegisterScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const styles = userRegisterStyles(theme, colors);

  const [formData, setFormData] = useState<UserRegisterFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);

  const handleInputChange = useCallback((field: keyof UserRegisterFormData, value: string) => {
    let formattedValue = value;

    if (field === 'name') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    } else if (field === 'email') {
      formattedValue = value.slice(0, 100);
    } else if (field === 'phone') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    } else if (field === 'password') {
      formattedValue = value.slice(0, 24);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    setErrors((prev) =>
      prev[field] ? { ...prev, [field]: undefined } : prev
    );
  }, []);

  const handleFieldBlur = (field: keyof UserRegisterFormData) => {
    const value = formData[field];
    if (value) {
      const error = validateUserRegisterField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleRegister = async () => {
    const result = validateUserRegisterForm(formData);
    if (!result.success) {
      setErrors(result.errors as FormErrors);
      return;
    }

    try {
      setLoader(true);

      const validatedData = userRegisterSchema.parse(formData);

      const apiData = {
        name: validatedData.name.trim(),
        phone: validatedData.phone.trim(),
        email: validatedData.email.toLowerCase().trim(),
        password: validatedData.password,
      };

      const response = await userRegister(apiData);

      if (response.success && response.data) {
        const { user, token } = response.data;
        console.log('User registration successful:', user);
        
        navigation.navigate('Login');
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      const errorStatus = error?.status;
      
      if (error) {
        if (typeof error === 'string') {
          errorMessage = error;
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (error?.data) {
          if (typeof error.data === 'string') {
            errorMessage = error.data;
          } else if (error.data?.message) {
            errorMessage = error.data.message;
          } else if (error.data?.error) {
            errorMessage = error.data.error;
          }
        }
      }
      
      if (errorStatus === 400 || errorStatus === 422) {
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
      } else if (errorStatus === 409) {
        setErrors((prev) => ({
          ...prev,
          email: 'Email or phone number already exists',
        }));
      } else if (errorStatus === 500) {
        setErrors((prev) => ({
          ...prev,
          email: 'Server error. Please try again later.',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: errorMessage.length > 100 ? 'Registration failed. Please try again.' : errorMessage,
        }));
      }
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.cardContainer}>
            <View style={styles.headerContainer}>
              <Text
                style={[
                  FONTS.h2,
                  FONTS.fontBold,
                  styles.title,
                  { color: colors.title },
                ]}
              >
                Create Account
              </Text>
              <Text
                style={[
                  FONTS.BodyM,
                  styles.subtitle,
                  { color: colors.textLight },
                ]}
              >
                Register to buy properties
              </Text>
            </View>

            {/* Name */}
            <View>
              <CustomInput
                placeholder="Full Name"
                value={formData.name}
                onChangeText={(value: string) => handleInputChange('name', value)}
                onBlur={() => handleFieldBlur('name')}
                editable={!loader}
                lefticon={
                  <User
                    size={22}
                    color={errors.name ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email */}
            <View>
              <CustomInput
                placeholder="Email Address"
                value={formData.email}
                onChangeText={(value: string) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={() => handleFieldBlur('email')}
                editable={!loader}
                lefticon={
                  <Mail
                    size={22}
                    color={errors.email ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Phone */}
            <View>
              <CustomInput
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={(value: string) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                onBlur={() => handleFieldBlur('phone')}
                editable={!loader}
                maxLength={10}
                lefticon={
                  <Phone
                    size={22}
                    color={errors.phone ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            {/* Password */}
            <View>
              <CustomInput
                placeholder="Password"
                value={formData.password}
                onChangeText={(value: string) => handleInputChange('password', value)}
                onBlur={() => handleFieldBlur('password')}
                editable={!loader}
                type="password"
                lefticon={
                  <Lock
                    size={22}
                    color={errors.password ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Register Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={loader}
                activeOpacity={0.8}
                onPress={handleRegister}
                style={[
                  styles.registerButton,
                  loader && styles.registerButtonDisabled,
                ]}
              >
                {loader ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.registerButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text
                style={[
                  FONTS.BodyM,
                  styles.loginText,
                  { color: colors.text },
                ]}
              >
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                <Text
                  style={[
                    FONTS.BodyM,
                    FONTS.fontSemiBold,
                    styles.loginLink,
                    { color: COLORS.primary },
                  ]}
                >
                  Login Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserRegister;
