import { useTheme } from "@react-navigation/native";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from "react-native-vector-icons/Feather";
import { FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/StyleSheet";

const SortSheet = forwardRef((props: any, ref) => {

    const sheetRef = useRef(null);

    // dynamic props
    const [title, setTitle] = useState("Sort By");
    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [callbackFn, setCallbackFn] = useState<any>(null);

    useImperativeHandle(ref, () => ({
        open: ({ title, options, selected, onSelect }: any) => {
        setTitle(title);
        setOptions(options);
        setSelectedOption(selected);
        setCallbackFn(() => onSelect);
        sheetRef.current.open();
        },
        close: () => sheetRef.current.close(),
    }));

    const handleSelect = (item: string) => {
        setSelectedOption(item);
        callbackFn?.(item); // send selected item to parent
        sheetRef.current.close();
    };

    const theme = useTheme();
    const { colors }: { colors: any } = theme;


    return (
        <RBSheet
            ref={sheetRef}
            height={300}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
                wrapper: { backgroundColor: "rgba(50,50,50,0.5)" },
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: colors.card
                },
                draggableIcon: {
                    backgroundColor: "#B7B7B7",
                },
            }}
            customModalProps={{
                animationType: 'slide',
                statusBarTranslucent: true,
            }}
        >
            <View style={{ alignItems: "center", paddingVertical: 10 }}>
                <View
                    style={{
                        width: 87,
                        height: 4,
                        borderRadius: 4,
                        backgroundColor: "#E2E4ED",
                    }}
                />
            </View>

            {/* Title */}
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={[FONTS.h5, FONTS.fontSemiBold, { color: colors.gray100 }]}>
                    {title}
                </Text>
            </View>

            {/* Option List */}
            <View style={{ paddingHorizontal: 20 }}>
                {options.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            GlobalStyleSheet.flexcenter,
                            styles.optionRow,
                            { borderColor: colors.checkBoxborder },
                            selectedOption === item && {
                                backgroundColor: colors.gray30,
                                borderColor: colors.gray40,
                            },
                        ]}
                        onPress={() => handleSelect(item)}
                    >
                        <Text
                            style={[
                                FONTS.BodyXS,
                                FONTS.fontMedium,
                                { color: colors.gray100 },
                                selectedOption === item && { color: colors.gray80 },
                            ]}
                        >
                            {item}
                        </Text>

                        {selectedOption === item && (
                            <Feather
                                name="check"
                                size={20}
                                color={colors.gray80}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </RBSheet>
    );
});

const styles = StyleSheet.create({
  optionRow: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12.5,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default SortSheet;
