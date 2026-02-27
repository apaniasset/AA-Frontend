import { View, Text, ImageBackground, ScrollView, Image, Animated, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { CountryPicker } from 'react-native-country-codes-picker';
import FeatherIcon from "react-native-vector-icons/Feather";
import RBSheet from 'react-native-raw-bottom-sheet';
import Customotp from '../../components/Input/Customotp';
import { merchantSendOtp, merchantVerifyOtp } from '../../services/auth';

type OnbordingScreenProps = StackScreenProps<RootStackParamList, 'Onbording'>;

const Onbording = ({ navigation }: OnbordingScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const moveAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            // Animate scale from 0 to 1
            Animated.timing(scaleAnim, {
                toValue: 1, // Scale up to full size
                duration: 500, // Duration for the scaling effect
                useNativeDriver: true,
            }),
            // Loop the left-right movement animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(moveAnim, {
                        toValue: -15, // Move up by 50 units
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(moveAnim, {
                        toValue: 0, // Move down by 50 units
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            ),
        ]).start(); // Start both animations together after the delay
    }, [moveAnim, scaleAnim]);

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [phoneNumber, setPhoneNumber] = useState("");
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [serverOtp, setServerOtp] = useState('');
    const [verifyingOtp, setVerifyingOtp] = useState(false);

    const [sheetOpened, setSheetOpened] = useState(false);

    const refRBSheet = useRef<any>(null);

    useEffect(() => {
        if (!sheetOpened) {
            setTimeout(() => {
                refRBSheet.current?.open();
            }, 700);
            setSheetOpened(true); // mark as opened
        }
    }, [sheetOpened]);

    const handleContinue = () => {
        refRBSheet.current?.close();
        navigation.navigate('DrawerNavigation', { screen: 'Home' });
    };

    const handleUseThisNumber = () => {
        setPhoneNumber("9876543210");
        refRBSheet.current?.close();
    };

    const handleUseAnotherNumber = () => {
        setPhoneNumber("");
        refRBSheet.current?.close();
    };

    const [showOtp, setShowOtp] = useState(false);

    const otpFade = useRef(new Animated.Value(0)).current;
    const otpSlide = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        if (showOtp) {
            Animated.parallel([
                Animated.timing(otpFade, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(otpSlide, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [showOtp]);

    const handleVerifyOtp = async () => {
        if (verifyingOtp) {
            return;
        }

        const trimmedPhone = phoneNumber.trim();
        const otpToSend = (serverOtp || otpValue).trim();

        if (!trimmedPhone) {
            Alert.alert('Error', 'Phone number is missing. Please go back and enter your phone number.');
            return;
        }

        if (!otpToSend) {
            Alert.alert('Error', 'Please enter the OTP.');
            return;
        }

        try {
            setVerifyingOtp(true);
            const response = await merchantVerifyOtp({
                phone: trimmedPhone,
                otp: otpToSend,
            });

            if (response.success) {
                Alert.alert(
                    'Success',
                    response.message || 'Your mobile number is verified. You can now register.',
                );
                navigation.navigate('Register', { phone: trimmedPhone });
            } else {
                Alert.alert(
                    'Error',
                    response.message || 'Invalid OTP. Please try again.',
                );
            }
        } catch (error: any) {
            const message =
                error?.message ||
                error?.data?.message ||
                'Failed to verify OTP. Please try again.';
            Alert.alert('Error', message);
        } finally {
            setVerifyingOtp(false);
        }
    };

    const handleSendOtp = async () => {
        const trimmedPhone = phoneNumber.trim();

        if (!trimmedPhone) {
            Alert.alert('Error', 'Please enter your phone number.');
            return;
        }

        try {
            setSendingOtp(true);
            const response = await merchantSendOtp({ phone: trimmedPhone });

            if (response.success) {
                if (response.data?.otp) {
                    setServerOtp(response.data.otp);
                    Alert.alert('OTP', `Your OTP is ${response.data.otp}`);
                } else if (response.message) {
                    Alert.alert('Success', response.message);
                }
                setShowOtp(true);
            } else {
                Alert.alert('Error', response.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error: any) {
            const message =
                error?.message ||
                error?.data?.message ||
                'Failed to send OTP. Please try again.';
            Alert.alert('Error', message);
        } finally {
            setSendingOtp(false);
        }
    };

    return (
        <View style={{ backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, flex: 1 }}>
            <RBSheet
                ref={refRBSheet}
                height={300}
                openDuration={300}
                closeOnPressBack={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.6)",
                    },
                    draggableIcon: {
                        backgroundColor: "#ccc",
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                    },
                }}
            >
                <View
                    style={{
                        paddingVertical: 10,
                        paddingBottom: 30,
                        marginHorizontal: -20,
                        paddingHorizontal: 20,
                        borderBottomWidth: 1,
                        borderColor: colors.border
                    }}
                >
                    <View style={[GlobalStyleSheet.flexcenter, { gap: 10 }]}>
                        <Image
                            style={{
                                width: 41,
                                height: 36
                            }}
                            resizeMode='contain'
                            source={IMAGES.Profifylogo}
                            tintColor={theme.dark ? '#9654F4' : COLORS.primary}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={[FONTS.h3, FONTS.fontBold, { color: colors.title }]}>Hi, Ethan Walker</Text>
                            <Text style={[FONTS.BodyS, FONTS.fontMedium, { color: colors.text }]}>Verify your mobile number to begin.</Text>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 16 }}>
                        <Button
                            title='USE +1 987 654 3210'
                            onPress={handleUseThisNumber}
                            btnRounded
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleUseAnotherNumber}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                FONTS.BodyS,
                                FONTS.fontSemiBold,
                                {
                                    color: colors.textLight,
                                    textAlign: "center",
                                },
                            ]}
                        >
                            USE ANOTHER MOBILE NUMBER
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, paddingRight: 10 }}>
                    <Text style={[FONTS.BodyS, FONTS.fontMedium, { color: colors.text }]}>
                        By moving forward, you allow us to access your profile info and confirm your acceptance of our <Text style={{ color: COLORS.primary }}>Privacy Policy</Text> and <Text style={{ color: COLORS.primary }}>Terms</Text> of use.
                    </Text>
                </View>
            </RBSheet>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'flex-end',
                        overflow: 'hidden'
                    }}
                >
                    <Image
                        style={{
                            height: 307,
                            width: 307,
                            position: 'absolute',
                            top: -170,
                            left: -130
                        }}
                        resizeMode='contain'
                        source={IMAGES.Ellipse}
                    />
                    <View style={{ paddingHorizontal: 55 }}>
                        <Text style={[FONTS.h2, FONTS.fontBold, { color: COLORS.white, textAlign: 'center' }]}>We’ll Help You To Buy, Sell Or Rent Your Home!</Text>
                        <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: '#E0CAFF', textAlign: 'center' }]}>Discover listings and talk to sellers for FREE.</Text>
                    </View>
                    <ImageBackground
                        style={{
                            height: '100%',
                            width: '100%',
                            flex: 0.9,
                        }}
                        resizeMode='cover'
                        source={IMAGES.bgonboarding}
                    >
                        <Animated.View
                            style={[GlobalStyleSheet.center, {
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: 70,
                                padding: 5,
                                borderRadius: 10,
                                backgroundColor: COLORS.white,
                                position: 'absolute',
                                top: 30,
                                left: 40,
                                transform: [
                                    { rotate: '-15deg' },
                                    { translateY: moveAnim },
                                    { scale: scaleAnim },
                                ],
                            }]}
                        >
                            <View
                                style={[GlobalStyleSheet.center, {
                                    height: 60,
                                    width: 60,
                                    borderRadius: 6,
                                    overflow: 'hidden'
                                }]}
                            >
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    resizeMode='contain'
                                    source={IMAGES.onboardingpic1}
                                />
                            </View>
                            <View
                                style={{ paddingTop: 5, paddingHorizontal: 2 }}
                            >
                                <View
                                    style={{
                                        width: 50,
                                        height: 4,
                                        borderRadius: 2,
                                        backgroundColor: '#D9D9D9',
                                        marginBottom: 3
                                    }}
                                />
                                <View
                                    style={{
                                        width: 37,
                                        height: 4,
                                        borderRadius: 2,
                                        backgroundColor: '#D9D9D9',
                                        marginBottom: 3
                                    }}
                                />
                            </View>
                        </Animated.View>
                        <Animated.View
                            style={[GlobalStyleSheet.center, {
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                width: 70,
                                padding: 5,
                                borderRadius: 10,
                                backgroundColor: COLORS.white,
                                position: 'absolute',
                                top: 120,
                                right: 30,
                                transform: [
                                    { rotate: '15deg' },
                                    { translateY: moveAnim },
                                    { scale: scaleAnim },
                                ],
                            }]}
                        >
                            <View
                                style={[GlobalStyleSheet.center, {
                                    height: 60,
                                    width: 60,
                                    borderRadius: 6,
                                    overflow: 'hidden'
                                }]}
                            >
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    resizeMode='contain'
                                    source={IMAGES.onboardingpic2}
                                />
                            </View>
                            <View
                                style={{ paddingTop: 5, paddingHorizontal: 2 }}
                            >
                                <View
                                    style={{
                                        width: 50,
                                        height: 4,
                                        borderRadius: 2,
                                        backgroundColor: '#D9D9D9',
                                        marginBottom: 3
                                    }}
                                />
                                <View
                                    style={{
                                        width: 37,
                                        height: 4,
                                        borderRadius: 2,
                                        backgroundColor: '#D9D9D9',
                                        marginBottom: 3
                                    }}
                                />
                            </View>
                        </Animated.View>
                    </ImageBackground>
                </View>
                <View
                    style={[GlobalStyleSheet.container, {
                        flex: .1,
                        backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                        zIndex: 9,
                        paddingHorizontal: 20,
                        paddingTop: 25
                    }]}
                >
                    <View
                        style={{
                            // width:'100%',
                            height: 850,
                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                            borderTopLeftRadius: 800,
                            borderTopRightRadius: 800,
                            position: 'absolute',
                            left: -480,
                            right: -480,
                            top: -32,
                        }}
                    />
                    {!showOtp ?
                        (
                            <>
                                <View>
                                    <Text style={[FONTS.h3, FONTS.fontBold, { color: colors.gray100 }]}>Login or Register to get Started</Text>
                                    <Text style={[FONTS.BodyM, { color: colors.gray60 }]}>Access all content & get latest personalized updates</Text>
                                </View>
                                <View style={{ marginVertical: 15 }}>
                                    <CountryPicker
                                        show={show}
                                        pickerButtonOnPress={(item) => {
                                            setCountryCode(item.dial_code);
                                            setShow(false);
                                        }}
                                        onBackdropPress={() => setShow(false)}
                                        style={{
                                            modal: {
                                                height: '60%',
                                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },
                                            textInput: {
                                                paddingHorizontal: 12,
                                                height: 48,
                                                color: colors.title,
                                                backgroundColor: colors.bgLight
                                            },
                                            dialCode: {
                                                ...FONTS.fontLg,
                                                ...FONTS.fontSemiBold,
                                                color: colors.title,
                                            },
                                            countryName: {
                                                ...FONTS.font,
                                                ...FONTS.fontSemiBold,
                                                color: colors.text,
                                            },
                                            countryButtonStyles: {
                                                height: 50,
                                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                                borderRadius: 0,
                                                borderBottomWidth: 1,
                                                borderBottomColor: colors.border,
                                                marginBottom: 0,
                                            },
                                        }}
                                        lang={''}
                                    />
                                    <View style={[styles.inputStyle, { borderColor: colors.border }]}>
                                        <TouchableOpacity
                                            onPress={() => setShow(true)}
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingRight: 10,
                                            }}
                                        >
                                            <Text style={{
                                                ...FONTS.h5,
                                                color: colors.title,
                                            }}>{countryCode}</Text>
                                            <FeatherIcon style={{ marginLeft: 5 }} color={colors.text} size={18} name="chevron-down" />
                                        </TouchableOpacity>

                                        <TextInput
                                            style={{
                                                ...FONTS.BodyM,
                                                color: colors.title,
                                                flex: 1.5,
                                                top: 0,
                                                borderLeftWidth: 1,
                                                borderLeftColor: colors.border,
                                                paddingVertical: 0,
                                                paddingLeft: 15,
                                            }}
                                            autoFocus
                                            value={phoneNumber}
                                            onChangeText={setPhoneNumber}
                                            keyboardType='number-pad'
                                            placeholder='Enter Your Phone Number'
                                            placeholderTextColor={colors.gray60}
                                            maxLength={15}
                                        />
                                    </View>
                                </View>
                                <Button
                                    title={sendingOtp ? 'Sending...' : 'Continue'}
                                    btnRounded
                                    onPress={handleSendOtp}
                                />
                                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                                    <Text style={[FONTS.BodyM, { color: colors.text }]}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Register', { phone: '' })} activeOpacity={0.7}>
                                        <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: COLORS.primary }]}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={[GlobalStyleSheet.flexcenter, { paddingVertical: 30, paddingHorizontal: 20 }]}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: theme.dark ? '#454545' : '#D9D9D9',
                                            height: 1
                                        }}
                                    />
                                    <Text style={[FONTS.fontXs, FONTS.fontSemiBold, { color: colors.gray100, padding: 5 }]}>OR</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: theme.dark ? '#454545' : '#D9D9D9',
                                            height: 1
                                        }}
                                    />
                                </View>
                                <Button
                                    title='Create Account'
                                    btnRounded
                                    onPress={() => navigation.navigate('Register', { phone: '' })}
                                />
                                <View style={{ marginTop: 15 }}>
                                    <Button
                                        title='Do it later'
                                        btnRounded
                                        color={theme.dark ? '#290B56' : '#F5EFFF'}
                                        text={theme.dark ? '#F5EFFF' : '#28025F'}
                                        onPress={handleContinue}
                                    />
                                </View>
                            </>
                        ) :

                        (
                            <Animated.View
                                style={{
                                    opacity: otpFade,
                                    transform: [{ translateY: otpSlide }],
                                }}
                            >
                                <View>
                                    <Text style={[FONTS.h3, FONTS.fontBold, { color: colors.gray100 }]}>Confirm Your Number</Text>
                                    <Text style={[FONTS.BodyM, { color: colors.gray60 }]}>Enter the code we sent to <Text style={{ color: colors.gray100 }}>{countryCode} {phoneNumber}</Text></Text>
                                </View>
                                <View style={{ marginVertical: 14 }}>
                                    <Customotp onOtpChange={setOtpValue} />
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={[FONTS.BodyS, { color: colors.gray50 }]}>
                                        Resend code in <Text style={{ color: colors.gray100 }}>59 secs</Text>
                                    </Text>
                                </View>
                                <Button
                                    title={verifyingOtp ? 'Verifying...' : 'Continue'}
                                    btnRounded
                                    onPress={handleVerifyOtp}
                                />
                                <View style={[GlobalStyleSheet.flexcenter, { paddingVertical: 30, paddingHorizontal: 20 }]}>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: theme.dark ? '#454545' : '#D9D9D9',
                                            height: 1
                                        }}
                                    />
                                    <Text style={[FONTS.fontXs, FONTS.fontSemiBold, { color: colors.gray100, padding: 5 }]}>OR</Text>
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: theme.dark ? '#454545' : '#D9D9D9',
                                            height: 1
                                        }}
                                    />
                                </View>
                                <Button
                                    title='Do it later'
                                    btnRounded
                                    color={theme.dark ? '#290B56' : '#F5EFFF'}
                                    text={theme.dark ? '#F5EFFF' : '#28025F'}
                                    onPress={() => setShowOtp(false)}
                                />
                            </Animated.View>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({

    inputStyle: {
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },

})

export default Onbording