import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { COLORS, FONTS, } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";
import { GlobalStyleSheet } from '../../constants/StyleSheet';


const QuestionsAccordion = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [activeSections, setActiveSections] = useState([0]);
    const setSections = (sections : any) => {
        setActiveSections(
            sections.includes(undefined) ? [] : sections
        );
    };

    const DATA = [
        {
            title: 'Warehouse Management',
            content: 'Manage your warehouse by adding, updating, and tracking inventory in real-time.',
        },
        {
            title: 'How to Add Material',
            content: 'Go to the Material section, tap Add, enter details like name, quantity, unit, and save.',
        },
        {
            title: 'Equipment Management',
            content: 'Track, assign, and maintain all equipment efficiently from the Equipment tab.',
        },
        {
            title: 'Client Management',
            content: 'Add new clients, update details, and view project history under Client Management.',
        },
        {
            title: 'How To Use The App',
            content: 'Navigate using the bottom tabs. Access help, support, and guides from the menu.',
        },
        {
            title: 'Transaction',
            content: 'View all transactions, filter by date or type, and export reports.',
        },
    ];

    const AccordionHeader = (item: any, _:any, isActive:any) => {

        return (
            <View 
                style={[GlobalStyleSheet.flexcenter,{
                    padding:14,
                    backgroundColor:colors.background,
                    borderRadius:8,
                    borderWidth:1.5,
                    borderColor:'#E8E8E8',
                }]}
            >
                <Text 
                    style={[
                        FONTS.font, { 
                            fontSize: 14, 
                            color:colors.text, 
                            paddingRight:15 
                        }
                    ]}
                >{item.title}</Text>
                <FeatherIcon 
                    name={"chevron-down"} 
                    size={18} 
                    color={colors.title}
                    style={{transform: [{ rotate:isActive ? '180deg': '0deg' }]}} 
                />
            </View>
        )
    }

    const AccordionBody = (item: any, _:any, isActive:any) => {
        return (
            <View style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor:colors.background,
                borderRadius:8,
                borderWidth:1.5,
                borderColor:'#E8E8E8',
                marginTop:10
            }}>

                <Text style={[FONTS.fontMedium, {fontSize:14, color: colors.text, lineHeight: 20 }]}>{item.content}</Text>
            </View>
        )
    }
    
    return (
        <>
            <Accordion
                sections={DATA}
                duration={300}
                sectionContainerStyle={{
                    borderBottomWidth: 1,
                    borderColor:theme.dark ? colors.border :colors.background,
                    marginBottom: 15,
                    backgroundColor:colors.card,
                    //paddingHorizontal: 20,
                }}
                activeSections={activeSections}
                onChange={setSections}
                touchableComponent={TouchableOpacity}
                renderHeader={AccordionHeader}
                renderContent={AccordionBody}
            />
        </>
    );
}

export default QuestionsAccordion