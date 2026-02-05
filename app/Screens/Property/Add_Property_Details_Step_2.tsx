
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
import RentSelectBottomSheet, { BottomSheetRef } from '../../components/RentSelectBottomSheet';
import BottomSheetUnitSelect, { BottomSheetUnitRef } from '../../components/BottomSheetUnitSelect';

const areaUnits = [
  { label: 'sq.ft.', value: 'sqft' },
  { label: 'Sq.m', value: 'sqm' },
  { label: 'Sq.yard', value: 'yard' },
  { label: 'Acre', value: 'acre' },
  { label: 'Hectare', value: 'hectare' },
];

type PropertyDetailsStep2ScreenProps = StackScreenProps<RootStackParamList, 'PropertyDetailsStep2'>;

const PropertyDetailsStep2 = ({navigation } : PropertyDetailsStep2ScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const bedroomstabs = ["1", "2", "3", "4", "5", "6", "7+"];

    const [activeTab, setActiveTab] = useState(bedroomstabs[0]);

    const bathroomstabs = ["1", "2", "3", "4+"];

    const [activeTab1, setActiveTab1] = useState(bathroomstabs[0]);

    const Balconiestabs =  ["0","1", "2", "3", "4+"];

    const [activeTab2, setActiveTab2] = useState(Balconiestabs[0]);

    const Furnishtabs =  ["Furnished","Semi-furnished", "Unfurnished"];

    const [activeTab3, setActiveTab3] = useState(Furnishtabs[0]);

    const PropertyAgetabs =  ["0-1 Year","1-5 Year", "5-10 Year", "10+ Year"];

    const [activeTab4, setActiveTab4] = useState(PropertyAgetabs[0]);

    const Willingtabs =  ["Family","Single Women", "Single Men"];

    const [activeTab5, setActiveTab5] = useState(Willingtabs[0]);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerBackground = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: ['transparent', theme.dark ? '#3C0C81' : '#E0CAFF'],
        extrapolate: 'clamp',
    })

    const addMoreSheetRef = useRef<BottomSheetRef>(null);

    const addMoreOptions = [
        { label: "Price Negotiable", value: "negotiable" },
        { label: "Electricity & Water charges extra", value: "utility" },
        { label: "Maintenance extra", value: "maintenance" },
        { label: "Deposit Negotiable", value: "deposit" },
    ];

    const [rentTags, setRentTags] = useState<string[]>([]);
    const [expectedRent, setExpectedRent] = useState("");

    const sheetRef = useRef<BottomSheetUnitRef>(null);

    const [carpetArea, setCarpetArea] = useState("");
    const [selectedUnit, setSelectedUnit] = useState(areaUnits[0]);


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
                        style={{height:90,width:90}}
                        source={IMAGES.Propertyuser}
                        resizeMode='contain'
                    />
                    </View>
                    <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Add Property Details</Text>
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11}]}>STEP 2 OF 3</Text>
                    <View style={{marginTop:30}}>
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
                    <View style={{marginTop:5,flexDirection:'row',alignItems:'center',gap:5}}>
                        <Image
                            style={{height:16,width:16}}
                            source={IMAGES.mapgps}
                            resizeMode='contain'
                            tintColor={theme.dark ? '#9654F4': COLORS.primary}
                        />
                        <Text style={[FONTS.BodyS,FONTS.fontRegular,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Use my current location</Text>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>No. of bedrooms</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                            {bedroomstabs.map((data, index) => {
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
                                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
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
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>No. of bathrooms</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                            {bathroomstabs.map((data, index) => {
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
                                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
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
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Balconies</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Balconiestabs.map((data, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveTab2(data)}
                                        style={[GlobalStyleSheet.center,{
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },activeTab2 === data && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30
                                        }]}
                                    >
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab2 === data && {
                                        color:colors.gray80
                                        }]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Add Area Details</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>At least one area type is mandatory</Text>
                        <View style={{marginVertical:10}}>
                            <View style={[styles.wrapper, {  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder}]}>
                                <TextInput
                                    placeholder="Carpet Are"
                                    value={carpetArea}
                                    onChangeText={setCarpetArea}
                                    placeholderTextColor={colors.gray40}
                                    style={[styles.input, { color: colors.title }]}
                                    keyboardType="numeric"
                                />
    
                                <View style={[styles.divider, { backgroundColor: colors.checkBoxborder }]} />
    
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => sheetRef.current?.open()}
                                    style={{ flexDirection: "row", alignItems: "center" }}
                                >
                                    <Text style={[FONTS.BodyM, FONTS.fontRegular, { color: colors.gray40 }]}>
                                        {selectedUnit.label}
                                    </Text>
                                    <FeatherIcon name="chevron-down" size={16} color={colors.gray40} style={{ marginLeft: 15 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3}}
                            >
                                <FeatherIcon color={theme.dark ? '#9654F4': COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Add Built-up Area</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3,marginTop:5}}
                            >
                                <FeatherIcon color={theme.dark ? '#9654F4': COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Add Super Built-up Area </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Furnishing status</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Furnishtabs.map((data, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveTab3(data)}
                                        style={[GlobalStyleSheet.center,{
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },activeTab3 === data && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30
                                        }]}
                                    >
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab3 === data && {
                                        color:colors.gray80
                                        }]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Age of property</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {PropertyAgetabs.map((data, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveTab4(data)}
                                        style={[GlobalStyleSheet.center,{
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },activeTab4 === data && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30
                                        }]}
                                    >
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab4 === data && {
                                        color:colors.gray80
                                        }]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Floor Details</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Total no of floors and your floor details</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="Total Floors"
                                placeholderTextColor={colors.gray40}
                                style={[
                                styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3}}
                            >
                                <FeatherIcon color={COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:COLORS.primary}]}>Add Built-up Area</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3,marginTop:5}}
                            >
                                <FeatherIcon color={COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:COLORS.primary}]}>Add Super Built-up Area </Text>
                            </TouchableOpacity>
                        </View>    
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Willing to rent out to</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Willingtabs.map((data, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveTab5(data)}
                                        style={[GlobalStyleSheet.center,{
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },activeTab5 === data && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30
                                        }]}
                                    >
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab5 === data && {
                                        color:colors.gray80
                                        }]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Rent Details</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="Expected Rent"
                                placeholderTextColor={colors.gray40}
                                style={[
                                styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                                value={expectedRent}
                                onChangeText={setExpectedRent}
                            />
                        </View>
                        <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
                            {rentTags.map((tag, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    onPress={() => setExpectedRent(tag)} 
                                    style={[
                                        GlobalStyleSheet.center,
                                        {
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: colors.checkBoxborder,
                                            backgroundColor: COLORS.white,
                                            marginBottom:7,
                                            marginRight:7
                                        }
                                    ]}
                                >
                                    <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>
                                        {tag}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity
                            onPress={() => addMoreSheetRef.current?.open()}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.center,{
                                flexDirection:'row',
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor:colors.checkBoxborder,
                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                gap:5,
                                width:95
                            }]}
                        >
                            <FeatherIcon name='plus' size={12} color={theme.dark ? '#9654F4': COLORS.primary}/>
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Add more</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>What makes your property unique </Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Adding description will increase your listing visibility</Text>
                        <View style={[styles.wrapper, {height:null,backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="Expected Rent"
                                placeholderTextColor={colors.gray40}
                                style={[
                                    styles.input,
                                        {
                                            ...FONTS.BodyM,
                                            ...FONTS.fontRegular, 
                                            color: colors.title,
                                            textAlignVertical: "top",
                                            paddingTop: 12, 
                                            height:120
                                        }
                                    ]}
                                multiline
                            />
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <RentSelectBottomSheet
                ref={addMoreSheetRef}
                data={addMoreOptions}
                onSelect={(item) => setRentTags(prev => [...prev, item.label])}
            />
            <BottomSheetUnitSelect
                ref={sheetRef}
                data={areaUnits}
                onSelect={(item) => setSelectedUnit(item)}
            />
            <View style={[GlobalStyleSheet.container,{paddingBottom:25,paddingHorizontal:20}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => navigation.navigate('PropertyDetailsStep3')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor:COLORS.card,
        paddingHorizontal:10,
        borderRadius:6,
        borderWidth:1.5,
    },
    placeholderStyle: {
        color:COLORS.text,
        fontSize: 14,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    uploadButton:{
        height:50,
        borderRadius:8,
        borderWidth:1.5,
        borderStyle:'dashed',
        borderColor:COLORS.borderColor,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10
    },
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
    },
    divider: {
        width: 1,
        height: 29,
        marginHorizontal: 15,
    }
})

export default PropertyDetailsStep2