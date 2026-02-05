
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
import CheckoutItems from '../../components/CheckoutItems';
import SelectBottomSheet, { SelectBottomSheetRef } from '../../components/SelectBottomSheet';
import { pickVideo } from '../../components/useVideoPicker';
import { pickPhotos } from '../../components/usePhotoPicker';

const noticeMonths = [
  { label: "1 Month", value: 1 },
  { label: "2 Months", value: 2 },
  { label: "3 Months", value: 3 },
  { label: "6 Months", value: 6 },
  { label: "12 Month", value: 7 },
  { label: "24 Months", value: 8 },
  { label: "36 Months", value: 9 },
  { label: "48 Months", value: 10 },
];


type PropertyDetailsStep3ScreenProps = StackScreenProps<RootStackParamList, 'PropertyDetailsStep3'>;

const PropertyDetailsStep3 = ({navigation } : PropertyDetailsStep3ScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const deposittabs = ["Fixed", "Multiple of Rent", "None"];

    const [activeTab, setActiveTab] = useState(deposittabs[0]);

    const Monthstabs = ["None", "1 month", "2 month", "3 month", "4 month", "5 month", "6 month"];

    const [activeTab1, setActiveTab1] = useState(Monthstabs[0]);

    const roomstabs =  ["Pooka Room","Study Room", "Servant Room", "Other"];

    const [activeTab2, setActiveTab2] = useState(roomstabs[0]);

    const scrollY = useRef(new Animated.Value(0)).current;

    const headerBackground = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: ['transparent', theme.dark ? '#3C0C81' : '#E0CAFF'],
        extrapolate: 'clamp',
    })

    const sheetRef = useRef<SelectBottomSheetRef>(null);
    const [selectedValue, setSelectedValue] = useState<string>("");

    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    
    const handleUploadVideo = async () => {
        try {
            const video: any = await pickVideo();
            setSelectedVideo(video);
        } catch (error: any) {
            Alert.alert("Error", error);
        }
    };

    const handleRemoveVideo = () => {
        setSelectedVideo(null);
    };

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

    const handleRemovePhoto = (index: number) => {
        const updated = [...photos];
        updated.splice(index, 1);
        setPhotos(updated);
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
                            style={{height:90,width:90}}
                            source={IMAGES.Propertyuser}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={[FONTS.h4,FONTS.fontMedium,{color:colors.gray100}]}>Add Photo & Details</Text>
                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,fontSize:11}]}>STEP 3 OF 3</Text>
                    <View style={{marginTop:30}}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>
                            Add one property video
                        </Text>
                        <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: colors.gray50 }]}>
                            Properties with videos get higher page view
                        </Text>
                        <View
                            style={{
                                marginVertical: 10,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: colors.checkBoxborder,
                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                overflow: 'hidden'
                            }}
                        >
                            <View style={{ alignItems: 'center', paddingTop:selectedVideo ? 5 : 20, paddingHorizontal: 5 }}>
                                {selectedVideo ? (
                                    <View style={{ width: '100%', position: 'relative' }}>
        
                                        {/* Preview image */}
                                        <Image
                                            source={{ uri: selectedVideo.uri }}
                                            style={{
                                                height: 150,
                                                width: '100%',
                                                borderRadius: 10,
                                            }}
                                            resizeMode="cover"
                                        />
        
                                        {/* Delete Button */}
                                        <TouchableOpacity
                                            onPress={handleRemoveVideo}
                                            activeOpacity={0.8}
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                backgroundColor:'#FFE5E5',
                                                padding: 6,
                                                borderRadius: 50
                                            }}
                                        >
                                            <Image
                                                source={IMAGES.delete}
                                                style={{ width: 16, height: 16, tintColor: COLORS.white }}
                                            />
                                        </TouchableOpacity>
        
                                        <Text
                                            style={[
                                                FONTS.BodyXS,
                                                FONTS.fontRegular,
                                                { color: colors.gray70, marginTop: 10, marginBottom: 10, textAlign: 'center' }
                                            ]}
                                        >
                                            {selectedVideo.fileName || "Selected Video"}
                                        </Text>
                                    </View>
                                ) : (
                                    <>
                                        {/* Default UI */}
                                        <Image
                                            style={{ height: 28, width: 28 }}
                                            resizeMode='contain'
                                            source={IMAGES.video_upload}
                                        />
        
                                        <Text
                                            style={[
                                                FONTS.BodyXS,
                                                FONTS.fontRegular,
                                                {
                                                    color: colors.gray50,
                                                    textAlign: 'center',
                                                    marginTop: 10,
                                                    marginBottom: 18
                                                }
                                            ]}
                                        >
                                            Max size 100 mb in formats .mp4, .avi, .webm,
                                            .mov, .wmv, Max. duration 10min
                                        </Text>
                                    </>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={handleUploadVideo}
                                activeOpacity={0.8}
                                style={[
                                    GlobalStyleSheet.flexcenter,
                                    {
                                        justifyContent: 'center',
                                        gap: 5,
                                        paddingVertical: 10,
                                        backgroundColor: colors.checkBoxborder
                                    }
                                ]}
                            >
                                <Image
                                    style={{ height: 14, width: 14 }}
                                    resizeMode="contain"
                                    source={IMAGES.upload}
                                    tintColor={colors.gray90}
                                />
                                <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>
                                    Upload Video
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>
                            Add one property photos
                        </Text>
        
                        <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: colors.gray50 }]}>
                            Properties with Photos get higher page view
                        </Text>
                        <View
                            style={{
                                marginVertical: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.checkBoxborder,
                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                overflow: 'hidden'
                            }}
                        >
                            <View style={{ alignItems: 'center', paddingTop:photos.length === 0 ? 20 : 5, paddingHorizontal: 5 }}>
                                {photos.length === 0 ? (
                                    <>
                                        <Image
                                            style={{ height: 30, width: 30 }}
                                            resizeMode="contain"
                                            source={IMAGES.photos_upload}
                                        />
        
                                        <View style={{ paddingVertical: 17.5 }}>
                                            <Text
                                                style={[
                                                    FONTS.BodyXS,
                                                    FONTS.fontRegular,
                                                    { color: colors.gray50, textAlign: 'center' }
                                                ]}
                                            >
                                                Click from camera or browse to upload
                                            </Text>
                                        </View>
                                    </>
                                ) : (
                                    <View
                                        style={[styles.photocard]}
                                    >
                                        {photos.map((img, index) => (
                                            <View
                                                key={index}
                                                style={[styles.imagebox]}
                                            >
                                                <Image
                                                    source={{ uri: img.uri }}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: 5,
                                                    }}
                                                    resizeMode="cover"
                                                />
        
                                                {/* Delete Button */}
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    onPress={() => handleRemovePhoto(index)}
                                                    style={[styles.deletebutton]}
                                                >
                                                    <Image
                                                        source={IMAGES.delete}
                                                        style={{ width: 14, height: 14, tintColor: COLORS.danger }}
                                                        resizeMode='contain'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={handleUploadPhotos}
                                activeOpacity={0.8}
                                style={[
                                    GlobalStyleSheet.flexcenter,
                                    {
                                        justifyContent: "center",
                                        gap: 5,
                                        paddingVertical: 10,
                                        backgroundColor: colors.checkBoxborder,
                                    },
                                ]}
                            >
                                <Image
                                    style={{ height: 14, width: 14 }}
                                    resizeMode="contain"
                                    source={IMAGES.upload}
                                    tintColor={colors.gray90}
                                />
        
                                {photos.length === 0 ? (
                                    <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>
                                        Add at least 5 photos
                                    </Text>
                                ) : (
                                    <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>
                                        Add at least {photos.length}/5 photos
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Security deposit<Text style={{...FONTS.fontRegular,color:colors.gray50}}> (optional)</Text></Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {deposittabs.map((data, index) => {
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Duration of agreement<Text style={{...FONTS.fontRegular,color:colors.gray50}}> (optional)</Text></Text>
                        <View style={{marginVertical:10}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => sheetRef.current?.open()}
                                style={[styles.wrapper, { backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white, borderColor: colors.checkBoxborder}]}
                            >
                                <Text style={{...FONTS.BodyS,...FONTS.fontRegular, color:selectedValue ? colors.gray90 : colors.gray40,flex:1}}>{selectedValue || "Select"}</Text>
                                <FeatherIcon name={'chevron-down'} size={16} color={selectedValue ? colors.gray90 : colors.gray40} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Months of Notice</Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {Monthstabs.map((data, index) => {
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Other rooms<Text style={{...FONTS.fontRegular,color:colors.gray50}}> (optional)</Text></Text>
                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                            {roomstabs.map((data, index) => {
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
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Covered Parking <Text style={{...FONTS.fontRegular,color:colors.gray50}}> (optional)</Text></Text>
                        <View style={{marginVertical:10}}>
                            <CheckoutItems quantity={2}/>
                        </View>
                    </View>
                    <View style={{marginTop:5}}>
                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Open Parking</Text>
                        <View style={{marginVertical:10}}>
                            <CheckoutItems quantity={1}/>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
            <SelectBottomSheet
                ref={sheetRef}
                data={noticeMonths}
                onSelect={(item) => setSelectedValue(item.label)}
            />

            <View style={[GlobalStyleSheet.container,{paddingBottom:25,paddingHorizontal:20}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => navigation.navigate('Add_Amenities')}
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
    },
    deletebutton:{
        position: "absolute",
        top: 7,
        right: 9.5,
        backgroundColor:'rgba(255,229,229,.8)' ,
        width: 30,
        height: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    imagebox:{
        width: "32.33%",
        aspectRatio: 1.1,
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
    },
    photocard:{
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems:'center',
        justifyContent:'center',
        gap:5,
        paddingBottom: 10,
    }
})

export default PropertyDetailsStep3