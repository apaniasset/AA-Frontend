import React, { useState } from 'react';
import { Image, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from '../constants/Images';
import { GlobalStyleSheet } from '../constants/StyleSheet';

type Props = {
    id ?: any;
    onPress ?: any;
    inSaveProperty: any;
    hearder?: any;
}

const Likebtn = ({onPress,inSaveProperty,id,hearder} : Props) => {

    // const [isLike, setIsLike] = useState(false);

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <Pressable
            accessible={true}
            accessibilityLabel="Like Btn"
            accessibilityHint="Like this item"
            onPress={() =>  onPress ? onPress() : ""}
            style={[GlobalStyleSheet.headerBtn, {
                height: 36,
                width: 36,
                borderRadius: 50,
                backgroundColor: 'rgba(255,255,255,0.20)'
            },hearder === true &&{
                backgroundColor:'transparent',
                borderRadius:4
            }]}
        >
           {inSaveProperty().includes(id) ?
                <Image
                    style={[{height:18,width:18,resizeMode:'contain'},hearder === true && {height:22,width:22}]}
                    source={IMAGES.heart2}
                    tintColor={COLORS.danger}
                />
                :
                <FeatherIcon name='heart' size={hearder === true ? 20: 16} color={hearder === true ? colors.gray40 : COLORS.white} />
            }
        </Pressable>
    );
};


export default Likebtn;