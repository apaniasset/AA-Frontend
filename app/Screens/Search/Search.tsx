import { View, Text, ScrollView, TextInput, Image, TouchableOpacity, ImageBackground, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from '../../constants/Images';
import TabSlider from '../../components/TabSlider';
import Button from '../../components/Button/Button';

const SearchContant = [
    'Modern 2BHK Apartment – New York City',
    '3-Bed Family Home – Houston',
    'Tech-District Condo – San Francisco'
]

const categories = [
  { id: 1, title: "New York City" },
  { id: 2, title: "Los Angeles" },
  { id: 3, title: "Chicago" },
  { id: 4, title: "Houston" },
  { id: 5, title: "Phoenix" },
  { id: 6, title: "Philadelphia" },
  { id: 7, title: "San Diego" },
  { id: 8, title: "San Francisco" },
  { id: 9, title: "Dallas" },
  { id: 10, title: "Miami" },
];


type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;

const Search = ({navigation} : SearchScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [selected, setselected] = React.useState<string[]>([]);

    const togglecategories = (option: string) => {
        if (selected.includes(option)) {
            // Deselect if already selected
            setselected(selected.filter(item => item !== option));
        } else {
            // Select if not already selected
            setselected([...selected, option]);
        }
    };

    const slideAnim = useRef(new Animated.Value(100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (selected.length > 0) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 100,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [selected]);
    

    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View style={[GlobalStyleSheet.container,{padding:20,flex:1}]}>
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
                            <FeatherIcon name='mic' size={20} color={theme.dark ? colors.gray60 : COLORS.primary}/>
                        </View>
                    </View>
                    <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'flex-start',paddingVertical:10,gap:5}]}>
                        <Image
                            style={{
                                height:16,
                                width:16
                            }}
                            resizeMode='contain'
                            source={IMAGES.mapgps}
                            tintColor={theme.dark ? '#9654F4': COLORS.primary}
                        />
                        <Text style={[FONTS.BodyS,{color:theme.dark ? '#9654F4': COLORS.primary}]}>Use my current location</Text>
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100,marginBottom:15}]}>Last Searched...</Text>
                        {SearchContant.map((item,index) => {
                            return(
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.8}
                                    style={[GlobalStyleSheet.flexcenter,{
                                        borderBottomWidth:1,
                                        paddingBottom:10,
                                        borderColor:colors.checkBoxborder,
                                        marginBottom:10
                                    }]}
                                >
                                    <View style={{flexDirection:'row',gap:8}}>
                                        <Image
                                            style={{height:14,width:14}}
                                            resizeMode='contain'
                                            source={IMAGES.clock}
                                            tintColor={colors.gray50}
                                        />
                                        <Text style={[FONTS.fontXs,{color:colors.gray90,opacity:.9}]}>{item}</Text>
                                    </View>
                                    <FeatherIcon name='arrow-up-right' size={16} color={colors.gray40}/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{paddingVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100,marginBottom:10}]}>Popular Cities in USA</Text>
                        <View style={{ flexDirection: "row",flexWrap:'wrap', gap: 7 }}>
                            {categories.map((item : any) => {
                                const isSelected = selected.includes(item);
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
                                        },isSelected && {
                                            borderColor:colors.gray30,
                                            backgroundColor:colors.gray20
                                        }]}
                                    >
                                        <FeatherIcon name='plus' size={14} color={isSelected ? colors.gray80 : colors.gray50}/>
                                        <Text 
                                            style={[
                                                FONTS.BodyXS,FONTS.fontMedium,{
                                                    color:colors.gray100
                                                },isSelected && {
                                                    color:colors.gray80 
                                                }
                                            ]}
                                        >{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Animated.View
                style={{
                    transform: [{ translateY: slideAnim }],
                    opacity: opacityAnim,
                }}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:30}]}>
                    <Button
                        title='Next'
                        btnRounded
                        onPress={() => navigation.navigate('SearchArea', {
                            selectedCities: selected  
                        })}
                    />
                </View>
            </Animated.View>
        </View>
    )
}


export default Search