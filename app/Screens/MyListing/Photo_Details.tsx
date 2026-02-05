import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { pickVideo } from '../../components/useVideoPicker';
import { pickPhotos } from '../../components/usePhotoPicker';
import FeatherIcon from "react-native-vector-icons/Feather";
import CheckoutItems from '../../components/CheckoutItems';

type Props = {
    ref ?:any, 
    selectedValue ?:any,  
}

const Photo_Details =  ({ref,selectedValue} : Props) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

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

    const deposittabs = ["Fixed", "Multiple of Rent", "None"];
    
    const [activeTab, setActiveTab] = useState(deposittabs[0]);
    
    const Monthstabs = ["None", "1 month", "2 month", "3 month", "4 month", "5 month", "6 month"];
    
    const [activeTab1, setActiveTab1] = useState(Monthstabs[0]);
    
    const roomstabs =  ["Pooka Room","Study Room", "Servant Room", "Other"];
    
    const [activeTab2, setActiveTab2] = useState(roomstabs[0]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 15 }}>
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
                                        borderRadius: 5,
                                    }}
                                    resizeMode="cover"
                                />

                                {/* Delete Button */}
                                <TouchableOpacity
                                    onPress={handleRemoveVideo}
                                    activeOpacity={0.8}
                                    style={[styles.deletebutton]}
                                >
                                    <Image
                                        source={IMAGES.delete}
                                        style={{ width: 16, height: 16, tintColor: COLORS.danger }}
                                        resizeMode='contain'
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
                                style={[GlobalStyleSheet.center,styles.tab,{
                                        borderColor:colors.checkBoxborder,
                                        backgroundColor:  theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        onPress={() => ref.current?.open()}
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
                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray100}]}>Other rooms<Text style={{...FONTS.fontRegular,color:colors.gray50}}> (optional)</Text></Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                    {roomstabs.map((data, index) => {
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
    );
};

const styles = StyleSheet.create({
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
    },
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
})

export default Photo_Details;
