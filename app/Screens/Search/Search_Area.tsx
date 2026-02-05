import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, ImageBackground, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useRoute, useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import TabSlider from '../../components/TabSlider';
import CheckoutItems from '../../components/CheckoutItems';
import Button from '../../components/Button/Button';
import PropertySelect from '../../components/PropertySelect';


const LookingData = [
  { id: 1, title: "Rent" },
  { id: 2, title: "Buy" },
  { id: 3, title: "Commercial" }
];

const BedroomsData = [
  { id: 1, title: "1 BHK" },
  { id: 2, title: "2 BHK" },
  { id: 3, title: "3 BHK" },
  { id: 4, title: "4 BHK" },
  { id: 5, title: "4+ BHK" },
];

const PropertyTypesData = [
  { id: 1, title: "Flat/Apartment" },
  { id: 2, title: "Builder Floor" },
  { id: 3, title: "Farm House" },
  { id: 4, title: "Independent House/Villa" },
  { id: 5, title: "Serviced Apartment" },
];

const FurnishingData = [
  { id: 1, title: "Furnished" },
  { id: 2, title: "Semi-furnished" },
  { id: 3, title: "Unfurnished" }
];

const PostedData = [
  { id: 1, title: "Owner" },
  { id: 2, title: "Dealer" },
  { id: 3, title: "Builder" }
];

const AvailableforData = [
  { id: 1, title: "Family" },
  { id: 2, title: "Single Women" },
  { id: 3, title: "Single Men" }
];

const AmenitiesData = [
  { id: 1, title: "Parking" },
  { id: 2, title: "Power Backup" },
  { id: 3, title: "Lift" },
  { id: 4, title: "Club House" },
  { id: 5, title: "Pet Friendly" },
  { id: 6, title: "Swimming Pool" },
  { id: 7, title: "Security Personal" },
  { id: 8, title: "Gas Pipeline" },
  { id: 9, title: "Park" },
  { id: 10, title: "Gymnasium" },
  { id: 11, title: "Wheelchair Friendly" },
];

const Searchcategories = [
  { id: 1, title: "New York City" },
  { id: 2, title: "Los Angeles" },
];

const tabs = [
    { id: 0, title: "Buy" },
    { id: 1, title: "Rent" },
    { id: 2, title: "Commercial" },
];


type SearchAreaScreenProps = StackScreenProps<RootStackParamList, 'SearchArea'>;

const SearchArea = ({navigation ,route } : SearchAreaScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [Looking, setLooking] = React.useState<string[]>([]);

    const togglecategories = (option: string) => {
        if (Looking.includes(option)) {
            // Deselect if already Looking
            setLooking(Looking.filter(item => item !== option));
        } else {
            // Select if not already Looking
            setLooking([...Looking, option]);
        }
    };

    const [Bedrooms, setBedrooms] = React.useState<string[]>([]);

    const toggleBedrooms = (option: string) => {
        if (Bedrooms.includes(option)) {
            // Deselect if already Bedrooms
            setBedrooms(Bedrooms.filter(item => item !== option));
        } else {
            // Select if not already Bedrooms
            setBedrooms([...Bedrooms, option]);
        }
    };

    const [PropertyTypes, setPropertyTypes] = React.useState<string[]>([]);

    const togglePropertyTypes = (option: string) => {
        if (PropertyTypes.includes(option)) {
            // Deselect if already PropertyTypes
            setPropertyTypes(PropertyTypes.filter(item => item !== option));
        } else {
            // Select if not already PropertyTypes
            setPropertyTypes([...PropertyTypes, option]);
        }
    };

    const [Furnishing, setFurnishing] = React.useState<string[]>([]);

    const toggleFurnishing = (option: string) => {
        if (Furnishing.includes(option)) {
            // Deselect if already Furnishing
            setFurnishing(Furnishing.filter(item => item !== option));
        } else {
            // Select if not already Furnishing
            setFurnishing([...Furnishing, option]);
        }
    };

    const [Posted, setPosted] = React.useState<string[]>([]);

    const togglePosted = (option: string) => {
        if (Posted.includes(option)) {
            // Deselect if already Posted
            setPosted(Posted.filter(item => item !== option));
        } else {
            // Select if not already Posted
            setPosted([...Posted, option]);
        }
    };

    const [Availablefor, setAvailablefor] = React.useState<string[]>([]);

    const toggleAvailablefor = (option: string) => {
        if (Availablefor.includes(option)) {
            // Deselect if already Availablefor
            setAvailablefor(Availablefor.filter(item => item !== option));
        } else {
            // Select if not already Availablefor
            setAvailablefor([...Availablefor, option]);
        }
    };

    const [activeTab, setActiveTab] = useState(0);

    const { selectedCities = [] } = route.params ?? {};

    const [selected, setSelected] = useState<any[]>([]);

    useEffect(() => {
        if (selectedCities) {
            setSelected(selectedCities);
        }
    }, [selectedCities]);

    const removeSelected = (id: number) => {
        setSelected(prev => prev.filter(item => item.id !== id));
    };



    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,paddingBottom:150}}
            >
                <View style={[GlobalStyleSheet.container,{padding:20,paddingTop:25,flex:1}]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[GlobalStyleSheet.center,{
                            height:24,
                            width:24,
                            borderRadius:15,
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            position:'absolute',
                            right:20,
                            top:14
                        }]}
                    >
                        <FeatherIcon name='x' size={16} color={COLORS.danger}/>
                    </TouchableOpacity>
                    <TabSlider tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <View style={{marginBottom:5}}>
                        <TextInput
                            style={[FONTS.BodyM,{
                                ...FONTS.fontMedium,
                                height:50,
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
                                    right:3,
                                    top:3,
                                }
                            ]}
                        >
                            <FeatherIcon name='mic' size={20} color={colors.gray60}/>
                        </View>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <View style={{ flexDirection: "row", flexWrap:'wrap', gap: 7 }}>
                            {selected.map((item) => (
                                <View
                                    key={item.id}
                                    style={[
                                        GlobalStyleSheet.flexcenter,
                                        {
                                            gap: 5,
                                            padding: 10,
                                            paddingHorizontal: 12,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: colors.checkBoxborder,
                                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white
                                        }
                                    ]}
                                >
                                    <Text
                                        style={[
                                            FONTS.BodyXS,
                                            FONTS.fontMedium,
                                            { color: colors.gray90 }
                                        ]}
                                    >
                                        {item.title}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => removeSelected(item.id)}
                                        style={[
                                            GlobalStyleSheet.center,
                                            {
                                                height: 16,
                                                width: 16,
                                                borderRadius: 15,
                                                backgroundColor: theme.dark ? '#480000': '#F8EFF1'
                                            }
                                        ]}
                                    >
                                        <FeatherIcon name='x' size={12} color={theme.dark ? '#FFB7B7' : '#850000'} />
                                    </TouchableOpacity>

                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={{paddingVertical:10,paddingTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Looking to</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {LookingData.map((item : any) => {
                                const isLooking = Looking.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => togglecategories(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isLooking && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isLooking && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Budget in $</Text>
                        <View style={[GlobalStyleSheet.flexcenter,{flex:1}]}>
                            <View style={{flex:1}}>
                              <PropertySelect
                                label="No Min"
                                data={["No Min", "500", "1000", "5000", "10000", "20000",]}
                                onSelect={(value) => console.log("Selected:", value)}
                              />
                            </View>
                            <View style={{paddingHorizontal:14}}>
                              <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray40}]}>To</Text>
                            </View>
                            <View style={{flex:1}}>
                              <PropertySelect
                                label="No Max"
                                data={["No Max", "500", "1000", "5000", "10000", "20000",]}
                                onSelect={(value) => console.log("Selected:", value)}
                              />
                            </View>
                        </View>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>No. of Bedrooms</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {BedroomsData.map((item : any) => {
                                const isBedrooms = Bedrooms.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => toggleBedrooms(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isBedrooms && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isBedrooms && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Property Types</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {PropertyTypesData.map((item : any) => {
                                const isPropertyTypes = PropertyTypes.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => togglePropertyTypes(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isPropertyTypes && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isPropertyTypes && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Furnishing status</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {FurnishingData.map((item : any) => {
                                const isFurnishing = Furnishing.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => toggleFurnishing(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isFurnishing && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isFurnishing && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Posted</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {PostedData.map((item : any) => {
                                const isPosted = Posted.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => togglePosted(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isPosted && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isPosted && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Available for</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {AvailableforData.map((item : any) => {
                                const isAvailablefor = Availablefor.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => toggleAvailablefor(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isAvailablefor && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isAvailablefor && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Amenities</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {AmenitiesData.map((item : any) => {
                                const isAvailablefor = Availablefor.includes(item);
                                return(
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={item.id}
                                        onPress={() => toggleAvailablefor(item)}
                                        style={[GlobalStyleSheet.flexcenter,{
                                            gap:5,
                                            padding:10,
                                            paddingHorizontal:12,
                                            borderRadius:10,
                                            borderWidth:1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                                        },isAvailablefor && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30,
                                        }]}
                                    >
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isAvailablefor && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Area</Text>
                        <View style={[GlobalStyleSheet.flexcenter,{flex:1}]}>
                            <View style={{flex:1}}>
                              <PropertySelect
                                label="No Min"
                                data={["No Min", "500 M", "1 KM", "2 KM", "5 KM", "10 KM",]}
                                onSelect={(value) => console.log("Selected:", value)}
                              />
                            </View>
                            <View style={{paddingHorizontal:14}}>
                              <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.textLight}]}>To</Text>
                            </View>
                            <View style={{flex:1}}>
                              <PropertySelect
                                label="No Max"
                                data={["No Max", "500 M", "1 KM", "2 KM", "5 KM", "10 KM",]}
                                onSelect={(value) => console.log("Selected:", value)}
                              />
                            </View>
                        </View>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90,marginBottom:10}]}>Minimum No. of Bathrooms</Text>
                        <CheckoutItems quantity={2}/>
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingBottom:30,padding:20,backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white}]}>
                <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                    <View style={{flex:.6}}>
                        <Button
                          title='Clear All'
                          btnRounded
                          color={colors.card}
                          text={COLORS.danger}
                          onPress={() => navigation.goBack()}
                        />         
                    </View>
                    <View style={{flex:1}}>
                        <Button
                          title='Next'
                          btnRounded
                          onPress={() => navigation.navigate('Search_List')}
                        />         
                    </View>
                </View>
            </View>
        </View>
    )
}


export default SearchArea