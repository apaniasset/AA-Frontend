
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import CustomInput from '../../components/Input/CustomInput';


type Write_ReviewScreenProps = StackScreenProps<RootStackParamList, 'Write_Review'>;

const Write_Review = ({navigation } : Write_ReviewScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const describedtabs = ["Owner", "Tenant", "Former Resident", "Real Estate Agent"];

    const [activeTab, setActiveTab] = useState(describedtabs[0]);

    const stayedtabs = ["0.5 Yera", "1 Year", "2 Years", "3 Years +"];

    const [activeTab1, setActiveTab1] = useState(stayedtabs[0]);

    const showStayFor = ["Tenant"];

    const shouldShowStay = showStayFor.includes(activeTab);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerBackground = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: ['transparent', theme.dark ? '#3C0C81' : '#E0CAFF'],
        extrapolate: 'clamp',
    })



    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <LinearGradient
                    colors={ [theme.dark ? "#3C0C81": "#E0CAFF",theme.dark ? "#181818": "#F8F9FB"]}
                    style={{
                        width:'100%',
                        height:185,
                        position:'absolute',
                        left:0,right:0,top:0
                    }}
                />
                    <Animated.View
                        style={{
                            width:'100%',
                            height:56,
                            backgroundColor:headerBackground,
                            position:'absolute',
                            left:0,
                            right:0,
                            top:0,
                            zIndex:999
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.goBack()}
                            style={[GlobalStyleSheet.headerBtn,{
                                height:36,
                                width:36,
                                borderRadius:30,
                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                position:'absolute',
                                left:20,
                                top:10,
                                zIndex:99
                            }]}
                        >
                            <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
                        </TouchableOpacity>
                    </Animated.View>
            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:55}]}>
                    <View
                        style={{
                            position:'absolute',
                            right:25,
                            top:20
                        }}
                    >
                        <Image
                            style={{height:108,width:100}}
                            source={theme.dark ? IMAGES.DarkUserReview : IMAGES.UserReview}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Write a Review</Text>
                    <Text numberOfLines={2} style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11,paddingRight:170}]}>Write a review of your area to guide future residents.</Text>

                    <View style={{marginTop:30}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Add Location</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="City"
                                placeholderTextColor={colors.gray40}
                                style={[
                                styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10,marginTop:0}]}>
                            <TextInput
                                placeholder="Society"
                                placeholderTextColor={colors.gray40}
                                style={[
                                styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>You’re best described as...</Text>
                        <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                            {describedtabs.map((data, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveTab(data)}
                                        style={[GlobalStyleSheet.center,{
                                            paddingHorizontal: 14,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },activeTab === data && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30
                                        }]}
                                    >
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab === data && {
                                            color:colors.gray80
                                        }]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    {shouldShowStay && (
                        <View style={{marginTop:15}}>
                            <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>How long you have stayed.</Text>
                            <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                                {stayedtabs.map((data, index) => {
                                    return(
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setActiveTab1(data)}
                                            style={[GlobalStyleSheet.center,{
                                                paddingHorizontal: 14,
                                                paddingVertical: 10,
                                                borderRadius: 10,
                                                borderWidth: 1,
                                                borderColor:colors.checkBoxborder,
                                                backgroundColor: COLORS.white,
                                                },activeTab1 === data && {
                                                backgroundColor:colors.gray20,
                                                borderColor:colors.gray30
                                            }]}
                                        >
                                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab1 === data && {
                                                color:colors.gray80
                                            }]}>{data}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    )}
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Your Name</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={colors.gray40}
                                style={[
                                    styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                            />
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingBottom:25,paddingHorizontal:20}]}>
                <Button
                    title='Proceed to write review'
                    btnRounded
                    onPress={() => navigation.navigate('Write_Review_stap_2')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
    },
    wrapper: {
        width: "100%",
        height: 43,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    }
  })

export default Write_Review