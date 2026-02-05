import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Animated, Alert } from 'react-native'
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
import StarRating from '../../components/StarRating';
import { pickPhotos } from '../../components/usePhotoPicker';


type Write_Review_stap_2ScreenProps = StackScreenProps<RootStackParamList, 'Write_Review_stap_2'>;

const Write_Review_stap_2 = ({navigation } : Write_Review_stap_2ScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const positivestabs = ["Good Public Transport", "No Traffic Jam Nearby", "Good Hospitals are nearby", "Safe at Night"];

    const [activeTab, setActiveTab] = useState(positivestabs[0]);

    const negativestabs = ["Poor Public Transport", "Frequent Traffic Jams", "No Hospitals Nearby", "Deserted at Night"];

    const [activeTab1, setActiveTab1] = useState(negativestabs[0]);


    const scrollY = useRef(new Animated.Value(0)).current;

    const headerBackground = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: ['transparent', theme.dark ? '#3C0C81' : '#E0CAFF'],
        extrapolate: 'clamp',
    })

    const [rating , setRating] = useState(4);
    const [rating1 , setRating1] = useState(0);
    const [rating2 , setRating2] = useState(0);
    const [rating3 , setRating3] = useState(0);

    const [photos, setPhotos] = useState<any[]>([])
    
    const handleUploadPhotos = async () => {
        try {
            const remaining = 5 - photos.length;

            if (remaining <= 0) {
                Alert.alert("Limit reached", "You can upload a maximum of 5 photos.");
                return;
            }

            const result: any = await pickPhotos(remaining); // your image picker
            setPhotos(prev => [...prev, ...result]);
        } catch (error: any) {
            console.log(error);
        }
    };

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
                            style={{height:108,width:100}}
                            source={theme.dark ? IMAGES.DarkUserReview : IMAGES.UserReview}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Your thoughts on</Text>
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11}]}><Text style={{color:theme.dark ? '#9654F4': COLORS.primary}}>Location:</Text> Downtown Austin, Texas</Text>
                    <View style={{marginTop:30}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Connectivity & Commute</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Availability of public or private conveyance</Text>
                        <View style={{ marginTop: 10 }}>
                            <StarRating rating={rating} onChange={setRating} />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Lifestyle & Facilities</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>How is the quality of life and necessary services</Text>
                        <View style={{ marginTop: 10 }}>
                            <StarRating rating={rating1} onChange={setRating1} />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Safety & Security</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Do you feel safe at all times in this locality?</Text>
                        <View style={{ marginTop: 10 }}>
                            <StarRating rating={rating2} onChange={setRating2} />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Environment</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>How calm, hygienic & soothing are the surroundings?</Text>
                        <View style={{ marginTop: 10 }}>
                            <StarRating rating={rating3} onChange={setRating3} />
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>What do you like about this locality?</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Confused what to write?</Text>
                        <View style={[styles.wrapper, {height:null,backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="Please share your positive experiences regarding the availability of commute options, basic and luxury amenities, safety and security, as well as greenery and parks."
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
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Select positives</Text>
                        <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                            {positivestabs.map((data, index) => {
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
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>What do you dislike about this locality?</Text>
                        <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>Confused what to write?</Text>
                        <View style={[styles.wrapper, {height:null,backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder,marginVertical:10}]}>
                            <TextInput
                                placeholder="Please share your experiences related to the lack of amenities, parking issues, market accessibility, pollution, water, electricity, and other concerns."
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
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Select positives</Text>
                        <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:7,paddingVertical:10}}>
                            {negativestabs.map((data, index) => {
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
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Add photos</Text>
                        <View style={{marginVertical:10,borderRadius:10,borderWidth:1,borderColor:colors.checkBoxborder,backgroundColor:theme.dark ? COLORS.dark: COLORS.white,overflow:'hidden'}}>
                            <View style={{ alignItems:'center', paddingTop:20, paddingHorizontal:20 }}>
                                {photos.length === 0 ? (
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
                                ) : (
                                    <View style={{ width:'100%', flexDirection:'row', flexWrap:'wrap', gap:10,marginBottom:10 }}>

                                        {photos.map((img, index) => (
                                            <Image
                                                key={index}
                                                source={{ uri: img.uri }}
                                                style={{
                                                    height: 55,
                                                    width: 57,
                                                    borderRadius: 10,
                                                    backgroundColor: "#eee",
                                                }}
                                            />
                                        ))}
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={handleUploadPhotos}
                                activeOpacity={0.8} 
                                style={[GlobalStyleSheet.flexcenter,{justifyContent:'center',gap:5,paddingVertical:7.5,backgroundColor:colors.checkBoxborder}]}
                            >
                                <Image
                                    style={{height:14,width:14}}
                                    resizeMode='contain'
                                    source={IMAGES.upload}
                                />
                                {photos.length === 0 ? 
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Add at least 5 photos</Text>
                                :
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Add at least {photos.length} /5 photos</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingBottom:25,paddingHorizontal:20}]}>
                <Button
                    title='Post Review'
                    btnRounded
                    onPress={() => {navigation.goBack(); navigation.goBack()}}
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

export default Write_Review_stap_2