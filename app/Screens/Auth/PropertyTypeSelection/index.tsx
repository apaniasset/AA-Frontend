import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigations/RootStackParamList';
import { COLORS, FONTS } from '../../../constants/theme';
import { Home, Building2 } from 'lucide-react-native';

type PropertyTypeSelectionProps = StackScreenProps<RootStackParamList, 'PropertyTypeSelection'>;

const PropertyTypeSelection = ({ navigation }: PropertyTypeSelectionProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const handleBuyProperty = () => {
    navigation.navigate('UserRegister');
  };

  const handlePostProperty = () => {
    navigation.navigate('MerchantRegister');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text
            style={[
              FONTS.h1,
              FONTS.fontBold,
              styles.title,
              { color: colors.title },
            ]}
          >
            Choose Your Path
          </Text>
          <Text
            style={[
              FONTS.BodyM,
              styles.subtitle,
              { color: colors.textLight },
            ]}
          >
            Select how you want to use our platform
          </Text>
        </View>

        {/* Options Container */}
        <View style={styles.optionsContainer}>
          {/* Buy a Property Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
                borderColor: COLORS.primary,
              },
            ]}
            onPress={handleBuyProperty}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: COLORS.primaryLight }]}>
              <Home size={40} color={COLORS.primary} />
            </View>
            <Text
              style={[
                FONTS.h3,
                FONTS.fontBold,
                styles.optionTitle,
                { color: colors.title },
              ]}
            >
              Buy a Property
            </Text>
            <Text
              style={[
                FONTS.BodyM,
                styles.optionDescription,
                { color: colors.textLight },
              ]}
            >
              Browse and purchase properties that match your needs
            </Text>
          </TouchableOpacity>

          {/* Post a Property Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
                borderColor: COLORS.secondary,
              },
            ]}
            onPress={handlePostProperty}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(116,170,71,0.1)' }]}>
              <Building2 size={40} color={COLORS.secondary} />
            </View>
            <Text
              style={[
                FONTS.h3,
                FONTS.fontBold,
                styles.optionTitle,
                { color: colors.title },
              ]}
            >
              Post a Property
            </Text>
            <Text
              style={[
                FONTS.BodyM,
                styles.optionDescription,
                { color: colors.textLight },
              ]}
            >
              List your property and reach potential buyers
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text
            style={[
              FONTS.BodyM,
              { color: colors.text },
            ]}
          >
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  optionCard: {
    padding: 32,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  optionTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  optionDescription: {
    textAlign: 'center',
    lineHeight: 22,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default PropertyTypeSelection;
