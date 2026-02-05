import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import FeatherIcon from "react-native-vector-icons/Feather";
import SidebarSheet from '../../components/BottomSheet/SidebarSheet';
import PropertyCard from '../../components/Card/PropertyCard';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import { useDispatch, useSelector } from 'react-redux';
import { addTosaveProperty, removeFromsaveProperty } from '../../redux/reducer/savePropertyReducer';
import Likebtn from '../../components/Likebtn';

const categories = [
  { id: 1, title: "All Type" },
  { id: 2, title: "House" },
  { id: 3, title: "Apartment" },
  { id: 4, title: "Hotels" },
  { id: 5, title: "Flat" },
  { id: 6, title: "Hostel" },
];

const propertyData = [
    {
        id: "1",
        title: "Maple Residency",
        type: "3 BHK Villa",
        area: "1650 sq ft",
        price: "$729K",
        location: "Mumbai",
        status: "Rent",
        tags: ["Family", "Furnished", "Garden View", "Lift"],
        time: "5m ago",
        images: [IMAGES.projectpic1],
        userName:"Ethan Walker",
    },
    {
        id: "2",
        title: "Lakeview Heights",
        type: "2 BHK Apartment",
        area: "1180 sq ft",
        tags: ["Swimming Pool", "Gym", "Parking"],
        price: "$525K",
        location: "Bangalore",
        status: "Sale",
        time: "12m ago",
        images: [IMAGES.projectpic2],
        userName:"Ethan Walker",
    },
    {
        id: "3",
        title: "Palm Paradise Home",
        type: "4 BHK Duplex",
        area: "2100 sq ft",
        price: "$899K",
        location: "Gurugram",
        status: "Rent",
        tags: ["Lake View", "Pet Friendly", "Security"],
        time: "2m ago",
        images:  [IMAGES.projectpic3],
        userName:"Ethan Walker",
    },
];

const categoriesData = [
    {
        id:"0",
        image:IMAGES.projectpic4,
        title:"Furnished"
    },
    {
        id:"1",
        image:IMAGES.projectpic3,
        title:"Semifurnished"
    },
    {
        id:"2",
        image:IMAGES.projectpic6,
        title:"Unfurnished"
    },
    {
        id:"3",
        image:IMAGES.projectpic4,
        title:"Furnished"
    },
    {
        id:"4",
        image:IMAGES.projectpic3,
        title:"Semifurnished"
    },
    {
        id:"5",
        image:IMAGES.projectpic6,
        title:"Unfurnished"
    },
]

const ReviewpropertyData = [
    {
        id:"4",
        images: [IMAGES.projectpic1],
        title: "Luxury 2 BHK Apartment in Greenview Residency",
        location: "Downtown Austin, Texas",
        price: "$2,400",
        status: "Ready to move",
        tags: ["Family", "Furnished", "Garden View", "Lift"],
        area: "1,250 Sqft",
        time: "2m ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    },
    {
        id: "5",
        images: [IMAGES.projectpic2, IMAGES.projectpic3],
        title: "Modern 3 BHK Villa with Open Terrace",
        location: "San Francisco, California",
        price: "$3,900",
        status: "Under Construction",
        tags: ["Swimming Pool", "Gym", "Parking"],
        area: "1,850 Sqft",
        time: "10m ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    },
    {
        id: "6",
        images: [IMAGES.projectpic4, IMAGES.projectpic5, IMAGES.projectpic6,IMAGES.projectpic2],
        title: "Premium Studio Apartment with Lake View",
        location: "Chicago, Illinois",
        price: "$1,500",
        status: "Available",
        tags: ["Lake View", "Pet Friendly", "Security"],
        area: "750 Sqft",
        time: "30m ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    },
    {
        id: "7",
        images: [IMAGES.projectpic3, IMAGES.projectpic1, IMAGES.projectpic4],
        title: "4 BHK Ultra Luxury Penthouse",
        location: "New York City, USA",
        price: "$6,800",
        status: "Ready to move",
        tags: ["Swimming Pool", "Private Lift", "Sky Lounge", "Smart Home"],
        area: "3,500 Sqft",
        time: "1h ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    }
];


type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation} : HomeScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [selected, setSelected] = useState(1);

    const sheetRef = useRef<any>(null);

    const filterRef = useRef<any>(null);

    const dispatch = useDispatch();

    const addItemTosaveProperty = (data: any) => {
        dispatch(addTosaveProperty(data));
    }

    const saveProperty = useSelector((state:any) => state.saveProperty.saveProperty);

    const inSaveProperty = () => {
        var temp = [] as any;
        saveProperty.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromsaveProperty = (data: any) => {
        dispatch(removeFromsaveProperty(data));
    }

    return (
        <View style={{backgroundColor: colors.card, flex:1}}>
            <View style={[GlobalStyleSheet.container, {
                backgroundColor:colors.background,
                paddingHorizontal:0,
                padding:20
            }]}>
                <View style={{paddingHorizontal:20}}>
                    <View 
                        style={[GlobalStyleSheet.flexcenter]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'flex-start',gap:15}]}>
                            <TouchableOpacity
                                onPress={() => sheetRef.current.open()}
                                activeOpacity={0.8}
                            >
                                <Image
                                    style={{
                                        height:16,
                                        width:24,
                                    }}
                                    tintColor={colors.gray90}
                                    resizeMode='contain'
                                    source={IMAGES.menu}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={[FONTS.BodyM,FONTS.fontBold,{color:colors.gray90}]}>Gurugram</Text>
                                <View style={[GlobalStyleSheet.center,{flexDirection:'row',gap:5}]}>
                                    <Image
                                        style={{height:13,width:13}}
                                        source={IMAGES.map}
                                        resizeMode='contain'
                                        tintColor={colors.gray70}
                                    />
                                    <Text style={[FONTS.BodyXS,{color:colors.gray70}]}>112, Golf Course Road</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Notification')}
                            style={[GlobalStyleSheet.center,{ 
                                padding: 5,
                                height:40,
                                width:40,
                                borderRadius:30,
                                position:'absolute',
                                right:-10
                            }]}
                        >
                            <Image
                                style={{width:20,height:20}}
                                resizeMode='contain'
                                source={IMAGES.bell2}
                                tintColor={colors.gray70}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingVertical:15}}>
                        <TextInput
                            style={[FONTS.BodyM,{
                                ...FONTS.fontMedium,
                                height:50,
                                borderRadius:8,
                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                paddingHorizontal:20,
                                paddingLeft:45,
                                color:colors.title,
                                position:'relative',
                                elevation:1.5
                            }]}
                            placeholder='Search Property'
                            placeholderTextColor={colors.gray50}
                            editable={false}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                            activeOpacity={0.8}
                            style={{
                                height:50,
                                width:'100%',
                                borderRadius:8,
                                position:'absolute',
                                top:15,
                                bottom:0,
                                left:0,
                                right:0,
                            }}
                        />
                        <View
                            style={[GlobalStyleSheet.headerBtn,
                                {
                                    borderRadius:15,
                                    position:'absolute',
                                    left:3,
                                    top:18,
                                }
                            ]}
                        >
                            <FeatherIcon name='search' size={20} color={colors.gray40}/>
                        </View>
                        <TouchableOpacity
                            onPress={() => filterRef.current.openSheet()}
                            activeOpacity={0.5}
                            style={[GlobalStyleSheet.headerBtn,
                                {
                                    position:'absolute',
                                    right:3,
                                    top:18,
                                    backgroundColor:colors.card
                                }
                            ]}
                        >
                            <Image style={{width:16,height:16}} source={IMAGES.filter2} resizeMode='contain' tintColor={colors.gray100}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:20}}
                >
                    <View style={{ flexDirection: "row", gap: 7 }}>
                        {categories.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setSelected(item.id)}
                                style={[{
                                    padding:10,
                                    paddingHorizontal:12,
                                    borderRadius:10,
                                    borderWidth:1,
                                    borderColor:theme.dark ? '#565656' : '#E2E4ED',
                                    backgroundColor:theme.dark ? COLORS.dark: COLORS.white
                                },selected === item.id && {
                                    backgroundColor:theme.dark ? '#9654F4': COLORS.primary,
                                    borderColor:theme.dark ? '#9654F4': COLORS.primary,
                                }]}
                            >
                                <Text 
                                    style={[
                                        FONTS.BodyXS,FONTS.fontMedium,{
                                            color:theme.dark ? COLORS.white: COLORS.dark
                                        },selected === item.id && {
                                            color:COLORS.white
                                        }
                                    ]}
                                >{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,paddingBottom:45}}
            >
                <View style={[GlobalStyleSheet.container,{flex:1,padding:0,paddingTop:20}]}>
                    <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20}]}>
                        <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:colors.gray100}]}>Recommended</Text>
                        <TouchableOpacity 
                            style={[GlobalStyleSheet.flexcenter,{gap:2}]}
                            onPress={() => navigation.navigate('My_Listing')}
                            activeOpacity={0.8}
                        >
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary}]}>View All</Text>
                            <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF': COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:5,marginBottom:15}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{marginHorizontal:20}}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginRight:40}}>
                                {/* Recommended Card */}
                                {propertyData.map((data, index) => {
                                    return(
                                        <View 
                                            key={index}
                                            style={[styles.card,{backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white}]}
                                        >
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height:null,
                                                    aspectRatio: 1 / 0.5,
                                                    borderRadius: 6,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Image
                                                    source={data.images[0]}
                                                    style={{ width: "100%", height: "100%" }}
                                                    resizeMode="cover"
                                                />
                            
                                                {/* Gradient / Overlay */}
                                                <Image
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        position: 'absolute',
                                                        left: 0,
                                                        right: 0
                                                    }}
                                                    resizeMode='cover'
                                                    source={IMAGES.Rectangle}
                                                />
                                                <View style={{
                                                    justifyContent: 'flex-end',
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    top: 0,
                                                    padding: 10,
                                                    paddingHorizontal: 13
                                                }}>
                                                    <View style={[GlobalStyleSheet.flexcenter, { flex: 1, alignItems: 'flex-start',justifyContent:'flex-end' }]}>
                            
                                                        {/* Heart Icon */}
                                                        <Likebtn
                                                            onPress={() => inSaveProperty().includes(data.id) ? removeItemFromsaveProperty(data.id) : addItemTosaveProperty(data)}
                                                            id={data.id}
                                                            inSaveProperty={inSaveProperty}
                                                        />
                                                    </View>
                            
                                                    {/* Rent + Time */}
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                                        <View
                                                            style={{
                                                                padding: 7,
                                                                borderRadius: 30,
                                                                backgroundColor: '#FC3752'
                                                            }}
                                                        >
                                                            <Text style={[FONTS.fontSemiBold, { fontSize: 11, color:COLORS.white }]}>
                                                                {data.status}
                                                            </Text>
                                                        </View>
                            
                                                        <View
                                                            style={{
                                                                padding: 7,
                                                                borderRadius: 30,
                                                                backgroundColor: colors.gray100
                                                            }}
                                                        >
                                                            <Text style={[FONTS.fontSemiBold, { fontSize: 11, color:theme.dark ? COLORS.darkwhite : COLORS.white  }]}>
                                                                {data.time}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{padding:10}}>
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={{marginBottom:5}}
                                                    onPress={() => navigation.navigate('Property_Details',{data : data })}
                                                >
                                                    <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray100}]}>{data.title}</Text>
                                                </TouchableOpacity>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70}]}>{data.type} | {data.area}</Text>
                                                <View style={{height:1,backgroundColor:colors.gray20,marginVertical:10}}/>
                                                <View style={[GlobalStyleSheet.flexcenter]}>
                                                    <Text style={[FONTS.BodyM,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>{data.price}</Text>
                                                    <View style={{flexDirection:'row',gap:2,alignItems:'flex-start'}}>
                                                        <Image
                                                            source={IMAGES.map}
                                                            style={{height:13,width:13}}
                                                            resizeMode='contain'
                                                            tintColor={colors.gray70}
                                                        />
                                                        <Text style={[FONTS.fontXs,FONTS.fontRegular,{color:colors.gray70}]}>{data.location}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20}]}>
                        <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:colors.gray100}]}>Homes by furnishing</Text>
                        <TouchableOpacity 
                            style={[GlobalStyleSheet.flexcenter,{gap:2}]}
                            onPress={() => navigation.navigate('My_Listing')}
                            activeOpacity={0.8}
                        >
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary}]}>View All</Text>
                            <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF': COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:8,marginBottom:15}}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{marginHorizontal:20}}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginRight:40}}>
                                {categoriesData.map((data, index) => {
                                    return(
                                        <View 
                                            style={{flexDirection:'column',alignItems:'center',gap:10}}
                                            key={index}
                                        >
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('My_Listing')}
                                                activeOpacity={0.8}
                                                style={[{
                                                    height:110,
                                                    width:110,
                                                    borderRadius:10,
                                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                                    padding:5,
                                                    elevation: 4,
                                                    shadowColor: 'rgba(0,0,0,0.5)',
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 0,
                                                    },
                                                    shadowOpacity: .10,
                                                    shadowRadius: 30,
                                                }]}
                                            >
                                                <View style={[GlobalStyleSheet.center,{overflow:'hidden',borderRadius:6,flex:1}]}>
                                                    <Image
                                                        style={{width:'100%',height:'100%'}}
                                                        resizeMode='cover'
                                                        source={data.image}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray100}]}>{data.title}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View>
                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20,marginBottom:10}]}>
                            <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Reviews by Residents</Text>
                            <TouchableOpacity 
                                style={[GlobalStyleSheet.flexcenter,{gap:2}]}
                                 onPress={() => navigation.navigate('My_Listing')}
                                 activeOpacity={0.8}
                            >
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary}]}>View All</Text>
                                <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF': COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal:15}}
                        >
                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                {ReviewpropertyData.map((item:any, index:any) =>{
                                    return(
                                        <View
                                            key={index}
                                            style={{width:350}}
                                        >
                                            <PropertyCard
                                                id={item.id}
                                                images={item.images}
                                                title={item.title}
                                                location={item.location}
                                                price={item.price}
                                                status={item.status}
                                                time={item.time}
                                                area={item.area}
                                                tags={item.tags}
                                                userName={item.userName}
                                                userPic={item.userPic}
                                                onPress={() => navigation.navigate('SingleChat',{data : item })}
                                                PropertyDetailsonPress={() => navigation.navigate('Property_Details',{data : item })}
                                                SavePropertyonPress={() => addItemTosaveProperty(item)}
                                            />
                                        </View>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <SidebarSheet
                ref={sheetRef}
            />
            <FilterSheet
                ref={filterRef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:COLORS.white,
        borderRadius: 10,
        padding:5,
        marginBottom: 10,
        width:280,
        elevation: 4,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .10,
        shadowRadius: 30,
    }
})

export default Home