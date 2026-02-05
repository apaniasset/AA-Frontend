import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import Header from '../../layout/Header';
import { IMAGES } from '../../constants/Images';
import { GlobalStyleSheet } from '../../constants/StyleSheet';

const images = [
    IMAGES.projectpic1,
    IMAGES.projectpic2,
    IMAGES.projectpic3,
    IMAGES.projectpic4,
    IMAGES.projectpic5,
    IMAGES.projectpic6
];

type GalaryScreenProps = StackScreenProps<RootStackParamList, 'Galary'>;

const Galary = ({navigation } : GalaryScreenProps)  => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [layout, setLayout] = useState<'grid' | 'list'>('list');

    return (
        <View style={[{flex:1,backgroundColor:colors.card}]}>
            <Header
                title={'Galary'}
                leftIcon={'back'}
                titleLeft
                grid
                layout={layout}
                handleLayout={(type : any) => setLayout(type)}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1,paddingBottom:100}}
            >
                <View style={[GlobalStyleSheet.container,{padding:5}]}>
                    <View style={{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:5}}>
                        {images.map((data,index) => {
                            if(layout === 'list'){
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            width: "100%",
                                            aspectRatio: 1 / 0.45,
                                            borderRadius: 6,
                                            overflow: "hidden"
                                        }}
                                    >
                                        <Image
                                            source={data}
                                            style={{ width: "100%", height: "100%" }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                )
                            }else {
                                return(
                                    <View
                                        key={index}
                                        style={{
                                            width: "49.37%",
                                            aspectRatio: 1 / 1,
                                            borderRadius: 6,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Image
                                            source={data}
                                            style={{ width: "100%", height: "100%" }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Galary