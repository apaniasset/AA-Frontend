import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useRef, useState, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';
import { COLORS, FONTS } from '../../constants/theme';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import FeatherIcon from "react-native-vector-icons/Feather";
import SidebarSheet from '../../components/BottomSheet/SidebarSheet';
import PropertyCard from '../../components/Card/PropertyCard';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import { useDispatch, useSelector } from 'react-redux';
import { addTosaveProperty, removeFromsaveProperty } from '../../redux/reducer/savePropertyReducer';
import Likebtn from '../../components/Likebtn';
import { searchPropertiesList, getPropertyTypes,  extractPropertyListItems} from '../../services/properties';
import type { PropertyListItem } from '../../services/properties';
import { formatListingPrice } from '../../utils/formatPrice';

const PROPERTY_TYPE_ALL = { id: 0, name: 'All Type' };
const FURNISHING_IMAGES = [IMAGES.projectpic4, IMAGES.projectpic3, IMAGES.projectpic6];
type FurnishingOption = { id: string; title: string; image: any; furnishing_status: string };

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

function mapListItemToCard(item: PropertyListItem) {
    const price = formatListingPrice(item.rent_price, item.sale_price);
    const imgUri = item.images?.[0]?.image_url;
    return {
        id: String(item.id),
        title: item.title || 'Untitled',
        type: item.listing_type === 'Rent' ? 'Rent' : (item.listing_type || 'Sale'),
        area: item.carpet_area ? `${item.carpet_area} sq ft` : (item.area || ''),
        price,
        location: [item.area, item.city, item.state].filter(Boolean).join(', ') || '—',
        status: item.listing_type || 'Sale',
        time: '',
        images: imgUri ? [{ uri: imgUri }] : [IMAGES.projectpic1],
        userName: '',
    };
}

function mapListItemToPropertyCard(item: PropertyListItem) {
    const base = mapListItemToCard(item);
    return {
        ...base,
        tags: [] as string[],
        userPic: IMAGES.small1,
        _raw: item,
    };
}

const Home = ({ navigation }: HomeScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [propertyTypes, setPropertyTypes] = useState<{ id: number; name: string }[]>([PROPERTY_TYPE_ALL]);
    const [propertyTypesLoading, setPropertyTypesLoading] = useState(true);
    const [selected, setSelected] = useState(0);
    const [recommendedList, setRecommendedList] = useState<ReturnType<typeof mapListItemToCard>[]>([]);
    const [recommendedLoading, setRecommendedLoading] = useState(true);
    const [rentList, setRentList] = useState<ReturnType<typeof mapListItemToPropertyCard>[]>([]);
    const [rentLoading, setRentLoading] = useState(true);
    const [furnishingOptions, setFurnishingOptions] = useState<FurnishingOption[]>([]);
    const [furnishingLoading, setFurnishingLoading] = useState(true);

    const sheetRef = useRef<any>(null);
    const filterRef = useRef<any>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        let cancelled = false;
        setPropertyTypesLoading(true);
        getPropertyTypes()
            .then((res) => {
                if (!cancelled && res.success && Array.isArray(res.data)) {
                    setPropertyTypes([PROPERTY_TYPE_ALL, ...res.data.map((t) => ({ id: t.id, name: t.name }))]);
                }
            })
            .catch(() => {
                if (!cancelled) setPropertyTypes([PROPERTY_TYPE_ALL]);
            })
            .finally(() => {
                if (!cancelled) setPropertyTypesLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        let cancelled = false;
        setFurnishingLoading(true);
        searchPropertiesList({ per_page: 100, page: 1 })
            .then((res) => {
                if (cancelled) return;
                const list = res.success ? extractPropertyListItems(res.data) : [];
                const seen = new Set<string>();
                const options: FurnishingOption[] = [];
                list.forEach((item: PropertyListItem) => {
                    const status = typeof item.furnishing_status === 'string' ? item.furnishing_status.trim() : '';
                    if (status && !seen.has(status)) {
                        seen.add(status);
                        options.push({
                            id: status,
                            title: status,
                            furnishing_status: status,
                            image: FURNISHING_IMAGES[options.length % FURNISHING_IMAGES.length],
                        });
                    }
                });
                setFurnishingOptions(options);
            })
            .catch(() => {
                if (!cancelled) setFurnishingOptions([]);
            })
            .finally(() => {
                if (!cancelled) setFurnishingLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        let cancelled = false;
        setRentLoading(true);
        searchPropertiesList({ type: 'rent', per_page: 10, page: 1 })
            .then((res) => {
                if (!cancelled && res.success) {
                    const list = extractPropertyListItems(res.data);
                    setRentList(list.map(mapListItemToPropertyCard));
                } else if (!cancelled) {
                    setRentList([]);
                }
            })
            .catch(() => {
                if (!cancelled) setRentList([]);
            })
            .finally(() => {
                if (!cancelled) setRentLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        let cancelled = false;
        setRecommendedLoading(true);
        searchPropertiesList({ per_page: 10, page: 1 })
            .then((res) => {
                if (!cancelled && res.success) {
                    const list = extractPropertyListItems(res.data);
                    setRecommendedList(list.map(mapListItemToCard));
                }
            })
            .catch(() => {
                if (!cancelled) setRecommendedList([]);
            })
            .finally(() => {
                if (!cancelled) setRecommendedLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    const addItemTosaveProperty = (data: any) => {
        dispatch(addTosaveProperty(data));
    }

    const saveProperty = useSelector((state: any) => state.saveProperty.saveProperty);

    const inSaveProperty = () => {
        var temp = [] as any;
        saveProperty.forEach((data: any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromsaveProperty = (data: any) => {
        dispatch(removeFromsaveProperty(data));
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }} edges={['bottom']}>
            <View style={[GlobalStyleSheet.container, {
                backgroundColor: colors.background,
                paddingHorizontal: 0,
                padding: 20
            }]}>
                <View style={{ paddingHorizontal: 20 }}>
                    <View
                        style={[GlobalStyleSheet.flexcenter]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter, { justifyContent: 'flex-start', gap: 15 }]}>
                            <TouchableOpacity
                                onPress={() => sheetRef.current.open()}
                                activeOpacity={0.8}
                            >
                                <Image
                                    style={{
                                        height: 16,
                                        width: 24,
                                    }}
                                    tintColor={colors.gray90}
                                    resizeMode='contain'
                                    source={IMAGES.menu}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={[FONTS.BodyM, FONTS.fontBold, { color: colors.gray90 }]}>Gurugram</Text>
                                <View style={[GlobalStyleSheet.center, { flexDirection: 'row', gap: 5 }]}>
                                    <Image
                                        style={{ height: 13, width: 13 }}
                                        source={IMAGES.map}
                                        resizeMode='contain'
                                        tintColor={colors.gray70}
                                    />
                                    <Text style={[FONTS.BodyXS, { color: colors.gray70 }]}>112, Golf Course Road</Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => navigation.navigate('Notification')}
                            style={[GlobalStyleSheet.center, {
                                padding: 5,
                                height: 40,
                                width: 40,
                                borderRadius: 30,
                                position: 'absolute',
                                right: -10
                            }]}
                        >
                            <Image
                                style={{ width: 20, height: 20 }}
                                resizeMode='contain'
                                source={IMAGES.bell2}
                                tintColor={colors.gray70}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingVertical: 15 }}>
                        <TextInput
                            style={[FONTS.BodyM, {
                                ...FONTS.fontMedium,
                                height: 50,
                                borderRadius: 8,
                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                paddingHorizontal: 20,
                                paddingLeft: 45,
                                color: colors.title,
                                position: 'relative',
                                elevation: 1.5
                            }]}
                            placeholder='Search Property'
                            placeholderTextColor={colors.gray50}
                            editable={false}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                            activeOpacity={0.8}
                            style={{
                                height: 50,
                                width: '100%',
                                borderRadius: 8,
                                position: 'absolute',
                                top: 15,
                                bottom: 0,
                                left: 0,
                                right: 0,
                            }}
                        />
                        <View
                            style={[GlobalStyleSheet.headerBtn,
                            {
                                borderRadius: 15,
                                position: 'absolute',
                                left: 3,
                                top: 18,
                            }
                            ]}
                        >
                            <FeatherIcon name='search' size={20} color={colors.gray40} />
                        </View>
                        <TouchableOpacity
                            onPress={() => filterRef.current.openSheet()}
                            activeOpacity={0.5}
                            style={[GlobalStyleSheet.headerBtn,
                            {
                                position: 'absolute',
                                right: 3,
                                top: 18,
                                backgroundColor: colors.card
                            }
                            ]}
                        >
                            <Image style={{ width: 16, height: 16 }} source={IMAGES.filter2} resizeMode='contain' tintColor={colors.gray100} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                >
                    <View style={{ flexDirection: "row", gap: 7 }}>
                        {(propertyTypesLoading ? [PROPERTY_TYPE_ALL] : propertyTypes).map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setSelected(item.id);
                                    if (item.id !== 0) {
                                        navigation.navigate('Search', { propertyTypeId: item.id, propertyTypeName: item.name });
                                    }
                                }}
                                style={[{
                                    padding: 10,
                                    paddingHorizontal: 12,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: theme.dark ? '#565656' : '#E2E4ED',
                                    backgroundColor: theme.dark ? COLORS.dark : COLORS.white
                                }, selected === item.id && {
                                    backgroundColor: theme.dark ? '#9654F4' : COLORS.primary,
                                    borderColor: theme.dark ? '#9654F4' : COLORS.primary,
                                }]}
                            >
                                <Text
                                    style={[
                                        FONTS.BodyXS, FONTS.fontMedium, {
                                            color: theme.dark ? COLORS.white : COLORS.dark
                                        }, selected === item.id && {
                                            color: COLORS.white
                                        }
                                    ]}
                                >{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 45 }}>
                <View style={[GlobalStyleSheet.container, { flex: 1, padding: 0, paddingTop: 20 }]}>
                    <View style={[GlobalStyleSheet.flexcenter, { paddingHorizontal: 20 }]}>
                        <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: colors.gray100 }]}>Top Properties</Text>
                        <TouchableOpacity
                            style={[GlobalStyleSheet.flexcenter, { gap: 2 }]}
                            onPress={() => navigation.navigate('Search_List', { filters: {} })}
                            activeOpacity={0.8}
                        >
                            <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: theme.dark ? '#9F5DFF' : COLORS.primary }]}>View All</Text>
                            <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF' : COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 5, marginBottom: 15 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 40 }}>
                                {recommendedLoading ? (
                                    <View style={{ paddingVertical: 24, minWidth: 280 }}>
                                        <ActivityIndicator size="large" color={theme.dark ? '#9654F4' : COLORS.primary} />
                                    </View>
                                ) : recommendedList.length === 0 ? (
                                    <View style={{ paddingVertical: 24, minWidth: 280, alignItems: 'center' }}>
                                        <Text style={[FONTS.BodyM, FONTS.fontMedium, { color: colors.gray60 }]}>No recommendations right now</Text>
                                    </View>
                                ) : recommendedList.map((data, index) => {
                                    const imgSrc = data.images?.[0] && (data.images[0] as any).uri ? { uri: (data.images[0] as any).uri } : data.images?.[0];
                                    return (
                                        <View
                                            key={data.id || index}
                                            style={[styles.card, { backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white }]}>
                                            <View
                                                style={{
                                                    width: "100%",
                                                    height: null,
                                                    aspectRatio: 1 / 0.5,
                                                    borderRadius: 6,
                                                    overflow: "hidden",
                                                }}>
                                                <Image
                                                    source={imgSrc || IMAGES.projectpic1}
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
                                                    <View style={[GlobalStyleSheet.flexcenter, { flex: 1, alignItems: 'flex-start', justifyContent: 'flex-end' }]}>

                                                        {/* Heart Icon */}
                                                        <Likebtn
                                                            onPress={() => inSaveProperty().includes(data.id) ? removeItemFromsaveProperty(data.id) : addItemTosaveProperty(data)}
                                                            id={data.id}
                                                            inSaveProperty={inSaveProperty}
                                                        />
                                                    </View>

                                                    {/* Rent + Time */}
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                                        <View
                                                            style={{
                                                                padding: 7,
                                                                borderRadius: 30,
                                                                backgroundColor: '#FC3752'
                                                            }}
                                                        >
                                                            <Text style={[FONTS.fontSemiBold, { fontSize: 11, color: COLORS.white }]}>
                                                                {data.status}
                                                            </Text>
                                                        </View>

                                                        {/* <View
                                                            style={{
                                                                padding: 7,
                                                                borderRadius: 30,
                                                                backgroundColor: colors.gray100
                                                            }}
                                                        >
                                                            <Text style={[FONTS.fontSemiBold, { fontSize: 11, color: theme.dark ? COLORS.darkwhite : COLORS.white }]}>
                                                                {data.time}
                                                            </Text>
                                                        </View> */}
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ padding: 10 }}>
                                                <TouchableOpacity
                                                    activeOpacity={0.8}
                                                    style={{ marginBottom: 5 }}
                                                    onPress={() => navigation.navigate('Property_Details', { data: data })}
                                                >
                                                    <Text style={[FONTS.h5, FONTS.fontSemiBold, { color: colors.gray100 }]}>{data.title}</Text>
                                                </TouchableOpacity>
                                                <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray70 }]}>{data.type} | {data.area}</Text>
                                                <View style={{ height: 1, backgroundColor: colors.gray20, marginVertical: 10 }} />
                                                <View style={[GlobalStyleSheet.flexcenter]}>
                                                    <Text style={[FONTS.BodyM, FONTS.fontMedium, { color: theme.dark ? '#9654F4' : COLORS.primary }]}>{data.price}</Text>
                                                    <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start' }}>
                                                        <Image
                                                            source={IMAGES.map}
                                                            style={{ height: 13, width: 13 }}
                                                            resizeMode='contain'
                                                            tintColor={colors.gray70}
                                                        />
                                                        <Text style={[FONTS.fontXs, FONTS.fontRegular, { color: colors.gray70 }]}>{data.location}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[GlobalStyleSheet.flexcenter, { paddingHorizontal: 20 }]}>
                        <Text style={[FONTS.BodyM, FONTS.fontSemiBold, { color: colors.gray100 }]}>Homes by furnishing</Text>
                        <TouchableOpacity
                            style={[GlobalStyleSheet.flexcenter, { gap: 2 }]}
                            onPress={() => navigation.navigate('Search_List', { filters: {} })}
                            activeOpacity={0.8}
                        >
                            <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: theme.dark ? '#9F5DFF' : COLORS.primary }]}>View All</Text>
                            <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF' : COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 8, marginBottom: 15 }}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ marginHorizontal: 20 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginRight: 40 }}>
                                {furnishingLoading ? (
                                    <View style={{ paddingVertical: 24, minWidth: 110, alignItems: 'center' }}>
                                        <ActivityIndicator size="small" color={theme.dark ? '#9654F4' : COLORS.primary} />
                                    </View>
                                ) : furnishingOptions.length === 0 ? (
                                    <View style={{ paddingVertical: 24, minWidth: 110, alignItems: 'center' }}>
                                        <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray60 }]}>No furnishing types</Text>
                                    </View>
                                ) : furnishingOptions.map((data) => (
                                    <View
                                        style={{ flexDirection: 'column', alignItems: 'center', gap: 10 }}
                                        key={data.id}
                                    >
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Search_List', { filters: { furnishing_status: data.furnishing_status } })}
                                            activeOpacity={0.8}
                                            style={[{
                                                height: 110,
                                                width: 110,
                                                borderRadius: 10,
                                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                                padding: 5,
                                                elevation: 4,
                                                shadowColor: 'rgba(0,0,0,0.5)',
                                                shadowOffset: { width: 0, height: 0 },
                                                shadowOpacity: .10,
                                                shadowRadius: 30,
                                            }]}
                                        >
                                            <View style={[GlobalStyleSheet.center, { overflow: 'hidden', borderRadius: 6, flex: 1 }]}>
                                                <Image
                                                    style={{ width: '100%', height: '100%' }}
                                                    resizeMode='cover'
                                                    source={data.image}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray100 }]} numberOfLines={1}>{data.title}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                    <View>
                        <View style={[GlobalStyleSheet.flexcenter, { paddingHorizontal: 20, marginBottom: 10 }]}>
                            <Text style={[FONTS.h5, FONTS.fontSemiBold, { color: colors.gray90 }]}>Rent properties</Text>
                            <TouchableOpacity
                                style={[GlobalStyleSheet.flexcenter, { gap: 2 }]}
                                onPress={() => navigation.navigate('Search_List', { filters: { type: 'rent' } })}
                                activeOpacity={0.8}
                            >
                                <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: theme.dark ? '#9F5DFF' : COLORS.primary }]}>View All</Text>
                                <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF' : COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                {rentLoading ? (
                                    <View style={{ paddingVertical: 24, minWidth: 350, alignItems: 'center' }}>
                                        <ActivityIndicator size="large" color={theme.dark ? '#9654F4' : COLORS.primary} />
                                    </View>
                                ) : rentList.length === 0 ? (
                                    <View style={{ paddingVertical: 24, minWidth: 350, alignItems: 'center' }}>
                                        <Text style={[FONTS.BodyM, FONTS.fontMedium, { color: colors.gray60 }]}>No rent properties at the moment</Text>
                                    </View>
                                ) : rentList.map((item) => (
                                    <View key={item.id} style={{ width: 350 }}>
                                        <PropertyCard
                                            id={item.id}
                                            images={item.images}
                                            title={item.title}
                                            location={item.location}
                                            price={item.price}
                                            status={item.status}
                                            time={item.time}
                                            area={item.area}
                                            tags={item.tags}
                                            userName={item.userName}
                                            userPic={item.userPic}
                                            onPress={() => navigation.navigate('SingleChat', { data: item })}
                                            PropertyDetailsonPress={() => navigation.navigate('Property_Details', { data: (item as any)._raw || item })}
                                            SavePropertyonPress={() => addItemTosaveProperty(item)}
                                        />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <SidebarSheet
                ref={sheetRef}
            />
            <FilterSheet
                ref={filterRef}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 5,
        marginBottom: 10,
        width: 280,
        elevation: 4,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .10,
        shadowRadius: 30,
    }
})

export default Home