import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from '../../constants/Images';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type ContactOwnerScreenProps = StackScreenProps<RootStackParamList, 'ContactOwner'>;

const ContactOwner = ({navigation } : ContactOwnerScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [selected, setSelected] = useState("yes");

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
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow:1}}
          >
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:55}]}>
              <Text numberOfLines={2} style={[FONTS.h5,FONTS.fontMedium,{color:colors.gray100,paddingRight:150}]}>Enter your details to connect with the property owner.</Text>
              <View style={{alignItems:'center',paddingVertical:22}}>
                <View style={{alignItems:'center',marginBottom:10}}> 
                  <View
                    style={[GlobalStyleSheet.center,{
                      height:90,
                      width:90,
                      borderRadius:50,
                      backgroundColor:theme.dark ? '#290B56': '#E0CAFF'
                    }]}
                  >
                    <Image
                      style={{height:56,width:56}}
                      resizeMode='contain'
                      tintColor={'#B581FF'}
                      source={IMAGES.user2}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal:10,
                      paddingVertical:4,
                      borderRadius:20,
                      backgroundColor:theme.dark ? '#E0CAFF': '#3C0C81',
                      position:'absolute',
                      bottom:-5
                    }}
                  >
                    <Text style={[FONTS.BodyXS,FONTS.fontSemiBold,{color:theme.dark ? COLORS.darkwhite : COLORS.white}]}>Owner</Text>
                  </View>
                </View>
                <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:colors.gray90}]}>Ethan Walker</Text>
                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>+01 90XXXXXX12</Text>
              </View>
              <View style={{marginBottom:20}}>
                <CustomInput
                  placeholder={'Name'}
                  value={'Daniel Brooks'}
                />
                <CustomInput
                  placeholder={'Phone Number'}
                  value={'+01 123 456 7890'}
                />
                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary,marginTop:5}]}>Change Number</Text>
              </View>
              <View>
                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Are you Real Estate Agent</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:7,marginTop:10}}>
                  <TouchableOpacity
                    onPress={() => setSelected("yes")}
                    style={[GlobalStyleSheet.center,{
                      paddingHorizontal: 31.5,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: selected === "yes" ? colors.gray30 : colors.checkBoxborder,
                      backgroundColor: selected === "yes" ? colors.gray20 : theme.dark ? COLORS.darkwhite : COLORS.white,
                    }]}
                  >
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setSelected("no")}
                    style={[GlobalStyleSheet.center,{
                      paddingHorizontal: 31.5,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: selected === "no" ? colors.gray30 : colors.checkBoxborder,
                      backgroundColor: selected === "no" ? colors.gray20 : theme.dark ? COLORS.darkwhite : COLORS.white,
                    }]}
                  >
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={[GlobalStyleSheet.container,{paddingBottom:30,paddingHorizontal:20}]}>
            <Button
              title='Call'
              btnRounded
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
    )
}

export default ContactOwner