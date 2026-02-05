import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import Header from '../../layout/Header';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';


const chatList = [
    {
        id: 1,
        name: "Ethan Walker",
        message: "Share more images",
        time: "2 Day ago",
        propertyImage:IMAGES.projectpic2,
        title: "Apartment in Greenview Residences, Austin",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
    },
    {
        id: 2,
        name: "James Parker",
        message: "Hello",
        time: "5 Day ago",
        propertyImage:IMAGES.projectpic3,
        title: "Condo in Bayfront Towers, Miami",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
    },
    {
        id: 3,
        name: "Daniel Brooks",
        message: "Are you still interested?",
        time: "3 Month ago",
        propertyImage:IMAGES.projectpic4,
        title: "Villa in Lakeside Community, Chicago",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
    },
    {
        id: 4,
        name: "Samuel Turner",
        message: "Price negotiable",
        time: "6 Year",
        propertyImage:IMAGES.projectpic5,
        title: "Studio in Sunset Apartments, Los Angeles",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
    },
];


type MessagesScreenProps = StackScreenProps<RootStackParamList, 'Messages'>;

const Messages = ({ navigation } : MessagesScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <View style={{backgroundColor: colors.card, flex:1}}>
            <Header
                title={"My Chat"}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView
                contentContainerStyle={{flexGrow:1}}
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    {chatList.map((item, index) => {
                        return(
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SingleChat',{data : item })}
                                activeOpacity={0.8}
                                key={index}
                                style={{
                                    padding:10,
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                    borderRadius:10,
                                    elevation: 4,
                                    shadowColor: 'rgba(0,0,0,0.5)',
                                    shadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    shadowOpacity: .10,
                                    shadowRadius: 30,
                                    marginBottom:10
                                }}
                            >
                                <View style={[GlobalStyleSheet.flexcenter]}>
                                    <View
                                        style={[GlobalStyleSheet.center,{
                                            height:35,
                                            width:35,
                                            borderRadius:30,
                                            backgroundColor:theme.dark ? '#290B56': '#F5EFFF'
                                        }]}
                                    >
                                        <Image
                                            style={{height:16,width:16}}
                                            resizeMode='contain'
                                            tintColor={COLORS.primary}
                                            source={IMAGES.user2}
                                        />
                                    </View>
                                    <View style={{flex:1,marginLeft:10}}>
                                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>{item.name}</Text>
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>{item.message}</Text>
                                    </View>
                                    <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:'#FC3752'}]}>{item.time}</Text>
                                </View>
                                <View style={{height:1,backgroundColor:colors.gray20,marginVertical:10}}/>
                                <View>
                                    <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                                        <View
                                            style={{
                                                width:75,
                                                height:65,
                                                borderRadius:6,
                                                backgroundColor:'red',
                                                overflow:'hidden'
                                            }}
                                        >
                                            <Image
                                                source={item.propertyImage}
                                                style={{ width: "100%", height: "100%",borderRadius:6 }}
                                                resizeMode="cover"
                                            />
                                            <Image
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    borderRadius:6
                                                }}
                                                resizeMode='cover'
                                                source={IMAGES.Rectangle2}
                                            />
                                        </View>
                                        <View style={{flex:1,paddingRight:70}}>
                                            <Text numberOfLines={2} style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>{item.title}</Text>
                                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                    {item.bhk}
                                                </Text>
                                                <View style={{height:4,width:4,borderRadius:4,backgroundColor:colors.gray50}}/>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                    {item.price} {item.priceType} 
                                                </Text>
                                                <View style={{height:4,width:4,borderRadius:4,backgroundColor:colors.gray50}}/>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                    {item.area}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default Messages