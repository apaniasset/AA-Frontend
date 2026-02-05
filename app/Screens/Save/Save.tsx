import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import PropertyCard from '../../components/Card/PropertyCard';
import { useSelector } from 'react-redux';
import { COLORS, FONTS } from '../../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";


type SaveScreenProps = StackScreenProps<RootStackParamList, 'Save'>;

const Save = ({ navigation } : SaveScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const saveProperty = useSelector((state:any) => state.saveProperty.saveProperty);

    return (
      <View style={{backgroundColor: colors.card, flex:1}}>
        <Header
            title={"Saved Property"}
            leftIcon={'back'}
            titleLeft
        />
        <ScrollView
            contentContainerStyle={{flexGrow:1}}
            showsVerticalScrollIndicator={false}
        >
            <View style={[GlobalStyleSheet.container,{paddingHorizontal:20,paddingBottom:25}]}>
                {saveProperty.map((item:any, index:any) =>{
                    return(
                        <View
                            key={index}
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
                            />
                        </View>
                    )
                })}
            </View>
            {saveProperty.length === 0 && 
                <View
                    style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                    }}
                >
                    <View
                        style={{
                            height:60,
                            width:60,
                            borderRadius:60,
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:theme.dark ? 'rgba(255,255,255,0.15)':COLORS.primaryLight,
                            marginBottom:20,
                        }}
                    >
                        <FeatherIcon color={COLORS.primary} size={24} name='heart'/>
                    </View>
                    <Text style={{...FONTS.h5,color:colors.title,marginBottom:8}}>Your SaveJob is Empty!</Text>    
                    <Text
                        style={{
                            ...FONTS.BodyM,
                            color:colors.text,
                            textAlign:'center',
                            paddingHorizontal:40,
                            marginBottom:30,
                        }}
                    >Add Property to you Save and Property now.</Text>
                </View>
            }
        </ScrollView>
      </View>
    )
}

export default Save