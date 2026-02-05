import { View, Text, ScrollView, StyleSheet, TextInput, Platform, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { IMAGES } from '../../constants/Images';

export const NotificationsData = [
    {
        id: "1",
        title: "Property Match Found",
        subtitle: "Check details before it gets booked.",
        time: "1 min ago"
    },
    {
        id: "2",
        title: "Offer Price Drop",
        subtitle: "Grab the deal before it's gone.",
        time: "1 hr ago"
    },
    {
        id: "3",
        title: "Booking Confirmed",
        subtitle: "View details or download the receipt.",
        time: "2 hr ago"
    },
    {
        id: "4",
        title: "Update Required",
        subtitle: "Get better performance and new features.",
        time: "1 day ago"
    },
    {
        id: "5",
        title: "Document Uploaded",
        subtitle: "Verification will be completed soon.",
        time: "2 day ago"
    },
    {
        id: "6",
        title: "New Review Added",
        subtitle: "See what customers are saying.",
        time: "4 day ago"
    },
    {
        id: "7",
        title: "Payment Reminder",
        subtitle: "Complete it to avoid late charges.",
        time: "12 day ago"
    },
    {
        id: "8",
        title: "Nearby Property Alert",
        subtitle: "Explore properties near your location.",
        time: "15 day ago"
    },
    {
        id: "9",
        title: "System Message",
        subtitle: "Some features may be temporarily unavailable.",
        time: "20 day ago"
    }
];


type NotificationScreenProps = StackScreenProps<RootStackParamList, 'Notification'>;

const Notification = ({ navigation } : NotificationScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    return (
        <View style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header 
                title={'Notifications'} 
                leftIcon={'back'} 
                titleLeft 
            />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View
                    style={[
                        GlobalStyleSheet.container,
                        { paddingHorizontal: 20, paddingTop: 20 }
                    ]}
                >
                    {NotificationsData.map((data,index) => {
                        return(
                            <View
                                key={index}
                                style={[GlobalStyleSheet.flexcenter,{
                                    padding:15,
                                    borderWidth:1,
                                    borderColor:colors.checkBoxborder,
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                                    borderRadius:8,marginBottom:10
                                }]}
                            >
                                <View style={[GlobalStyleSheet.flexcenter,{gap:10}]}>
                                    <Image
                                        style={{width:40,height:35}}
                                        resizeMode='contain'
                                        source={IMAGES.property}
                                        tintColor={theme.dark ? '#9654F4' : COLORS.primary}
                                    />
                                    <View>
                                        <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:colors.gray100}]}>{data.title}</Text>
                                        <Text numberOfLines={1} style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50}]}>{data.subtitle}</Text>
                                    </View>
                                </View>
                                <View style={{width:'15%'}}>
                                    <Text style={[FONTS.BodyXS,FONTS.fontRegular,{color:colors.gray50,textAlign:'right'}]}>{data.time}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}


export default Notification