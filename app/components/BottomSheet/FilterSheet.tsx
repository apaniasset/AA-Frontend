import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import { GlobalStyleSheet } from "../../constants/StyleSheet";
import { COLORS, FONTS } from "../../constants/theme";
import { useTheme } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMAGES } from "../../constants/Images";
import Button from "../Button/Button";

/* CATEGORY LIST */
const categories = [
  "Quick Filters",
  "Budget",
  "Bedrooms",
  "Bathrooms",
  "Property Type",
  "Available for",
  "Furnishing Status",
  "Posted By",
  "Amenities",
  "Localities",
  "Builders",
  "Projects",
  "Floor Preference",
  "Facing Direction"
];

/* CATEGORY CONTENTS */
const filterContents: any = {
  "Quick Filters": [
    { label: "Verified Properties" },
    { label: "Ready To Move" },
    { label: "Owner Properties" },
    { label: "New Projects" }
  ],

  Budget: [
    { label: "Under ₹10,000" },
    { label: "₹10,000 - ₹20,000" },
    { label: "₹20,000 - ₹30,000" },
    { label: "₹30,000 - ₹40,000" },
    { label: "₹40,000+" }
  ],

  Bedrooms: [
    { label: "1 BHK" },
    { label: "2 BHK" },
    { label: "3 BHK" },
    { label: "4 BHK" },
    { label: "Studio" }
  ],

  Bathrooms: [
    { label: "1 Bathroom" },
    { label: "2 Bathrooms" },
    { label: "3 Bathrooms" },
    { label: "4+ Bathrooms" }
  ],

  "Property Type": [
    { label: "Apartment" },
    { label: "Villa" },
    { label: "Independent House" },
    { label: "Plot/Land" },
    { label: "Commercial" }
  ],

  "Available for": [
    { label: "Family" },
    { label: "Bachelor" },
    { label: "Company" }
  ],

  "Furnishing Status": [
    { label: "Semi-furnished" },
    { label: "Furnished" },
    { label: "Unfurnished" }
  ],

  "Posted By": [{ label: "Owner" }, { label: "Agent" }, { label: "Builder" }],

  Amenities: [
    { label: "Parking" },
    { label: "Garden" },
    { label: "Lift" },
    { label: "Swimming Pool" },
    { label: "Gym" }
  ],

  Localities: [
    { label: "Andheri" },
    { label: "Borivali" },
    { label: "Bandra" },
    { label: "Dadar" },
    { label: "Goregaon" }
  ],

  Builders: [
    { label: "Lodha" },
    { label: "Hiranandani" },
    { label: "Godrej" },
    { label: "Tata Housing" }
  ],

  Projects: [
    { label: "Lodha Park" },
    { label: "Rustomjee Urbania" },
    { label: "Godrej Emerald" }
  ],

  "Floor Preference": [
    { label: "Ground Floor" },
    { label: "1-5 Floors" },
    { label: "6-10 Floors" },
    { label: "11+ Floors" }
  ],

  "Facing Direction": [
    { label: "East" },
    { label: "West" },
    { label: "North" },
    { label: "South" }
  ]
};

const FilterSheet = (props: any, ref: any) => {
    const bottomSheetRef = useRef(null);

    /* 90% + 100% snap points */
    const snapPoints = useMemo(() => ["90%", "100%"], []);

    /* Track Sheet Index (0 = 90%, 1 = 100%) */
    const [sheetIndex, setSheetIndex] = useState(0);

    const handleSheetChanges = useCallback((index: number) => {
      setSheetIndex(index);
    }, []);

    const theme = useTheme();
    const { colors }: { colors: any } = theme;

    const openSheet = () => {
      bottomSheetRef.current?.snapToIndex(0);
    };

    useImperativeHandle(ref, () => ({
      openSheet
    }));

    const handleClosePress = () => {
      bottomSheetRef.current?.close();
    };

    const [activeCategory, setActiveCategory] = useState("Furnishing Status");
    const [selected, setSelected] = useState<string[]>(["Furnished", "2 BHK"]);

    const toggleSelection = (option: string) => {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((x) => x !== option)
          : [...prev, option]
      );
    };

    const getCategoryCount = (cat: string) => {
      return filterContents[cat]?.filter((i: any) =>
        selected.includes(i.label)
      ).length;
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
        )}
        backgroundStyle={{
          backgroundColor: theme.dark ? COLORS.darkwhite : COLORS.white,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }}
        handleIndicatorStyle={{ backgroundColor: '#E2E4ED', width: 92 }}
      >
        <BottomSheetView
          style={[
            GlobalStyleSheet.container,
            { padding: 0, flex: 1 }
          ]}
        >
          {/* ===== SCROLLABLE AREA ===== */}
          <View style={{ flex: 1 }}>

            {/* HEADER */}
            <View
              style={[
                GlobalStyleSheet.flexcenter,
                { paddingTop: 10, paddingHorizontal: 20 }
              ]}
            >
              <Text style={{ ...FONTS.h5, ...FONTS.fontSemiBold, color: colors.gray100 }}>
                Filters ({selected.length})
              </Text>

              <TouchableOpacity
                style={[
                  GlobalStyleSheet.headerBtn,
                  {
                    height: 36,
                    width: 36,
                    borderRadius: 30,
                    position: "absolute",
                    top: 5,
                    right: 15
                  }
                ]}
                onPress={handleClosePress}
              >
                <FeatherIcon name="x" size={16} color={"#FC3752"} />
              </TouchableOpacity>
            </View>

            {/* SELECTED TAGS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                padding: 15,
                paddingTop: 10,
              }}
            >
              {selected.map((tag, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.gray20,
                    backgroundColor: colors.gray10,
                    marginRight: 8
                  }}
                >
                  <Text style={[FONTS.fontXs, FONTS.fontMedium, { color: colors.gray80 }]}>
                    {tag}
                  </Text>

                  <TouchableOpacity onPress={() => toggleSelection(tag)}>
                    <Image
                      source={IMAGES.close}
                      style={{ height: 16, width: 16, tintColor: colors.gray40, marginLeft: 6 }}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* ===== MAIN LEFT + RIGHT PANEL ===== */}
            <View style={{ flex: 1, flexDirection: "row",borderTopWidth:1,borderColor:colors.checkBoxborder }}>

              {/* LEFT CATEGORIES */}
              <ScrollView
                style={{
                  width: "30%",
                  borderRightWidth: 1,
                  borderColor: colors.checkBoxborder
                }}
              >
                {categories.map((cat, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setActiveCategory(cat)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 15,
                      paddingHorizontal: 10,
                      backgroundColor:
                        activeCategory === cat ? colors.checkBoxborder : colors.card,
                      borderBottomWidth: 1,
                      borderColor: colors.checkBoxborder
                    }}
                  >
                    <Text
                      style={[
                        FONTS.BodyXS,
                        FONTS.fontMedium,
                        { color: colors.gray100, flex: 1 },
                        activeCategory === cat && { color: theme.dark ? '#CAA6FF': "#521AA3" }
                      ]}
                    >
                      {cat}
                    </Text>

                    {getCategoryCount(cat) > 0 && (
                      <View
                        style={{
                          minWidth: 18,
                          height: 18,
                          borderRadius: 10,
                          backgroundColor: "#F5EFFF",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={[
                            FONTS.fontBold,
                            { fontSize: 10, color: COLORS.primary }
                          ]}
                        >
                          {getCategoryCount(cat)}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* RIGHT OPTIONS */}
              <ScrollView style={{ width: "70%", padding: 15 }}>
                {filterContents[activeCategory]?.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleSelection(item.label)}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 15 }}
                  >
                    <View
                      style={[
                        {
                          height: 20,
                          width: 20,
                          borderRadius: 4,
                          borderWidth: 2,
                          borderColor: colors.gray30,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 12
                        },
                        selected.includes(item.label) && {
                          backgroundColor:theme.dark ? '#9F5DFF': COLORS.primary,
                          borderColor: theme.dark ? '#9F5DFF': COLORS.primary
                        }
                      ]}
                    >
                      {selected.includes(item.label) && (
                        <FeatherIcon name="check" size={13} color={COLORS.white} />
                      )}
                    </View>

                    <Text style={[FONTS.BodyM, { fontSize: 14, color: colors.gray100 }]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

            </View>
          </View>

          {/* ===== FIXED BOTTOM BUTTON ===== */}
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderTopWidth: 1,
              borderColor: colors.checkBoxborder,
              backgroundColor: colors.card,
              position: "absolute",
              left: 0,
              right: 0,
              bottom: sheetIndex === 0 ? 20 : -70 
            }}
          >
            <Button title="See All Properties" btnRounded />
          </View>

        </BottomSheetView>
      </BottomSheet>
    );
};

export default forwardRef(FilterSheet);
