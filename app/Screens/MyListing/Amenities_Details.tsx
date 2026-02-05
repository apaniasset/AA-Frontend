import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";


type Props = {
    ref ?:any,
    ref2? :any, 
    flooring ?:any,  
    selectedwidth ?:any,  
}

const Amenities_Details = ({ref,ref2,flooring,selectedwidth} : Props)  => {

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

    const [width, setWidth] = useState("");

    return (
        <View style={{ flex: 1 }}>
            <View style={{marginTop:15}}>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Amenities</Text>
                <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                    {Amenitiestabs.map((data, index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveTab(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
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
                                style={[GlobalStyleSheet.center,styles.tab,{
                                    borderColor:colors.checkBoxborder,
                                    backgroundColor:  theme.dark ? COLORS.darkwhite : COLORS.white,
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
                                style={[GlobalStyleSheet.center,styles.tab,{
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Other Features</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {Featurestabs.map((data, index) => {
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Power Backup</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {PowerBackuptabs.map((data, index) => {
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Property facing</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {Propertyfacingtabs.map((data, index) => {
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Type of flooring</Text>
                <View style={{marginVertical:10}}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => ref.current?.open()}
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
                        style={[{flex:1, color: colors.title }]}
                        keyboardType="numeric"
                    />

                    <View style={[styles.divider, { backgroundColor: colors.checkBoxborder }]} />

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => ref2.current?.open()}
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text style={[FONTS.BodyM, FONTS.fontRegular, { color: colors.gray40 }]}>
                            {selectedwidth.label}
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

export default Amenities_Details