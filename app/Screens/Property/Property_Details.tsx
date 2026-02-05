import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Platform, Animated, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import FeatherIcon from "react-native-vector-icons/Feather";
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { IMAGES } from '../../constants/Images';
import CustomInput from '../../components/Input/CustomInput';
import Button from '../../components/Button/Button';
import PropertyCard from '../../components/Card/PropertyCard';
import Progresscircle from '../../components/Progresscircle';
import Likebtn from '../../components/Likebtn';
import { useDispatch, useSelector } from 'react-redux';
import { addTosaveProperty, removeFromsaveProperty } from '../../redux/reducer/savePropertyReducer';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const propertyHighlights = [
    {
        id: 1,
        icon: IMAGES.house_building,  
        title: "2 BHK",
        subtitle: "and 2 Bath",
    },
    {
        id: 2,
        icon: IMAGES.Floors,
        title: "1 out of 2",
        subtitle: "floors",
    },
    {
        id: 3,
        icon: IMAGES.peopleroof,
        title: "For Family",
        subtitle: "Only",
    },
    {
        id: 4,
        icon: IMAGES.maximize,
        title: "1,250 sq.ft.",
        subtitle: "Carpet Area",
    },
    {
        id: 5,
        icon: IMAGES.datepicker,
        title: "Available from",
        subtitle: "Jan 1 2025",
    },
];

const propertyDetails = [
  { label: "Layout", value: "3 BHK, 2 Baths" },
  { label: "Carpet Area", value: "1100 sq.ft. (102.19 sq.m.)" },
  { label: "Furnishing", value: "Unfurnished" },
  { label: "Floor number", value: "1" },
  { label: "Flooring", value: "Marble" },
  { label: "Company lease required", value: "Yes" },
  { label: "Notice period", value: "1 months" },
  { label: "Property ID", value: "I86287406" },
];

const ReviewData = [
    {
        title:"5",
        ratingwitdh:0,
    },
    {
        title:"4",
        ratingwitdh:50,
    },
    {
        title:"3",
        ratingwitdh:100,
    },
    {
        title:"2",
        ratingwitdh:150,
    },
    {
        title:"1",
        ratingwitdh:200,
    },
]

const reviews = [
    {
        id: 1,
        rating: 4.5,
        category: "Family-Friendly Area",
        positive: "The location offers excellent convenience for daily life. Public transport is easily accessible, and cabs or autos are readily available throughout the day. Markets, schools, and hospitals are all within walking distance, making it a great choice for.",
        negative: "The only downsides are the lack of metro connectivity and occasional water shortages. While these issues can be managed, they might be a concern for some residents who rely heavily on metro travel or consistent water supply.",
        user: {
            name: "James Parker",
            role: "Owner",
            avatar: IMAGES.user2,
            timeAgo: "5 Day ago",
        },
        colors: {
            rating: "#0CB057",  
            positiveBg: "#EFF8EF",
            negativeBg: "#F8EFF1",
        }
    },
    {
        id: 2,
        rating: 3.2,
        category: "Family-Friendly Area",
        positive: "The location offers excellent convenience for daily life. Public transport is easily accessible, and cabs or autos are readily available throughout the day. Markets, schools, and hospitals are all within walking distance, making it a great choice for. ",
        negative: "The only downsides are the lack of metro connectivity and occasional water shortages. While these issues can be managed, they might be a concern for some residents who rely heavily on metro travel or consistent water supply.",
        user: {
            name: "James Parker",
            role: "Owner",
            avatar: IMAGES.user2,
            timeAgo: "5 Day ago",
        },
        colors: {
            rating: "#FDB022",
            positiveBg: "#EFF8EF",
            negativeBg: "#F8EFF1",
        }
    },
];

const propertyData = [
    {
        id: "1",
        images: [IMAGES.projectpic1],
        title: "Luxury 2 BHK Apartment in Greenview Residency",
        location: "Downtown Austin, Texas",
        price: "$2,400",
        status: "Ready to move",
        tags: ["Family", "Furnished", "Garden View", "Lift"],
        area: "1,250 Sqft",
        time: "2m ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    },
    {
        id: "2",
        images: [IMAGES.projectpic2, IMAGES.projectpic3],
        title: "Modern 3 BHK Villa with Open Terrace",
        location: "San Francisco, California",
        price: "$3,900",
        status: "Under Construction",
        tags: ["Swimming Pool", "Gym", "Parking"],
        area: "1,850 Sqft",
        time: "10m ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    },
    {
        id:"3",
        images: [IMAGES.projectpic4, IMAGES.projectpic5, IMAGES.projectpic6,IMAGES.projectpic2],
        title: "Premium Studio Apartment with Lake View",
        location: "Chicago, Illinois",
        price: "$1,500",
        status: "Available",
        tags: ["Lake View", "Pet Friendly", "Security"],
        area: "750 Sqft",
        time: "30m ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    },
    {
        id: "4",
        images: [IMAGES.projectpic3, IMAGES.projectpic1, IMAGES.projectpic4],
        title: "4 BHK Ultra Luxury Penthouse",
        location: "New York City, USA",
        price: "$6,800",
        status: "Ready to move",
        tags: ["Swimming Pool", "Private Lift", "Sky Lounge", "Smart Home"],
        area: "3,500 Sqft",
        time: "1h ago",
        userName:"Ethan Walker",
        userPic:IMAGES.small1
    }
];

const TabViewData = [
    {
        title:"Overview",
        name: "Overview"
    },
    {
        title:"Highlight",
        name: "Highlight"
    },
    {
        title:"Details",
        name: "Details"
    },
    {
        title:"Media",
        name: "Media"
    },
    {
        title:"Seller",
        name: "Seller"
    },
    {
        title:"Location",
        name: "Location"
    },
    {
        title:"Explore",
        name: "Explore"
    },
]


type Property_DetailsScreenProps = StackScreenProps<RootStackParamList, 'Property_Details'>;

const Property_Details = ({route,navigation } : Property_DetailsScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const dispatch = useDispatch();
    
    const addItemTosaveProperty = (data: any) => {
        dispatch(addTosaveProperty(data));
    }

    const saveProperty = useSelector((state:any) => state.saveProperty.saveProperty);

    const inSaveProperty = () => {
        var temp = [] as any;
        saveProperty.forEach((data:any) => {
            temp.push(data.id);
        });
        return temp;
    }

    const removeItemFromsaveProperty = (data: any) => {
        dispatch(removeFromsaveProperty(data));
    }


    const tags = ["Family", "Furnished", "Garden View", "Lift"]

    const [selected, setSelected] = useState("yes");

    const positivestabs =  [
        "Good Public Transport",
        "Good Public Transport",
        "Markets at a Walkable Distance",
        "Good Schools are Nearby",
        "Safe at Night",
        "Good Hospitals are Nearby"
    ];

    const negativestabs =  [
        "No Metro Connectivity",
        "Frequent Water Shortage"
    ];
    
    const imageSource = data?.images?.length > 0 ? data.images[0] : data?.image ? data.image : null;

    const [showTabs, setShowTabs] = useState(false);
    const tabOpacity = useRef(new Animated.Value(0)).current;
    const tabTranslateY = useRef(new Animated.Value(-20)).current;


    const showTabBar = () => {
        Animated.parallel([
            Animated.timing(tabOpacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(tabTranslateY, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const hideTabBar = () => {
        Animated.parallel([
            Animated.timing(tabOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(tabTranslateY, {
                toValue: -20,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };



    const [activeIndex, setActiveIndex] = useState<any>('Overview');
    const underlinePosition = useRef(new Animated.Value(0)).current;

    const animateUnderline = (index: number) => {
        Animated.timing(underlinePosition, {
            toValue: index * (SIZES.container / 10 ), 
            useNativeDriver: false,
            duration: 200
        }).start();
    };

    const [sectionHeights, setSectionHeights] = useState(new Array(TabViewData.length).fill(0));
    const scrollViewRef = useRef<any>(null);

    const handleLayout = (index:any) => (event:any) => {
        const { height } = event.nativeEvent.layout;
        setSectionHeights((prevHeights) => {
            const newHeights = [...prevHeights];
            newHeights[index] = height;
            return newHeights;
        });
    };

    const handleScroll = (event:any) => {
        const { contentOffset } = event.nativeEvent;

        let totalHeight = -20;
        sectionHeights.forEach((height, index) => {
            const sectionStart = totalHeight;
            const sectionEnd = totalHeight + height;


            if (sectionStart <= contentOffset.y && sectionEnd > contentOffset.y) {
                setActiveIndex(TabViewData[index].name);
                animateUnderline(index);
                scrollTabToIndex(index);  // <-- ADD THIS
            }

            totalHeight += height;
        });

        if (contentOffset.y > 250) {
            if (!showTabs) {
                setShowTabs(true);
                showTabBar();
            }
        } else {
            if (showTabs) {
                setShowTabs(false);
                hideTabBar();
            }
        }

    };

    const tabScrollRef = useRef(null);

    const scrollTabToIndex = (index:any) => {
        const tabWidth = SIZES.container / 10; // YOUR TAB WIDTH

        tabScrollRef.current?.scrollTo({
            x: tabWidth * index - tabWidth * 2, // center alignment
            animated: true,
        });
    };

    const scrollToSection = (index:any) => {
        const offset = sectionHeights
            .slice(0, index)
            .reduce((acc, height) => acc + height, 0);

        setTimeout(() => {
            scrollViewRef.current?.scrollTo({
                y: offset,
                animated: true,
            });
        }, 50);   // <-- MAGIC FIX
    };


    const mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [{ "color": "#f5f5f5" }]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#616161" }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#f5f5f5" }]
        },
        {
            "featureType": "road",
            "stylers": [{ "color": "#ffffff" }]
        },
        {
            "featureType": "water",
            "stylers": [{ "color": "#c9e6ff" }]
        }
    ];


    
    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <View style={[GlobalStyleSheet.container,{padding:0,backgroundColor:colors.background}]}>
                <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:10,marginVertical:10}]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} 
                        style={[GlobalStyleSheet.headerBtn,{height:36,width:36}]}
                    >
                        <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
                    </TouchableOpacity>
                    <View style={{flex:1,marginLeft:10,marginRight:5}}>
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
                            placeholder='Search Property'
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
                    <Likebtn
                        onPress={() => inSaveProperty().includes(data.id) ? removeItemFromsaveProperty(data.id) : addItemTosaveProperty(data)}
                        id={data.id}
                        inSaveProperty={inSaveProperty}
                        hearder={true}
                    />
                </View>
                {showTabs && (
                    <Animated.View
                        style={{
                            width: "100%",
                            opacity: tabOpacity,
                            transform: [{ translateY: tabTranslateY }],
                        }}
                    >
                        <ScrollView
                            horizontal
                            ref={tabScrollRef}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginHorizontal: 10,
                                }}
                            >
                                {TabViewData.map((item:any, index:any) => {
                                    const isActive = item.name == activeIndex;

                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => {
                                                scrollToSection(index);
                                                scrollTabToIndex(index);
                                            }}
                                            style={{
                                                width: SIZES.container / 10,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                paddingBottom: 10,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.BodyM,
                                                    ...FONTS.fontRegular,
                                                    color: isActive ? colors.gray90 : colors.gray60,
                                                }}
                                            >
                                                {item.title}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}

                                <Animated.View
                                    style={{
                                        height: 3,
                                        backgroundColor:theme.dark ? '#9654F4' : COLORS.primary,
                                        width: SIZES.container / 10,
                                        position: "absolute",
                                        bottom: 0,
                                        left: underlinePosition,
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </Animated.View>
                )}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,paddingBottom:150}}
                ref={scrollViewRef}
                onScroll={handleScroll} 
            >
                <View style={[GlobalStyleSheet.container,{padding:0,flex:1}]}>
                    {TabViewData.map((item,index) => { 
                        if(item.name === 'Overview'){
                            return(
                                <View key={index} onLayout={handleLayout(index)}  style={{marginBottom:15}}>
                                    <View
                                        style={[GlobalStyleSheet.center, {
                                            width: '100%',
                                            aspectRatio: 1 / 0.55,
                                            borderRadius: 10,
                                            overflow: 'hidden',
                                            padding:5,
                                            marginBottom:5
                                        }]}
                                    >
                                        <View
                                            style={{
                                                width: "100%",
                                                aspectRatio: 1 / 0.55,
                                                borderRadius: 10,
                                                overflow: "hidden",
                                            }}
                                        >
                                            {imageSource && (
                                                <Image
                                                    source={typeof imageSource === "string" ? { uri: imageSource } : imageSource}
                                                    style={{ width: "100%", height: "100%" }}
                                                    resizeMode="cover"
                                                />
                                            )}
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
                                        <View style={{
                                            justifyContent: 'flex-end',
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            top: 0,
                                            padding: 12,
                                            paddingHorizontal: 12
                                        }}>
                                            <View style={[GlobalStyleSheet.flexcenter, { flex: 1, alignItems: 'flex-start' }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    {data.userPic ? 
                                                        <Image
                                                            style={{ height: 22, width: 22, borderRadius: 30 }}
                                                            resizeMode='contain'
                                                            source={data.userPic}
                                                        />
                                                    :
                                                        <Image
                                                            style={{ height: 22, width: 22, borderRadius: 30 }}
                                                            resizeMode='contain'
                                                            source={IMAGES.small1}
                                                        />
                                                    }
                                                    <Text style={[FONTS.BodyXS, FONTS.fontBold, { color: COLORS.white }]}>
                                                        {data.userName}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={[GlobalStyleSheet.headerBtn, {
                                                        height: 36,
                                                        width: 36,
                                                        borderRadius: 6,
                                                        backgroundColor: 'rgba(255,255,255,0.20)'
                                                    }]}
                                                >
                                                    <FeatherIcon name='maximize' size={18} color={COLORS.white} />
                                                </TouchableOpacity>
                                            </View>
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
                                                        {data.time}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[GlobalStyleSheet.flexcenter, { paddingVertical: 10,paddingHorizontal:10 }]}>
                                        <View style={{ width: '64%', paddingHorizontal: 10 }}>
                                            <Text numberOfLines={2} style={[FONTS.h6, FONTS.fontSemiBold, { color: colors.gray100 }]}>
                                            {data.title}
                                            </Text>
                                            {data.location &&
                                                <Text style={[FONTS.BodyXS,FONTS.fontRegular, { color: colors.gray50 }]}>
                                                    {data.location}
                                                </Text>
                                            }
                                        </View>
                    
                                        <View style={{ width: 1, height: 60, backgroundColor: colors.checkBoxborder }} />
                    
                                        <View style={[GlobalStyleSheet.center, { paddingHorizontal: 20,width:'35%' }]}>
                                            <Text style={[FONTS.h3, FONTS.fontSemiBold, { color: colors.gray100 }]}>{data.price}</Text>
                                            {data.type ? 
                                                <Text numberOfLines={2} style={[FONTS.BodyXS,FONTS.fontRegular, { color: colors.gray70,textAlign:'center' }]}>{data.type}</Text>
                                                :
                                                <Text numberOfLines={2} style={[FONTS.BodyXS,FONTS.fontRegular, { color: colors.gray70,textAlign:'center' }]}>{data.status}</Text>
                                            }
                                        </View>
                                    </View>
                                    <View style={{ paddingVertical: 5 }}>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 15 }}>
                                                {tags.map((data, index) => (
                                                    <View
                                                        key={index}
                                                        style={[GlobalStyleSheet.center, {
                                                            paddingHorizontal: 10,
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
                                </View>
                            )
                        }else if(item.name === 'Highlight'){
                            return(
                                <View key={index} onLayout={handleLayout(index)}  style={{backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white}}>
                                    <View style={{paddingHorizontal:20,paddingTop:15}}>
                                        <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Key Highlight</Text>
                                    </View>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{marginVertical:15,paddingHorizontal:20}}
                                    >
                                        <View style={{flexDirection:'row',alignItems:'center',gap:25}}>
                                            {propertyHighlights.map((data,index) => {
                                                return(
                                                    <View key={index} style={{alignItems:'center'}}>
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
                                                                source={data.icon}
                                                                tintColor={theme.dark ? '#9654F4': COLORS.primary}
                                                            />
                                                        </View>
                                                        <View style={{marginTop:5,alignItems:'center'}}>
                                                            <Text numberOfLines={1} style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,textAlign:'center'}]}>{data.title}</Text>
                                                            <Text numberOfLines={1} style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70,textAlign:'center'}]}>{data.subtitle}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </ScrollView>
                                </View>
                            )
                        }else if(item.name === 'Details'){
                            return(
                                <View key={index} onLayout={handleLayout(index)}  style={{padding:20}}>
                                    <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Key Highlight</Text>
                                    <View style={{marginTop:5}}>
                                        {propertyDetails.map((item, index) => (
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                {/* LABEL */}
                                                <Text
                                                    style={[
                                                        FONTS.h4,
                                                        FONTS.fontRegular,
                                                        {
                                                            fontSize:13,
                                                            color: colors.gray60,
                                                            width: '50%', // ensures alignment
                                                        },
                                                    ]}
                                                >
                                                    {item.label}:
                                                </Text>

                                                {/* VALUE */}
                                                <Text
                                                    style={[
                                                        FONTS.h4,
                                                        FONTS.fontRegular,
                                                        { 
                                                            flex: 1, 
                                                            fontSize:13,
                                                            color: colors.gray90 
                                                        },
                                                    ]}
                                                >
                                                    {item.value}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            )
                        }else if(item.name === 'Media'){
                            return(
                                <View key={index} onLayout={handleLayout(index)}  style={{marginBottom:15}}>
                                    <View style={{paddingHorizontal:20}}>
                                        <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Photos</Text>
                                    </View>
                                    <View style={{padding:5}}>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Galary')}
                                            activeOpacity={0.8}
                                            style={{
                                                flexDirection: "row",
                                                alignItems:'center',
                                                gap:3,
                                                width: "100%",
                                                aspectRatio: 1 / 0.55,
                                                borderRadius: 6,
                                            }}
                                        >
                                            <View style={{width:'50%',borderRadius:6}}>
                                                <Image
                                                    source={IMAGES.projectpic2}
                                                    style={{ width: "100%", height: "100%",borderRadius:6 }}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={{width:'50%',gap:3}}>
                                                <View style={{height:'49%',borderRadius:6}}>
                                                    <Image
                                                        source={IMAGES.projectpic1}
                                                        style={{ width: "100%", height: "100%",borderRadius:6 }}
                                                        resizeMode="cover"
                                                    />
                                                </View>
                                                <View style={{height:'50%',borderRadius:6}}>
                                                    <Image
                                                        source={IMAGES.projectpic3}
                                                        style={{ width: "100%", height: "100%",borderRadius:6 }}
                                                        resizeMode="cover"
                                                    />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }else if(item.name === 'Seller'){
                            return(
                                <View key={index} onLayout={handleLayout(index)}  style={{paddingHorizontal:20,marginBottom:30}}>
                                    <View style={{marginBottom:20}}>
                                        <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Contact Owner</Text>
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>Get a callback and resolve your queries</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
                                        <View style={{alignItems:'center',marginBottom:10}}> 
                                            <View
                                                style={[GlobalStyleSheet.center,{
                                                    height:50,
                                                    width:50,
                                                    borderRadius:50,
                                                    backgroundColor:theme.dark ? '#3C0C81': '#E0CAFF'
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
                                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>+01 90XXXXXX12</Text>
                                        </View>
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <CustomInput
                                            placeholder={'Name'}
                                            value={'Daniel Brooks'}
                                        />
                                        <CustomInput
                                            placeholder={'Phone Number'}
                                            value={'+01 123 456 7890'}
                                        />
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Are you Real Estate Agent</Text>
                                        <View style={{flexDirection:'row',alignItems:'center',gap:7,marginTop:10}}>
                                            <TouchableOpacity
                                                onPress={() => setSelected("yes")}
                                                style={[GlobalStyleSheet.center,{
                                                    paddingHorizontal: 29.5,
                                                    paddingVertical: 8,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: selected === "yes" ? colors.gray30 : colors.checkBoxborder,
                                                    backgroundColor: selected === "yes" ? colors.gray20 : theme.dark ? COLORS.darkwhite : COLORS.white,
                                                }]}
                                            >
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Yes</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => setSelected("no")}
                                                style={[GlobalStyleSheet.center,{
                                                    paddingHorizontal: 29.5,
                                                    paddingVertical: 8,
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: selected === "no" ? colors.gray30 : colors.checkBoxborder,
                                                    backgroundColor: selected === "no" ? colors.gray20 : theme.dark ? COLORS.darkwhite : COLORS.white,
                                                }]}
                                            >
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>No</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Button
                                        title='Request a Callback'
                                        btnRounded
                                        color={'#E0CAFF'}
                                        text={'#3C0C81'}
                                    />
                                </View>
                            )
                        }else if(item.name === 'Location'){
                            return(
                                <View key={index} onLayout={handleLayout(index)}  style={{marginBottom:20}}>
                                    <View style={{paddingHorizontal:20,paddingRight:50,marginBottom:10}}>
                                        <View style={{marginBottom:10}}>
                                            <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>About Property</Text>
                                            <Text numberOfLines={1} style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>Location: <Text style={{color:colors.gray60}}>South Shore, Chicago, IL</Text></Text>
                                        </View>
                                        <Text numberOfLines={2} style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray70}]}>Spacious 3 BHK apartment with balcony, modular kitchen, and parking. Ideal for families.</Text>
                                    </View>
                                    <View style={{padding:5}}>
                                        <View
                                            style={[GlobalStyleSheet.center, {
                                                width: '100%',
                                                aspectRatio: 1 / 0.49,
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                                backgroundColor:colors.background
                                            }]}
                                        >
                                            <MapView
                                                provider={PROVIDER_GOOGLE}
                                                style={StyleSheet.absoluteFillObject}
                                                initialRegion={{
                                                    latitude: 28.6139,
                                                    longitude: 77.2090,
                                                    latitudeDelta: 0.05,
                                                    longitudeDelta: 0.05,
                                                }}
                                                customMapStyle={mapStyle}   // Grey map style
                                            >
                                                {/* Marker 1 */}
                                                <Marker
                                                    coordinate={{ latitude: 28.6200, longitude: 77.2000 }}
                                                    pinColor="red"
                                                />

                                                {/* Marker 2 */}
                                                <Marker
                                                    coordinate={{ latitude: 28.6000, longitude: 77.2100 }}
                                                    pinColor="red"
                                                />
                                            </MapView>
                                        </View>
                                        <View
                                            style={{
                                                paddingHorizontal:15,
                                                paddingVertical:10,
                                                borderRadius:20,
                                                backgroundColor:COLORS.primary,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                gap:5,
                                                position:'absolute',
                                                bottom:15,
                                                right:15
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height:14,
                                                    width:14
                                                }}
                                                source={IMAGES.locationtrack}
                                            />
                                            <Text style={[FONTS.BodyXS,FONTS.fontSemiBold,{color:COLORS.white}]}>Direction</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }else if(item.name === 'Explore'){
                            return(
                                <View key={index} onLayout={handleLayout(index)} >
                                    <View style={{paddingHorizontal:20,marginBottom:10}}>
                                        <View style={[GlobalStyleSheet.flexcenter]}>
                                            <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Locality Reviews</Text>
                                            <TouchableOpacity 
                                                style={[GlobalStyleSheet.flexcenter,{gap:2}]}
                                                activeOpacity={0.8}
                                                onPress={() => navigation.navigate('Write_Review')}
                                            >
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary}]}>View All</Text>
                                                <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF': COLORS.primary}/>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>Get a callback and resolve your queries</Text>
                                    </View>
                                    <View
                                        style={{
                                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                            borderRadius:10,
                                            marginHorizontal:5,
                                            padding:12,
                                            paddingVertical:20,
                                            paddingRight:15,
                                            flexDirection:'row',
                                            alignItems:'center',
                                            elevation: 4,
                                            shadowColor: 'rgba(0,0,0,0.5)',
                                            shadowOffset: {
                                                width: 0,
                                                height: -4,
                                            },
                                            shadowOpacity: .10,
                                            shadowRadius: 30,
                                            marginBottom:20
                                        }}
                                    >
                                        <View 
                                            style={[GlobalStyleSheet.center,{
                                                width:'40%',
                                            }]}
                                        >
                                            <Text style={[FONTS.h1,FONTS.fontMedium,{color:colors.gray90}]}>4.5<Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>/5</Text></Text>
                                            <View style={{marginVertical:10}}>
                                                <Image
                                                    style={{width:120,height:24}}
                                                    resizeMode='contain'
                                                    source={IMAGES.reviewrating}
                                                />
                                            </View>
                                            <View style={{alignItems:'center'}}>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray70}]}>Average Rating</Text>
                                                <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray40,textAlign:'center'}]}>(135 Total Review)</Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                width:'60%',
                                                alignItems:'center',
                                            }}
                                        >
                                            {ReviewData.map((data,index) => {
                                                return(
                                                    <View
                                                        key={index}
                                                        style={{
                                                            flexDirection:'row',
                                                            alignItems:'center',
                                                            gap:10,
                                                            marginBottom:10
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                height:8,
                                                                borderRadius:2,
                                                                flex:1,
                                                                backgroundColor:colors.checkBoxborder,
                                                                alignItems:'center',
                                                                justifyContent:'center',
                                                                overflow:'hidden'
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    width:'100%',
                                                                    height:8,
                                                                    borderRadius:2,
                                                                    marginRight:data.ratingwitdh,
                                                                    backgroundColor:COLORS.primary,
                                                                }}
                                                            />
                                                        </View>
                                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                                            <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray60}]}>{data.title}</Text>
                                                            <Image
                                                                style={{height:12,width:21}}
                                                                resizeMode='contain'
                                                                tintColor={data.title === '1' ? '#E2E4ED': colors.gray70}
                                                                source={IMAGES.star6}
                                                            />
                                                        </View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{paddingHorizontal:20,marginBottom:15}}>
                                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>Willing to rent out to</Text>
                                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                                            {positivestabs.map((data, index) => {
                                                return(
                                                    <View
                                                        key={index}
                                                        style={[GlobalStyleSheet.center,{
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 6.5,
                                                                borderRadius: 16,
                                                                backgroundColor: colors.checkBoxborder,
                                                            }
                                                        ]}
                                                    >
                                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray100}]}>{data}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{paddingHorizontal:20,marginBottom:20}}>
                                        <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>What are the negatives</Text>
                                        <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:7,paddingVertical:10}}>
                                            {negativestabs.map((data, index) => {
                                                return(
                                                    <View
                                                        key={index}
                                                        style={[GlobalStyleSheet.center,{
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 6.5,
                                                                borderRadius: 16,
                                                                backgroundColor: colors.checkBoxborder,
                                                            }
                                                        ]}
                                                    >
                                                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray100}]}>{data}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View style={{marginBottom:30}}>
                                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20,marginBottom:10}]}>
                                            <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Reviews by Residents</Text>
                                            <TouchableOpacity style={[GlobalStyleSheet.flexcenter,{gap:2}]}>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary}]}>View All</Text>
                                                <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF': COLORS.primary}/>
                                            </TouchableOpacity>
                                        </View>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{paddingHorizontal:20,paddingBottom:20}}
                                        >
                                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                {reviews.map((data,index) => {
                                                    return(
                                                        <View
                                                            key={index}
                                                            style={{
                                                                width:300,
                                                                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                                                padding:5,
                                                                borderRadius:10,
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
                                                            <View style={[GlobalStyleSheet.flexcenter,{padding:10,paddingBottom:15,gap:10}]}>
                                                                <View
                                                                    style={{
                                                                        padding:4,
                                                                        backgroundColor:data.colors.rating,
                                                                        borderRadius:4,
                                                                        flexDirection:'row',
                                                                        alignItems:'center',
                                                                        gap:4
                                                                    }}
                                                                >
                                                                    <Image
                                                                        style={{height:11,width:11}}
                                                                        resizeMode='contain'
                                                                        source={IMAGES.star6}
                                                                        tintColor={theme.dark ? COLORS.darkwhite : COLORS.white}
                                                                    />
                                                                    <Text style={[FONTS.BodyXS,FONTS.fontSemiBold,{color:theme.dark ? COLORS.darkwhite : COLORS.white}]}>{data.rating}</Text>
                                                                </View>
                                                                <Text style={[FONTS.BodyXS,FONTS.fontSemiBold,{color:colors.gray90,flex:1}]}>{data.category}</Text>
                                                            </View>
                                                            <View
                                                                style={{
                                                                    padding:10,
                                                                    borderRadius:6,
                                                                    backgroundColor:theme.dark ? '#0B3C0D': data.colors.positiveBg,
                                                                    marginBottom:6
                                                                }}
                                                            >
                                                                <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray80,marginBottom:10}]}>POSITIVES</Text>
                                                                <Text numberOfLines={7} style={[FONTS.BodyXS,FONTS.fontRegular,{color:theme.dark ? '#F3FFF3': COLORS.success}]}>{data.positive}{" "}</Text>
                                                                <TouchableOpacity
                                                                    activeOpacity={0.5}
                                                                    style={{
                                                                        position:'absolute',
                                                                        bottom:10,
                                                                        right:10
                                                                    }}
                                                                >
                                                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary,textDecorationLine:'underline',textDecorationColor:theme.dark ? '#9654F4': COLORS.primary}]}>show more</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View
                                                                style={{
                                                                    padding:10,
                                                                    borderRadius:6,
                                                                    backgroundColor:theme.dark ? '#480000' : data.colors.negativeBg
                                                                }}
                                                            >
                                                                <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray80,marginBottom:10}]}>NEGATIVES</Text>
                                                                <Text numberOfLines={7} style={[FONTS.BodyXS,FONTS.fontRegular,{color:theme.dark ? '#FFEBEE':'#52000B'}]}>{data.negative}{" "}</Text>
                                                                <TouchableOpacity
                                                                    activeOpacity={0.5}
                                                                    style={{
                                                                        position:'absolute',
                                                                        bottom:10,
                                                                        right:10
                                                                    }}
                                                                >
                                                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9654F4': COLORS.primary,textDecorationLine:'underline'}]}>show more</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={[GlobalStyleSheet.flexcenter,{padding:10,paddingHorizontal:15}]}>
                                                                <View
                                                                    style={[GlobalStyleSheet.center,{
                                                                        height:35,
                                                                        width:35,
                                                                        borderRadius:30,
                                                                        backgroundColor:theme.dark ? '#290B56': '#F5EFFF'
                                                                    }]}
                                                                >
                                                                    <Image
                                                                        style={{height:16,width:16}}
                                                                        resizeMode='contain'
                                                                        tintColor={COLORS.primary}
                                                                        source={data.user.avatar}
                                                                    />
                                                                </View>
                                                                <View style={{flex:1,marginLeft:10}}>
                                                                    <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>{data.user.name}</Text>
                                                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>{data.user.role}</Text>
                                                                </View>
                                                                <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray40}]}>{data.user.timeAgo}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </ScrollView>
                                        <View style={{paddingHorizontal:20}}>
                                            <Button
                                                title='Review your Society'
                                                btnRounded
                                                color={theme.dark ? '#3C0C81': '#E0CAFF'}
                                                text={theme.dark ? '#E0CAFF' :'#3C0C81'}
                                                onPress={() => navigation.navigate('Write_Review')}
                                            />
                                        </View>
                                    </View>
                                    <View>
                                        <View style={[GlobalStyleSheet.flexcenter,{paddingHorizontal:20,marginBottom:10}]}>
                                            <Text style={[FONTS.h5,FONTS.fontSemiBold,{color:colors.gray90}]}>Reviews by Residents</Text>
                                            <TouchableOpacity style={[GlobalStyleSheet.flexcenter,{gap:2}]}>
                                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:theme.dark ? '#9F5DFF': COLORS.primary}]}>View All</Text>
                                                <FeatherIcon name='chevron-right' size={14} color={theme.dark ? '#9F5DFF': COLORS.primary}/>
                                            </TouchableOpacity>
                                        </View>
                                        <ScrollView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            contentContainerStyle={{paddingHorizontal:15}}
                                        >
                                            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                                                {propertyData.map((item, index) =>{
                                                    return(
                                                        <View
                                                            key={index}
                                                            style={{width:350}}
                                                        >
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
                                                                onPress={() => navigation.navigate('SingleChat',{data : item })}
                                                                PropertyDetailsonPress={() => navigation.navigate('Property_Details',{data : item })}
                                                                SavePropertyonPress={() => addItemTosaveProperty(item)}
                                                            />
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
            </ScrollView>
            <View 
                style={[GlobalStyleSheet.container,{padding:0}]}
            >   
                {data.progress ? 
                    <View
                        style={[GlobalStyleSheet.flexcenter,{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: .10,
                            shadowRadius: 30,
                            backgroundColor:theme.dark ? COLORS.dark: COLORS.white,
                            height:80,
                            padding:10,
                            paddingHorizontal:20,
                            gap:10,
                            alignItems:'flex-start'
                        },
                        Platform.OS === 'ios' && { backgroundColor: colors.card }]}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{width:'35%',gap:5}]}>
                            <Progresscircle progress={data.progress} />
                            <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60,flex:1}]}>Posting Completion:</Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={{
                                padding: 9,
                                backgroundColor: '#F8EFF1',
                                borderRadius: 8
                            }}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                style={{ height: 18, width: 18 }}
                                resizeMode='contain'
                                tintColor={'#D60000'}
                                source={IMAGES.delete}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit_Listing')}
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.flexcenter,{
                                flex:1,
                                padding:8,
                                borderRadius:8,
                                backgroundColor:COLORS.primary,
                                justifyContent:'center',
                                gap:10
                            }]}
                        >
                            <Image
                                style={{height:15,width:15}}
                                source={IMAGES.write}
                                tintColor={COLORS.white}
                                resizeMode='contain'
                            />
                            <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:COLORS.white}]}>Edit Listing</Text>
                        </TouchableOpacity>
                    </View>
                :
                    <View
                        style={[GlobalStyleSheet.flexcenter,{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: .10,
                            shadowRadius: 30,
                            backgroundColor:theme.dark ? COLORS.dark: COLORS.white,
                            height:80,
                            padding:10,
                            paddingHorizontal:20,
                            gap:5,
                            alignItems:'flex-start'
                        },
                        Platform.OS === 'ios' && { backgroundColor: colors.card }]}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.center,{
                                flex:1,
                                padding:8,
                                borderRadius:8,
                                backgroundColor:colors.checkBoxborder
                            }]}
                            onPress={() => navigation.navigate('ContactOwner')}
                        >
                            <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray90}]}>View Number</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[GlobalStyleSheet.flexcenter,{
                                flex:1,
                                padding:8,
                                borderRadius:8,
                                backgroundColor:colors.checkBoxborder,
                                justifyContent:'center',
                                gap:10
                            }]}
                            onPress={() => navigation.navigate('SingleChat',{data : data })}
                        >
                            <Image
                                style={{height:15,width:15}}
                                source={IMAGES.Messages2}
                                resizeMode='contain'
                            />
                            <Text style={[FONTS.BodyS,FONTS.fontMedium,{color:colors.gray90}]}>Message</Text>
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
                                tintColor={COLORS.white}
                                source={IMAGES.phone}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}


export default Property_Details