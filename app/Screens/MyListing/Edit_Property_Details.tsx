import { View, Text, ScrollView, useWindowDimensions, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Button from '../../components/Button/Button';
import Basic_Details from './Basic_Details';
import RentSelectBottomSheet, { BottomSheetRef } from '../../components/RentSelectBottomSheet';
import BottomSheetUnitSelect, { BottomSheetUnitRef } from '../../components/BottomSheetUnitSelect';
import Property_Details from './Property_Details';
import Photo_Details from './Photo_Details';
import SelectBottomSheet, { SelectBottomSheetRef } from '../../components/SelectBottomSheet';
import Amenities_Details from './Amenities_Details';




type Edit_Property_DetailsScreenProps = StackScreenProps<RootStackParamList, 'Edit_Property_Details'>;

const Edit_Property_Details = ({route ,navigation } : Edit_Property_DetailsScreenProps) => {

    const sheetRef = useRef<BottomSheetUnitRef>(null);
    
    const areaUnits = [
        { label: 'sq.ft.', value: 'sqft' },
        { label: 'Sq.m', value: 'sqm' },
        { label: 'Sq.yard', value: 'yard' },
        { label: 'Acre', value: 'acre' },
        { label: 'Hectare', value: 'hectare' },
    ];

    const [selectedUnit, setSelectedUnit] = useState(areaUnits[0]);

    const addMoreSheetRef = useRef<BottomSheetRef>(null);

    const addMoreOptions = [
        { label: "Price Negotiable", value: "negotiable" },
        { label: "Electricity & Water charges extra", value: "utility" },
        { label: "Maintenance extra", value: "maintenance" },
        { label: "Deposit Negotiable", value: "deposit" },
    ];

    const [rentTags, setRentTags] = useState<string[]>([]);

    const noticeMonths = [
        { label: "1 Month", value: 1 },
        { label: "2 Months", value: 2 },
        { label: "3 Months", value: 3 },
        { label: "6 Months", value: 6 },
        { label: "12 Month", value: 7 },
        { label: "24 Months", value: 8 },
        { label: "36 Months", value: 9 },
        { label: "48 Months", value: 10 },
    ];

    const SelectRef = useRef<SelectBottomSheetRef>(null);
    const [selectedValue, setSelectedValue] = useState<string>("");

    
    const flooringTypes = [
        { label: "Vitrified Tiles", value: "vitrified" },
        { label: "Ceramic Tiles", value: "ceramic" },
        { label: "Marble Flooring", value: "marble" },
        { label: "Granite Flooring", value: "granite" },
        { label: "Wooden Flooring", value: "wooden" },
        { label: "Italian Marble", value: "italian_marble" },
        { label: "Mosaic Flooring", value: "mosaic" },
        { label: "Stone Flooring", value: "stone" },
        { label: "Cement Flooring", value: "cement" },
        { label: "Laminate Flooring", value: "laminate" },
        { label: "PVC/Vinyl Flooring", value: "vinyl" },
        { label: "Carpet Flooring", value: "carpet" },
        { label: "Other", value: "other" }
    ];

    const Select2Ref = useRef<SelectBottomSheetRef>(null);
    const [flooring, setFlooring] = useState<string>("");

    const areawidthUnits = [
        { label: 'Feet', value: 'feet' },
        { label: 'Meters', value: 'meter' },
        { label: 'Sq.ft.', value: 'sqft' },
        { label: 'Sq.m', value: 'sqm' },
        { label: 'Yards', value: 'yard' },
    ];

    const sheet2Ref = useRef<BottomSheetUnitRef>(null);
    const [selectedwidth, setSelectedwidth] = useState(areawidthUnits[0]);

    const BasicRoute = () => (
        <View style={{flex:1}}>
            <ScrollView 
                contentContainerStyle={{flexGrow:1}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingTop:10,flex:1}]}>
                    <Basic_Details/>
                </View>
            </ScrollView>
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );

    const PropertyRoute = () => (
        <View style={{flex:1}}>
            <ScrollView 
                contentContainerStyle={{flexGrow:1}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,flex:1}]}>
                    <Property_Details
                        ref={addMoreSheetRef}
                        ref2={sheetRef}
                        rentTags={rentTags}
                        selectedUnit={selectedUnit}
                    />
                </View>
            </ScrollView>
            <RentSelectBottomSheet
                ref={addMoreSheetRef}
                data={addMoreOptions}
                onSelect={(item) => setRentTags(prev => [...prev, item.label])}
            />
            <BottomSheetUnitSelect
                ref={sheetRef}
                data={areaUnits}
                onSelect={(item) => setSelectedUnit(item)}
            />
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );

    const PhotosRoute = () => (
        <View style={{flex:1}}>
            <ScrollView 
                contentContainerStyle={{flexGrow:1}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,flex:1}]}>
                    <Photo_Details
                        selectedValue={selectedValue}
                        ref={SelectRef}
                    />
                </View>
            </ScrollView>
            <SelectBottomSheet
                ref={SelectRef}
                data={noticeMonths}
                onSelect={(item) => setSelectedValue(item.label)}
            />
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );
    const AmenitiesRoute = () => (
        <View style={{flex:1}}>
            <ScrollView 
                contentContainerStyle={{flexGrow:1}} 
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,flex:1}]}>
                    <Amenities_Details
                        ref={Select2Ref}
                        ref2={sheet2Ref}
                        selectedwidth={selectedwidth}
                        flooring={flooring}
                    />
                </View>
            </ScrollView>
            <SelectBottomSheet
                ref={Select2Ref}
                data={flooringTypes}
                onSelect={(item) => setFlooring(item.label)}
            />
            <BottomSheetUnitSelect
                ref={sheet2Ref}
                data={areawidthUnits}
                onSelect={(item) => setSelectedwidth(item)}
            />
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                <Button
                    title='Save and Continue'
                    btnRounded
                    onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    );

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const renderScene = SceneMap({
        Basics: BasicRoute,
        Property: PropertyRoute,
        Photos: PhotosRoute,
        Amenities: AmenitiesRoute,
    });

    const layout = useWindowDimensions();

    const initialTab = route?.params?.tabIndex ?? 0;

    const [index, setIndex] = useState(initialTab);
    
    const [routes] = useState([
        { key: 'Basics', title: 'Basic Details' },
        { key: 'Property', title: 'Property Details' },
        { key: 'Photos', title: 'Photo & Details' },
        { key: 'Amenities', title: 'Amenities' },
    ]);

    const renderLabel = ({ route, focused }: any) => (
        <Text 
            style={{ 
                fontFamily:'Inter_18pt-SemiBold', 
                color: focused ? COLORS.primary : colors.text,
                fontSize:14,
                paddingHorizontal:5,
            }}
        >
            {route.title}
        </Text>
    );


    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <Header
                title={'Edit Listing'}
                titleLeft
                leftIcon={'back'}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1}}
            >
                <View 
                    style={[
                        GlobalStyleSheet.container,
                        {
                            padding:0,
                            flex:1,
                            height:40
                        }
                    ]}
                >
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={props => (
                            <View>
                                <TabBar
                                    {...props}
                                    scrollEnabled
                                    style={{
                                        backgroundColor:colors.background,
                                        elevation: 0,
                                    }}
                                    contentContainerStyle={{
                                        paddingHorizontal:15
                                    }}
                                    tabStyle={{
                                        width: 'auto',
                                        paddingHorizontal: 15,
                                        // paddingTop:0,
                                    }}
                                    indicatorStyle={{
                                        height: 3,
                                        backgroundColor:theme.dark ? '#9654F4': COLORS.primary
                                    }}
                                    activeColor={colors.gray100}
                                    inactiveColor={colors.gray60}
                                    renderLabel={renderLabel}
                                />
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    tab:{
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    input:{
        ...FONTS.fontMedium,
        height:50,
        borderRadius:8,
        backgroundColor: COLORS.white,
        paddingHorizontal:20,
        paddingRight:45,
        color:COLORS.title,
        position:'relative',
        elevation:1,
        borderWidth:1
    },
    wrapper: {
        width: "100%",
        height: 43,
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    divider: {
        width: 1,
        height: 29,
        marginHorizontal: 15,
    }
})

export default Edit_Property_Details