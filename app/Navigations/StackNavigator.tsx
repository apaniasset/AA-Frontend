import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "react-native";
import { COLORS } from "../constants/theme";
import { useTheme } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { RootStackParamList } from "./RootStackParamList";

import DrawerNavigation from "./DrawerNavigation";
import Onbording from "../Screens/onbording/Onbording";
import SingleChat from "../Screens/Chat/SingleChat";
import Notification from "../Screens/Notification/Notification";
import Messages from "../Screens/Chat/Messages";
import Splash from "../Screens/onbording/Splash";
import Search from "../Screens/Search/Search";
import SearchArea from "../Screens/Search/Search_Area";
import Search_List from "../Screens/Search/Search_List";
import ContactOwner from "../Screens/Contact/Contact_Owner";
import PropertyDetailsStep2 from "../Screens/Property/Add_Property_Details_Step_2";
import PropertyDetailsStep3 from "../Screens/Property/Add_Property_Details_Step_3";
import Add_Amenities from "../Screens/Property/Add_Amenities";
import Property_Details from "../Screens/Property/Property_Details";
import Galary from "../Screens/Galary/Galary";
import Write_Review from "../Screens/WriteReview/Write_Review_stap_1";
import Write_Review_stap_2 from "../Screens/WriteReview/Write_Review_stap_2";
import Feedback from "../Screens/Feedback/Feedback";
import Property_Response from "../Screens/PropertyResponse/Property_Response";
import My_Listing from "../Screens/MyListing/My_Listing";
import Edit_Listing from "../Screens/MyListing/Edit_Listing";
import Edit_Property_Details from "../Screens/MyListing/Edit_Property_Details";
import Settings from "../Screens/Settings/Settings";
import Register from "../Screens/Auth/register";
import Login from "../Screens/Auth/login";

const MyStatusBar = ({ backgroundColor, ...props } : any) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {

  const theme = useTheme();
  const { colors }: {colors : any} = useTheme();

  return (
    <View style={[{backgroundColor:colors.card,flex:1}]}>
      <MyStatusBar
        backgroundColor={COLORS.primary}   
        barStyle={'light-content'}
      />
      <Stack.Navigator
        initialRouteName={"splash"}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent",flex:1  },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={"splash"} component={Splash} />
        <Stack.Screen name={"Onbording"} component={Onbording} />
        <Stack.Screen name={"DrawerNavigation"} component={DrawerNavigation} />
        <Stack.Screen name={"Search"} component={Search} />
        <Stack.Screen name={"SearchArea"} component={SearchArea} />
        <Stack.Screen name={"Search_List"} component={Search_List} />
        <Stack.Screen name={"ContactOwner"} component={ContactOwner} />
        <Stack.Screen name={"PropertyDetailsStep2"} component={PropertyDetailsStep2} />
        <Stack.Screen name={"PropertyDetailsStep3"} component={PropertyDetailsStep3} />
        <Stack.Screen name={"Add_Amenities"} component={Add_Amenities} />
        <Stack.Screen name={"Property_Details"} component={Property_Details} />
        <Stack.Screen name={"Galary"} component={Galary} />
        <Stack.Screen name={"Write_Review"} component={Write_Review} />
        <Stack.Screen name={"Write_Review_stap_2"} component={Write_Review_stap_2} />
        <Stack.Screen name={"Feedback"} component={Feedback} />
        <Stack.Screen name={"Property_Response"} component={Property_Response} />
        <Stack.Screen name={"My_Listing"} component={My_Listing} />
        <Stack.Screen name={"Edit_Listing"} component={Edit_Listing} />
        <Stack.Screen name={"Edit_Property_Details"} component={Edit_Property_Details} />
        <Stack.Screen name={"Messages"} component={Messages} />
        <Stack.Screen name={"SingleChat"} component={SingleChat} />
        <Stack.Screen name={"Notification"} component={Notification} />
        <Stack.Screen name={"Settings"} component={Settings} />
        <Stack.Screen name={"Register"} component={Register} />
        <Stack.Screen name={"Login"} component={Login} />

      </Stack.Navigator>
    </View>
  );
};


const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 60 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default StackNavigator;
