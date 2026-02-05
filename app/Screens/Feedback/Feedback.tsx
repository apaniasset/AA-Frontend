import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type FeedbackScreenProps = StackScreenProps<RootStackParamList, 'Feedback'>;

const Feedback = ({navigation } : FeedbackScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const Feedbacktabs = ["i want to report a problam", "I have a suggestion", "I want to compliment", "Other"];
    
    const [activeTab, setActiveTab] = useState(Feedbacktabs[0]);

    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <Header
                title={'Feedback'}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >   
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:15}]}>
                    <Text style={[FONTS.h5,FONTS.fontMedium,{color:colors.gray100,marginBottom:10}]}>Your opinion helps us improve.</Text>
                    <View style={{marginVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Select Feedback</Text>
                        <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,marginTop:10}}>
                            {Feedbacktabs.map((data, index) => {
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
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
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
                    <View style={{marginVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Write your feedback</Text>
                        <View style={[styles.wrapper, {height:null,backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginTop:10}]}>
                            <TextInput
                                placeholder="Write"
                                placeholderTextColor={colors.gray40}
                                style={[
                                    styles.input,
                                        {
                                            ...FONTS.BodyM,
                                            ...FONTS.fontRegular, 
                                            color: colors.title,
                                            textAlignVertical: "top",
                                            paddingTop: 10, 
                                            height:120
                                        }
                                    ]}
                                multiline
                            />
                        </View>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Email Address</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginTop:10}]}>
                            <TextInput
                                placeholder="Expected Rent"
                                placeholderTextColor={colors.gray40}
                                style={[
                                    styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                            />
                        </View>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Name</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginTop:10}]}>
                            <TextInput
                                placeholder="Expected Rent"
                                placeholderTextColor={colors.gray40}
                                style={[
                                    styles.input,
                                    {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                ]}
                            />
                        </View>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Mobile Number</Text>
                        <View style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginTop:10}]}>
                            <TextInput
                                placeholder="Expected Rent"
                                placeholderTextColor={colors.gray40}
                                style={[
                                    styles.input,
                                        {...FONTS.BodyM,...FONTS.fontRegular, color: colors.title}
                                    ]}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                <Button
                    title='Send'
                    btnRounded
                    onPress={() => navigation.navigate('DrawerNavigation', {screen : 'Home'})}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
  })

export default Feedback