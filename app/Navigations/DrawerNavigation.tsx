import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    const { colors }: {colors : any} = useTheme();

    return (
        <SafeAreaView 
            style={{ flex: 1, backgroundColor: colors.card}}
            edges={['bottom']}
        >
            <Drawer.Navigator
                initialRouteName='BottomNavigation'
                screenOptions={{
                    headerShown: false,
                    drawerStyle:{
                        backgroundColor: colors.card,
                        borderTopRightRadius:20,
                        borderBottomRightRadius:20
                    },
                }}
            >
                <Drawer.Screen name='BottomNavigation' component={BottomNavigation} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
};


export default DrawerNavigation;