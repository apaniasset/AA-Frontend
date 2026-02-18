import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../constants/theme';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';

export const userForgotPasswordStyles = (theme: any, colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    minHeight: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    flex: 1,
    ...GlobalStyleSheet.container,
    paddingTop: 32,
    paddingBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
    marginHorizontal: 0,
    marginTop: 16,
    borderRadius: 0,
  },
  buttonContainer: {
    marginTop: 25,
  },
  loginLinkContainer: {
    ...GlobalStyleSheet.flexcenter,
    marginTop: 25,
    paddingVertical: 15,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Inter_18pt-Regular',
  },
  submitButton: {
    height: 58,
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 38,
    backgroundColor: theme.dark ? '#9654F4' : COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    ...FONTS.h5,
    ...FONTS.fontSemiBold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  backButton: {
    height: 58,
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 38,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    ...FONTS.h5,
    ...FONTS.fontSemiBold,
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
  },
  successContainer: {
    padding: 20,
    backgroundColor: theme.dark ? 'rgba(23,83,25,0.2)' : 'rgba(23,83,25,0.1)',
    borderRadius: 12,
    marginBottom: 20,
  },
  successText: {
    textAlign: 'center',
    lineHeight: 22,
  },
  otpContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.card,
    borderRadius: 8,
    alignItems: 'center',
  },
  otpLabel: {
    ...FONTS.BodyS,
    color: colors.textLight,
    marginBottom: 8,
  },
  otpValue: {
    ...FONTS.h3,
    ...FONTS.fontBold,
    color: COLORS.primary,
    letterSpacing: 4,
  },
});
