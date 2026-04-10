import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../constants/theme';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';

export const registerStyles = (theme: any, colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoWrapper: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 24,
    width: 104,
    height: 104,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  cardContainer: {
    ...GlobalStyleSheet.container,
    paddingTop: 8,
    paddingBottom: 30,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
    marginHorizontal: 0,
    marginTop: 20,
    borderRadius: 0,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
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
    height: 58,
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 38,
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
