import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../constants/theme';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';

export const registerStyles = (theme: any, colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
  },
  brandHeader: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingBottom: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardContainer: {
    ...GlobalStyleSheet.container,
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 24,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
    marginHorizontal: 0,
    marginTop: 0,
    borderRadius: 0,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    // Styles applied via FONTS.BodyM
  },
  buttonContainer: {
    marginTop: 25,
  },
  loginLinkContainer: {
    ...GlobalStyleSheet.flexcenter,
    marginTop: 25,
    paddingVertical: 15,
  },
  loginText: {
    // Styles applied via FONTS.BodyM
  },
  loginLink: {
    // Styles applied via FONTS.BodyM and FONTS.fontSemiBold
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Inter_18pt-Regular',
  },
  registerButton: {
    height: 52,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: theme.dark ? '#9654F4' : COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    ...FONTS.h5,
    ...FONTS.fontSemiBold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
});
