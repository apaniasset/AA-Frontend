import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { useTheme } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const tabs = ["Highlight", "Details", "Media", "Seller", "Location", "Explore"];
const tabWidth = width / tabs.length;

const TabBar = ({ activeIndex = 0, onTabPress }: any) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(translateX, {
            toValue: activeIndex * tabWidth,
            useNativeDriver: true,
        }).start();
    }, [activeIndex]);

    return (
        <View style={styles.container}>
            {/* Sliding Indicator */}
            <Animated.View
                style={[
                styles.indicator,
                { width: tabWidth - 20, transform: [{ translateX }] },
                ]}
            />

            {/* Tabs */}
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.7}
                    style={styles.tabButton}
                    onPress={() => onTabPress(index)}
                >
                    <Text
                        style={[
                        styles.tabText,
                            { color: activeIndex === index ? COLORS.primary : colors.gray50 },
                        ]}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.primary,
    position: "relative",
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    ...FONTS.fontMedium,
    fontSize: 13,
  },
  indicator: {
    height: 32,
    backgroundColor: "#F4E8FF",
    borderRadius: 20,
    position: "absolute",
    left: 10,
    top: 8,
  },
});
