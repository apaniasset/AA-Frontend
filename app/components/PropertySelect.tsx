import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { COLORS, FONTS } from "../constants/theme";
import { useTheme } from "@react-navigation/native";

interface Props {
  label: string;
  data: string[];
  onSelect: (value: string) => void;
}

const PropertySelect = ({ label, data, onSelect } : Props) => {


    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(label);

    const dropAnim = useRef(new Animated.Value(0)).current; // height
    const fadeAnim = useRef(new Animated.Value(0)).current; // opacity

    const toggleDropdown = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (open) {
        // OPEN animation
        Animated.parallel([
            Animated.timing(dropAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: false,
            }),
            Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
            }),
        ]).start();
        } else {
        // CLOSE animation
        Animated.parallel([
            Animated.timing(dropAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.in(Easing.ease),
            useNativeDriver: false,
            }),
            Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
            }),
        ]).start();
        }
    }, [open]);

    const handleSelect = (item: string) => {
        setValue(item);
        onSelect(item);
        setOpen(false);
    };

    // Interpolate Dropdown Height
    const dropdownHeight = dropAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, data.length * 40], // auto height
    });

    return (
        <View style={{ width: "100%" }}>
            {/* Select Box */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={toggleDropdown}
                style={[styles.selectBox,{
                    borderColor:colors.checkBoxborder,
                    backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                }]}
            >
                <Text style={[FONTS.BodyXS, FONTS.fontMedium,{color:colors.gray100}]}>
                    {value}
                </Text>

                <Icon
                    name={open ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={colors.gray40}
                />
            </TouchableOpacity>
        
            {/* Animated Dropdown */}
            <Animated.View
                style={[
                styles.dropdown,
                    {
                        height: dropdownHeight,
                        opacity: fadeAnim,
                        borderColor:colors.checkBoxborder,
                        backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white
                    },
                ]}
            >
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelect(item)}
                        style={[styles.dropdownItem,{ borderBottomColor:colors.checkBoxborder}]}
                    >
                        <Text style={[FONTS.BodyXS,FONTS.fontMedium,{color:colors.title}]}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    selectBox: {
        padding: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E4ED",
        backgroundColor: COLORS.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdown: {
        width:150,
        position:'absolute',
        top:45,
        zIndex:99,
        overflow: "hidden",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E2E4ED",
        backgroundColor: COLORS.white,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F5",
    },
    dropdownText: {
        color: COLORS.black,
    },
});

export default PropertySelect;
