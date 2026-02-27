import React from 'react'
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

type CustomotpProps = {
    onChange?: (code: string) => void;
};

const Customotp = ({ onChange }: CustomotpProps) => {

    const theme =  useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <View>
            <OTPTextInput 
                tintColor={'#E2E4ED'}
                inputCount={6}
                handleTextChange={(code: string) => onChange?.(code)}
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