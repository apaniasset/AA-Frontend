import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';

type AddPropertyScreenProps = StackScreenProps<RootStackParamList, 'AddProperty'>;

const AddProperty = ({navigation } : AddPropertyScreenProps) => {

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
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow:1}}
          >
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:55}]}>
              <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Add Basic Details</Text>
              <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11}]}>STEP 1 OF 3</Text>
              <View style={{marginTop:20}}>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>You’re Looking to?</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                  {Lookingtabs.map((data, index) => {
                    return(
                      <TouchableOpacity
                        key={index}
                        onPress={() => setActiveTab(data)}
                        style={[GlobalStyleSheet.center,{
                          paddingHorizontal: 12,
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
              <View style={{marginTop:5}}>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>You’re Looking to?</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:7,paddingVertical:10}}>
                  {PropertyLokingtabs.map((data, index) => {
                    return(
                      <TouchableOpacity
                        key={index}
                        onPress={() => setActiveTab1(data)}
                        style={[GlobalStyleSheet.center,{
                          paddingHorizontal: 12,
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Select Property Type</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                  {PropertyTypestabs.map((data, index) => {
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
            </View>
          </ScrollView>
          <View style={[GlobalStyleSheet.container,{paddingBottom:5,paddingHorizontal:20}]}>
            <Button
              title='Next'
              btnRounded
              onPress={() => navigation.navigate('PropertyDetailsStep2')}
            />
          </View>
        </View>
    )
}

export default AddProperty