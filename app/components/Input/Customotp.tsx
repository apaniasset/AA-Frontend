import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { COLORS, FONTS } from '../../constants/theme';

type CustomotpProps = {
  onOtpChange?: (code: string) => void;
  onChange?: (code: string) => void;
  value?: string;
};

const Customotp = ({ onOtpChange, onChange, value }: CustomotpProps) => {
  const handleTextChange = onOtpChange ?? onChange;
  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const OTPInputAny: any = OTPTextInput;
  const otpRef = useRef<any>(null);

  useEffect(() => {
    if (typeof value !== 'string') return;
    if (otpRef.current?.setValue) {
      otpRef.current.setValue(value);
    }
  }, [value]);

  return (
    <View>
      <OTPInputAny
        ref={otpRef}
        tintColor={'#E2E4ED'}
        inputCount={6}
        handleTextChange={handleTextChange}
        textInputStyle={{
          ...FONTS.h3,
          ...FONTS.fontRegular,
          height: 55,
          width: 50,
          borderRadius: 10,
          backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
          borderWidth: 1.5,
          borderBottomWidth: 1.5,
          borderColor: theme.dark ? '#565656' : '#E2E4ED',
          color: colors.title,
        }}
      />
    </View>
  );
};

export default Customotp;
