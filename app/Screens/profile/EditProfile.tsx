import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import Button from '../../components/Button/Button';
import FeatherIcon from "react-native-vector-icons/Feather";
import CustomInput from '../../components/Input/CustomInput';
import Header from '../../layout/Header';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateUser } from '../../redux/reducer/user';
import { saveAuth } from '../../utils/authStorage';
import { updateMerchantProfile } from '../../services/auth';
import { RootState } from '../../redux/reducer';
import type { MerchantData } from '../../services/auth';

type EditProfileScreenProps = StackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfile = ({ navigation }: EditProfileScreenProps) => {
    const theme = useTheme();
    const { colors }: { colors: any } = theme;
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user?.userData) as { merchant?: MerchantData; token?: string } | undefined;
    const merchant = userData?.merchant;
    const token = userData?.token;

    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (merchant) {
            setName(merchant.name || '');
            setCompanyName(merchant.company_name || '');
        }
    }, [merchant]);

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri ?? null);
            }
        });
    };

    const handleSave = async () => {
        const trimmedName = name.trim();
        if (!trimmedName) {
            Alert.alert('Validation', 'Please enter your name.');
            return;
        }
        try {
            setSaving(true);
            const response = await updateMerchantProfile({
                name: trimmedName,
                company_name: companyName.trim() || undefined,
            });
            if (response.success && response.data && token) {
                dispatch(updateUser({ merchant: response.data }));
                await saveAuth(response.data as unknown as Record<string, unknown>, token);
                navigation.goBack();
            } else {
                Alert.alert('Error', response.message || 'Failed to update profile.');
            }
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
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
                            <View style={{ marginTop: 35, marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 10 }}>Name *</Text>
                                <CustomInput
                                    inputBorder
                                    placeholder="Your name"
                                    value={name}
                                    onChangeText={setName}
                                    editable={!saving}
                                />
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 10 }}>Company Name</Text>
                                <CustomInput
                                    inputBorder
                                    placeholder="Company name (optional)"
                                    value={companyName}
                                    onChangeText={setCompanyName}
                                    editable={!saving}
                                />
                            </View>
                            {merchant?.phone ? (
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={{ ...FONTS.fontMedium, fontSize: 14, color: colors.text, marginBottom: 10 }}>Phone Number</Text>
                                    <CustomInput
                                        inputBorder
                                        value={merchant.phone}
                                        editable={false}
                                    />
                                </View>
                            ) : null}
                        </View>
                    </View>
                </ScrollView>
                <View style={[GlobalStyleSheet.container, { paddingHorizontal: 20 }]}>
                    <Button
                        title={saving ? 'Saving...' : 'Save Profile'}
                        onPress={handleSave}
                        disabled={saving}
                        color={theme.dark ? COLORS.white : COLORS.primary}
                        text={colors.card}
                    />
                    {saving && (
                        <View style={{ alignSelf: 'center', marginTop: 8 }}>
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile