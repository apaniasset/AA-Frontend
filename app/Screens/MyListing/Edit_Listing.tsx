import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';

type Edit_ListingScreenProps = StackScreenProps<RootStackParamList, 'Edit_Listing'>;

const Edit_Listing = ({navigation } : Edit_ListingScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

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
                <View
                    style={{
                        position:'absolute',
                        right:25,
                        top:20
                    }}
                >
                    <Image
                        style={{height:90,width:90}}
                        source={IMAGES.Propertyuser}
                        resizeMode='contain'
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Edit_Property_Details')}
                        activeOpacity={0.8}
                        style={[GlobalStyleSheet.center,{
                            width:34,
                            height:34,
                            borderRadius:50,
                            backgroundColor:'#9F5DFF',
                            position:'absolute',
                            right:-12,
                            top:18,
                            zIndex:9999
                        }]}
                    >
                        <Image
                            style={{height:16,width:16}}
                            tintColor={COLORS.white}
                            resizeMode='contain'
                            source={IMAGES.write}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:55}]}>
                    <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Editing</Text>
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11}]}>Id: <Text style={{color:theme.dark ? '#9654F4': COLORS.primary}}>26801450</Text></Text>
                    <View
                        style={[GlobalStyleSheet.flexcenter,style.card,{
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            borderColor:theme.dark ? '#565656': '#E2E4ED',
                            marginTop:30
                        }]}
                    >
                        <View style={{flex:1}}>
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray80}]}>Basic Details</Text>
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray40}]}>Goals, Kind of Property, Property Type, Number of Apartments.</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_Property_Details', { tabIndex: 0 })}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.headerBtn,style.icon]}
                        >
                            <Image
                                style={{height:18,width:18}}
                                resizeMode='contain'
                                tintColor={colors.gray70}
                                source={IMAGES.write}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[GlobalStyleSheet.flexcenter,style.card,{
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            borderColor:theme.dark ? '#565656': '#E2E4ED',
                        }]}
                    >
                        <View style={{flex:1}}>
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray80}]}>Property Details</Text>
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray40,paddingRight:40}]}>Location, Room Details, Area Details, Minimum Leasable Area, Shop facade size.</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_Property_Details', { tabIndex: 1 })}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.headerBtn,style.icon]}
                        >
                            <Image
                                style={{height:18,width:18}}
                                resizeMode='contain'
                                tintColor={colors.gray70}
                                source={IMAGES.write}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[GlobalStyleSheet.flexcenter,style.card,{
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            borderColor:theme.dark ? '#565656': '#E2E4ED',
                        }]}
                    >
                        <View style={{flex:1}}>
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray80}]}>Other Details</Text>
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray40,paddingRight:40}]}>Security Deposit, Pre-leased/Pre-Rented Details, Expected Annual Returns, Duration of Agreement, Months of Notice.</Text>
                        </View>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('Edit_Property_Details', { tabIndex: 2 })}
                            activeOpacity={0.9}
                            style={[GlobalStyleSheet.headerBtn,style.icon]}
                        >
                            <Image
                                style={{height:18,width:18}}
                                resizeMode='contain'
                                tintColor={colors.gray70}
                                source={IMAGES.write}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[GlobalStyleSheet.flexcenter,style.card,{
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            borderColor:theme.dark ? '#565656': '#E2E4ED',
                        }]}
                    >
                        <View style={{flex:1}}>
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray80}]}>Photos</Text>
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray40,paddingRight:40}]}>Photo Status (Missing/Added), Importance (Attracts buyers), Action (Add Photos).</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_Property_Details', { tabIndex: 2 })}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.headerBtn,style.icon,{backgroundColor:theme.dark ? colors.card: '#F5EFFF'}]}
                        >
                            <FeatherIcon name='plus' size={18} color={theme.dark ? '#9654F4': COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[GlobalStyleSheet.flexcenter,style.card,{
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            borderColor:theme.dark ? '#565656': '#E2E4ED',
                        }]}
                    >
                        <View style={{flex:1}}>
                            <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray80}]}>Amenities</Text>
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray40,paddingRight:40}]}>Amenities, Other Features, Power Back up, Property facing, Type of flooring, Width of facing road.</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_Property_Details', { tabIndex: 3 })}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.headerBtn,style.icon]}
                        >
                            <Image
                                style={{height:18,width:18}}
                                resizeMode='contain'
                                tintColor={colors.gray70}
                                source={IMAGES.write}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    card:{
        padding:10,
        paddingHorizontal:15,
        borderRadius:10,
        backgroundColor:COLORS.white,
        borderWidth:1,
        borderColor:'#E2E4ED',
        marginBottom:10
    },
    icon:{
        height:36,
        width:36,
        borderRadius:30,
        position:'absolute',
        right:10
    }
})

export default Edit_Listing