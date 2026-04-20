import React, { useState, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, TextInput, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import ApaniBrandLogo from '../../../components/Brand/ApaniBrandLogo';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { COLORS, FONTS } from '../../../constants/theme';
import CustomInput from '../../../components/Input/CustomInput';
import { User, Mail, Lock, Phone } from 'lucide-react-native';
import { registerSchema, type RegisterFormData, validateRegisterForm, validateRegisterField } from '../../../utils/validation/registerValidation';
import { registerStyles } from './styles';
import { merchantRegister } from '../../../services/auth';
import { saveAuth } from '../../../utils/authStorage';
import { setUser } from '../../../redux/reducer/user';
import { flashError } from '../../../utils/flash';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  referral_code?: string;
}

const Register = ({ navigation, route }: RegisterScreenProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { colors }: { colors: any } = theme;
  const styles = registerStyles(theme, colors);
  const emailRef = useRef<TextInput>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phone: route.params?.phone || '',
    password: '',
    confirmPassword: '',
    referral_code: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);

  const handleInputChange = useCallback((field: keyof RegisterFormData, value: string) => {
    // Apply field-specific formatting (no validation here - only on blur)
    let formattedValue = value;

    if (field === 'name') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    } else if (field === 'email') {
      formattedValue = value.slice(0, 100);
    } else if (field === 'phone') {
      formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    } else if (field === 'password' || field === 'confirmPassword') {
      formattedValue = value.slice(0, 24);
    } else if (field === 'referral_code') {
      formattedValue = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    // Clear error only via setErrors with functional update to avoid extra render
    setErrors((prev) =>
      prev[field] ? { ...prev, [field]: undefined } : prev
    );
  }, []);

  const handleFieldBlur = (field: keyof RegisterFormData) => {
    const value = formData[field];
    if (value || field === 'confirmPassword') {
      const error = validateRegisterField(field, value || '', formData);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const handleEmailBlur = async () => {
    handleFieldBlur('email');

    if (formData.email && !errors.email) {
      // TODO: Add email duplicate check API call here
      // Example:
      // try {
      //   const res = await emailDuplicateCheck({ email: formData.email.toLowerCase() });
      //   if (res?.data === false) {
      //     setErrors((prev) => ({
      //       ...prev,
      //       email: 'Email already exists',
      //     }));
      //     setTimeout(() => {
      //       emailRef.current?.focus();
      //     }, 100);
      //   } else {
      //     setErrors((prev) => ({
      //       ...prev,
      //       email: undefined,
      //     }));
      //   }
      // } catch (error) {
      //   console.error('Email check error:', error);
      // }
    }
  };

  const validateForm = (): boolean => {
    const result = validateRegisterForm(formData);
    setErrors(result.errors as FormErrors);
    return result.success;
  };

  const handleRegister = async () => {
    // Validate form using Zod
    const result = validateRegisterForm(formData);
    if (!result.success) {
      setErrors(result.errors as FormErrors);
      return;
    }

    try {
      setLoader(true);

      // Parse and validate with Zod schema
      const validatedData = registerSchema.parse(formData);

      // Prepare API request data for merchant register (matches POST /merchant/register)
      const apiData = {
        name: validatedData.name.trim(),
        phone: validatedData.phone.trim(),
        email: validatedData.email.toLowerCase().trim(),
        company_name: '', // optional for backend; add field to form if required
        password: validatedData.password,
        confirm_password: validatedData.confirmPassword,
        ...(validatedData.referral_code && { referral_code: validatedData.referral_code }),
      };

      // Call merchant registration API
      const response = await merchantRegister(apiData);

      if (response.success && response.data) {
        const { merchant, token } = response.data;
        await saveAuth(merchant as unknown as Record<string, unknown>, token);
        dispatch(setUser({ merchant, token } as any));
        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerNavigation' }],
        });
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error: any) {
      console.error('Registration error:', error);

      if (error.status === 400 || error.status === 422) {
        const errorMessage =
          error.message || 'Invalid data. Please check your inputs.';
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
        flashError({ title: 'Registration failed', body: errorMessage });
      } else if (error.status === 409) {
        const errorMessage = 'Email or phone number already exists';
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
        flashError({ title: 'Registration failed', body: errorMessage });
      } else {
        const errorMessage =
          error.message || 'Registration failed. Please try again.';
        setErrors((prev) => ({
          ...prev,
          email: errorMessage,
        }));
        flashError({ title: 'Registration failed', body: errorMessage });
      }
    } finally {
      setLoader(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      referral_code: '',
    });
    setErrors({});
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View
        style={[
          styles.brandHeader,
          { paddingTop: Math.max(insets.top, 12) },
        ]}
      >
        <ApaniBrandLogo variant="header" />
      </View>
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
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
            {/* Header */}
            <View style={styles.headerContainer}>
              <Text
                style={[
                  FONTS.h2,
                  FONTS.fontBold,
                  styles.title,
                  {
                    color: colors.title,
                  },
                ]}
              >
                Create Account
              </Text>
              <Text
                style={[
                  FONTS.BodyM,
                  styles.subtitle,
                  {
                    color: colors.textLight,
                  },
                ]}
              >
                Fill in your details to get started
              </Text>
            </View>

            {/* Form Fields */}
            {/* Full Name */}
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
                authChrome
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Email Address */}
            <View>
              <CustomInput
                placeholder="Email Address"
                value={formData.email}
                onChangeText={(value: string) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={handleEmailBlur}
                editable={!loader}
                lefticon={
                  <Mail
                    size={22}
                    color={errors.email ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
                authChrome
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Phone Number */}
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
                authChrome
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
                authChrome
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password */}
            <View>
              <CustomInput
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(value: string) =>
                  handleInputChange('confirmPassword', value)
                }
                onBlur={() => handleFieldBlur('confirmPassword')}
                editable={!loader}
                type="password"
                lefticon={
                  <Lock
                    size={22}
                    color={errors.confirmPassword ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
                authChrome
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Referral Code (optional) */}
            <View>
              <CustomInput
                placeholder="Referral Code (optional)"
                value={formData.referral_code}
                onChangeText={(value: string) =>
                  handleInputChange('referral_code', value)
                }
                onBlur={() => handleFieldBlur('referral_code')}
                editable={!loader}
                maxLength={10}
                lefticon={
                  <User
                    size={22}
                    color={
                      errors.referral_code ? COLORS.danger : colors.gray60
                    }
                  />
                }
                inputBorder
                authChrome
              />
              {errors.referral_code && (
                <Text style={styles.errorText}>{errors.referral_code}</Text>
              )}
            </View>

            {/* Create Account Button */}
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
                  {
                    color: colors.text,
                  },
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
                    {
                      color: COLORS.brandAccent,
                    },
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
      </SafeAreaView>
    </View>
  );
};

export default Register;
