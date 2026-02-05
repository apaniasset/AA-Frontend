import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../../constants/theme'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { useTheme } from '@react-navigation/native'

const Basic_Details = () => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const Lookingtabs = ["Sell", "Rent", "Paying Guest"];
    
    const [activeTab, setActiveTab] = useState(Lookingtabs[0]);

    const PropertyLokingtabs = ["Residential", "Commercial"];

    const [activeTab1, setActiveTab1] = useState(PropertyLokingtabs[0]);

    const PropertyTypestabs = [
        "Flat/Apartment", 
        "Builder Floor", 
        "Farm House", 
        "Independent House/Villa", 
        "Serviced Apartment", 
        "Studio Apartment", 
        "Other"
    ];

    const [activeTab2, setActiveTab2] = useState(PropertyTypestabs[0]);
    

    return (
        <View style={[{flex:1}]}>
            <View style={{marginTop:20}}>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>You’re Looking to?</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                    {Lookingtabs.map((data, index) => {
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
            </View>
            <View style={{marginTop:5}}>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>You’re Looking to?</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                    {PropertyLokingtabs.map((data, index) => {
                        return(
                            <TouchableOpacity
                                key={index}
                                onPress={() => setActiveTab1(data)}
                                style={[GlobalStyleSheet.center,styles.tab,{
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Select Property Type</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {PropertyTypestabs.map((data, index) => {
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

export default Basic_Details