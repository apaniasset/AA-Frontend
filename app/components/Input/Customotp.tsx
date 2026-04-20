import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, TextInput, Platform, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { COLORS, FONTS } from '../../constants/theme';

const OTP_LENGTH = 6;

export interface CustomotpProps {
  onOtpChange?: (text: string) => void;
  /** Controlled — keeps SMS field and cells aligned with parent state */
  value?: string;
  containerStyle?: ViewStyle;
}

type OtpRef = {
  setValue: (v: string, isPaste?: boolean) => void;
  clear: () => void;
} | null;

/**
 * SMS / iMessage OTP autofill:
 * - iOS: `textContentType="oneTimeCode"`
 * - Android: `autoComplete="sms-otp"` (+ autofill framework when SMS matches)
 *
 * Transparent overlay `TextInput` receives the full code; digits are applied to
 * `react-native-otp-textinput` via `setValue`.
 */
const Customotp: React.FC<CustomotpProps> = ({
  onOtpChange,
  value: valueProp,
  containerStyle,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const OTPInputAny: any = OTPTextInput;
  const otpRef = useRef<OtpRef>(null);
  const prevSyncedProp = useRef<string | undefined>(undefined);
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState('');
  const display = isControlled ? (valueProp ?? '') : internal;

  const handleCellsChange = useCallback(
    (text: string) => {
      const next = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
      if (!isControlled) {
        setInternal(next);
      }
      onOtpChange?.(next);
    },
    [onOtpChange, isControlled],
  );

  const applyDigits = useCallback((raw: string) => {
    const next = raw.replace(/\D/g, '').slice(0, OTP_LENGTH);
    otpRef.current?.setValue(next, true);
  }, []);

  const handleOverlayChange = (text: string) => {
    const next = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!isControlled) {
      setInternal(next);
    }
    applyDigits(next);
  };

  useEffect(() => {
    if (!isControlled) {
      return;
    }
    const next = valueProp ?? '';
    if (next === prevSyncedProp.current) {
      return;
    }
    prevSyncedProp.current = next;
    const id = requestAnimationFrame(() => {
      otpRef.current?.setValue(next, true);
    });
    return () => cancelAnimationFrame(id);
  }, [valueProp, isControlled]);

  const smsAutofillProps =
    Platform.OS === 'ios'
      ? { textContentType: 'oneTimeCode' as const }
      : {
          autoComplete: 'sms-otp' as const,
          importantForAutofill: 'yes' as const,
        };

  return (
    <View style={[styles.wrap, containerStyle]}>
      <OTPInputAny
        ref={otpRef}
        tintColor={COLORS.primary}
        offTintColor={theme.dark ? '#565656' : '#D1D1D1'}
        inputCount={OTP_LENGTH}
        handleTextChange={handleCellsChange}
        keyboardType="number-pad"
        textInputStyle={{
          ...FONTS.h3,
          ...FONTS.fontRegular,
          height: 52,
          width: 48,
          borderRadius: 8,
          backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
          borderWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.dark ? '#565656' : '#D1D1D1',
          color: colors.title,
        }}
      />
      <TextInput
        style={styles.smsCapture}
        value={display}
        onChangeText={handleOverlayChange}
        keyboardType="number-pad"
        caretHidden
        maxLength={OTP_LENGTH}
        {...smsAutofillProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    minHeight: 56,
  },
  smsCapture: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    color: 'transparent',
    fontSize: 1,
  },
});

export default Customotp;
