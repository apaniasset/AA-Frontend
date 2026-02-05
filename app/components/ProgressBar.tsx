import React from 'react';
import { View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import * as Progress from 'react-native-progress';
import { COLORS, FONTS } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { useTheme } from '@react-navigation/native';

const ProgressBar = ({ progress } : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;
  
    return (
        <View style={{ position: 'relative' }}>
            <View
                style={[
                    GlobalStyleSheet.flexcenter,
                    {
                        paddingTop: 0,
                        padding: 15,
                        paddingBottom: 12,
                        borderBottomWidth: 1,
                        borderColor: '#EFEFEF',
                        alignItems: 'flex-start',
                    },
                ]}
            >
                <Text
                    style={[
                        FONTS.font,
                        { fontSize: 13, color: colors.text, lineHeight: 16 },
                    ]}
                >
                    Progress
                </Text>
                <Text
                    style={[
                        FONTS.fontMedium,
                        { fontSize: 13, color: COLORS.primary, lineHeight: 16 },
                    ]}
                >
                    {Math.round(progress * 100)}%
                </Text>
            </View>
            <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
                <Progress.Bar
                    borderWidth={0}
                    unfilledColor="transparent"
                    color={COLORS.primary}
                    width={null}
                    progress={progress}
                    height={3}
                    borderRadius={0}
                />
                <View
                    style={{
                        width: `${progress * 100}%`,
                        height: 3,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <Shadow
                        distance={6}
                        startColor="rgba(38, 72, 231, 0.06)" // #2648E7 @ 6%
                        offset={[0, -3]}
                        style={{ width: '100%', height: 3 }}
                    >
                        <View style={{ height: 3 }} />
                    </Shadow>
                </View>
            </View>
        </View>
    );
};

export default ProgressBar;
