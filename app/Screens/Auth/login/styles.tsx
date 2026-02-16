import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../../constants/theme';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';

export const loginStyles = (theme: any, colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.dark ? COLORS.darkCard : COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
    minHeight: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 24,
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
  headerContainer: {
    marginBottom: 28,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    // Styles applied via FONTS.BodyM
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 5,
  },
  forgotPasswordText: {
    ...FONTS.BodyS,
    ...FONTS.fontSemiBold,
    color: COLORS.primary,
  },
  buttonContainer: {
    marginTop: 25,
  },
  registerLinkContainer: {
    ...GlobalStyleSheet.flexcenter,
    marginTop: 25,
    paddingVertical: 15,
  },
  registerText: {
    // Styles applied via FONTS.BodyM
  },
  registerLink: {
    // Styles applied via FONTS.BodyM and FONTS.fontSemiBold
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: 'Inter_18pt-Regular',
  },
  loginButton: {
    height: 58,
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 38,
    backgroundColor: theme.dark ? '#9654F4' : COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    ...FONTS.h5,
    ...FONTS.fontSemiBold,
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
});
