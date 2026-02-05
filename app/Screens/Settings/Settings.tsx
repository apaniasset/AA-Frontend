import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';

const SettingsData = [
    {
        id: "1",
        title: "Receive promotional content via email/message",
        subtitle:
            "Promotional mailers give you exclusive offers and fresh launches from RealStateX and partner websites directly into your box and in relation with your activity"
    },
    {
        id: "2",
        title: "Receive push notifications",
        subtitle: "Alerts for curated properties and projects based on your interests"
    }
];

type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const Settings = ({ navigation }: SettingsScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [activeStates, setActiveStates] = useState<boolean[]>(
        SettingsData.map(() => false)
    );

    const animatedOffsets = useRef(
        SettingsData.map(() => new Animated.Value(0))
    ).current;

    const animateToggle = (index: number, toValue: number) => {
        Animated.spring(animatedOffsets[index], {
            toValue,
            useNativeDriver: true
        }).start();
    };

    const onTogglePress = (index: number) => {
        const updatedStates = [...activeStates];
        updatedStates[index] = !updatedStates[index];

        setActiveStates(updatedStates);
        animateToggle(index, updatedStates[index] ? 20 : 0);
    };

    return (
        <View style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header 
                title={'Communication Settings'} 
                leftIcon={'back'} 
                titleLeft 
            />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View
                    style={[
                        GlobalStyleSheet.container,
                        { paddingHorizontal: 20, paddingTop: 20 }
                    ]}
                >
                    {SettingsData.map((item, index) => {

                        const active = activeStates[index];

                        return (
                            <View
                                key={item.id}
                                style={{
                                    padding: 15,
                                    backgroundColor: active ? theme.dark ? '#290B56' : '#F5EFFF' : theme.dark ? COLORS.darkwhite : COLORS.white,
                                    borderWidth: 1,
                                    borderColor: active ? theme.dark ? '#521AA3' : '#CAA6FF' : theme.dark ? '#565656' : '#E2E4ED',
                                    borderRadius: 8,
                                    marginBottom: 10
                                }}
                            >
                                <View
                                    style={[
                                        GlobalStyleSheet.flexcenter,
                                        { alignItems: 'flex-start', marginBottom: 5 }
                                    ]}
                                >
                                    <Text
                                        numberOfLines={2}
                                        style={[
                                            FONTS.BodyM,
                                            FONTS.fontSemiBold,
                                            { color: colors.gray100, flex: 1 }
                                        ]}
                                    >
                                        {item.title}
                                    </Text>

                                    {/* Toggle Button */}
                                    <TouchableOpacity
                                        onPress={() => onTogglePress(index)}
                                        style={{
                                            height: 20,
                                            width: 40,
                                            borderRadius: 20,
                                            backgroundColor: active ? theme.dark ? '#3C0C81': '#E0CAFF' : colors.background
                                        }}
                                    >
                                        <Animated.View
                                            style={{
                                                height: 16,
                                                width: 16,
                                                borderRadius: 20,
                                                backgroundColor: active ? theme.dark ? '#9654F4': COLORS.primary : colors.gray40,
                                                top: 2,
                                                left: 2,
                                                transform: [{ translateX: animatedOffsets[index] }]
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text
                                    style={[
                                        FONTS.BodyXS,
                                        FONTS.fontRegular,
                                        { color: colors.gray50,paddingRight:70 }
                                    ]}
                                >
                                    {item.subtitle}
                                </Text>
                            </View>
                        );
                    })}

                </View>
            </ScrollView>
        </View>
    );
};

export default Settings;
