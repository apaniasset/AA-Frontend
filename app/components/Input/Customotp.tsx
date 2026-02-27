import React from 'react'
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface CustomOtpProps {
    onOtpChange?: (text: string) => void;
}

const Customotp: React.FC<CustomOtpProps> = ({ onOtpChange }) => {

    const theme =  useTheme();
    const { colors } : {colors : any} = theme;

    // Cast OTPTextInput to any to avoid incorrect library TypeScript definitions
    const OTPInputAny: any = OTPTextInput;

    return (
        <View>
            <OTPInputAny 
                tintColor={'#E2E4ED'}
                inputCount={6}
                handleTextChange={onOtpChange}
                textInputStyle={{
                    ...FONTS.h3,
                    ...FONTS.fontRegular,
                    height:55,
                    width:50,
                    borderRadius:10,
                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                    borderWidth:1.5,
                    borderBottomWidth:1.5,
                    borderColor:theme.dark ? '#565656':'#E2E4ED',
                    color:colors.title,
                }}
                
            />
        </View>
    )
}

export default Customotp