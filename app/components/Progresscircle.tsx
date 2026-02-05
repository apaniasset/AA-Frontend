import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';
import { COLORS, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

const Progresscircle = ({ progress }: any) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    // ----------- Dynamic Colors According to Progress -----------
    let circleColor = '#D60000';
    let unfilled = '#F8EFF1';

    if (progress > 0.25 && progress <= 0.75) {
        circleColor = '#FDB022';
        unfilled = '#FFF7E9';
    } else if (progress > 0.75) {
        circleColor = '#4FB954';
        unfilled = '#F3FFF3';
    }
    // ------------------------------------------------------------

    return (
        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ transform: [{ rotate: '0deg' }] }}>
                <Progress.Circle
                    borderWidth={0}
                    unfilledColor={unfilled}
                    color={circleColor}
                    progress={progress}
                    size={36}
                    thickness={3}
                    strokeCap={'round'}
                />
            </View>
            <Text
                style={[
                    FONTS.BodyXS,
                    FONTS.fontSemiBold,
                    { fontSize: 10, color: colors.gray100, position: 'absolute' }
                ]}
            >
                {Math.round(progress * 100)}%
            </Text>
        </View>
    );
};

export default Progresscircle;
