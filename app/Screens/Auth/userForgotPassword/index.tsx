import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { COLORS, FONTS } from '../../../constants/theme';
import { IMAGES } from '../../../constants/Images';
import CustomInput from '../../../components/Input/CustomInput';
import { Mail, Phone } from 'lucide-react-native';
import { userForgotPasswordStyles } from './styles';
import { userForgotPassword } from '../../../services/auth';
import { ApiError } from '../../../services/api';

type UserForgotPasswordScreenProps = StackScreenProps<RootStackParamList, 'UserForgotPassword'>;

interface FormErrors {
  identifier?: string;
}

const UserForgotPassword = ({ navigation }: UserForgotPasswordScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const styles = userForgotPasswordStyles(theme, colors);

  const [identifier, setIdentifier] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState<string | null>(null);

  const handleInputChange = useCallback((value: string) => {
    // Allow phone number (digits) or email
    const formattedValue = value;
    setIdentifier(formattedValue);
    
    if (errors.identifier) {
      setErrors((prev) => ({ ...prev, identifier: undefined }));
    }
  }, [errors]);

  const validateForm = (): boolean => {
    if (!identifier.trim()) {
      setErrors({ identifier: 'Phone number or email is required' });
      return false;
    }
    
    // Basic validation - check if it's a phone (10 digits) or email
    const isPhone = /^[0-9]{10}$/.test(identifier.trim());
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim());
    
    if (!isPhone && !isEmail) {
      setErrors({ identifier: 'Please enter a valid phone number or email' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoader(true);
      setErrors({});

      const response = await userForgotPassword({
        identifier: identifier.trim(),
      });

      if (response.success && response.data) {
        // Success - OTP sent
        setSuccess(true);
        setOtp(response.data.otp || null);
        console.log('OTP sent successfully');
        
        // Navigate to OTP verification screen (you can create this later)
        // navigation.navigate('UserOtpVerify', { identifier: identifier.trim(), otp: response.data.otp });
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      
      let errorMessage = 'Failed to send OTP. Please try again.';
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
      
      if (errorStatus === 404) {
        setErrors({ identifier: 'User not found with this phone/email' });
      } else if (errorStatus === 400 || errorStatus === 422) {
        setErrors({ identifier: errorMessage });
      } else {
        setErrors({ identifier: errorMessage });
      }
    } finally {
      setLoader(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text
              style={[
                FONTS.h2,
                FONTS.fontBold,
                styles.title,
                { color: colors.title },
              ]}
            >
              Forgot Password?
            </Text>
            <Text
              style={[
                FONTS.BodyM,
                styles.subtitle,
                { color: colors.textLight },
              ]}
            >
              {success
                ? 'OTP has been sent to your mobile and email'
                : 'Enter your phone number or email to receive OTP'}
            </Text>
          </View>

          <View style={styles.cardContainer}>
            {!success ? (
              <>
                {/* Identifier Input */}
                <View>
                  <CustomInput
                    placeholder="Phone number or Email"
                    value={identifier}
                    onChangeText={handleInputChange}
                    keyboardType="default"
                    autoCapitalize="none"
                    editable={!loader}
                    lefticon={
                      /^[0-9]/.test(identifier) ? (
                        <Phone
                          size={22}
                          color={errors.identifier ? COLORS.danger : colors.gray60}
                        />
                      ) : (
                        <Mail
                          size={22}
                          color={errors.identifier ? COLORS.danger : colors.gray60}
                        />
                      )
                    }
                    inputBorder
                  />
                  {errors.identifier && (
                    <Text style={styles.errorText}>{errors.identifier}</Text>
                  )}
                </View>

                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    disabled={loader}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                    style={[
                      styles.submitButton,
                      loader && styles.submitButtonDisabled,
                    ]}
                  >
                    {loader ? (
                      <ActivityIndicator size="small" color={COLORS.white} />
                    ) : (
                      <Text style={styles.submitButtonText}>Send OTP</Text>
                    )}
                  </TouchableOpacity>
                </View>

                {/* OTP Display (for testing - remove in production) */}
                {otp && (
                  <View style={styles.otpContainer}>
                    <Text style={styles.otpLabel}>OTP (for testing):</Text>
                    <Text style={styles.otpValue}>{otp}</Text>
                  </View>
                )}
              </>
            ) : (
              <>
                {/* Success Message */}
                <View style={styles.successContainer}>
                  <Text
                    style={[
                      FONTS.BodyM,
                      styles.successText,
                      { color: COLORS.success },
                    ]}
                  >
                    OTP sent successfully! Check your mobile and email.
                  </Text>
                  {otp && (
                    <View style={styles.otpContainer}>
                      <Text style={styles.otpLabel}>OTP (for testing):</Text>
                      <Text style={styles.otpValue}>{otp}</Text>
                    </View>
                  )}
                </View>

                {/* Back to Login Button */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleBackToLogin}
                    style={styles.backButton}
                  >
                    <Text style={styles.backButtonText}>Back to Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Back to Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text
                style={[
                  FONTS.BodyM,
                  { color: colors.text },
                ]}
              >
                Remember your password?{' '}
              </Text>
              <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7}>
                <Text
                  style={[
                    FONTS.BodyM,
                    FONTS.fontSemiBold,
                    { color: COLORS.primary },
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserForgotPassword;
