import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import FeatherIcon from "react-native-vector-icons/Feather";

type Props = {
    ref ?:any,  
    ref2 ?:any,  
    rentTags ?:any,  
    selectedUnit ?:any,  
}

const Property_Details = ({ref,ref2,rentTags,selectedUnit} : Props) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const bedroomstabs = ["1", "2", "3", "4", "5", "6", "7+"];
        
    const [activeTab3, setActiveTab3] = useState(bedroomstabs[0]);

    const bathroomstabs = ["1", "2", "3", "4+"];
        
    const [activeTab4, setActiveTab4] = useState(bathroomstabs[0]);

    const Balconiestabs =  ["0","1", "2", "3", "4+"];

    const [activeTab5, setActiveTab5] = useState(Balconiestabs[0]);
    
    const Furnishtabs =  ["Furnished","Semi-furnished", "Unfurnished"];
    
    const [activeTab6, setActiveTab6] = useState(Furnishtabs[0]);
    
    const PropertyAgetabs =  ["0-1 Year","1-5 Year", "5-10 Year", "10+ Year"];
    
    const [activeTab7, setActiveTab7] = useState(PropertyAgetabs[0]);
    
    const Willingtabs =  ["Family","Single Women", "Single Men"];
    
    const [activeTab8, setActiveTab8] = useState(Willingtabs[0]);
    
    const [carpetArea, setCarpetArea] = useState("");
    const [expectedRent, setExpectedRent] = useState("");

    return (
        <View style={[{flex:1}]}>
            <View style={{marginTop:15}}>
                <TextInput
                    style={[FONTS.BodyM,styles.input,{
                        backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                        color:colors.title,
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
                    <FeatherIcon name='mic' size={20} color={colors.gray50}/>
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
                                onPress={() => setActiveTab3(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
                                        borderColor:colors.checkBoxborder,
                                        backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>No. of bathrooms</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                    {bathroomstabs.map((data, index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveTab4(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Balconies</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {Balconiestabs.map((data, index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveTab5(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
                                    borderColor:colors.checkBoxborder,
                                    backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Add Area Details</Text>
                <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>At least one area type is mandatory</Text>
                <View style={{marginVertical:10}}>
                    <View style={[styles.wrapper, {  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder}]}>
                        <TextInput
                            placeholder="Carpet Are"
                            value={carpetArea}
                            onChangeText={setCarpetArea}
                            placeholderTextColor={colors.gray40}
                            style={[{flex:1,color: colors.title }]}
                            keyboardType="numeric"
                        />

                        <View style={[styles.divider, { backgroundColor: colors.checkBoxborder }]} />

                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => ref2.current?.open()}
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
                        activeOpacity={0.5}
                        style={{flexDirection:'row',alignItems:'center',gap:3}}
                    >
                        <FeatherIcon color={theme.dark ? '#9654F4': COLORS.primary} size={14} name='plus'/>
                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Add Built-up Area</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
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
                                onPress={() => setActiveTab6(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
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
            <View style={{marginTop:5}}>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Age of property</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {PropertyAgetabs.map((data, index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveTab7(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
                                    borderColor:colors.checkBoxborder,
                                    backgroundColor:  theme.dark ? COLORS.darkwhite : COLORS.white,
                                    },activeTab7 === data && {
                                    backgroundColor:colors.gray20,
                                    borderColor:colors.gray30
                                }]}
                            >
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab7 === data && {
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
                        style={[{...FONTS.BodyM,...FONTS.fontRegular, color: colors.title,flex:1}]}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{marginBottom:10}}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{flexDirection:'row',alignItems:'center',gap:3}}
                    >
                        <FeatherIcon color={COLORS.primary} size={14} name='plus'/>
                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:COLORS.primary}]}>Add Built-up Area</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
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
                                onPress={() => setActiveTab8(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
                                    borderColor:colors.checkBoxborder,
                                    backgroundColor:  theme.dark ? COLORS.darkwhite : COLORS.white,
                                    },activeTab8 === data && {
                                    backgroundColor:colors.gray20,
                                    borderColor:colors.gray30
                                }]}
                            >
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90},activeTab8 === data && {
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
                        style={[{...FONTS.BodyM,...FONTS.fontRegular, color: colors.title,flex:1}]}
                        value={expectedRent}
                        onChangeText={setExpectedRent}
                    />
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap"}}>
                    {rentTags.map((tag:any, index:any) => (
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
                                    backgroundColor:  theme.dark ? COLORS.darkwhite : COLORS.white,
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
                    onPress={() => ref.current?.open()}
                    activeOpacity={0.8}
                    style={[GlobalStyleSheet.center,{
                        flexDirection:'row',
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor:colors.checkBoxborder,
                        backgroundColor:  theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        style={[{
                                ...FONTS.BodyM,
                                ...FONTS.fontRegular, 
                                color: colors.title,
                                textAlignVertical: "top",
                                paddingTop: 12, 
                                height:120,
                                flex:1
                            }]}
                        multiline
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tab:{
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    input:{
        ...FONTS.fontMedium,
        height:50,
        borderRadius:8,
        backgroundColor: COLORS.white,
        paddingHorizontal:20,
        paddingRight:45,
        color:COLORS.title,
        position:'relative',
        elevation:1,
        borderWidth:1
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

export default Property_Details