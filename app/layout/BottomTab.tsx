import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Platform, TouchableOpacity, View, Animated, Text, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { useTheme } from '@react-navigation/native';
import {
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { IMAGES } from '../constants/Images';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import DropShadow from 'react-native-drop-shadow';
import FeatherIcon from "react-native-vector-icons/Feather";

type Props = {
    state: any,
    navigation: any,
    descriptors: any,
};

const BottomTab = ({ state, descriptors, navigation }: Props) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    //  HIDE TABBAR ON AddProperty
    if (state.routeNames[state.index] === "AddProperty") {
        return null;  
    }

    const [tabWidth, setWidth] = useState(wp('100%'));
    const tabWD = tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;
    const circlePosition = useRef(new Animated.Value(0)).current;

    Dimensions.addEventListener('change', val => {
        setWidth(val.window.width);
    });

    useEffect(() => {
        Animated.spring(circlePosition, {
            toValue: state.index * tabWD,
            useNativeDriver: true,
        }).start();
    }, [state.index, tabWidth]);


    const onTabPress = (index: number) => {
        const tabW = tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

        Animated.spring(circlePosition, {
            toValue: index * tabW,
            useNativeDriver: true,
        }).start();
    };


    return (
        <>
            <DropShadow
                style={[
                    {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: .10,
                        shadowRadius: 30,
                    },
                    Platform.OS === 'ios' && { backgroundColor: colors.card }
                ]}
            >
                <View style={{ height: 64, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white }}>
                    <View style={[GlobalStyleSheet.container, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingTop: 0,
                        paddingBottom: 0,
                    }]}>

                        {state.routes.map((route: any, index: any) => {

                            const { options } = descriptors[route.key];
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route.name;

                            const isFocused = state.index === index;

                            const onPress = () => {
                                if (label === "AddProperty") {
                                    navigation.navigate('AddProperty');
                                    return;
                                }

                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true,
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate({ name: route.name, merge: true });
                                    onTabPress(index);
                                }
                            };

                            if (label === 'AddProperty') {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            width: '20%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={.8}
                                            onPress={onPress}
                                            style={[GlobalStyleSheet.center, {
                                                height: 42,
                                                width: 42,
                                                borderRadius: 50,
                                                backgroundColor: COLORS.primary
                                            }]}
                                        >
                                            <FeatherIcon name='plus' size={18} color={COLORS.white} />
                                        </TouchableOpacity>
                                    </View>
                                );
                            } else {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={.8}
                                        accessibilityRole="button"
                                        accessibilityState={isFocused ? { selected: true } : {}}
                                        onPress={onPress}
                                        style={{
                                            flex: 1,
                                            height: '100%',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 5,
                                            gap: 5
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: isFocused ? COLORS.primary : colors.gray30
                                            }}
                                            source={
                                                label == 'Home' ? IMAGES.home :
                                                    label == 'Messages' ? IMAGES.Messages :
                                                        label == 'Save' ? IMAGES.heart2 :
                                                            label == 'Profile' ? IMAGES.user2 :
                                                                IMAGES.home
                                            }
                                            resizeMode='center'
                                        />
                                        <Text style={{
                                            ...FONTS.fontMedium,
                                            fontSize: 12,
                                            color: isFocused ? colors.gray70 : colors.gray40
                                        }}>
                                            {label}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }
                        })}

                    </View>
                </View>
            </DropShadow>
        </>
    );
};

export default BottomTab;
