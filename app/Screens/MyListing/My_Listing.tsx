import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from '../../constants/theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { IMAGES } from '../../constants/Images';
import Progresscircle from '../../components/Progresscircle';
import FilterSheet from '../../components/BottomSheet/FilterSheet';
import SortSheet from '../../components/BottomSheet/SortSheet';
import { getPropertiesList, PropertyListItem } from '../../services/properties';


type My_ListingScreenProps = StackScreenProps<RootStackParamList, 'My_Listing'>;

const My_Listing = ({ navigation } : My_ListingScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const sheetRef = useRef<any>(null);
    const dynamicSheetRef = useRef<any>(null);
    const [sortValue, setSortValue] = useState("Relevance");
    const [propertyList, setPropertyList] = useState<PropertyListItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getPropertiesList(1)
            .then((res) => {
                if (!cancelled && res.success && res.data?.data) setPropertyList(res.data.data);
            })
            .catch(() => {
                if (!cancelled) setPropertyList([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, []);

    return (
         <View style={{ backgroundColor: colors.card, flex: 1 }}>
            <View 
                style={{padding:10,backgroundColor:colors.background}}
            >
                <View style={[GlobalStyleSheet.flexcenter]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                        style={[GlobalStyleSheet.headerBtn,{height:36,width:36}]}
                    >
                        <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
                    </TouchableOpacity>
                    <Text style={[FONTS.h5,FONTS.fontMedium,{color:colors.gray100,flex:1}]}>Active listing</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                GlobalStyleSheet.center,{
                                    flexDirection:'row',
                                    gap:2,
                                    paddingHorizontal:12,
                                    padding:10,
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                    borderRadius:10,
                                    borderWidth:1,
                                    borderColor:theme.dark ? '#565656': '#E2E4ED',
                                }
                            ]}
                            onPress={() => dynamicSheetRef.current.open({
                                title: "Sort By",
                                options: ["Relevance", "Price Low to High", "Price High to Low"],
                                selected: sortValue,
                                onSelect: (val: string) => setSortValue(val),
                            })}
                        >
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Sort</Text>
                            <FeatherIcon name='chevron-down' size={16} color={colors.gray40}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => sheetRef.current.openSheet()}
                            style={[GlobalStyleSheet.headerBtn,{
                                height:35,
                                width:35,
                                borderRadius:10,
                                borderWidth:1,
                                borderColor:theme.dark ? '#9654F4': COLORS.primary,
                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                            }]}
                        >
                            <Image
                                style={{height:16,width:16}}
                                resizeMode='contain'
                                source={IMAGES.filter2}
                                tintColor={theme.dark ? '#9654F4': COLORS.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:10}}>
                    <TextInput
                        style={[FONTS.BodyM,{
                            ...FONTS.fontMedium,
                            height:40,
                            borderRadius:8,
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            paddingHorizontal:20,
                            paddingRight:45,
                            color:colors.title,
                            position:'relative',
                            elevation:1,
                            borderWidth:1,
                            borderColor:colors.gray20
                        }]}
                        placeholder='Search Listing'
                        placeholderTextColor={colors.gray50}
                        autoFocus
                    />
                    <View
                        style={[GlobalStyleSheet.headerBtn,
                            {
                                borderRadius:15,
                                position:'absolute',
                                right:0,
                                top:-1,
                            }
                        ]}
                    >
                        <FeatherIcon name='search' size={20} color={colors.gray40}/>
                    </View>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View
                    style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:20}]}
                >
                    {loading ? (
                        <View style={{ paddingVertical: 24, alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.dark ? '#9654F4' : COLORS.primary} />
                        </View>
                    ) : (
                        propertyList.map((data) => {
                            const listType = data.listing_type === 'Sale' ? 'For Sell' : (data.listing_type || 'Rent');
                            const price = data.rent_price ? `₹${Number(data.rent_price).toLocaleString()}` : (data.sale_price ? `₹${Number(data.sale_price).toLocaleString()}` : '—');
                            const priceType = data.listing_type === 'Rent' ? 'Month' : '';
                            const areaText = data.carpet_area ? `${data.carpet_area} Sqft` : (data.area || '');
                            const imgUri = data.images?.[0]?.image_url;
                            const progress = data.status === 'active' && (data.city_id != null && data.address_line1) ? 0.99 : 0.10;
                            return (
                                <View
                                    key={data.id}
                                    style={[styles.card,{
                                        backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                    }]}
                                >
                                    <View style={[GlobalStyleSheet.flexcenter]}>
                                        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                            <View
                                                style={{
                                                    padding:2,
                                                    paddingHorizontal:5,
                                                    backgroundColor: listType === 'For Sell' ? theme.dark ? '#480000' : '#F8EFF1' : theme.dark ? '#0B3C0D' : '#EFF8EF',
                                                    borderRadius:4
                                                }}
                                            >
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color: listType === 'For Sell' ? theme.dark ? '#DA243D' : '#FC3752' : theme.dark ? '#D8FFDA' : '#267529'}]}>{listType}</Text>
                                            </View>
                                            <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray50}]}><Text style={{color:colors.gray90}}>ID:</Text> {data.property_id || data.id}</Text>
                                        </View>
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:'#4FB954'}]}>{data.status || 'Active'}</Text>
                                    </View>
                                    <View style={{height:1,backgroundColor:colors.checkBoxborder,marginVertical:10}}/>
                                    <View>
                                        <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                                            <View
                                                style={{
                                                    width:115,
                                                    height:90,
                                                    borderRadius:6,
                                                    backgroundColor: colors.gray20,
                                                    overflow:'hidden'
                                                }}
                                            >
                                                {imgUri ? (
                                                    <Image
                                                        source={{ uri: imgUri }}
                                                        style={{ width: "100%", height: "100%", borderRadius: 6 }}
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <Image
                                                        source={IMAGES.projectpic1}
                                                        style={{ width: "100%", height: "100%", borderRadius: 6 }}
                                                        resizeMode="cover"
                                                    />
                                                )}
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
                                            <View style={{flex:1,paddingRight:60}}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Property_Details', { data })}
                                                    activeOpacity={0.8}
                                                    style={{marginBottom:5}}
                                                >
                                                    <Text numberOfLines={3} style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>{data.title || 'Untitled'}</Text>
                                                </TouchableOpacity>
                                                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                        {price}{priceType ? ` / ${priceType}` : ''}
                                                    </Text>
                                                    {(price && areaText) ? <View style={{height:4,width:4,borderRadius:4,backgroundColor:colors.gray50}}/> : null}
                                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                                        {areaText || data.city || data.area || ''}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{height:1,backgroundColor:colors.checkBoxborder,marginVertical:10}}/>
                                    <View style={[GlobalStyleSheet.flexcenter]}>
                                        <View style={[GlobalStyleSheet.flexcenter,{width:'40%',gap:5}]}>
                                            <Progresscircle progress={progress} />
                                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60,flex:1}]}>Posting Completion:</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Property_Details', { data })}
                                            activeOpacity={0.8}
                                            style={{
                                                padding: 8,
                                                paddingHorizontal: 15,
                                                backgroundColor: colors.checkBoxborder,
                                                borderRadius: 8,
                                                width:'60%'
                                            }}
                                        >
                                            <Text style={[FONTS.BodyS, FONTS.fontRegular, { color: colors.gray90,textAlign:'center' }]}>
                                                Manage Property
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>
            <FilterSheet
                ref={sheetRef}
            />
            <SortSheet
                ref={dynamicSheetRef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        padding:10,
        backgroundColor: COLORS.white,
        borderRadius:10,
        elevation: 4,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: .10,
        shadowRadius: 30,
        marginBottom:10
    }
})

export default My_Listing