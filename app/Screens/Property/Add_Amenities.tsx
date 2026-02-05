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
import SelectBottomSheet, { SelectBottomSheetRef } from '../../components/SelectBottomSheet';
import BottomSheetUnitSelect, { BottomSheetUnitRef } from '../../components/BottomSheetUnitSelect';


const flooringTypes = [
  { label: "Vitrified Tiles", value: "vitrified" },
  { label: "Ceramic Tiles", value: "ceramic" },
  { label: "Marble Flooring", value: "marble" },
  { label: "Granite Flooring", value: "granite" },
  { label: "Wooden Flooring", value: "wooden" },
  { label: "Italian Marble", value: "italian_marble" },
  { label: "Mosaic Flooring", value: "mosaic" },
  { label: "Stone Flooring", value: "stone" },
  { label: "Cement Flooring", value: "cement" },
  { label: "Laminate Flooring", value: "laminate" },
  { label: "PVC/Vinyl Flooring", value: "vinyl" },
  { label: "Carpet Flooring", value: "carpet" },
  { label: "Other", value: "other" }
];

const areaUnits = [
  { label: 'Feet', value: 'feet' },
  { label: 'Meters', value: 'meter' },
  { label: 'Sq.ft.', value: 'sqft' },
  { label: 'Sq.m', value: 'sqm' },
  { label: 'Yards', value: 'yard' },
];



type Add_AmenitiesScreenProps = StackScreenProps<RootStackParamList, 'Add_Amenities'>;

const Add_Amenities = ({navigation } : Add_AmenitiesScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const Amenitiestabs = ["Maintenance Staff", "Water Storage", "Security", "Visitor Parking", "Park", "Intercom Facility", "Lift"];

    const [activeTab, setActiveTab] = useState(Amenitiestabs[0]);

    const WaterSourcetabs = ["Municipal corporation", "Borewell", "24*7 Water"];

    const [activeTab1, setActiveTab1] = useState(WaterSourcetabs[0]);

    const Overlookingtabs =  ["Pool","Park/Garden", "Club", "Main Road", "Sea Facing", "Others"];

    const [activeTab2, setActiveTab2] = useState(Overlookingtabs[0]);

    const Featurestabs =  ["In a gated society","Corner Property", "Pet-Friendly", "Wheelchair friendly"];

    const [activeTab3, setActiveTab3] = useState(Featurestabs[0]);

    const PowerBackuptabs =  ["None","Partial", "Full"];

    const [activeTab4, setActiveTab4] = useState(PowerBackuptabs[0]);

    const Propertyfacingtabs =  ["North","East", "West", "South", "North-East", "North-West", "South-East","South-West"];

    const [activeTab5, setActiveTab5] = useState(Propertyfacingtabs[0]);

    const Locationtabs =  ["Close to metro station","Close to school", "Close to Hospital", "Close to market", "Close to Railway Station"];

    const [activeTab6, setActiveTab6] = useState(Locationtabs[0]);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerBackground = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: ['transparent', theme.dark ? '#3C0C81' : '#E0CAFF'],
        extrapolate: 'clamp',
    })

    const sheetRef = useRef<SelectBottomSheetRef>(null);
    const [flooring, setFlooring] = useState<string>("");

    const sheet2Ref = useRef<BottomSheetUnitRef>(null);

    const [width, setWidth] = useState("");
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
                    <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Add Amenities</Text>
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11}]}>Amenities, Features and USP of your property</Text>
                    <View style={{marginTop:30}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Amenities</Text>
                        <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                            {Amenitiestabs.map((data, index) => {
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
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity
                                // onPress={() => refRBSheet.current.open()} 
                                activeOpacity={0.5}
                                style={{flexDirection:'row',alignItems:'center',gap:3}}
                            >
                                <FeatherIcon color={theme.dark ? '#9654F4': COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Add more amenities</Text>
                            </TouchableOpacity>
                        </View>    
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Water Source</Text>
                        <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                            {WaterSourcetabs.map((data, index) => {
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
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Overlooking</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Overlookingtabs.map((data, index) => {
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
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Other Features</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Featurestabs.map((data, index) => {
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Power Backup</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {PowerBackuptabs.map((data, index) => {
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Property facing</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Propertyfacingtabs.map((data, index) => {
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Type of flooring</Text>
                        <View style={{marginVertical:10}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => sheetRef.current?.open()}
                                style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder}]}
                            >
                                <Text style={{...FONTS.BodyS,...FONTS.fontRegular, color:flooring ? colors.gray90 : colors.gray40,flex:1}}>{flooring || "Select"}</Text>
                                <FeatherIcon name={'chevron-down'} size={16} color={flooring ? colors.gray90 : colors.gray40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Width of facing road</Text>
                        <View style={[styles.wrapper, {  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10 }]}>
                            <TextInput
                                placeholder="Enter the width"
                                value={width}
                                onChangeText={setWidth}
                                placeholderTextColor={colors.gray40}
                                style={[styles.input, { color: colors.title }]}
                                keyboardType="numeric"
                            />

                            <View style={[styles.divider, { backgroundColor: colors.checkBoxborder }]} />

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => sheet2Ref.current?.open()}
                                style={{ flexDirection: "row", alignItems: "center" }}
                            >
                                <Text style={[FONTS.BodyM, FONTS.fontRegular, { color: colors.gray40 }]}>
                                    {selectedUnit.label}
                                </Text>
                                <FeatherIcon name="chevron-down" size={16} color={colors.gray40} style={{ marginLeft: 15 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Location Advantages</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Locationtabs.map((data, index) => {
                                return(
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setActiveTab6(data)}
                                        style={[GlobalStyleSheet.center,{
                                            paddingHorizontal: 12,
                                            paddingVertical: 10,
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor:colors.checkBoxborder,
                                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                            },activeTab6 === data && {
                                            backgroundColor:colors.gray20,
                                            borderColor:colors.gray30
                                        }]}
                                    >
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab6 === data && {
                                            color:colors.gray80
                                        }]}>{data}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <SelectBottomSheet
                ref={sheetRef}
                data={flooringTypes}
                onSelect={(item) => setFlooring(item.label)}
            />
            <BottomSheetUnitSelect
                ref={sheet2Ref}
                data={areaUnits}
                onSelect={(item) => setSelectedUnit(item)}
            />
            <View style={[GlobalStyleSheet.container,{paddingBottom:25,paddingHorizontal:20}]}>
                <Button
                    title='Save and Submit'
                    btnRounded
                    onPress={() => navigation.navigate('My_Listing')}
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

export default Add_Amenities