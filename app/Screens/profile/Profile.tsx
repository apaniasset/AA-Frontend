import { View, Text, TouchableOpacity, ScrollView, Image, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from '../../constants/Images';
import CustomInput from '../../components/Input/CustomInput';
import { launchImageLibrary } from 'react-native-image-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ navigation } : ProfileScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [imageUri, setImageUri] = useState<any>(null);
    
    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
        }
        });
    };

    const scrollY = useRef(new Animated.Value(0)).current;
    
    const headerBackground = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: ['transparent', theme.dark ? '#3C0C81' : '#E0CAFF'],
        extrapolate: 'clamp',
    })

    return (
      <View style={{backgroundColor: colors.card, flex:1}}>
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
                    zIndex:9999
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
                  zIndex:999
                }]}
              >
                <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Onbording')}
                style={[GlobalStyleSheet.headerBtn,{
                  height:36,
                  width:36,
                  borderRadius:30,
                  position:'absolute',
                  right:15,
                  top:10,
                  zIndex:99
                }]}
              >
                <Image
                  style={{
                    height:18,
                    width:15
                  }}
                  resizeMode='contain'
                  source={IMAGES.delete}
                />
              </TouchableOpacity>
            </Animated.View>  
        </View>
        <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow:1,paddingBottom:150}}
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
        >
          <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:55}]}>
            <Text style={[FONTS.h5,FONTS.fontMedium,{color:colors.gray100}]}>Profile Details</Text>
            <View style={{alignItems:'center',paddingVertical:15,paddingBottom:5}}>
              <View
                style={[GlobalStyleSheet.center,{
                  height:90,
                  width:90,
                  borderRadius:50,
                  backgroundColor:theme.dark ? '#3C0C81': '#E0CAFF',
                  marginBottom:10
                }]}
              >
                <Image
                  style={{height:56,width:56}}
                  resizeMode='contain'
                  tintColor={theme.dark ? '#6B2DC5': '#B581FF'}
                  source={IMAGES.user2}
                />
              </View>
              <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:colors.gray90}]}>Ethan Walker</Text>
              <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>info@example.com</Text>
            </View>
            <View style={{marginBottom:10}}>
                <CustomInput
                  placeholder={'Your Name'}
                  value={'Ethan Walker'}
                  icon={<Image source={IMAGES.write} tintColor={colors.gray70} style={{height:16,width:16}} resizeMode='contain'/>}
                  editable={false}
                />
                <CustomInput
                  placeholder={'Your Email Address'}
                  value={'info@example.com'}
                  icon={<Image source={IMAGES.write} tintColor={colors.gray70} style={{height:16,width:16}} resizeMode='contain'/>}
                />
                <CustomInput
                  placeholder={'Primary Number 1'}
                  value={'01-123 456 7890'}
                  icon={<Image source={IMAGES.write} tintColor={colors.gray70} style={{height:16,width:16}} resizeMode='contain'/>}
                />
                <CustomInput
                  placeholder={'Primary Number 2'}
                  value={'+01 123 456 7890'}
                  icon={<Image source={IMAGES.write} tintColor={colors.gray70} style={{height:16,width:16}} resizeMode='contain'/>}
                />
                <CustomInput
                  placeholder={'Landline'}
                  value={'+01 123 456 7890'}
                  icon={<Image source={IMAGES.write} tintColor={colors.gray70} style={{height:16,width:16}} resizeMode='contain'/>}
                />
            </View>
            <View>
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Add photos</Text>
                <View style={{marginVertical:10,borderRadius:10,borderWidth:1,borderColor:colors.checkBoxborder,backgroundColor:theme.dark ? COLORS.dark: COLORS.white,overflow:'hidden'}}>
                    <View style={{ alignItems:'center', paddingTop:20, paddingHorizontal:20 }}>
                      {imageUri ?
                          <View style={{marginBottom:20}}>
                              <Image
                                  source={{ uri: imageUri }}
                                  style={{
                                      height: 80,
                                      width:100,
                                      borderRadius: 10,
                                      backgroundColor: "#eee",
                                  }}
                              />
                          </View>
                        :
                        <>
                            <Image
                                style={{ height:30, width:30 }}
                                resizeMode='contain'
                                source={IMAGES.photos_upload}
                            />

                            <View style={{ paddingVertical:17.5 }}>
                                <Text
                                    style={[
                                        FONTS.BodyXS,
                                        FONTS.fontRegular,
                                        { color: colors.gray50, textAlign:'center' }
                                    ]}
                                >
                                    Click from camera or browse to upload
                                </Text>
                            </View>
                        </>
                      }
                    </View>
                    <TouchableOpacity
                        onPress={pickImage}
                        activeOpacity={0.8} 
                        style={[GlobalStyleSheet.flexcenter,{justifyContent:'center',gap:5,paddingVertical:7.5,backgroundColor:colors.checkBoxborder}]}
                    >
                        <Image
                            style={{height:14,width:14}}
                            resizeMode='contain'
                            source={IMAGES.upload}
                            tintColor={colors.gray90}
                        />
                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Add photos</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    )
}

export default Profile