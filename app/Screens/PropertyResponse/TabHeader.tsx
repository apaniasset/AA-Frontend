import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { COLORS, FONTS } from "../../constants/theme";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/StyleSheet";

interface TabHeaderProps {
    activeTab: number;    
    setActiveTab: (index: number) => void;
}

const { width } = Dimensions.get("window");
const TAB_COUNT = 2;

const TabHeader = ({ activeTab, setActiveTab } :TabHeaderProps) => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;

    const tabWidth = width / TAB_COUNT;

    const slideAnim = useRef(new Animated.Value(activeTab * tabWidth)).current;

    // Slide underline with bounce effect
    useEffect(() => {
        Animated.spring(slideAnim, {
        toValue: activeTab * tabWidth,
        friction: 6,
        tension: 80,
        useNativeDriver: false,
        }).start();
    }, [activeTab]);

    // SWIPE HANDLER
    const panResponder: PanResponderInstance = PanResponder.create({
        onMoveShouldSetPanResponder: (
        _: GestureResponderEvent,
            gesture: PanResponderGestureState
        ) => Math.abs(gesture.dx) > 10,

        onPanResponderMove: () => {},

        onPanResponderRelease: (
        _: GestureResponderEvent,
            gesture: PanResponderGestureState
        ) => {
            if (gesture.dx < -40 && activeTab === 0) {
                setActiveTab(1); // Swipe Left → Go to Send
            } else if (gesture.dx > 40 && activeTab === 1) {
                setActiveTab(0); // Swipe Right → Go to Received
            }   
        },
    });

    return (
        <View>
            {/* TOP ROW */}
            <View style={[styles.tabRow,{backgroundColor:colors.checkBoxborder}]} {...panResponder.panHandlers}>
                {/* RECEIVED */}
                <TouchableOpacity  style={[GlobalStyleSheet.center,{flex:1}]} onPress={() => setActiveTab(0)}>
                    <Text
                        style={[
                            FONTS.BodyM,FONTS.fontSemiBold,
                            {
                                color:colors.gray60
                            },activeTab === 0 && {
                                color:colors.gray100
                            }
                        ]}
                    >
                        Received
                    </Text>
                </TouchableOpacity>

                {/* SEND */}
                <TouchableOpacity  style={[GlobalStyleSheet.center,{flex:1}]} onPress={() => setActiveTab(1)}>
                    <Text
                        style={[
                            FONTS.BodyM,FONTS.fontSemiBold,
                            {
                                color:colors.gray60
                            },activeTab === 1 && {
                                color:colors.gray100
                            }
                        ]}
                    >
                        Send
                    </Text>
                </TouchableOpacity>
            </View>

            {/* ANIMATED UNDERLINE */}
            <Animated.View
                style={[
                    styles.indicator,
                    {
                        width: tabWidth,
                        transform: [{ translateX: slideAnim }],
                        backgroundColor:COLORS.primary
                    },
                ]}
            />
        </View>
    );
};

export default TabHeader;

const styles = StyleSheet.create({
    tabRow: {
        height:40,
        backgroundColor:COLORS.white,
        flexDirection:'row'
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    activeText: {
        color: "#5B3CFB",
    },
    indicator: {
        height: 3
    },
});
