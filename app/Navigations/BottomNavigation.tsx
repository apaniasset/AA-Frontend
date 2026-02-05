import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from '../layout/BottomTab';
import { BottomTabParamList } from './BottomTabParamList';
import Messages from '../Screens/Chat/Messages';
import Home from '../Screens/Home/Home';
import Save from '../Screens/Save/Save';
import Profile from '../Screens/profile/Profile';
import AddProperty from '../Screens/Property/AddProperty';


const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown : false
            }}
            tabBar={(props:any) => <BottomTab {...props}/>}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
            />
            <Tab.Screen 
                name="Messages" 
                component={Messages} 
            />
            <Tab.Screen 
                name="AddProperty" 
                component={AddProperty}
            />
            <Tab.Screen 
                name="Save" 
                component={Save} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;