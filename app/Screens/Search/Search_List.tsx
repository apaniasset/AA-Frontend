import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import PropertyCard from '../../components/Card/PropertyCard';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import SortSheet from '../../components/BottomSheet/SortSheet';
import { useDispatch } from 'react-redux';
import { addTosaveProperty } from '../../redux/reducer/savePropertyReducer';

const filterBtnData = [
    {
        id:"0",
        title:'Sort',
        icon:true
    },
    {
        id:"1",
        title:'Budget',
        icon:true
    },
    {
        id:"2",
        title:'BHK',
        icon:true
    },
    {
        id:"3",
        title:'Owner'
    },
    {
        id:"4",
        title:'Verified'
    },
]

const propertyData = [
    {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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


type Search_ListScreenProps = StackScreenProps<RootStackParamList, 'Search_List'>;

const Search_List = ({navigation } : Search_ListScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();
    
    const addItemTosaveProperty = (data: any) => {
        dispatch(addTosaveProperty(data));
    }

    const sheetRef = useRef<any>(null);

    const dynamicSheetRef = useRef<any>(null);

    const [sortValue, setSortValue] = useState("Relevance");
    const [budgetValue, setBudgetValue] = useState("");
    const [bhkValue, setBhkValue] = useState("");
    const [ownerValue, setOwnerValue] = useState("");
    const [verifiedValue, setVerifiedValue] = useState("");


    const handleFilterPress = (type: string) => {

        if (type === "Sort") {
            dynamicSheetRef.current.open({
                title: "Sort By",
                options: ["Relevance", "Price Low to High", "Price High to Low"],
                selected: sortValue,
                onSelect: (val: string) => setSortValue(val),
            });
        }

        if (type === "Budget") {
            dynamicSheetRef.current.open({
                title: "Budget",
                options: ["Under 10k", "10k - 20k", "20k - 30k", "30k+"],
                selected: budgetValue,
                onSelect: (val: string) => setBudgetValue(val),
            });
        }

        if (type === "BHK") {
            dynamicSheetRef.current.open({
                title: "BHK Type",
                options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
                selected: bhkValue,
                onSelect: (val: string) => setBhkValue(val),
            });
        }

        if (type === "Owner") {
            dynamicSheetRef.current.open({
                title: "Owner Listings",
                options: ["Owner Only", "All Listings"],
                selected: ownerValue,
                onSelect: (val: string) => setOwnerValue(val),
            });
        }

        if (type === "Verified") {
            dynamicSheetRef.current.open({
                title: "Verified Properties",
                options: ["Verified Only", "Show All"],
                selected: verifiedValue,
                onSelect: (val: string) => setVerifiedValue(val),
            });
        }
    };
    


    return (
       <View style={[{flex:1,backgroundColor:colors.card}]}>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:0,backgroundColor:colors.background}]}>
                <View style={[GlobalStyleSheet.flexcenter,{gap:14,marginBottom:10,paddingHorizontal:20,paddingLeft:10}]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} 
                        style={[GlobalStyleSheet.headerBtn,{height:36,width:36}]}
                    >
                        <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
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
                            placeholder='Enter Location'
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
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{gap:7,paddingHorizontal:20}]}>
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
                            <View style={{flexDirection:'row',alignItems:'center',gap:7}}>
                                {filterBtnData.map((data) => {
                                    return(
                                        <TouchableOpacity
                                            key={data.id}
                                            onPress={() => handleFilterPress(data.title)}
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
                                                    borderColor:colors.checkBoxborder,
                                                }
                                            ]}
                                        >
                                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>{data.title}</Text>
                                            {data.icon === true && 
                                                <FeatherIcon name='chevron-down' size={16} color={colors.gray40}/>
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                    {propertyData.map((item, index) =>{
                        return(
                            <View
                                key={index}
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
            <FilterSheet
                ref={sheetRef}
            />
            <SortSheet
                ref={dynamicSheetRef}
            />
        </View>
    )
}

export default Search_List