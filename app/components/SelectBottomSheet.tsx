import React, { useState, useRef, useImperativeHandle } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { FONTS } from "../constants/theme";

const { height } = Dimensions.get("window");

interface SelectItem {
  label: string;
  value: string | number;
}

export interface SelectBottomSheetRef {
  open: () => void;
}

interface Props {
  data: SelectItem[];
  onSelect?: (item: SelectItem) => void;
}

const SelectBottomSheet = React.forwardRef<SelectBottomSheetRef, Props>(
  ({ data, onSelect }, ref) => {

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const [visible, setVisible] = useState(false);

    const sheetAnim = useRef(new Animated.Value(height)).current;

    const open = () => {
      setVisible(true);
      Animated.timing(sheetAnim, {
        toValue: height * 0.30,
        duration: 250,
        useNativeDriver: false,
      }).start();
    };

    const close = () => {
      Animated.timing(sheetAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setVisible(false));
    };

    useImperativeHandle(ref, () => ({
      open,
    }));

    return (
      <>
        {visible && (
            <Pressable style={[styles.overlay,{backgroundColor:'rgba(50,50,50,0.5)'}]} onPress={close}>
                <Animated.View
                    style={[
                        styles.sheet,
                        { top: sheetAnim, backgroundColor: colors.card ,flex:1},
                    ]}
                >
                    <View style={{alignItems:'center',marginTop:10,marginBottom:10}}>
                        <View style={{width:87,height:4,borderRadius:4,backgroundColor:'#E2E4ED'}}/>
                    </View>
                    <ScrollView
                        contentContainerStyle={{flexGrow:1,paddingBottom:110}}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ padding: 20,paddingTop:0,flex:1 }}>
                            {data.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.option,{borderColor:colors.checkBoxborder}]}
                                    onPress={() => {
                                        onSelect?.(item);
                                        close();
                                    }}
                                >
                                    <Text style={[FONTS.BodyS,FONTS.fontSemiBold, { color: colors.gray90 }]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </Animated.View>
            </Pressable>
        )}
      </>
    );
  }
);

export default SelectBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex:999
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    height: height * 0.6,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  }
});
