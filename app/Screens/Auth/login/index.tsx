import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
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
import { User, Lock } from 'lucide-react-native';
import {
  loginSchema,
  LoginFormData,
  validateLoginForm,
  validateLoginField,
} from '../../../utils/validation/loginValidation';
import { loginStyles } from './styles';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

interface FormErrors {
  userId?: string;
  password?: string;
}

const Login = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const styles = loginStyles(theme, colors);

  const [formData, setFormData] = useState<LoginFormData>({
    userId: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loader, setLoader] = useState(false);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    // Update form data immediately
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFieldBlur = (field: keyof LoginFormData) => {
    const value = formData[field];
    if (value) {
      const error = validateLoginField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const validateForm = (): boolean => {
    const result = validateLoginForm(formData);
    setErrors(result.errors as FormErrors);
    return result.success;
  };

  const handleLogin = async () => {
    // Validate form using Zod
    const result = validateLoginForm(formData);
    if (!result.success) {
      setErrors(result.errors as FormErrors);
      return;
    }

    try {
      setLoader(true);

      // Parse and validate with Zod schema
      const validatedData = loginSchema.parse(formData);

      // TODO: Add your login API call here
      // Example:
      // const response = await login(validatedData);
      // if (response) {
      //   // Handle success - navigate to home/dashboard
      //   navigation.navigate('DrawerNavigation');
      // }

      console.log('Login data (validated):', validatedData);

      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

      // For now, navigate to drawer
      // navigation.navigate('DrawerNavigation');
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error) {
        setErrors((prev) => ({
          ...prev,
          password: 'Invalid credentials. Please try again.',
        }));
      }
    } finally {
      setLoader(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register', { phone: '' });
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to forgot password screen
    // navigation.navigate('ForgatPassword');
    console.log('Forgot password clicked');
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
        {/* Logo - full screen reference */}
        <Image
          source={theme.dark ? IMAGES.Darklogo : IMAGES.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.cardContainer}>
          {/* Header - Welcome Back style from reference */}
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
              Welcome Back
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
              Sign in to continue
            </Text>
          </View>

            {/* Form Fields */}
            {/* User ID / Email */}
            <View>
              <CustomInput
                placeholder="you@example.com"
                value={formData.userId}
                onChangeText={(value: string) => handleInputChange('userId', value)}
                onBlur={() => handleFieldBlur('userId')}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loader}
                lefticon={
                  <User
                    size={22}
                    color={errors.userId ? COLORS.danger : colors.gray60}
                  />
                }
                inputBorder
              />
              {errors.userId && (
                <Text style={styles.errorText}>{errors.userId}</Text>
              )}
            </View>

            {/* Password */}
            <View>
              <CustomInput
                placeholder="Enter password"
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

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              activeOpacity={0.7}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={loader}
                activeOpacity={0.8}
                onPress={handleLogin}
                style={[
                  styles.loginButton,
                  loader && styles.loginButtonDisabled,
                ]}
              >
                {loader ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerLinkContainer}>
              <Text
                style={[
                  FONTS.BodyM,
                  styles.registerText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
                <Text
                  style={[
                    FONTS.BodyM,
                    FONTS.fontSemiBold,
                    styles.registerLink,
                    {
                      color: COLORS.danger,
                    },
                  ]}
                >
                  Register Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
