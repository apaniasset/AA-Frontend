import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../constants/theme';

type Props = {
    quantity : any
}

const CheckoutItems = ({quantity} : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [itemQuantity, setItemQuantity] = useState(quantity);

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => itemQuantity > 1 && setItemQuantity(itemQuantity - 1)}
                style={{
                    height: 35,
                    width: 35,
                    borderRadius:20,
                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                    borderWidth:1,
                    borderColor:colors.checkBoxborder,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FeatherIcon size={18} color={colors.textLight} name='minus' />
            </TouchableOpacity>
            {itemQuantity ?
                <Text style={[FONTS.h5,FONTS.fontMedium,{color: colors.text, width: 54, textAlign: 'center' }]}>{itemQuantity}</Text>
                :
                <Text style={[FONTS.h5,FONTS.fontMedium,{color: colors.text, width: 54, textAlign: 'center' }]}>1</Text>
            }
            <TouchableOpacity
                onPress={() => setItemQuantity(itemQuantity + 1)}
                style={{
                    height: 35,
                    width: 35,
                    borderRadius:20,
                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                    borderWidth:1,
                    borderColor:colors.checkBoxborder,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FeatherIcon size={18} color={colors.textLight} name='plus' />
            </TouchableOpacity>
        </View>
    )
}

export default CheckoutItems