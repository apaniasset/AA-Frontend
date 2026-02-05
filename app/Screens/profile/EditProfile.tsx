import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomInput from '../../components/Input/CustomInput';
import RBSheet from 'react-native-raw-bottom-sheet';
import Header from '../../layout/Header';
import { launchImageLibrary } from 'react-native-image-picker';

type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({ navigation } : EditProfileScreenProps) => {

    const designations = [
        "Business Owner / Founder / CXO",
        "Contractor",
        "Architect / Interior Designer",
        "Chief Financial Officer (CFO)",
        "Project Manager",
        "Labor Contractor",
        "Site Engineer",
        "Super viser",
        "Planing Manager",
        "Planing Manager",
    ];


    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const progress = 0.5;

    const refRBSheet = useRef<any>();

    const [selectedValue, setSelectedValue] = useState('');

    const handleSelect = (value:any) => {
        setSelectedValue(value);
        refRBSheet.current.close();
    };

    const [imageUri, setImageUri] = useState<any>(null);
    
    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
            setImageUri(response.assets[0].uri);
        }
        });
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
            <Header
                title={"Edit Profile"}
                leftIcon={'back'}
                titleLeft
            />
            <View style={{flex:1,backgroundColor:colors.card,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20, paddingTop: 35,flex:1 }]}>
                        <View style={{flex:1}}>
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={pickImage}
                                    style={{
                                        height: 120,
                                        width: 120,
                                        borderRadius: 100,
                                        backgroundColor: '#ECECEE',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                    }}
                                >
                                    {imageUri ? (
                                        <Image
                                            source={{ uri: imageUri }}
                                            style={{ height: 120, width: 120, borderRadius: 100 }}
                                        />
                                    ) : (
                                        <FeatherIcon name='camera' size={24} color={'#333'} />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 35,marginBottom:15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>User Name</Text>
                                <CustomInput
                                    inputBorder
                                />
                            </View>
                            <View style={{marginBottom:15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Phone Number*</Text>
                                <CustomInput
                                    inputBorder
                                    keyboardType={'number-pad'}
                                    maxLength={15}
                                />
                            </View>
                            <View style={{marginBottom:15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text,marginBottom:10 }}>Designation*</Text>
                                <View style={{position:'relative'}}>
                                    <CustomInput
                                        inputBorder
                                        placeholder={'Select'}
                                        value={selectedValue}
                                        style={{
                                            ...FONTS.fontRegular,
                                        }}
                                        icon={<FeatherIcon color={colors.text} size={18} name="chevron-down"/>}
                                    />
                                    <TouchableOpacity
                                        onPress={() => refRBSheet.current.open()} 
                                        activeOpacity={0.5}
                                        style={{
                                            flex:1,
                                            backgroundColor:'transparent',
                                            width:'100%',
                                            borderRadius:8,
                                            height:50,
                                            position:'absolute',
                                            zIndex:99
                                        }}
                                    />
                                    <RBSheet
                                        ref={refRBSheet}
                                        height={450}
                                        openDuration={250}
                                        customStyles={{
                                            container: {
                                                backgroundColor:colors.card,
                                                borderTopLeftRadius: 20,
                                                borderTopRightRadius: 20,
                                            },
                                            draggableIcon: {
                                                backgroundColor: '#ccc', // make sure it's visible
                                                width: 60,
                                                height: 6,
                                                borderRadius: 3,
                                                alignSelf: 'center',
                                                marginVertical: 10
                                            }
                                        }}
                                    >
                                        <View style={[GlobalStyleSheet.container,]}>
                                            <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'flex-start',gap:10,marginBottom:20}]}>
                                                <TouchableOpacity
                                                    onPress={() => refRBSheet.current.close()}
                                                    style={{
                                                        height:40,
                                                        width:40,
                                                        backgroundColor:'transparent',
                                                        alignItems:'center',
                                                        justifyContent:'center',
                                                        borderRadius:30,
                                                        position:'absolute',
                                                        left:-10,
                                                        zIndex:99
                                                    }}
                                                >
                                                    <FeatherIcon name='chevron-left' size={24} color={colors.title}/>
                                                </TouchableOpacity>
                                                <Text style={[FONTS.h6,{color:colors.title,lineHeight:20,paddingLeft:30}]}>Designation</Text>
                                            </View>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={{flex:1,marginBottom:20}}>
                                                    {designations.map((item:any,index:any) => {
                                                        return(
                                                            <TouchableOpacity
                                                                onPress={() => handleSelect(item)}
                                                                key={index}
                                                                style={[GlobalStyleSheet.flexcenter,{
                                                                    borderBottomWidth:1,
                                                                    borderColor:colors.border,
                                                                    paddingBottom:10,
                                                                    marginBottom:10,
                                                                    paddingRight:10
                                                                }]}
                                                            >
                                                                <Text style={[FONTS.font,{color:colors.text}]}>{item}</Text>
                                                                {selectedValue === item && (
                                                                    <FeatherIcon name="check" size={18} color={colors.primary} />
                                                                )}
                                                            </TouchableOpacity>
                                                        )
                                                    })}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </RBSheet>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>
                    <Button
                        title={'Continue'}
                        onPress={() => {navigation.goBack()}}
                        color={theme.dark ? COLORS.white :COLORS.primary}
                        text={colors.card}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile