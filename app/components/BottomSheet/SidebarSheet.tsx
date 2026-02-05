import { useNavigation, useTheme } from "@react-navigation/native";
import React, { forwardRef } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import { IMAGES } from "../../constants/Images";
import LinearGradient from "react-native-linear-gradient";
import Button from "../Button/Button";
import FeatherIcon from "react-native-vector-icons/Feather";
import ThemeBtn from "../ThemeBtn";

const SidebarSheet = ({}, ref : any) => {

  const theme = useTheme();
  const { colors } : {colors : any } = theme;
  
  const navigation = useNavigation();

  return (
    <RBSheet
      ref={ref}
      closeOnPressMask={true}
      closeOnPressBack={true}
      height={790}
      openDuration={250}
      customStyles={{
        wrapper: { backgroundColor: "rgba(50,50,50,0.5)" },
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: colors.card,
        },
        draggableIcon: {
          backgroundColor: "#B7B7B7"
        },
      }}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={false}
      > 
        <View
          style={[GlobalStyleSheet.container,{padding:0}]}
        >
          <LinearGradient
            colors={ [theme.dark ? "#3C0C81": "#E0CAFF",theme.dark ? "#181818": "#F8F9FB"]}
            style={{
              width:'100%',
              height:200,
              position:'absolute',
              left:0,right:0,top:0,
              opacity:0.5
            }}
          />
          <TouchableOpacity
              onPress={() => ref.current.close()}
              style={[GlobalStyleSheet.center,{
                  height:24,
                  width:24,
                  borderRadius:15,
                  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                  position:'absolute',
                  right:20,
                  top:14
              }]}
          >
              <FeatherIcon name='x' size={16} color={COLORS.danger}/>
          </TouchableOpacity>
          <View style={{paddingHorizontal:15,paddingTop:15,flex:1}}>
            <View style={{flex:1}}>
              <View style={{flexDirection:'row',alignItems:'center',gap:15,marginBottom:15}}>
                <View style={{alignItems:'center',marginBottom:10}}> 
                    <View
                        style={[GlobalStyleSheet.center,{
                            height:50,
                            width:50,
                            borderRadius:50,
                            backgroundColor:'#E0CAFF'
                        }]}
                    >
                        <Image
                            style={{height:30,width:30}}
                            resizeMode='contain'
                            tintColor={theme.dark ? '#6B2DC5': '#B581FF'}
                            source={IMAGES.user2}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal:5,
                            paddingVertical:2,
                            borderRadius:20,
                            backgroundColor:theme.dark ? '#E0CAFF': '#3C0C81',
                            position:'absolute',
                            bottom:-5
                        }}
                    >
                        <Text style={[FONTS.BodyXS,FONTS.fontBold,{color:theme.dark ? COLORS.darkwhite : COLORS.white,lineHeight:15}]}>Owner</Text>
                    </View>
                </View>
                <View>
                    <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray90}]}>Ethan Walker</Text>
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:COLORS.primary}]}>Manage Profile</Text>
                </View>
              </View>
              <View style={{width:'100%',flexDirection:'row',alignItems:'center',gap:15,marginBottom:15}}>
                  <View 
                    style={[styles.card,{
                      backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                      borderColor:colors.checkBoxborder
                    }]}
                  > 
                    <TouchableOpacity 
                      style={{alignItems:'center'}}
                      onPress={() => navigation.navigate('My_Listing')}
                      activeOpacity={0.8}
                    >
                        <View
                            style={[GlobalStyleSheet.headerBtn,{
                                borderRadius:30,
                                borderWidth:1,
                                borderColor:colors.checkBoxborder
                            }]}
                        >
                            <Image
                                style={{height:24,width:24}}
                                resizeMode='contain'
                                source={IMAGES.house_building}
                                tintColor={theme.dark ? '#9654F4': COLORS.primary}
                            />
                        </View>
                        <View style={{marginTop:5,alignItems:'center'}}>
                            <Text numberOfLines={1} style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray70,textAlign:'center'}]}>Post Property</Text>
                            <Text numberOfLines={1} style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50,textAlign:'center'}]}>Sell Rent</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
                  <View 
                    style={[styles.card,{
                      backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                      borderColor:colors.checkBoxborder
                    }]}
                  >
                    <TouchableOpacity 
                      style={{alignItems:'center'}}
                      onPress={() => navigation.navigate('Search')}
                      activeOpacity={0.8}
                    >
                        <View
                            style={[GlobalStyleSheet.headerBtn,{
                                borderRadius:30,
                                borderWidth:1,
                                borderColor:colors.checkBoxborder
                            }]}
                        >
                            <Image
                                style={{height:24,width:24}}
                                resizeMode='contain'
                                source={IMAGES.search2}
                                tintColor={theme.dark ? '#9654F4': COLORS.primary}
                            />
                        </View>
                        <View style={{marginTop:5,alignItems:'center'}}>
                            <Text numberOfLines={1} style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray70,textAlign:'center'}]}>Search Property</Text>
                            <Text numberOfLines={1} style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50,textAlign:'center'}]}>Explore Now</Text>
                        </View>
                    </TouchableOpacity>
                  </View>
              </View>
              <View
                style={[styles.card,{
                  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                  borderColor:colors.checkBoxborder,
                  padding:0,
                  marginBottom:15
                }]}
              >
                <TouchableOpacity 
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,paddingVertical:12,gap:10,borderBottomWidth:1,borderColor:colors.checkBoxborder}
                  ]}
                  activeOpacity={0.8}
                  onPress={() => ref.current.close()}
                >
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Theme</Text>
                  <ThemeBtn/>
                </TouchableOpacity>
              </View>
              <View
                style={[styles.card,{
                  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                  borderColor:colors.checkBoxborder,
                  padding:0,
                  marginBottom:15
                }]}
              >
                <TouchableOpacity 
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10,borderBottomWidth:1,borderColor:colors.checkBoxborder}
                  ]}
                  activeOpacity={0.8}
                  onPress={() => ref.current.close()}
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.home}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10,borderBottomWidth:1,borderColor:colors.checkBoxborder}
                  ]}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Property_Response')} 
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.Contacts}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>View Responses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10}
                  ]}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('My_Listing')}
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.building}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Edit your listing</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray50,textTransform:'uppercase',marginBottom:5}]}>Manage App</Text>
              </View>
              <View
                style={[styles.card,{
                  backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                  borderColor:colors.checkBoxborder,
                  padding:0,
                  flex:1
                }]}
              >
                <TouchableOpacity 
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10,borderBottomWidth:1,borderColor:colors.checkBoxborder}
                  ]}
                  activeOpacity={0.8}
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.service}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Customer Services</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10,borderBottomWidth:1,borderColor:colors.checkBoxborder}
                  ]}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Settings')} 
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.settings}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Communication Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10,borderBottomWidth:1,borderColor:colors.checkBoxborder}
                  ]}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Feedback')}
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.Messages2}
                    tintColor={colors.gray40}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Share Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Write_Review')}
                  style={[GlobalStyleSheet.flexcenter,
                    {padding:15,gap:10}
                  ]}
                  activeOpacity={0.8}
                >
                  <Image
                    style={{height:18,width:18}}
                    resizeMode='contain'
                    source={IMAGES.help}
                  />
                  <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray80,flex:1}]}>Rate Our App</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View 
        style={[GlobalStyleSheet.container,{paddingBottom:5}]}
      >
        <Button
          title="Logout"
          btnRounded
          color={theme.dark ? COLORS.darkwhite : COLORS.white}
          text={theme.dark ? '#FF5C5C': COLORS.danger}
          outline
          onPress={() => navigation.navigate('Onbording')}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create(({
  card:{
    flex:1,
    padding:10,
    backgroundColor: COLORS.white,
    borderRadius:8,
    borderWidth:1
  }
}))

export default forwardRef(SidebarSheet);
