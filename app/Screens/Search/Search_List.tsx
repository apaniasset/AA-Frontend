import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useRef, useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import PropertyCard from '../../components/Card/PropertyCard';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import SortSheet from '../../components/BottomSheet/SortSheet';
import { useDispatch } from 'react-redux';
import { addTosaveProperty } from '../../redux/reducer/savePropertyReducer';
import { searchPropertiesList } from '../../services/properties';
import type { PropertyListItem, PropertyListFilters } from '../../services/properties';

const filterBtnData = [
    {
        id: "0",
        title: 'Sort',
        icon: true
    },
    {
        id: "1",
        title: 'Budget',
        icon: true
    },
    {
        id: "2",
        title: 'BHK',
        icon: true
    },
    {
        id: "3",
        title: 'Owner'
    },
    {
        id: "4",
        title: 'Verified'
    },
]

function mapApiItemToCard(item: PropertyListItem) {
    const price = item.rent_price ? `₹${Number(item.rent_price).toLocaleString()}/mo` : (item.sale_price ? `₹${Number(item.sale_price).toLocaleString()}` : '—');
    const imgUri = item.images?.[0]?.image_url;
    return {
        id: String(item.id),
        title: item.title || 'Untitled',
        location: [item.area, item.city, item.state].filter(Boolean).join(', ') || '—',
        price,
        status: item.listing_type || 'Sale',
        time: '',
        area: item.carpet_area ? `${item.carpet_area} Sqft` : (item.area || ''),
        tags: [],
        images: imgUri ? [{ uri: imgUri }] : [IMAGES.projectpic1],
        userName: '',
        userPic: IMAGES.small1,
        _raw: item,
    };
}

type Search_ListScreenProps = StackScreenProps<RootStackParamList, 'Search_List'>;

const Search_List = ({ navigation, route }: Search_ListScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const dispatch = useDispatch();
    const filtersFromRoute = (route.params?.filters || {}) as PropertyListFilters;

    const addItemTosaveProperty = (data: any) => {
        dispatch(addTosaveProperty(data));
    };

    const sheetRef = useRef<any>(null);
    const dynamicSheetRef = useRef<any>(null);

    const [sortValue, setSortValue] = useState("Relevance");
    const [budgetValue, setBudgetValue] = useState("");
    const [bhkValue, setBhkValue] = useState("");
    const [ownerValue, setOwnerValue] = useState("");
    const [verifiedValue, setVerifiedValue] = useState("");

    const [propertyList, setPropertyList] = useState<ReturnType<typeof mapApiItemToCard>[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        const payload: PropertyListFilters = { ...filtersFromRoute, per_page: 20, page: 1 };
        if (ownerValue === 'Owner Only') payload.owner_only = 1;
        if (bhkValue) {
            const bhk = parseInt(bhkValue.replace(/\D/g, ''), 10);
            if (!isNaN(bhk)) payload.bedrooms = bhk;
        }
        searchPropertiesList(payload)
            .then((res) => {
                if (!cancelled && res.success && res.data?.data) {
                    setPropertyList(res.data.data.map(mapApiItemToCard));
                } else if (!cancelled) {
                    setPropertyList([]);
                }
            })
            .catch(() => {
                if (!cancelled) setPropertyList([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [filtersFromRoute?.search, filtersFromRoute?.type, filtersFromRoute?.city_id, filtersFromRoute?.property_type_id, filtersFromRoute?.bedrooms, filtersFromRoute?.min_price, filtersFromRoute?.max_price, filtersFromRoute?.furnishing_status, filtersFromRoute?.possession_status, ownerValue, bhkValue]);


    const handleFilterPress = (type: string) => {

        if (type === "Sort") {
            dynamicSheetRef.current.open({
                title: "Sort By",
                options: ["Relevance", "Price Low to High", "Price High to Low"],
                selected: sortValue,
                onSelect: (val: string) => setSortValue(val),
            });
        }

        if (type === "Budget") {
            dynamicSheetRef.current.open({
                title: "Budget",
                options: ["Under 10k", "10k - 20k", "20k - 30k", "30k+"],
                selected: budgetValue,
                onSelect: (val: string) => setBudgetValue(val),
            });
        }

        if (type === "BHK") {
            dynamicSheetRef.current.open({
                title: "BHK Type",
                options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
                selected: bhkValue,
                onSelect: (val: string) => setBhkValue(val),
            });
        }

        if (type === "Owner") {
            dynamicSheetRef.current.open({
                title: "Owner Listings",
                options: ["Owner Only", "All Listings"],
                selected: ownerValue,
                onSelect: (val: string) => setOwnerValue(val),
            });
        }

        if (type === "Verified") {
            dynamicSheetRef.current.open({
                title: "Verified Properties",
                options: ["Verified Only", "Show All"],
                selected: verifiedValue,
                onSelect: (val: string) => setVerifiedValue(val),
            });
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={[]}>
            <View style={[GlobalStyleSheet.container, { paddingHorizontal: 0, backgroundColor: colors.background }]}>
                <View style={[GlobalStyleSheet.flexcenter, { gap: 14, marginBottom: 10, paddingHorizontal: 20, paddingLeft: 10 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[GlobalStyleSheet.headerBtn, { height: 36, width: 36 }]}
                    >
                        <FeatherIcon name='arrow-left' size={20} color={colors.gray90} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            style={[FONTS.BodyM, {
                                ...FONTS.fontMedium,
                                height: 40,
                                borderRadius: 8,
                                backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                paddingHorizontal: 20,
                                paddingRight: 45,
                                color: colors.title,
                                position: 'relative',
                                elevation: 1,
                                borderWidth: 1,
                                borderColor: colors.gray20
                            }]}
                            placeholder='Enter Location'
                            placeholderTextColor={colors.gray50}
                            autoFocus
                        />
                        <View
                            style={[GlobalStyleSheet.headerBtn,
                            {
                                borderRadius: 15,
                                position: 'absolute',
                                right: 0,
                                top: -1,
                            }
                            ]}
                        >
                            <FeatherIcon name='search' size={20} color={colors.gray40} />
                        </View>
                    </View>
                </View>
                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={[GlobalStyleSheet.flexcenter, { gap: 7, paddingHorizontal: 20 }]}>
                            <TouchableOpacity
                                onPress={() => sheetRef.current.openSheet()}
                                style={[GlobalStyleSheet.headerBtn, {
                                    height: 35,
                                    width: 35,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: theme.dark ? '#9654F4' : COLORS.primary,
                                    backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white
                                }]}
                            >
                                <Image
                                    style={{ height: 16, width: 16 }}
                                    resizeMode='contain'
                                    source={IMAGES.filter2}
                                    tintColor={theme.dark ? '#9654F4' : COLORS.primary}
                                />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                {filterBtnData.map((data) => {
                                    return (
                                        <TouchableOpacity
                                            key={data.id}
                                            onPress={() => handleFilterPress(data.title)}
                                            activeOpacity={0.8}
                                            style={[
                                                GlobalStyleSheet.center, {
                                                    flexDirection: 'row',
                                                    gap: 2,
                                                    paddingHorizontal: 12,
                                                    padding: 10,
                                                    backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: colors.checkBoxborder,
                                                }
                                            ]}
                                        >
                                            <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray90 }]}>{data.title}</Text>
                                            {data.icon === true &&
                                                <FeatherIcon name='chevron-down' size={16} color={colors.gray40} />
                                            }
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingBottom: 25 }]}>
                    {loading ? (
                        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.dark ? '#9654F4' : COLORS.primary} />
                        </View>
                    ) : propertyList.length > 0 ? (
                        propertyList.map((item) => (
                            <View key={item.id} style={{ marginBottom: 10 }}>
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
                        ))
                    ) : (
                        <View style={{ paddingVertical: 48, alignItems: 'center', paddingHorizontal: 24 }}>
                            <Text style={[FONTS.BodyM, FONTS.fontMedium, { color: colors.gray70, textAlign: 'center' }]}>
                                No properties found. Try different search or filters.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <FilterSheet
                ref={sheetRef}
            />
            <SortSheet
                ref={dynamicSheetRef}
            />
        </SafeAreaView>
    )
}

export default Search_List