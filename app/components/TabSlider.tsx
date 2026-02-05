import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { useTheme } from "@react-navigation/native";


interface TabItem {
  id: number;
  title: string;
}

interface Props {
  tabs: TabItem[];
  activeTab: number;
  setActiveTab: (id: number) => void;
}

interface TabLayout {
  width: number;
  x: number;
}

const TabSlider = ({ tabs, activeTab, setActiveTab } : Props) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const translateX = useRef(new Animated.Value(0)).current;
    const indicatorWidth = useRef(new Animated.Value(0)).current;

    const [tabLayouts, setTabLayouts] = useState<TabLayout[]>([]);

    // Animate indicator when active tab changes
    useEffect(() => {
        if (tabLayouts[activeTab]) {
            Animated.spring(translateX, {
                toValue: tabLayouts[activeTab].x,
                useNativeDriver: false,   // 🔥 FIX
            }).start();

            Animated.spring(indicatorWidth, {
                toValue: tabLayouts[activeTab].width,
                useNativeDriver: false,   // must stay false (width can't use native)
            }).start();
        }
    }, [activeTab, tabLayouts]);


    // Capture layout of each tab
    const onLayoutTab = (e: LayoutChangeEvent, index: number) => {
        const { width, x } = e.nativeEvent.layout;

        setTabLayouts((prev) => {
            const copy = [...prev];
            copy[index] = { width, x };
            return copy;
        });
    };

    return (
        <View
            style={{
                flexDirection: "row",
                height: 30,
                backgroundColor:theme.dark ? COLORS.darkwhite : COLORS.white,
                width:215,
                borderRadius: 8,
                borderBottomRightRadius:0,
                borderBottomLeftRadius:0
            }}
        >
            {/* Purple animated background */}
            {tabLayouts[activeTab] && (
                <Animated.View
                    style={{
                        position: "absolute",
                        bottom:0,
                        height: 35,
                        backgroundColor:theme.dark ? COLORS.white : '#3C0C81',
                        borderRadius: 8,
                        borderBottomRightRadius:0,
                        borderBottomLeftRadius:0,
                        transform: [{ translateX }],
                        width: indicatorWidth,
                    }}
                />
            )}

            {tabs.map((item, index) => {
                const isActive = activeTab === index;

                return (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => setActiveTab(index)}
                        activeOpacity={0.8}
                        onLayout={(e) => onLayoutTab(e, index)}
                        style={{
                            paddingHorizontal: 14,
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <Text
                            style={[
                                FONTS.BodyS,
                                FONTS.fontSemiBold,
                                {
                                    color: isActive ? theme.dark ? COLORS.darkwhite : COLORS.white : theme.dark ? '#9F5DFF':  COLORS.primary,
                                },
                            ]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabSlider;
