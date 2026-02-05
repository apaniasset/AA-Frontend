import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import TabHeader from './TabHeader';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const ReceivedData = [
    {
        id: 1,
        userName: "Ethan Walker",
        online: true,
        time: "2 Day ago",
        image:IMAGES.projectpic2,
        title: "Apartment in Greenview Residences, Austin",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
    {
        id: 2,
        userName: "James Parker",
        online: true,
        time: "5 Day ago",
        image:IMAGES.projectpic3,
        title: "Condo in Bayfront Towers, Miami",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
    {
        id: 3,
        userName: "Daniel Brooks",
        online: true,
        time: "3 Month ago",
        image:IMAGES.projectpic4,
        title: "Villa in Lakeside Community, Chicago",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
    {
        id: 4,
        userName: "Samuel Turner",
        online: true,
        time: "6 Year",
        image:IMAGES.projectpic5,
        title: "Studio in Sunset Apartments, Los Angeles",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
];

const SendData = [
    {
        id: 1,
        userName: "Ethan Walker",
        online: true,
        time: "2 Day ago",
        image:IMAGES.projectpic2,
        title: "Apartment in Greenview Residences, Austin",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
    {
        id: 2,
        userName: "James Parker",
        online: true,
        time: "5 Day ago",
        image:IMAGES.projectpic3,
        title: "Condo in Bayfront Towers, Miami",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
    {
        id: 3,
        userName: "Daniel Brooks",
        online: true,
        time: "3 Month ago",
        image:IMAGES.projectpic4,
        title: "Villa in Lakeside Community, Chicago",
        bhk: "2 BHK",
        price: "$2,400",
        priceType: "Month",
        area: "1,250 Sqft",
        type: 'Rent',
    },
];

type Property_ResponseScreenProps = StackScreenProps<RootStackParamList, 'Property_Response'>;

const Property_Response = ({navigation } : Property_ResponseScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <Header
                title={'Response'}
                leftIcon={'back'}
                titleLeft
            />
            <TabHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,paddingBottom:50}}
            >   
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:10}]}>
                    {activeTab === 0 ?
                        <View>
                            <Text style={[FONTS.BodyXS,FONTS.fontBold,{color:colors.gray90,marginBottom:10}]}><Text style={{color:COLORS.primary}}>{ReceivedData.length}</Text> Result</Text>
                            <View>
                                {ReceivedData.map((item, index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={[styles.card,{
                                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                            }]}
                                        >
                                            <View style={[GlobalStyleSheet.flexcenter]}>
                                                <View
                                                    style={[GlobalStyleSheet.center,styles.userbg,{backgroundColor:theme.dark ? '#290B56': '#F5EFFF'}]}
                                                >
                                                    <Image
                                                        style={{height:16,width:16}}
                                                        resizeMode='contain'
                                                        tintColor={COLORS.primary}
                                                        source={IMAGES.user2}
                                                    />
                                                </View>
                                                <View style={{flex:1,marginLeft:10}}>
                                                    <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>{item.userName}</Text>
                                                    {item.online === true ?  
                                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:'#4FB954'}]}>Active</Text>
                                                        :
                                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:'#FC3752'}]}>No Active</Text>
                                                    }
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
                                                            overflow:'hidden'
                                                        }}
                                                    >
                                                        <Image
                                                            source={item.image}
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
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => navigation.navigate('Property_Details',{data : item })}
                                                        >
                                                            <Text numberOfLines={2} style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>{item.title}</Text>
                                                        </TouchableOpacity>
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
                                            <View style={{height:1,backgroundColor:colors.gray20,marginVertical:10}}/>
                                            <View style={{ flex:1,flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Property_Details',{data : item })}
                                                    activeOpacity={0.8}
                                                    style={{
                                                        padding: 8,
                                                        paddingHorizontal: 15,
                                                        backgroundColor: colors.checkBoxborder,
                                                        borderRadius: 8,flex:1
                                                    }}
                                                >
                                                    <Text style={[FONTS.BodyS, FONTS.fontRegular, { color: colors.gray90,textAlign:'center' }]}>
                                                        View lead Detail
                                                    </Text>
                                                </TouchableOpacity>
                            
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={{
                                                        padding: 10.5,
                                                        backgroundColor: colors.checkBoxborder,
                                                        borderRadius: 8
                                                    }}
                                                    onPress={() => navigation.navigate('SingleChat',{data : item })}
                                                >
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        resizeMode='contain'
                                                        tintColor={colors.gray90}
                                                        source={IMAGES.Messages2}
                                                    />
                                                </TouchableOpacity>
                            
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('ContactOwner')}
                                                    activeOpacity={0.8}
                                                    style={{
                                                        padding: 10.5,
                                                        backgroundColor: COLORS.primary,
                                                        borderRadius: 8
                                                    }}
                                                >
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        resizeMode='contain'
                                                        tintColor={COLORS.white}
                                                        source={IMAGES.phone}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    :
                        <View>
                            <Text style={[FONTS.BodyXS,FONTS.fontBold,{color:colors.gray90,marginBottom:10}]}><Text style={{color:COLORS.primary}}>{SendData.length}</Text> Result</Text>
                            <View>
                                {SendData.map((item, index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={[styles.card,{
                                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                            }]}
                                        >
                                            <View style={[GlobalStyleSheet.flexcenter]}>
                                                <View
                                                    style={[GlobalStyleSheet.center,styles.userbg,{backgroundColor:theme.dark ? '#290B56': '#F5EFFF'}]}
                                                >
                                                    <Image
                                                        style={{height:16,width:16}}
                                                        resizeMode='contain'
                                                        tintColor={COLORS.primary}
                                                        source={IMAGES.user2}
                                                    />
                                                </View>
                                                <View style={{flex:1,marginLeft:10}}>
                                                    <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>{item.userName}</Text>
                                                    {item.online === true ?  
                                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:'#4FB954'}]}>Active</Text>
                                                        :
                                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:'#FC3752'}]}>No Active</Text>
                                                    }
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
                                                            overflow:'hidden'
                                                        }}
                                                    >
                                                        <Image
                                                            source={item.image}
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
                                                        <TouchableOpacity
                                                            activeOpacity={0.8}
                                                            onPress={() => navigation.navigate('Property_Details',{data : item })}
                                                        >
                                                            <Text numberOfLines={2} style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>{item.title}</Text>
                                                        </TouchableOpacity>
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
                                            <View style={{height:1,backgroundColor:colors.gray20,marginVertical:10}}/>
                                            <View style={{ flex:1,flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Property_Details',{data : item })}
                                                    activeOpacity={0.8}
                                                    style={{
                                                        padding: 8,
                                                        paddingHorizontal: 15,
                                                        backgroundColor: colors.checkBoxborder,
                                                        borderRadius: 8,flex:1
                                                    }}
                                                >
                                                    <Text style={[FONTS.BodyS, FONTS.fontRegular, { color: colors.gray90,textAlign:'center' }]}>
                                                        View lead Detail
                                                    </Text>
                                                </TouchableOpacity>
                            
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={{
                                                        padding: 10.5,
                                                        backgroundColor: colors.checkBoxborder,
                                                        borderRadius: 8
                                                    }}
                                                    onPress={() => navigation.navigate('SingleChat',{data : item })}
                                                >
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        resizeMode='contain'
                                                        tintColor={colors.gray90}
                                                        source={IMAGES.Messages2}
                                                    />
                                                </TouchableOpacity>
                            
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('ContactOwner')}
                                                    activeOpacity={0.8}
                                                    style={{
                                                        padding: 10.5,
                                                        backgroundColor: COLORS.primary,
                                                        borderRadius: 8
                                                    }}
                                                >
                                                    <Image
                                                        style={{ height: 15, width: 15 }}
                                                        resizeMode='contain'
                                                        tintColor={COLORS.white}
                                                        source={IMAGES.phone}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create(({
    card:{
        padding:10,
        backgroundColor: COLORS.white,
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
    },
    userbg:{
        height:35,
        width:35,
        borderRadius:30,
        backgroundColor:'#F5EFFF'
    }
}))

export default Property_Response