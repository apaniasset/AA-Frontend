import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { IMAGES } from "../constants/Images";
import { useTheme } from "@react-navigation/native";

interface StarRatingProps {
  rating: number;
  onChange: (value: number) => void;
  size?: number;
  activeColor?: string;
  gap?: number;
}

const StarRating = ({
    rating,
    onChange,
    size = 35,
    activeColor = "#8744E7",
    gap = 5,
}: StarRatingProps) => {

    const theme = useTheme();
    const {colors} : {colors : any}  = theme;

    return (
        <View style={{ flexDirection: "row"}}>
            {/* ACTIVE STARS */}
            {new Array(rating).fill(0).map((_, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => onChange(index + 1)}
                    style={{ margin: gap }}
                >
                <Image
                    source={IMAGES.star7}
                    style={[
                    styles.star,
                        { width: size, height: size, tintColor: activeColor },
                    ]}
                    resizeMode="contain"
                />
                </TouchableOpacity>
            ))}

            {/* INACTIVE STARS */}
            {new Array(5 - rating).fill(0).map((_, index) => (
                <TouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => onChange(index + rating + 1)}
                    style={{ margin: gap }}
                >
                    <Image
                        source={theme.dark ? IMAGES.darkunderlinestar :IMAGES.underlinestar}
                        style={[styles.star, { width: size, height: size }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
  star: {
    zIndex: 1,
  },
});

export default StarRating;
