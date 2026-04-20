
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet, Animated, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { pickPhotos, ensureFileUriForMultipart } from '../../components/usePhotoPicker';
import { storeProperty, PropertyStoreRequest, PropertyImageAsset, DEFAULT_PROPERTY_COUNTRY_ID } from '../../services/properties';
import { amenityLabelsToIds } from '../../utils/amenityIds';
import { getStep3FieldErrors, getStep3DraftBanner, PROPERTY_FIELD_MAX, clampLength, digitsOnly, type Step3FieldErrors } from '../../utils/propertyFormValidation';

const MAX_PROPERTY_PHOTOS = 10;

function resolveLocalImageUri(p: { uri?: string; path?: string; originalPath?: string }): string | undefined {
    const raw = [p.uri, p.path, p.originalPath].find((x) => typeof x === 'string' && x.length > 0);
    return raw ? ensureFileUriForMultipart(raw) : undefined;
}

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

const AMENITY_OPTIONS = ['Swimming Pool', 'Gym', 'Power Backup', 'Parking', 'Security', 'Garden', 'Clubhouse', 'Lift'];

const PropertyDetailsStep3 = ({ navigation, route }: PropertyDetailsStep3ScreenProps) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const draft = route.params?.propertyDraft ?? {};

    const [videoUrl, setVideoUrl] = useState('');
    const [propertyIdCustom, setPropertyIdCustom] = useState('');
    const [reraNumber, setReraNumber] = useState('');
    const [possessionDate, setPossessionDate] = useState('');
    const [constructionStartDate, setConstructionStartDate] = useState('');
    const [amenityTags, setAmenityTags] = useState<string[]>([]);
    const [noBrokerage, setNoBrokerage] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [pgType, setPgType] = useState('');
    const [totalBeds, setTotalBeds] = useState('');
    const [availableBeds, setAvailableBeds] = useState('');
    const [roomType, setRoomType] = useState('');
    const [foodFacility, setFoodFacility] = useState(0);
    const [gateClosingTime, setGateClosingTime] = useState('');
    const [laundry, setLaundry] = useState(0);
    const [wifi, setWifi] = useState(0);
    const [cabins, setCabins] = useState('');
    const [workstations, setWorkstations] = useState('');
    const [washroomsPrivate, setWashroomsPrivate] = useState('');
    const [washroomsShared, setWashroomsShared] = useState('');
    const [loadingDock, setLoadingDock] = useState(0);
    const [lockInPeriod, setLockInPeriod] = useState('');
    const [ceilingHeight, setCeilingHeight] = useState('');
    const [suitableFor, setSuitableFor] = useState('');
    const [frontageWidth, setFrontageWidth] = useState('');
    const [visibilityType, setVisibilityType] = useState('');
    const [truckEntry, setTruckEntry] = useState(0);
    const [roadWidth, setRoadWidth] = useState('');
    const [coveredArea, setCoveredArea] = useState('');
    const [soilType, setSoilType] = useState('');
    const [waterSource, setWaterSource] = useState('');
    const [roadAccess, setRoadAccess] = useState(0);
    const [distanceFromHighway, setDistanceFromHighway] = useState('');
    const [landType, setLandType] = useState('');
    const [authorityApproved, setAuthorityApproved] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [naPlot, setNaPlot] = useState(0);
    const [encumbranceFree, setEncumbranceFree] = useState(0);
    const [privateGarden, setPrivateGarden] = useState(0);
    const [servantRoom, setServantRoom] = useState(0);
    const [storeRoom, setStoreRoom] = useState(0);

    const inputStyle = [FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }];
    const parseNum = (s: string) => (s ? parseInt(s, 10) : undefined);

    const deposittabs = ["Fixed", "Multiple of Rent", "None"];

    const [activeTab, setActiveTab] = useState(deposittabs[0]);

    const Monthstabs = ["None", "1 month", "2 month", "3 month", "4 month", "5 month", "6 month"];

    const [activeTab1, setActiveTab1] = useState(Monthstabs[0]);

    const roomstabs = ["Pooka Room", "Study Room", "Servant Room", "Other"];

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

    const [photos, setPhotos] = useState<any[]>([]);
    const [fieldErrors, setFieldErrors] = useState<Step3FieldErrors>({});

    const handleUploadPhotos = async () => {
        try {
            const remaining = MAX_PROPERTY_PHOTOS - photos.length;

            if (remaining <= 0) {
                Alert.alert("Limit reached", `You can upload a maximum of ${MAX_PROPERTY_PHOTOS} photos.`);
                return;
            }
            const result: any = await pickPhotos(remaining);
            const batch = Array.isArray(result) ? result : result ? [result] : [];
            setPhotos(prev => [...prev, ...batch]);
        } catch (error: any) {
            if (error !== 'User cancelled') {
                Alert.alert('Photos', typeof error === 'string' ? error : 'Could not add photos.');
            }
        }
    };

    const handleRemovePhoto = (index: number) => {
        const updated = [...photos];
        updated.splice(index, 1);
        setPhotos(updated);
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
            <View style={[{ flex: 1, backgroundColor: colors.card }]}>
                <View style={[GlobalStyleSheet.container, { padding: 0 }]}>
                    <LinearGradient
                        colors={[theme.dark ? "#3C0C81" : "#E0CAFF", theme.dark ? "#181818" : "#F8F9FB"]}
                        style={{
                            width: '100%',
                            height: 185,
                            position: 'absolute',
                            left: 0, right: 0, top: 0
                        }}
                    />
                <Animated.View
                    style={{
                        width: '100%',
                        height: 56,
                        backgroundColor: headerBackground,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        zIndex: 999
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                        style={[GlobalStyleSheet.headerBtn, {
                            height: 36,
                            width: 36,
                            borderRadius: 30,
                            backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                            position: 'absolute',
                            left: 20,
                            top: 10,
                            zIndex: 99
                        }]}
                    >
                        <FeatherIcon name='arrow-left' size={20} color={colors.gray90} />
                    </TouchableOpacity>
                </Animated.View>
            </View>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            >
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 55 }]}>
                    <View
                        style={{
                            position: 'absolute',
                            right: 25,
                            top: 20
                        }}
                    >
                        <Image
                            style={{ height: 90, width: 90 }}
                            source={IMAGES.Propertyuser}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={[FONTS.h4, FONTS.fontMedium, { color: colors.gray100 }]}>Add Photo & Details</Text>
                    <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray70, fontSize: 11 }]}>STEP 3 OF 3</Text>
                    {fieldErrors.banner ? (
                        <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: COLORS.danger, marginTop: 10, padding: 10, borderRadius: 8, backgroundColor: theme.dark ? 'rgba(210,49,49,0.12)' : 'rgba(210,49,49,0.08)' }]}>{fieldErrors.banner}</Text>
                    ) : null}
                    <View style={{ marginTop: 20 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Video URL</Text>
                        <TextInput placeholder="https://…" placeholderTextColor={colors.gray50} value={videoUrl} onChangeText={(t) => { setVideoUrl(clampLength(t, PROPERTY_FIELD_MAX.VIDEO_URL)); setFieldErrors((p) => ({ ...p, videoUrl: undefined, banner: undefined })); }} maxLength={PROPERTY_FIELD_MAX.VIDEO_URL} autoCapitalize="none" autoCorrect={false}
                            style={[FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: fieldErrors.videoUrl ? COLORS.danger : colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }]} />
                        {fieldErrors.videoUrl ? <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: COLORS.danger, marginTop: 4 }]}>{fieldErrors.videoUrl}</Text> : null}
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Property photos (optional)</Text>
                        <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: colors.gray50, marginTop: 4 }]}>
                            Up to {MAX_PROPERTY_PHOTOS} images. You can select several at once in the gallery when your device supports it; they are uploaded together when you post.
                        </Text>
                        <View
                            style={{
                                marginTop: 10,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.checkBoxborder,
                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                overflow: 'hidden',
                            }}
                        >
                            <View style={{ alignItems: 'center', paddingTop: photos.length === 0 ? 20 : 8, paddingHorizontal: 5 }}>
                                {photos.length === 0 ? (
                                    <>
                                        <Image
                                            style={{ height: 30, width: 30 }}
                                            resizeMode="contain"
                                            source={IMAGES.photos_upload}
                                        />
                                        <View style={{ paddingVertical: 14 }}>
                                            <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: colors.gray50, textAlign: 'center' }]}>
                                                Tap below to open the gallery (multi-select when your OS supports it)
                                            </Text>
                                        </View>
                                    </>
                                ) : (
                                    <View style={[styles.photocard]}>
                                        {photos.map((img: any, index: number) => {
                                            const thumbUri = resolveLocalImageUri(img);
                                            return (
                                                <View key={`${thumbUri ?? index}-${index}`} style={[styles.imagebox]}>
                                                    {thumbUri ? (
                                                        <Image
                                                            source={{ uri: thumbUri }}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                borderRadius: 5,
                                                            }}
                                                            resizeMode="cover"
                                                        />
                                                    ) : (
                                                        <View style={{ flex: 1, backgroundColor: colors.gray20 }} />
                                                    )}
                                                    <TouchableOpacity
                                                        activeOpacity={0.8}
                                                        onPress={() => handleRemovePhoto(index)}
                                                        style={[styles.deletebutton]}
                                                    >
                                                        <Image
                                                            source={IMAGES.delete}
                                                            style={{ width: 14, height: 14, tintColor: COLORS.danger }}
                                                            resizeMode="contain"
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                onPress={handleUploadPhotos}
                                activeOpacity={0.8}
                                style={[
                                    GlobalStyleSheet.flexcenter,
                                    {
                                        justifyContent: 'center',
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
                                <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>
                                    {photos.length ? 'Add more photos' : 'Upload photos'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Property ID (custom)</Text>
                        <TextInput placeholder="e.g. CUST-001" placeholderTextColor={colors.gray50} value={propertyIdCustom} onChangeText={(t) => setPropertyIdCustom(clampLength(t, PROPERTY_FIELD_MAX.PROPERTY_ID_CUSTOM))} maxLength={PROPERTY_FIELD_MAX.PROPERTY_ID_CUSTOM}
                            style={[FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }]} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>RERA number</Text>
                        <TextInput placeholder="e.g. MH12345678" placeholderTextColor={colors.gray50} value={reraNumber} onChangeText={(t) => setReraNumber(clampLength(t.replace(/\s/g, ''), PROPERTY_FIELD_MAX.RERA))} maxLength={PROPERTY_FIELD_MAX.RERA} autoCapitalize="characters"
                            style={[FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }]} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Possession date</Text>
                        <TextInput placeholder="YYYY-MM-DD e.g. 2025-12-01" placeholderTextColor={colors.gray50} value={possessionDate} onChangeText={(t) => { setPossessionDate(t.replace(/[^0-9-]/g, '').slice(0, PROPERTY_FIELD_MAX.DATE_INPUT)); setFieldErrors((p) => ({ ...p, possessionDate: undefined, banner: undefined })); }} maxLength={PROPERTY_FIELD_MAX.DATE_INPUT} keyboardType="numbers-and-punctuation"
                            style={[FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: fieldErrors.possessionDate ? COLORS.danger : colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }]} />
                        {fieldErrors.possessionDate ? <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: COLORS.danger, marginTop: 4 }]}>{fieldErrors.possessionDate}</Text> : null}
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Construction start date</Text>
                        <TextInput placeholder="YYYY-MM-DD e.g. 2023-01-01" placeholderTextColor={colors.gray50} value={constructionStartDate} onChangeText={(t) => { setConstructionStartDate(t.replace(/[^0-9-]/g, '').slice(0, PROPERTY_FIELD_MAX.DATE_INPUT)); setFieldErrors((p) => ({ ...p, constructionStartDate: undefined, banner: undefined })); }} maxLength={PROPERTY_FIELD_MAX.DATE_INPUT} keyboardType="numbers-and-punctuation"
                            style={[FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: fieldErrors.constructionStartDate ? COLORS.danger : colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }]} />
                        {fieldErrors.constructionStartDate ? <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: COLORS.danger, marginTop: 4 }]}>{fieldErrors.constructionStartDate}</Text> : null}
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Amenities</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
                            {AMENITY_OPTIONS.map((a) => {
                                const selected = amenityTags.includes(a);
                                return (
                                    <TouchableOpacity key={a} onPress={() => setAmenityTags(prev => selected ? prev.filter(x => x !== a) : [...prev, a])}
                                        style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: selected ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}>
                                        <Text style={[FONTS.BodyXS, { color: selected ? COLORS.white : colors.gray90 }]}>{a}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => setNoBrokerage(p => p ? 0 : 1)}
                            style={[GlobalStyleSheet.center, { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: noBrokerage ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white), gap: 8 }]}>
                            <Text style={[FONTS.BodyS, { color: noBrokerage ? COLORS.white : colors.gray90 }]}>No brokerage</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: colors.gray90, marginTop: 20 }]}>Paying Guest (PG)</Text>
                    <View style={{ marginTop: 8 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>PG type</Text>
                        <TextInput placeholder="e.g. Male, Female" placeholderTextColor={colors.gray50} value={pgType} onChangeText={(t) => setPgType(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} />
                    </View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Total beds</Text><TextInput placeholder="e.g. 10" placeholderTextColor={colors.gray50} value={totalBeds} onChangeText={(t) => setTotalBeds(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Available beds</Text><TextInput placeholder="e.g. 5" placeholderTextColor={colors.gray50} value={availableBeds} onChangeText={(t) => setAvailableBeds(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Room type</Text><TextInput placeholder="e.g. Single, Double" placeholderTextColor={colors.gray50} value={roomType} onChangeText={(t) => setRoomType(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}>
                        <Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Gate closing time</Text>
                        <TextInput placeholder="HH:MM:SS e.g. 22:00:00" placeholderTextColor={colors.gray50} value={gateClosingTime} onChangeText={(t) => { setGateClosingTime(clampLength(t.replace(/[^0-9:]/g, ''), PROPERTY_FIELD_MAX.GATE_TIME)); setFieldErrors((p) => ({ ...p, gateClosingTime: undefined })); }} maxLength={PROPERTY_FIELD_MAX.GATE_TIME} keyboardType="numbers-and-punctuation" style={[FONTS.BodyM, { color: colors.title, backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white, borderWidth: 1, borderColor: fieldErrors.gateClosingTime ? COLORS.danger : colors.checkBoxborder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginTop: 6 }]} />
                        {fieldErrors.gateClosingTime ? <Text style={[FONTS.BodyXS, FONTS.fontRegular, { color: COLORS.danger, marginTop: 4 }]}>{fieldErrors.gateClosingTime}</Text> : null}
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                        <TouchableOpacity onPress={() => setFoodFacility(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: foodFacility ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: foodFacility ? COLORS.white : colors.gray90 }]}>Food facility</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setLaundry(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: laundry ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: laundry ? COLORS.white : colors.gray90 }]}>Laundry</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setWifi(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: wifi ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: wifi ? COLORS.white : colors.gray90 }]}>Wifi</Text></TouchableOpacity>
                    </View>

                    <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: colors.gray90, marginTop: 20 }]}>Commercial</Text>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Cabins</Text><TextInput placeholder="e.g. 5" placeholderTextColor={colors.gray50} value={cabins} onChangeText={(t) => setCabins(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Workstations</Text><TextInput placeholder="e.g. 20" placeholderTextColor={colors.gray50} value={workstations} onChangeText={(t) => setWorkstations(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Washrooms (private)</Text><TextInput placeholder="e.g. 2" placeholderTextColor={colors.gray50} value={washroomsPrivate} onChangeText={(t) => setWashroomsPrivate(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Washrooms (shared)</Text><TextInput placeholder="e.g. 4" placeholderTextColor={colors.gray50} value={washroomsShared} onChangeText={(t) => setWashroomsShared(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Lock-in period (months)</Text><TextInput placeholder="e.g. 12" placeholderTextColor={colors.gray50} value={lockInPeriod} onChangeText={(t) => setLockInPeriod(digitsOnly(t, PROPERTY_FIELD_MAX.NUMERIC_SMALL))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.NUMERIC_SMALL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Ceiling height (ft)</Text><TextInput placeholder="e.g. 10" placeholderTextColor={colors.gray50} value={ceilingHeight} onChangeText={(t) => setCeilingHeight(digitsOnly(t, PROPERTY_FIELD_MAX.AREA_DIGITS))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.AREA_DIGITS} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Suitable for</Text><TextInput placeholder="e.g. Office, Retail" placeholderTextColor={colors.gray50} value={suitableFor} onChangeText={(t) => setSuitableFor(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Frontage width (ft)</Text><TextInput placeholder="e.g. 30" placeholderTextColor={colors.gray50} value={frontageWidth} onChangeText={(t) => setFrontageWidth(digitsOnly(t, PROPERTY_FIELD_MAX.AREA_DIGITS))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.AREA_DIGITS} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Visibility type</Text><TextInput placeholder="e.g. Main Road" placeholderTextColor={colors.gray50} value={visibilityType} onChangeText={(t) => setVisibilityType(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Road width (ft)</Text><TextInput placeholder="e.g. 40" placeholderTextColor={colors.gray50} value={roadWidth} onChangeText={(t) => setRoadWidth(digitsOnly(t, PROPERTY_FIELD_MAX.AREA_DIGITS))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.AREA_DIGITS} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Covered area (sq.ft.)</Text><TextInput placeholder="e.g. 800" placeholderTextColor={colors.gray50} value={coveredArea} onChangeText={(t) => setCoveredArea(digitsOnly(t, PROPERTY_FIELD_MAX.AREA_DIGITS))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.AREA_DIGITS} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><TouchableOpacity onPress={() => setLoadingDock(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: loadingDock ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: loadingDock ? COLORS.white : colors.gray90 }]}>Loading dock</Text></TouchableOpacity></View>
                    <View style={{ marginTop: 8 }}><TouchableOpacity onPress={() => setTruckEntry(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: truckEntry ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: truckEntry ? COLORS.white : colors.gray90 }]}>Truck entry</Text></TouchableOpacity></View>

                    <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: colors.gray90, marginTop: 20 }]}>Land / Agricultural</Text>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Soil type</Text><TextInput placeholder="e.g. Black" placeholderTextColor={colors.gray50} value={soilType} onChangeText={(t) => setSoilType(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Water source</Text><TextInput placeholder="e.g. Borewell" placeholderTextColor={colors.gray50} value={waterSource} onChangeText={(t) => setWaterSource(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Distance from highway (km)</Text><TextInput placeholder="e.g. 5" placeholderTextColor={colors.gray50} value={distanceFromHighway} onChangeText={(t) => setDistanceFromHighway(digitsOnly(t, PROPERTY_FIELD_MAX.AREA_DIGITS))} keyboardType="number-pad" maxLength={PROPERTY_FIELD_MAX.AREA_DIGITS} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Land type</Text><TextInput placeholder="e.g. Agricultural" placeholderTextColor={colors.gray50} value={landType} onChangeText={(t) => setLandType(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Authority approved</Text><TextInput placeholder="e.g. PMRDA" placeholderTextColor={colors.gray50} value={authorityApproved} onChangeText={(t) => setAuthorityApproved(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ marginTop: 8 }}><Text style={[FONTS.BodyS, FONTS.fontSemiBold, { color: colors.gray90 }]}>Approved by</Text><TextInput placeholder="e.g. Collector" placeholderTextColor={colors.gray50} value={approvedBy} onChangeText={(t) => setApprovedBy(clampLength(t, PROPERTY_FIELD_MAX.SHORT_LABEL))} maxLength={PROPERTY_FIELD_MAX.SHORT_LABEL} style={inputStyle} /></View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                        <TouchableOpacity onPress={() => setRoadAccess(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: roadAccess ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: roadAccess ? COLORS.white : colors.gray90 }]}>Road access</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setNaPlot(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: naPlot ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: naPlot ? COLORS.white : colors.gray90 }]}>NA plot</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setEncumbranceFree(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: encumbranceFree ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: encumbranceFree ? COLORS.white : colors.gray90 }]}>Encumbrance free</Text></TouchableOpacity>
                    </View>

                    <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: colors.gray90, marginTop: 20 }]}>Other</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                        <TouchableOpacity onPress={() => setPrivateGarden(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: privateGarden ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: privateGarden ? COLORS.white : colors.gray90 }]}>Private garden</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setServantRoom(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: servantRoom ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: servantRoom ? COLORS.white : colors.gray90 }]}>Servant room</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setStoreRoom(p => p ? 0 : 1)} style={[GlobalStyleSheet.center, { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.checkBoxborder, backgroundColor: storeRoom ? (theme.dark ? '#3C0C81' : COLORS.primary) : (theme.dark ? COLORS.darkwhite : COLORS.white) }]}><Text style={[FONTS.BodyXS, { color: storeRoom ? COLORS.white : colors.gray90 }]}>Store room</Text></TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>

            <View style={[GlobalStyleSheet.container, { paddingBottom: 25, paddingHorizontal: 20 }]}>
                <Button
                    title={submitting ? 'Posting...' : 'Post Property'}
                    btnRounded
                    onPress={async () => {
                        const d = draft as Record<string, unknown>;
                        const fe = getStep3FieldErrors({
                            videoUrl,
                            possessionDate,
                            constructionStartDate,
                            gateClosingTime,
                        });
                        const banner = getStep3DraftBanner(d);
                        const merged: Step3FieldErrors = { ...fe, ...(banner ? { banner } : {}) };
                        setFieldErrors(merged);
                        if (Object.values(merged).some(Boolean)) return;
                        setSubmitting(true);
                        try {
                            const amenityIds = amenityLabelsToIds(amenityTags);
                            const dhRaw = distanceFromHighway.trim();
                            const distance_from_highway =
                                dhRaw.length === 0
                                    ? undefined
                                    : /^\d+$/.test(dhRaw)
                                      ? `${dhRaw}km`
                                      : dhRaw;
                            const payload: PropertyStoreRequest = {
                                title: String(d.title),
                                listing_type: String(d.listing_type || 'Sale'),
                                property_segment: String(d.property_segment || 'Residential'),
                                property_type: String(d.property_type || 'Apartment/Flat'),
                                ...(typeof d.property_type_id === 'number' ? { property_type_id: d.property_type_id } : {}),
                                description: String(d.description),
                                address: String(d.address),
                                country: typeof d.country === 'number' ? d.country : DEFAULT_PROPERTY_COUNTRY_ID,
                                city: Number(d.city),
                                state: Number(d.state),
                                ...(typeof d.neighborhood === 'number' ? { neighborhood: d.neighborhood } : {}),
                                zip_code: String(d.zip_code),
                                address_line2: d.address_line2 ? String(d.address_line2) : undefined,
                                landmark: d.landmark ? String(d.landmark) : undefined,
                                location: d.location ? String(d.location) : undefined,
                                sale_price: typeof d.sale_price === 'number' ? d.sale_price : undefined,
                                rent_price: typeof d.rent_price === 'number' ? d.rent_price : undefined,
                                security_deposit: typeof d.security_deposit === 'number' ? d.security_deposit : undefined,
                                maintenance: typeof d.maintenance === 'number' ? d.maintenance : undefined,
                                price_negotiable: typeof d.price_negotiable === 'number' ? d.price_negotiable : undefined,
                                rent_negotiable: typeof d.rent_negotiable === 'number' ? d.rent_negotiable : undefined,
                                maintenance_included: typeof d.maintenance_included === 'number' ? d.maintenance_included : undefined,
                                bedrooms: typeof d.bedrooms === 'number' ? d.bedrooms : undefined,
                                bathrooms: typeof d.bathrooms === 'number' ? d.bathrooms : undefined,
                                balconies: typeof d.balconies === 'number' ? d.balconies : undefined,
                                floor_number: typeof d.floor_number === 'number' ? d.floor_number : undefined,
                                total_floors: typeof d.total_floors === 'number' ? d.total_floors : undefined,
                                furnishing_status: d.furnishing_status ? String(d.furnishing_status) : undefined,
                                property_age: d.property_age ? String(d.property_age) : undefined,
                                carpet_area: typeof d.carpet_area === 'number' ? d.carpet_area : undefined,
                                area_sqft: typeof d.area_sqft === 'number' ? d.area_sqft : undefined,
                                area: typeof d.area === 'number' ? d.area : undefined,
                                built_up_area:
                                    typeof d.built_up_area === 'number'
                                        ? d.built_up_area
                                        : typeof d.area === 'number'
                                          ? d.area
                                          : undefined,
                                land_area: typeof d.land_area === 'number' ? d.land_area : undefined,
                                facing: d.facing ? String(d.facing) : undefined,
                                construction_status: d.construction_status ? String(d.construction_status) : undefined,
                                nearby_areas: Array.isArray(d.nearby_areas) ? d.nearby_areas as string[] : undefined,
                                plot_length: typeof d.plot_length === 'number' ? d.plot_length : undefined,
                                plot_breadth: typeof d.plot_breadth === 'number' ? d.plot_breadth : undefined,
                                corner_plot: typeof d.corner_plot === 'number' ? d.corner_plot : undefined,
                                fencing_done: typeof d.fencing_done === 'number' ? d.fencing_done : undefined,
                                preferred_tenants: d.preferred_tenants ? String(d.preferred_tenants) : undefined,
                                video_url: videoUrl.trim() || undefined,
                                property_id_custom: propertyIdCustom.trim() || undefined,
                                rera_number: reraNumber.trim() || undefined,
                                possession_date: possessionDate.trim() || undefined,
                                construction_start_date: constructionStartDate.trim() || undefined,
                                amenity_ids: amenityIds.length ? amenityIds : undefined,
                                no_brokerage: noBrokerage || undefined,
                                pg_type: pgType.trim() || undefined,
                                total_beds: parseNum(totalBeds),
                                available_beds: parseNum(availableBeds),
                                room_type: roomType.trim() || undefined,
                                food_facility: foodFacility,
                                gate_closing_time: gateClosingTime.trim() || undefined,
                                laundry: laundry,
                                wifi: wifi,
                                cabins: parseNum(cabins),
                                workstations: parseNum(workstations),
                                washrooms_private: parseNum(washroomsPrivate),
                                washrooms_shared: parseNum(washroomsShared),
                                loading_dock: loadingDock,
                                lock_in_period: parseNum(lockInPeriod),
                                ceiling_height: parseNum(ceilingHeight),
                                suitable_for: suitableFor.trim() || undefined,
                                frontage_width: parseNum(frontageWidth),
                                visibility_type: visibilityType.trim() || undefined,
                                truck_entry: truckEntry,
                                road_width: parseNum(roadWidth),
                                covered_area: parseNum(coveredArea),
                                soil_type: soilType.trim() || undefined,
                                water_source: waterSource.trim() || undefined,
                                road_access: roadAccess,
                                distance_from_highway,
                                land_type: landType.trim() || undefined,
                                authority_approved: authorityApproved.trim() || undefined,
                                approved_by: approvedBy.trim() || undefined,
                                na_plot: naPlot,
                                encumbrance_free: encumbranceFree,
                                private_garden: privateGarden,
                                servant_room: servantRoom,
                                store_room: storeRoom,
                            };
                            const imagePayload: PropertyImageAsset[] = [];
                            photos.forEach((p: any, idx: number) => {
                                const uri = resolveLocalImageUri(p);
                                if (!uri) return;
                                imagePayload.push({
                                    uri: String(uri),
                                    type: p.type ? String(p.type) : 'image/jpeg',
                                    fileName: p.fileName ? String(p.fileName) : `property_${idx}.jpg`,
                                });
                            });
                            const res = await storeProperty(payload, imagePayload);
                            if (res.success) {
                                Alert.alert('Success', 'Property posted successfully.', [{ text: 'OK', onPress: () => navigation.getParent()?.goBack() }]);
                            } else {
                                Alert.alert('Error', res.message || 'Failed to post property.');
                            }
                        } catch (e: any) {
                            Alert.alert('Error', e?.message || 'Failed to post property.');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                />
            </View>
        </View>
        </SafeAreaView>
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
    deletebutton: {
        position: "absolute",
        top: 7,
        right: 9.5,
        backgroundColor: 'rgba(255,229,229,.8)',
        width: 30,
        height: 30,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    imagebox: {
        width: "32.33%",
        aspectRatio: 1.1,
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
    },
    photocard: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingBottom: 10,
    }
})

export default PropertyDetailsStep3