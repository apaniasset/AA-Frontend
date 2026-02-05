import React, { useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS, } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { IMAGES } from '../../constants/Images';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import DropShadow from 'react-native-drop-shadow';

const ChatData = [
    {
        id: '1',
        title: 'Ready to move?',
        send: true,
    },
    {
        id: '2',
        title: "No",
        send: false,
    }
]

const suggestions = [
  "Fully furnished ?",
  "Ready to move?",
  "Floor no.",
  "Still on sale?",
  "Hello",
  "Rent monthly",
  "Price negotiable?",
  "Can I visit tomorrow?"
];


type SingleChatScreenProps = StackScreenProps<RootStackParamList, 'SingleChat'>;

const SingleChat = ({route, navigation } : SingleChatScreenProps) => {

    const {data} = route.params;

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const scrollViewRef = useRef<any>(null);

    const [messageList, setMessageList] = useState(ChatData);
    const [message, setMessage] = useState("");
    const [time, settime] = useState("");
    const [username, setusername] = useState("")

    const sendMessage = () => {
        if(message.length > 0){
            setMessageList([
                ...messageList,
                {
                    id: '0',
                    title: message,
                    send: true,
                },
            ])
            setMessage("");
            settime("");
            setusername("");
        }
    }

    const screenWidth = Dimensions.get("window").width;

    const chipWidth = (screenWidth - 80) / 4; 

    return (
        <View style={{backgroundColor: colors.card, flex:1}}>
            <View style={[GlobalStyleSheet.container,{padding:0}]}>
                <DropShadow
                    style={[{
                        shadowColor: "rgba(0,0,0,0.5)",
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: .1,
                        shadowRadius: 40,
                    }, Platform.OS === "ios" && {
                        backgroundColor:'transparent',
                    }]}
                >
                    <View
                        style={[GlobalStyleSheet.container,{
                            height:55,
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                            flexDirection:'row',
                            alignItems:'center',
                            gap:5,
                            paddingHorizontal:10
                        }]}
                    >
                        <TouchableOpacity
                            style={[GlobalStyleSheet.headerBtn,{
                                height:36,
                                width:36
                            }]}
                            onPress={() => navigation.goBack()}
                        >
                            <FeatherIcon name='arrow-left' size={20} color={colors.gray90}/>
                        </TouchableOpacity>
                        <View
                            style={[GlobalStyleSheet.center,{
                                height:35,
                                width:35,
                                borderRadius:30,
                                backgroundColor:'#F5EFFF'
                            }]}
                        >
                            {data.userPic ? 
                                <Image
                                    style={{height:35,width:35,borderRadius:30}}
                                    resizeMode='contain'
                                    source={data.userPic}
                                />
                            :
                                <Image
                                    style={{height:16,width:16}}
                                    resizeMode='contain'
                                    tintColor={COLORS.primary}
                                    source={IMAGES.user2}
                                />
                            }
                        </View>
                        <View style={{flex:1,marginLeft:5}}>
                            {data.name &&
                                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>{data.name}</Text>
                            }
                            {data.userName &&
                                <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>{data.userName}</Text>
                            }
                            {data.message &&
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray60}]}>{data.message}</Text>
                        
                            }
                        </View>
                    </View>
                </DropShadow>
                <View style={{paddingHorizontal:20,paddingTop:15,paddingBottom:5}}>
                    <View
                        style={{
                            padding:10,
                            backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
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
                        }}
                    >
                        <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                            <View
                                style={{
                                    width:75,
                                    height:65,
                                    borderRadius:6,
                                    backgroundColor:'red',
                                    overflow:'hidden'
                                }}
                            >
                                {data.propertyImage ? 
                                    <Image
                                        source={data.propertyImage}
                                        style={{ width: "100%", height: "100%",borderRadius:6 }}
                                        resizeMode="cover"
                                    />
                                    : data.image ?
                                    <Image
                                        source={data.image}
                                        style={{ width: "100%", height: "100%",borderRadius:6 }}
                                        resizeMode="cover"
                                    />
                                    :
                                    <Image
                                        source={data.images[0]}
                                        style={{ width: "100%", height: "100%",borderRadius:6 }}
                                        resizeMode="cover"
                                    />
                                }
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
                            <View style={{flex:1,paddingRight:70}}>
                                <Text numberOfLines={2} style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>{data.title}</Text>
                                <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                        {data.bhk}
                                    </Text>
                                    {data.bhk &&
                                        <View style={{height:4,width:4,borderRadius:4,backgroundColor:colors.gray50}}/>
                                    }
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                        {data.price} {data.priceType} 
                                    </Text>
                                    {data.area &&
                                        <View style={{height:4,width:4,borderRadius:4,backgroundColor:colors.gray50}}/>
                                    } 
                                    <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray50}]}>
                                        {data.area}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
                ref={scrollViewRef}
                onContentSizeChange={() => {scrollViewRef.current?.scrollToEnd()}}
            >
                <View style={[GlobalStyleSheet.container,{paddingTop:0,flex:1}]}>
                    <View style={{ flex: 1 ,paddingTop:20}}>
                        {messageList.map((data:any, index:any) => {
                            return (
                                <View key={index}>
                                    <View
                                        style={[{
                                            marginBottom: 10,
                                        },
                                        data.send == false
                                            ?
                                            {
                                                marginRight: 'auto',
                                                alignItems: 'flex-start',
                                            }
                                            :
                                            {
                                                marginLeft: 'auto',
                                                alignItems: 'flex-end',
                                            }
                                        ]}
                                    >
                                        <View
                                            style={[
                                                data.send == false
                                                    ?
                                                    {
                                                        backgroundColor:theme.dark ? '#290B56': "#F5EFFF",
                                                        borderRadius:12,
                                                        borderBottomLeftRadius:0,
                                                        borderWidth:1,
                                                        borderColor:theme.dark ? '#454545': '#EDEEF5'
                                                    }
                                                    :
                                                    {
                                                        backgroundColor: COLORS.primary,
                                                        borderRadius:12,
                                                        borderBottomRightRadius:0,
                                                        borderWidth:1,
                                                        borderColor:COLORS.primary
                                                    }

                                            ]}
                                        >
                                            <View style={{padding:10,paddingHorizontal:15}}>
                                                <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{ color: data.send ? COLORS.white : colors.gray90, }]}>{data.title}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                        paddingBottom:20,
                        backgroundColor:colors.card,
                        alignItems:'flex-end'
                    }}
                >
                    <View
                        style={{
                            width: 500,          
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap:5
                        }}
                    >
                        {suggestions.map((item, index) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                key={index}
                                onPress={() => setMessage(item)} 
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
                                    borderRadius: 30,
                                    elevation: 1,
                                    shadowColor: 'rgba(0,0,0,0.5)',
                                    shadowOffset: {
                                        width: 0,
                                        height: 0,
                                    },
                                    shadowOpacity: .10,
                                    shadowRadius: 30,
                                }}
                            >
                                <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.gray90}]}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
            <DropShadow
                style={[{
                    shadowColor: "rgba(0,0,0,0.5)",
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 40,
                }, Platform.OS === "ios" && {
                    backgroundColor:'transparent',
                }]}
            >
                <View 
                    style={{
                        height: 60,
                        width: '100%',
                        backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                        marginBottom:25
                    }}
                >
                    <TextInput
                        placeholder='Write Message'
                        placeholderTextColor={colors.gray50}
                        onChangeText={(val) => setMessage(val)}
                        value={message}
                        style={[FONTS.BodyM,FONTS.fontMedium,{color: colors.gray100,flex:1,paddingHorizontal:25 }]}
                    />
                    <TouchableOpacity
                        onPress={() => sendMessage()}
                        disabled={message.length == 0 ? true : false}
                        style={{ position: 'absolute', top: 20, right: 20 }}
                    >
                        <Image
                            style={{ height: 18, width: 18}}
                            resizeMode='contain'
                            tintColor={colors.gray50}
                            source={IMAGES.send}
                        />
                    </TouchableOpacity>
                </View>
            </DropShadow>
        </View>
    )
}

export default SingleChat