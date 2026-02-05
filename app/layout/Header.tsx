import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View, } from 'react-native';
import { COLORS, FONTS,} from '../constants/theme';
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation, useTheme } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import DropShadow from 'react-native-drop-shadow';
import { IMAGES } from '../constants/Images';

const Header = (props: { productId?: any; transparent?: any; paddingLeft?: any; leftIcon?: any;leftIcon2?: any;  backAction?: any; titleLeft?: any; title?: any; rightIcon2?: any; rightIcon?: any; rightIcon3?: any; rightIcon4?: any;rightIcon5?:any ;rightIcon6?: any; handleLike?: any; isLike?: any; grid?: any; handleLayout?: any; layout?: any;onPress ? : any; }) => {

    const navigation = useNavigation<any>();

    const theme = useTheme();
    const { colors }: {colors :any} = theme;

    const { grid, handleLayout, layout } = props;

    return (
        <DropShadow
            style={[{
                shadowColor: "rgba(0,0,0,0.5)",
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: .1,
                shadowRadius: 40,
            }, Platform.OS === "ios" && {
                backgroundColor:'transparent',
            }]}
        >
            <View
                style={[{
                    height: props.productId ? 55 : 55,
                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white 
                }, props.transparent && {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                }]}
            >
                <View 
                    style={[GlobalStyleSheet.container, {
                        padding:0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft:props.paddingLeft ? 15 : 0,
                        paddingHorizontal:20,
                        justifyContent: 'space-between',
                        marginTop:3
                    }]}
                >
                    {props.leftIcon == "back" &&
                        <IconButton
                            onPress={() => props.backAction ? props.backAction() : navigation.goBack()}
                            icon={props => <FeatherIcon name="arrow-left" {...props} />}
                            iconColor={colors.gray90}
                            size={20}
                        />
                    }
                    <View style={{ flex: 1, justifyContent:'center'}}>
                        <Text style={[FONTS.h5,FONTS.fontMedium,{ color: colors.gray100,marginLeft: props.titleLeft ? -5 : 0,textAlign: props.titleLeft ? 'left' : 'center' }]}>{props.title}</Text>
                        {props.productId &&
                            <Text style={{ ...FONTS.fontSm, color: colors.text, textAlign: 'center', marginTop: 2 }}>{props.productId}</Text>
                        }
                    </View>
                    {grid &&
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => handleLayout('list')}
                                style={[{
                                    padding: 12,
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white ,
                                    borderRadius:30
                                },layout === 'list' && {
                                    backgroundColor:'#F5EFFF'
                                }]}
                            >
                                <Image
                                    style={{
                                        height: 14,
                                        width: 14,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'list' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid2}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleLayout('grid')}
                                style={[{
                                    padding: 12,
                                    borderRadius:30,
                                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white ,
                                },layout === 'grid' && {
                                    backgroundColor:'#F5EFFF'
                                }]}
                            >
                                <Image
                                    style={{
                                        height: 14,
                                        width: 14,
                                        resizeMode: 'contain',
                                        tintColor: layout === 'grid' ? COLORS.primary : '#BEB9CD',
                                    }}
                                    source={IMAGES.grid}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </DropShadow>
    );
};



export default Header;