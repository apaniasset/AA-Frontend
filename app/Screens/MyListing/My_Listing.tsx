import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import Progresscircle from '../../components/Progresscircle';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import SortSheet from '../../components/BottomSheet/SortSheet';

const propertyList = [
    {
        id: '26801450',
        type: 'Rent',
        status: 'Active',
        images: [IMAGES.projectpic1],
        tags: ["Family", "Furnished", "Garden View", "Lift"],
        location: "Mumbai",
        title: '2 BHK Flat/Apartment in Greenview Residences, Austin',
        price: '$2,400',
        priceType: "Month",
        area: "1,250 Sqft",
        progress: 0.99,
        userName:'Ethan Walker',
        time: "2m ago",
    },
    {
        id: '26801450',
        type: 'For Sell',
        status: 'Close',
        images: [IMAGES.projectpic2],
        tags: ["Swimming Pool", "Gym", "Parking"],
        location: "Bangalore",
        title: '2 BHK Flat/Apartment in Greenview Residences, Austin',
        price: '$2,400',
        priceType: "Month",
        area: "1,250 Sqft",
        progress: 0.75,
        userName:'Ethan Walker',
        time: "2m ago",
    },
    {
        id: '26801450',
        type: 'Rent',
        status: 'Active',
        images: [IMAGES.projectpic3],
        location: "Gurugram",
        tags: ["Lake View", "Pet Friendly", "Security"],
        title: '2 BHK Flat/Apartment in Greenview Residences, Austin',
        price: '$2,400',
        priceType: "Month",
        area: "1,250 Sqft",
        progress: 0.10,
        userName:'Ethan Walker',
        time: "2m ago",
    }
];


type My_ListingScreenProps = StackScreenProps<RootStackParamList, 'My_Listing'>;

const My_Listing = ({ navigation } : My_ListingScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const sheetRef = useRef<any>(null);

    const dynamicSheetRef = useRef<any>(null);

    const [sortValue, setSortValue] = useState("Relevance");

    return (
         <View style={{ backgroundColor: colors.card, flex: 1 }}>
            <View 
                style={{padding:10,backgroundColor:colors.background}}
            >
                <View style={[GlobalStyleSheet.flexcenter]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                        style={[GlobalStyleSheet.headerBtn,{height:36,width:36}]}
                    >
                        <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
                    </TouchableOpacity>
                    <Text style={[FONTS.h5,FONTS.fontMedium,{color:colors.gray100,flex:1}]}>Active listing</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                GlobalStyleSheet.center,{
                                    flexDirection:'row',
                                    gap:2,
                                    paddingHorizontal:12,
                                    padding:10,
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                    borderRadius:10,
                                    borderWidth:1,
                                    borderColor:theme.dark ? '#565656': '#E2E4ED',
                                }
                            ]}
                            onPress={() => dynamicSheetRef.current.open({
                                title: "Sort By",
                                options: ["Relevance", "Price Low to High", "Price High to Low"],
                                selected: sortValue,
                                onSelect: (val: string) => setSortValue(val),
                            })}
                        >
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Sort</Text>
                            <FeatherIcon name='chevron-down' size={16} color={colors.gray40}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => sheetRef.current.openSheet()}
                            style={[GlobalStyleSheet.headerBtn,{
                                height:35,
                                width:35,
                                borderRadius:10,
                                borderWidth:1,
                                borderColor:theme.dark ? '#9654F4': COLORS.primary,
                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                            }]}
                        >
                            <Image
                                style={{height:16,width:16}}
                                resizeMode='contain'
                                source={IMAGES.filter2}
                                tintColor={theme.dark ? '#9654F4': COLORS.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <TextInput
                        style={[FONTS.BodyM,{
                            ...FONTS.fontMedium,
                            height:40,
                            borderRadius:8,
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            paddingHorizontal:20,
                            paddingRight:45,
                            color:colors.title,
                            position:'relative',
                            elevation:1,
                            borderWidth:1,
                            borderColor:colors.gray20
                        }]}
                        placeholder='Search Listing'
                        placeholderTextColor={colors.gray50}
                        autoFocus
                    />
                    <View
                        style={[GlobalStyleSheet.headerBtn,
                            {
                                borderRadius:15,
                                position:'absolute',
                                right:0,
                                top:-1,
                            }
                        ]}
                    >
                        <FeatherIcon name='search' size={20} color={colors.gray40}/>
                    </View>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View
                    style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20}]}
                >
                    {propertyList.map((data, index) => {
                        return(
                            <View
                                key={index}
                                style={[styles.card,{
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                }]}
                            >
                                <View style={[GlobalStyleSheet.flexcenter]}>
                                    <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                        <View
                                            style={{
                                                padding:2,
                                                paddingHorizontal:5,
                                                backgroundColor:data.type === 'For Sell' ? theme.dark ? '#480000' : '#F8EFF1': theme.dark ? '#0B3C0D': '#EFF8EF',
                                                borderRadius:4
                                            }}
                                        >
                                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:data.type === 'For Sell' ? theme.dark ? '#DA243D': '#FC3752':theme.dark ? '#D8FFDA' : '#267529'}]}>{data.type}</Text>
                                        </View>
                                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray50}]}><Text style={{color:colors.gray90}}>ID:</Text> {data.id}</Text>
                                    </View>
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:'#4FB954'}]}>{data.status}</Text>
                                </View>
                                <View style={{height:1,backgroundColor:colors.checkBoxborder,marginVertical:10}}/>
                                <View>
                                    <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                                        <View
                                            style={{
                                                width:115,
                                                height:90,
                                                borderRadius:6,
                                                backgroundColor:'red',
                                                overflow:'hidden'
                                            }}
                                        >
                                            <Image
                                                source={data.images[0]}
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
                                        <View style={{flex:1,paddingRight:60}}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('Property_Details',{data : data })}
                                                activeOpacity={0.8}
                                                style={{marginBottom:5}}
                                            >
                                                <Text numberOfLines={3} style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>{data.title}</Text>
                                            </TouchableOpacity>
                                            <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                    {data.price}/ {data.priceType} 
                                                </Text>
                                                <View style={{height:4,width:4,borderRadius:4,backgroundColor:colors.gray50}}/>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                    {data.area}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{height:1,backgroundColor:colors.checkBoxborder,marginVertical:10}}/>
                                <View style={[GlobalStyleSheet.flexcenter]}>
                                    <View style={[GlobalStyleSheet.flexcenter,{width:'40%',gap:5}]}>
                                        <Progresscircle progress={data.progress} />
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60,flex:1}]}>Posting Completion:</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Property_Details',{data : data })}
                                        activeOpacity={0.8}
                                        style={{
                                            padding: 8,
                                            paddingHorizontal: 15,
                                            backgroundColor: colors.checkBoxborder,
                                            borderRadius: 8,
                                            width:'60%'
                                        }}
                                    >
                                        <Text style={[FONTS.BodyS, FONTS.fontRegular, { color: colors.gray90,textAlign:'center' }]}>
                                            Manage Property
                                        </Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
            <FilterSheet
                ref={sheetRef}
            />
            <SortSheet
                ref={dynamicSheetRef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})

export default My_Listing