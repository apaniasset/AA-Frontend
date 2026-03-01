
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
import LocationDropdowns from '../../components/LocationDropdowns';

const areaUnits = [
  { label: 'sq.ft.', value: 'sqft' },
  { label: 'Sq.m', value: 'sqm' },
  { label: 'Sq.yard', value: 'yard' },
  { label: 'Acre', value: 'acre' },
  { label: 'Hectare', value: 'hectare' },
];

type PropertyDetailsStep2ScreenProps = StackScreenProps<RootStackParamList, 'PropertyDetailsStep2'>;

const FURNISH_MAP: Record<string, string> = { 'Furnished': 'Furnished', 'Semi-furnished': 'Semi-Furnished', 'Unfurnished': 'Unfurnished' };
const PROP_AGE_MAP: Record<string, string> = { '0-1 Year': '0-1', '1-5 Year': '1-5', '5-10 Year': '5-10', '10+ Year': '10+' };
const PREFERRED_TENANTS_MAP: Record<string, string> = { 'Family': 'Family', 'Single Women': 'Single Women', 'Single Men': 'Single Men' };
const inputStyle = (colors: any, theme: any) => [FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }];

const PropertyDetailsStep2 = ({ navigation, route }: PropertyDetailsStep2ScreenProps) => {

  const theme = useTheme();
  const { colors }: { colors: any } = theme;
  const step1Draft = route.params?.propertyDraft ?? {};

  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [locationText, setLocationText] = useState('');
  const [stateId, setStateId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);
  const [areaId, setAreaId] = useState<number | null>(null);
  const [salePrice, setSalePrice] = useState('');
  const [totalFloors, setTotalFloors] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(0);
  const [rentNegotiable, setRentNegotiable] = useState(0);
  const [maintenanceIncluded, setMaintenanceIncluded] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [facing, setFacing] = useState('');
  const [constructionStatus, setConstructionStatus] = useState('');
  const [landArea, setLandArea] = useState('');
  const [nearbyAreasText, setNearbyAreasText] = useState('');
  const [plotLength, setPlotLength] = useState('');
  const [plotBreadth, setPlotBreadth] = useState('');
  const [cornerPlot, setCornerPlot] = useState(0);
  const [fencingDone, setFencingDone] = useState(0);

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
                    <View style={{marginTop:20}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Address</Text>
                        <TextInput placeholder="e.g. Plot No. 12 Baner Road" placeholderTextColor={colors.gray50} value={address} onChangeText={setAddress}
                            style={[FONTS.BodyM,{ color:colors.title, backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth:1, borderColor:colors.checkBoxborder, borderRadius:10, paddingHorizontal:14, paddingVertical:12, marginTop:6 }]} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Address line 2</Text>
                        <TextInput placeholder="e.g. Opposite Metro Station" placeholderTextColor={colors.gray50} value={addressLine2} onChangeText={setAddressLine2}
                            style={[FONTS.BodyM,{ color:colors.title, backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth:1, borderColor:colors.checkBoxborder, borderRadius:10, paddingHorizontal:14, paddingVertical:12, marginTop:6 }]} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Landmark</Text>
                        <TextInput placeholder="e.g. Main Chowk" placeholderTextColor={colors.gray50} value={landmark} onChangeText={setLandmark}
                            style={[FONTS.BodyM,{ color:colors.title, backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth:1, borderColor:colors.checkBoxborder, borderRadius:10, paddingHorizontal:14, paddingVertical:12, marginTop:6 }]} />
                    </View>
                    <View style={{marginTop:10}}>
                        <LocationDropdowns onValuesChange={(v) => { setStateId(v.stateId); setCityId(v.cityId); setAreaId(v.areaId); }} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Zip / Pincode</Text>
                        <TextInput placeholder="e.g. 411045" placeholderTextColor={colors.gray50} value={zipCode} onChangeText={setZipCode} keyboardType="numeric"
                            style={[FONTS.BodyM,{ color:colors.title, backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth:1, borderColor:colors.checkBoxborder, borderRadius:10, paddingHorizontal:14, paddingVertical:12, marginTop:6 }]} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Location (area description)</Text>
                        <TextInput placeholder="e.g. Near Baner Bridge" placeholderTextColor={colors.gray50} value={locationText} onChangeText={setLocationText}
                            style={[FONTS.BodyM,{ color:colors.title, backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth:1, borderColor:colors.checkBoxborder, borderRadius:10, paddingHorizontal:14, paddingVertical:12, marginTop:6 }]} />
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Sale price (₹)</Text>
                        <TextInput placeholder="e.g. 9500000" placeholderTextColor={colors.gray50} value={salePrice} onChangeText={setSalePrice} keyboardType="numeric"
                            style={[FONTS.BodyM,{ color:colors.title, backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth:1, borderColor:colors.checkBoxborder, borderRadius:10, paddingHorizontal:14, paddingVertical:12, marginTop:6 }]} />
                    </View>
                    {/* body me nahi - Use my current location
                    <View style={{marginTop:5,flexDirection:'row',alignItems:'center',gap:5}}>
                        <Image style={{height:16,width:16}} source={IMAGES.mapgps} resizeMode='contain' tintColor={theme.dark ? '#9654F4': COLORS.primary} />
                        <Text style={[FONTS.BodyS,FONTS.fontRegular,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Use my current location</Text>
                    </View>
                    */}
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
                                    placeholder="Carpet area (sq.ft.)"
                                    value={carpetArea}
                                    onChangeText={setCarpetArea}
                                    placeholderTextColor={colors.gray40}
                                    style={[styles.input, { color: colors.title }]}
                                    keyboardType="numeric"
                                />
                                {/* body me unit nahi - unit selector
                                <View style={[styles.divider, { backgroundColor: colors.checkBoxborder }]} />
                                <TouchableOpacity activeOpacity={0.7} onPress={() => sheetRef.current?.open()} style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[FONTS.BodyM, FONTS.fontRegular, { color: colors.gray40 }]}>{selectedUnit.label}</Text>
                                    <FeatherIcon name="chevron-down" size={16} color={colors.gray40} style={{ marginLeft: 15 }} />
                                </TouchableOpacity>
                                */}
                            </View>
                        </View>
                        <View style={{marginTop:8}}>
                            <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Built-up / Super built-up area (sq.ft.)</Text>
                            <TextInput placeholder="e.g. 1350" placeholderTextColor={colors.gray40} value={builtUpArea} onChangeText={setBuiltUpArea} keyboardType="numeric"
                                style={[styles.wrapper, styles.input, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder, marginTop:6 }]} />
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
                            <TextInput placeholder="Total Floors" placeholderTextColor={colors.gray40} value={totalFloors} onChangeText={setTotalFloors}
                                style={[styles.input,{...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}]} keyboardType="numeric" />
                        </View>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginTop:8}]}>
                            <TextInput placeholder="Your floor number" placeholderTextColor={colors.gray40} value={floorNumber} onChangeText={setFloorNumber}
                                style={[styles.input,{...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}]} keyboardType="numeric" />
                        </View>
                        {/* body me nahi - Add area touchables
                        <View style={{marginBottom:10}}>
                            <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:3}}>
                                <FeatherIcon color={COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:COLORS.primary}]}>Add Built-up Area</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center',gap:3,marginTop:5}}>
                                <FeatherIcon color={COLORS.primary} size={14} name='plus'/>
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:COLORS.primary}]}>Add Super Built-up Area </Text>
                            </TouchableOpacity>
                        </View>
                        */}
                    </View>
                    {/* body me preferred_tenants hai but abhi draft me nahi bhej rahe - Willing to rent out to
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Willing to rent out to</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Willingtabs.map((data, index) => (
                                <TouchableOpacity key={index} onPress={() => setActiveTab5(data)}
                                    style={[GlobalStyleSheet.center,{ paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor:colors.checkBoxborder, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white },activeTab5 === data && { backgroundColor:colors.gray20, borderColor:colors.gray30 }]}>
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab5 === data && { color:colors.gray80 }]}>{data}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    */}
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Rent Details (optional)</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput placeholder="Expected Rent (₹)" placeholderTextColor={colors.gray40} value={expectedRent} onChangeText={setExpectedRent}
                                style={[styles.input,{...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}]} keyboardType="numeric" />
                        </View>
                        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:6}}>
                            <TouchableOpacity onPress={() => setPriceNegotiable(p => p ? 0 : 1)} style={[GlobalStyleSheet.center,{ paddingHorizontal:12, paddingVertical:8, borderRadius:8, borderWidth:1, borderColor:colors.checkBoxborder, backgroundColor: priceNegotiable ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}>
                                <Text style={[FONTS.BodyXS,{ color: priceNegotiable ? COLORS.white : colors.gray90 }]}>Price negotiable</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setRentNegotiable(p => p ? 0 : 1)} style={[GlobalStyleSheet.center,{ paddingHorizontal:12, paddingVertical:8, borderRadius:8, borderWidth:1, borderColor:colors.checkBoxborder, backgroundColor: rentNegotiable ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}>
                                <Text style={[FONTS.BodyXS,{ color: rentNegotiable ? COLORS.white : colors.gray90 }]}>Rent negotiable</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setMaintenanceIncluded(p => p ? 0 : 1)} style={[GlobalStyleSheet.center,{ paddingHorizontal:12, paddingVertical:8, borderRadius:8, borderWidth:1, borderColor:colors.checkBoxborder, backgroundColor: maintenanceIncluded ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}>
                                <Text style={[FONTS.BodyXS,{ color: maintenanceIncluded ? COLORS.white : colors.gray90 }]}>Maintenance included</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:12}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Security deposit (₹)</Text>
                        <TextInput placeholder="e.g. 100000" placeholderTextColor={colors.gray50} value={securityDeposit} onChangeText={setSecurityDeposit} keyboardType="numeric" style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Maintenance (₹)</Text>
                        <TextInput placeholder="e.g. 3000" placeholderTextColor={colors.gray50} value={maintenance} onChangeText={setMaintenance} keyboardType="numeric" style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Facing</Text>
                        <TextInput placeholder="e.g. East, West, North, South" placeholderTextColor={colors.gray50} value={facing} onChangeText={setFacing} style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Construction status</Text>
                        <TextInput placeholder="e.g. Ready to Move, Under Construction" placeholderTextColor={colors.gray50} value={constructionStatus} onChangeText={setConstructionStatus} style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Land area (sq.ft.)</Text>
                        <TextInput placeholder="e.g. 500" placeholderTextColor={colors.gray50} value={landArea} onChangeText={setLandArea} keyboardType="numeric" style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Nearby areas (comma-separated)</Text>
                        <TextInput placeholder="e.g. Aundh, Balewadi" placeholderTextColor={colors.gray50} value={nearbyAreasText} onChangeText={setNearbyAreasText} style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Plot length (ft)</Text>
                        <TextInput placeholder="e.g. 50" placeholderTextColor={colors.gray50} value={plotLength} onChangeText={setPlotLength} keyboardType="numeric" style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Plot breadth (ft)</Text>
                        <TextInput placeholder="e.g. 40" placeholderTextColor={colors.gray50} value={plotBreadth} onChangeText={setPlotBreadth} keyboardType="numeric" style={inputStyle(colors, theme)} />
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Corner plot / Fencing</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginTop:6}}>
                            <TouchableOpacity onPress={() => setCornerPlot(p => p ? 0 : 1)} style={[GlobalStyleSheet.center,{ paddingHorizontal:12, paddingVertical:8, borderRadius:8, borderWidth:1, borderColor:colors.checkBoxborder, backgroundColor: cornerPlot ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}>
                                <Text style={[FONTS.BodyXS,{ color: cornerPlot ? COLORS.white : colors.gray90 }]}>Corner plot</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFencingDone(p => p ? 0 : 1)} style={[GlobalStyleSheet.center,{ paddingHorizontal:12, paddingVertical:8, borderRadius:8, borderWidth:1, borderColor:colors.checkBoxborder, backgroundColor: fencingDone ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}>
                                <Text style={[FONTS.BodyXS,{ color: fencingDone ? COLORS.white : colors.gray90 }]}>Fencing done</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:12}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Willing to rent out to</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                            {Willingtabs.map((data) => (
                                <TouchableOpacity key={data} onPress={() => setActiveTab5(data)}
                                    style={[GlobalStyleSheet.center,{ paddingHorizontal:12, paddingVertical:10, borderRadius:10, borderWidth:1, borderColor:colors.checkBoxborder, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white },activeTab5 === data && { backgroundColor:colors.gray20, borderColor:colors.gray30 }]}>
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab5 === data && { color:colors.gray80 }]}>{data}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {/* body me nahi - rent tags, Add more, extra description
                    <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
                        {rentTags.map((tag, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => setExpectedRent(tag)}
                                style={[GlobalStyleSheet.center,{ paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: COLORS.white, marginBottom:7, marginRight:7 }]}>
                                <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => addMoreSheetRef.current?.open()} activeOpacity={0.8}
                        style={[GlobalStyleSheet.center,{ flexDirection:'row', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor:colors.checkBoxborder, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, gap:5, width:95 }]}>
                        <FeatherIcon name='plus' size={12} color={theme.dark ? '#9654F4': COLORS.primary}/>
                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Add more</Text>
                    </TouchableOpacity>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>What makes your property unique </Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Adding description will increase your listing visibility</Text>
                        <View style={[styles.wrapper, {height:null,backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput placeholder="Expected Rent" placeholderTextColor={colors.gray40} style={[styles.input,{...FONTS.BodyM,...FONTS.fontRegular, color: colors.title, textAlignVertical: "top", paddingTop: 12, height:120 }]} multiline />
                        </View>
                    </View>
                    */}
                </View>
            </Animated.ScrollView>
            {/* body me nahi - Add more / Unit select sheets
            <RentSelectBottomSheet ref={addMoreSheetRef} data={addMoreOptions} onSelect={(item) => setRentTags(prev => [...prev, item.label])} />
            <BottomSheetUnitSelect ref={sheetRef} data={areaUnits} onSelect={(item) => setSelectedUnit(item)} />
            */}
            <View style={[GlobalStyleSheet.container,{paddingBottom:25,paddingHorizontal:20}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => {
                      const parseNum = (s: string) => (s ? parseInt(s, 10) : undefined);
                      const bed = activeTab === '7+' ? 7 : parseNum(activeTab);
                      const bath = activeTab1 === '4+' ? 4 : parseNum(activeTab1);
                      const balc = activeTab2 === '4+' ? 4 : parseNum(activeTab2);
                      const step2Draft: Record<string, unknown> = {
                        ...step1Draft,
                        address: address.trim() || undefined,
                        address_line2: addressLine2.trim() || undefined,
                        landmark: landmark.trim() || undefined,
                        state: stateId ?? undefined,
                        city: cityId ?? undefined,
                        zip_code: zipCode.trim() || undefined,
                        location: locationText.trim() || undefined,
                        sale_price: parseNum(salePrice),
                        rent_price: parseNum(expectedRent),
                        bedrooms: bed,
                        bathrooms: bath,
                        balconies: balc,
                        floor_number: parseNum(floorNumber),
                        total_floors: parseNum(totalFloors),
                        furnishing_status: FURNISH_MAP[activeTab3],
                        property_age: PROP_AGE_MAP[activeTab4],
                        carpet_area: parseNum(carpetArea),
                        area_sqft: parseNum(carpetArea) || parseNum(builtUpArea),
                        area: parseNum(builtUpArea),
                        price_negotiable: priceNegotiable,
                        rent_negotiable: rentNegotiable,
                        maintenance_included: maintenanceIncluded,
                        security_deposit: parseNum(securityDeposit),
                        maintenance: parseNum(maintenance),
                        facing: facing.trim() || undefined,
                        construction_status: constructionStatus.trim() || undefined,
                        land_area: parseNum(landArea),
                        nearby_areas: nearbyAreasText.trim() ? nearbyAreasText.split(',').map(s => s.trim()).filter(Boolean) : undefined,
                        plot_length: parseNum(plotLength),
                        plot_breadth: parseNum(plotBreadth),
                        corner_plot: cornerPlot,
                        fencing_done: fencingDone,
                        preferred_tenants: PREFERRED_TENANTS_MAP[activeTab5] || undefined,
                      };
                      navigation.navigate('PropertyDetailsStep3', { propertyDraft: step2Draft });
                    }}
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