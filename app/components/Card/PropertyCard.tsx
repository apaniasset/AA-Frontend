import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { GlobalStyleSheet } from '../../constants/StyleSheet'
import { COLORS, FONTS } from '../../constants/theme'
import { IMAGES } from '../../constants/Images'
import { useNavigation, useTheme } from '@react-navigation/native'
import FeatherIcon from "react-native-vector-icons/Feather";
import Likebtn from '../Likebtn'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromsaveProperty } from '../../redux/reducer/savePropertyReducer'

type Props = {
    id: string,
    images?: any[];       // array of images
    title: string;
    location?: string;
    price?: string;
    status?: string;
    tags?: string[];      // array of tags
    area?: string;
    size?: string;
    time?: string;
    userName?: string;
    userPic?:any;
    onPress?: () => void;
    PropertyDetailsonPress?: any;
    SavePropertyonPress?: () => void;
}

const PropertyCard = ({
    id,
    images = [],
    title,
    location = "",
    price = "",
    status = "",
    tags = [],
    area = "",
    size = "",
    time = "",
    userName,
    userPic,
    onPress,
    PropertyDetailsonPress,
    SavePropertyonPress
}: Props) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const navigation = useNavigation<any>();

    const dispatch = useDispatch();

    const saveProperty = useSelector((state:any) => state.saveProperty.saveProperty);

    const inSaveProperty = () => {
        var temp = [] as any;
        saveProperty.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromsaveProperty = () => {
        dispatch(removeFromsaveProperty(id as any));
    }


    {/* ---------------- IMAGE LAYOUT ---------------- */}

    const renderImages = () => {
        const count = images?.length ?? 0;

        // 1 IMAGE ----------------------
        if (count === 1) {
            return (
                <View
                    style={{
                        width: "100%",
                        aspectRatio: 1 / 0.45,
                        borderRadius: 6,
                        overflow: "hidden",
                    }}
                >
                    <Image
                        source={images[0]}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="cover"
                    />

                    {/* Gradient / Overlay */}
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            left: 0,
                            right: 0
                        }}
                        resizeMode='cover'
                        source={IMAGES.Rectangle}
                    />
                </View>
            );
        }

        // 2 IMAGES ---------------------
        if (count === 2) {
            return (
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        aspectRatio: 1 / 0.45,
                        borderRadius: 6,
                        overflow: "hidden",
                        gap:3
                    }}
                >
                    <View
                        style={{width:'50%'}}
                    >
                        <Image
                            source={images[0]}
                            style={{ width: "100%", height: "100%",borderRadius:6 }}
                            resizeMode="cover"
                        />
                        {/* Gradient / Overlay */}
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                borderRadius:6
                            }}
                            resizeMode='cover'
                            source={IMAGES.Rectangle1}
                        />
                    </View>
                    <View
                        style={{width:'50%'}}
                    >
                        <Image
                            source={images[1]}
                            style={{ width: "100%", height: "100%",borderRadius:6 }}
                            resizeMode="cover"
                        />
                        {/* Gradient / Overlay */}
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                borderRadius:6
                            }}
                            resizeMode='cover'
                            source={IMAGES.Rectangle1}
                        />
                    </View>
                </View>
            );
        }

        // 3+ IMAGES --------------------
        return (
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    aspectRatio: 1 / 0.45,
                    borderRadius: 6,
                }}
            >
                {/* Left Big Image */}
                <View
                    style={{width:'59%',marginRight:1.5}}
                >
                    <Image
                        source={images[0]}
                        style={{ width: "100%", height: "100%",borderRadius:6 }}
                        resizeMode="cover"
                    />
                    {/* Gradient / Overlay */}
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top:0,
                            bottom:0,
                            borderRadius:6
                        }}
                        resizeMode='cover'
                        source={IMAGES.Rectangle1}
                    />
                </View>

                {/* Right 2 Small Images */}
                <View style={{ width: "40%",marginLeft:1.5 }}>
                    <View style={{height: "49%",marginBottom:1.5 }}>
                        {/* Top Small Image */}
                        <Image
                            source={images[1]}
                            style={{ width: "100%", height: "100%",borderRadius:6 }}
                            resizeMode="cover"
                        />
                        {/* Gradient / Overlay */}
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                borderRadius:6
                            }}
                            resizeMode='cover'
                            source={IMAGES.Rectangle2}
                        />
                    </View>

                    {/* Bottom Small or +count */}
                    <View
                        style={{
                            width: "100%",
                            height: "49%",
                            marginTop:1.5
                        }}
                    >
                        {count > 3 ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius:6
                                }}
                            >
                                <Image
                                    source={images[2]}
                                    style={{ width: "100%", height: "100%",borderRadius:6}}
                                    resizeMode="cover"
                                />
                                <View
                                    style={{
                                        padding: 5,
                                        paddingHorizontal:10,
                                        borderRadius: 30,
                                        backgroundColor: colors.gray100,
                                        position:'absolute',
                                        right:7,
                                        bottom:7,
                                        zIndex:99
                                    }}
                                >
                                    <Text style={[FONTS.fontSemiBold, { fontSize: 11, color: COLORS.white }]}>
                                       {count - 2}+
                                    </Text>
                                </View>
                                {/* Gradient / Overlay */}
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        borderRadius:6
                                    }}
                                    resizeMode='cover'
                                    source={IMAGES.Rectangle2}
                                />
                            </View>
                        ) : (
                            <View>
                                <Image
                                    source={images[2]}
                                    style={{ width: "100%", height: "100%",borderRadius:6}}
                                    resizeMode="cover"
                                />
                                {/* Gradient / Overlay */}
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        borderRadius:6,
                                    }}
                                    resizeMode='cover'
                                    source={IMAGES.Rectangle2}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    };


    return (
        <View
            style={{
                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                borderRadius: 10,
                marginBottom: 10,
                elevation: 4,
                shadowColor: 'rgba(0,0,0,0.5)',
                shadowOffset: {
                    width: 0,
                    height: -4,
                },
                shadowOpacity: .10,
                shadowRadius: 30,
            }}
        >
            <View style={{ padding: 5 }}>
                {/* ===================== MAIN IMAGE ===================== */}
                <View
                    style={[GlobalStyleSheet.center, {
                        width: '100%',
                        aspectRatio: 1 / .45,
                        borderRadius: 6,
                        overflow: 'hidden'
                    }]}
                >
                    {renderImages()}

                    {/* Overlay Content */}
                    <View style={{
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        padding: 10,
                        paddingHorizontal: 13
                    }}>
                        <View style={[GlobalStyleSheet.flexcenter, { flex: 1, alignItems: 'flex-start' }]}>
                            
                            {/* User + Name */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                {userPic &&
                                    <Image
                                        style={{ height: 22, width: 22, borderRadius: 30 }}
                                        resizeMode='contain'
                                        source={userPic}
                                    />
                                }
                                {userName &&
                                    <Text style={[FONTS.BodyXS, FONTS.fontBold, { color: COLORS.white }]}>
                                        {userName}
                                    </Text>
                                }
                            </View>

                            {/* Heart Icon */}
                            <Likebtn
                                onPress={inSaveProperty().includes(id) ? removeItemFromsaveProperty : SavePropertyonPress}
                                id={id}
                                inSaveProperty={inSaveProperty}
                            />
                        </View>

                        {/* Rent + Time */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <View
                                style={{
                                    padding: 7,
                                    paddingVertical:5,
                                    borderRadius: 30,
                                    backgroundColor: '#FC3752'
                                }}
                            >
                                <Text style={[FONTS.fontSemiBold, { fontSize: 11, color: COLORS.white }]}>
                                    Rent
                                </Text>
                            </View>

                            <View
                                style={{
                                    padding: 7,
                                    paddingVertical:5,
                                    borderRadius: 30,
                                    backgroundColor: colors.gray100
                                }}
                            >
                                <Text style={[FONTS.fontSemiBold, { fontSize: 11, color:theme.dark ? COLORS.darkwhite : COLORS.white }]}>
                                    {time}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ===================== TITLE + PRICE ===================== */}
                <View style={[GlobalStyleSheet.flexcenter, { paddingVertical: 10 }]}>
                    <View style={{ width: '64%', paddingHorizontal: 10 }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => PropertyDetailsonPress && PropertyDetailsonPress()}
                        >
                            <Text numberOfLines={2} style={[FONTS.h6, FONTS.fontSemiBold, { color: colors.gray100 }]}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[FONTS.BodyXS, { color: colors.gray50 }]}>
                            {location}
                        </Text>
                    </View>

                    <View style={{ width: 1, height: 60, backgroundColor: colors.checkBoxborder }} />

                    <View style={[GlobalStyleSheet.center, { paddingHorizontal: 20,width:'35%' }]}>
                        <Text style={[FONTS.h4, FONTS.fontSemiBold, { color: colors.gray100 }]}>{price}</Text>
                        <Text numberOfLines={2} style={[FONTS.BodyXS, { color: colors.gray70,textAlign:'center' }]}>{status}</Text>
                    </View>
                </View>
            </View>
            
            {/* ===================== TAGS ===================== */}
            {tags &&
                <View style={{ paddingVertical: 5, backgroundColor: colors.background }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 16 }}>
                            {tags.map((data, index) => (
                                <View
                                    key={index}
                                    style={[GlobalStyleSheet.center, {
                                        paddingHorizontal: 9,
                                        padding: 6.5,
                                        backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                        borderRadius: 10,
                                        borderWidth: 1,
                                        borderColor: colors.checkBoxborder,
                                    }]}
                                >
                                    <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>
                                        {data}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            }

            {/* ===================== AREA + BUTTONS ===================== */}
            <View style={[GlobalStyleSheet.flexcenter, { padding: 10, paddingHorizontal: 15 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, flex: 1 }}>
                    <View style={{ padding: 6 }}>
                        <Image
                            style={{ height: 24, width: 24 }}
                            resizeMode='contain'
                            source={IMAGES.maximize}
                        />
                    </View>
                    <View>
                        <Text style={[FONTS.BodyXS, FONTS.fontSemiBold, { color: colors.gray60 }]}>Area</Text>
                        {area &&
                            <Text style={[FONTS.BodyXS, FONTS.fontSemiBold, { color: colors.gray100 }]}>
                                {area}
                            </Text>
                        }
                        {size &&
                            <Text style={[FONTS.BodyXS, FONTS.fontSemiBold, { color: colors.gray100 }]}>
                                {size}
                            </Text>
                        }
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ContactOwner')}
                        activeOpacity={0.8}
                        style={{
                            padding: 8,
                            paddingHorizontal: 15,
                            backgroundColor: colors.checkBoxborder,
                            borderRadius: 8
                        }}
                    >
                        <Text style={[FONTS.BodyS, FONTS.fontMedium, { color: colors.gray90 }]}>
                            View Number
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPress}
                        activeOpacity={0.8}
                        style={{
                            padding: 10.5,
                            backgroundColor: colors.checkBoxborder,
                            borderRadius: 8
                        }}
                    >
                        <Image
                            style={{ height: 15, width: 15 }}
                            resizeMode='contain'
                            tintColor={colors.gray90}
                            source={IMAGES.Messages2}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            padding: 10.5,
                            backgroundColor: COLORS.primary,
                            borderRadius: 8
                        }}
                        onPress={() => navigation.navigate('ContactOwner')}
                    >
                        <Image
                            style={{ height: 15, width: 15 }}
                            resizeMode='contain'
                            tintColor={theme.dark ? COLORS.darkwhite : COLORS.white}
                            source={IMAGES.phone}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PropertyCard;
