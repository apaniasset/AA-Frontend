import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const CustomInput = (props : any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [passwordShow, setPasswordShow] = useState(true);
    const [isFocused, setIsFocused] = useState(false);

    // Floating label animation
    const labelAnim = useState(new Animated.Value(props.value ? 1 : 0))[0];

    const animateLabel = (toValue:number) => {
        Animated.timing(labelAnim, {
            toValue,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    const handleFocus = (e:any) => {
        setIsFocused(true);
        animateLabel(1);
        props.onFocus && props.onFocus(e);
    };

    const handleBlur = (e:any) => {
        setIsFocused(false);
        if (!props.value) animateLabel(0);
        props.onBlur && props.onBlur(e);
    };

    const labelStyle = {
        position: 'absolute',
        left: props.paddingLeft ? 100 : props.lefticon ? 50 : 15,
        top: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 8],
        }),
        fontSize: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 12],
        }),
        color: labelAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.gray40, colors.gray40],
        }),
        zIndex: 10,
        backgroundColor: 'transparent',
        lineHeight: 15
    };

    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);


    return (
        <>
            <View style={{ position: 'relative', justifyContent: 'center', marginTop: 15 }}>

                {/* Floating Label */}
                <Animated.Text style={labelStyle}>
                    {props.placeholder}
                </Animated.Text>

                <AnimatedTextInput
                    secureTextEntry={props.type === "password" ? passwordShow : false}
                    style={[{
                        ...FONTS.h5,
                        // height: inputHeight,
                        color: colors.gray80,
                        paddingVertical: 6,
                        backgroundColor:props.background ? colors.card :theme.dark ? COLORS.darkwhite : COLORS.white,
                        borderRadius:SIZES.radius_sm,
                        paddingHorizontal: 15,
                        paddingTop: 20,
                        borderWidth:1,
                        borderColor:isFocused ? COLORS.primary :theme.dark ? '#565656': '#E2E4ED'
                    },props.paddingLeft &&{
                        paddingLeft: 100,
                    }, props.inputXl && {
                        height: 250,
                    }, props.inputLg && {
                        height: 98,
                    }, props.inputSm && {
                        paddingVertical: 7,
                        height: 45,
                    }, props.inputRounded && {
                        borderRadius: 30,
                    }, props.textAlignVertical && {
                        textAlignVertical: "top",
                    }, 
                    props.inputBorder && {
                        borderWidth: 1.5,
                        borderBottomWidth:1.5,
                        borderColor: isFocused ? COLORS.primary : colors.border,
                        backgroundColor: colors.card,
                        paddingLeft:20,
                        paddingRight:props.type === "password" ? 45 :20,
                    },props.style && {
                    ...props.style
                    }]}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    defaultValue={props.defaultValue}
                    multiline={props.inputLg || props.inputXl}
                    keyboardType={props.keyboardType}
                    editable={props.editable}
                    maxLength={props.maxLength}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                {props.type === "password" &&
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="Password"
                        accessibilityHint="Password show and hidden"
                        onPress={() => setPasswordShow(!passwordShow)}
                        style={styles.eyeIcon}>
                        <FeatherIcon color={COLORS.primary} size={18} name={passwordShow ? 'eye-off' : 'eye'} />
                    </TouchableOpacity>
                }

                {props.lefticon &&
                    <View style={{
                        position: 'absolute',
                        height: 48,
                        width: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        left:0
                    }}>
                        {props.lefticon}
                    </View>
                }

                {props.icon &&
                    <View style={{
                        position: 'absolute',
                        height: 48,
                        width: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1,
                        right:0
                    }}>
                        {props.icon}
                    </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    eyeIcon: {
        position: 'absolute',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        zIndex: 1,
        top: 0,
    }
})

export default CustomInput;
